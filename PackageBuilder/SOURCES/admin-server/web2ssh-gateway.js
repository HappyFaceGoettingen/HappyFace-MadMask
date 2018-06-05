var WebSocketServer = require('websocket').server;
var http = require('http');
var Client = require('ssh2').Client;
var crypto = require('crypto');

var server = http.createServer((request, response) => {});

server.listen(8111, () => {});

wsServer = new WebSocketServer({
    httpServer: server
});

var mode = '';

console.log(getLogDate() + "Server started")

wsServer.on('request', (request) => {
    var connection = request.accept(null, request.origin);

    console.log(getLogDate() + "New connection " + request.origin);

    genECDH(connection);

    var conn = new Client();
    var _stream = null;

    mode = 'AUTH';

    connection.on('message', (message) => {
        switch(mode)
        {
            case "AUTH":
                onAuthMessage(message, connection);
                break;
            case 'CRED':
                onCredMessage(message, conn);
                break;
            case 'COMM':
                onCommMessage(message, _stream);
                break;
            default:
        }
    })

    connection.on('close', (connection) => {
        console.log(getLogDate() + "Connection closed " + request.origin);
    });

    conn.on('ready', () => {
        conn.shell((err, stream) => {
            stream.on('close', () => {
                conn.end();
            });
            stream.on('data', (data) => {
                send(connection, "OUT:" + data);
            });
            stream.stderr.on('data', (data) => {
                send(connection, "ERR:" + data);
            });
            _stream = stream;
        });
    });
})

/**
 * Decrypts the incoming message from a HappyFace instance and sends it over ssh2 to the remote location
 *
 * @param {MessageEvent} message  The incoming messageevent from a HappyFace instance
 * @param {Channel} _stream   The outgoing ssh2 client channel
 */
function onCommMessage(message, _stream)
{
    if(message.type === 'utf8') {

        const iv   = message.utf8Data.substring(0, 32);
        const data = message.utf8Data.substring(32);
        const decrypted = decrypt(data, aesSecret, iv);

        if(_stream != null)
            _stream.write(decrypted);
        else
            console.log("stream is null");
    }
    else
        console.log(message);
}

/**
 * Encrypts a recieved message from ssh2 and sends it back to HappyFace
 * @param connection  The active websocket connection to a HappyFace instance
 * @param data  The message from ssh2
 */
function send(connection, data)
{
    if(aesSecret == null) { console.log("No key"); return; } // Dont send unprotected data
    let crypt = encrypt(data, aesSecret);
    crypt.iv = buf2Hex(crypt.iv);
    connection.sendUTF(crypt.iv + crypt.enc);
}

/**
 * Transmit credentials: Server <--> HappyFace
 * and connect ssh2 server to remote location
 * @param {MessageEvent} message  The encrypted message from HappyFace containing the ssh remote credentials
 * @param {Client} conn  The ssh2 client to connect to the remote location with given credentials
 */
function onCredMessage(message, conn)
{
    if(message.type === 'utf8')
    {
        const iv   = message.utf8Data.substring(0, 32);
        const data = message.utf8Data.substring(32);

        const msg  = decrypt(data, aesSecret, iv);
        const i1   = msg.indexOf("|");
        const i2   = msg.indexOf("|", i1+1);
        const i3   = msg.indexOf("|", i2+1);

        const host = msg.substring(0, i1);
        const port = msg.substring(i1 +1, i2);
        const user = msg.substring(i2 +1, i3);
        const pass = msg.substring(i3 +1);

        mode = 'COMM';

        conn.connect({
            host: host,
            port: port,
            username: user,
            password: pass
        });
    }
}


// Authentication
var ecdhSecret = null;
var aesSecret = null;
var alice = null

/**
 * Starts the generation of a secret key used for de-/encryption using the ECDH algorithm (an extension of Diffie-Hellman)
 * @param connection   The connection over which the key is generated
 */
function genECDH(connection)
{
    console.log(getLogDate() + "Generating keys");
    let start = Date.now();
    alice = crypto.createECDH('secp521r1');
    alice.generateKeys();
    const alicePubKey = alice.getPublicKey('hex');
    const alicePrivKey = alice.getPrivateKey('hex');
    let end = Date.now();
    console.log(getLogDate() + "Keys generated [Time used: " + (end - start) + " ms]");
    connection.send(alicePubKey);
}

/**
 * Finishes the generation of the ecdh secret key.
 * @param {MessageEvent} message  The message containing the public key of the connected HappyFace instance.
 * @param connection   The connection over which to send the key generation confirmation message.
 */
function onAuthMessage(message, connection)
{
    sharedSecret = alice.computeSecret(message.utf8Data, 'hex', 'hex');
    ecdhSecret = sharedSecret;
    aesSecret = sharedSecret.substr(0, 256);
    mode = 'CRED';

    // HappyFace waits for a server confirmation to send the encrypted credentials
    const iv = new Uint8Array(crypto.randomBytes(8));
    const da = buf2Hex(iv);
    connection.sendUTF(da);
}

// Cryptography
/**
 * Encrypts a string message using aes-256-cbc
 * @param {string} data  The message to encrypt
 * @param {any} key   The aes key used to encrypt the message
 */
function encrypt(data, key)
{
    const iv = new Uint8Array(crypto.randomBytes(16));
    const keyHashSHA = crypto.createHash('sha256').update(key, 'hex').digest('hex');
    const keyHash = hex2Arr(keyHashSHA);
    cipher = crypto.createCipheriv("aes-256-cbc", keyHash, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { enc: encrypted, iv: iv };
}

/**
 *
 * @param {string} data  The encrypted message to decrypt
 * @param {any} key   The key used to decrypt the message
 * @param {string} ivstring   The initialisation vector in hex format as string
 */
function decrypt(data, key, ivstring)
{
    const iv = hex2Arr(ivstring);

    const keyHashSHA = crypto.createHash('sha256').update(key, 'hex').digest('hex');
    const keyHashCut = hex2Arr(keyHashSHA);
    decipher = crypto.createDecipheriv("aes-256-cbc", keyHashCut, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Helpers

/**
 * Converts a hex string to a Uint8Array (byte) Array
 * @param {string} str   The hex string to convert
 */
function hex2Arr(str)
{
    if(!str) return new Uint8Array(0);
    const tmp = [];
    for(let i = 0, len = str.length; i < len; i += 2)
        tmp.push(parseInt(str.substr(i, 2), 16));

    return new Uint8Array(tmp);
}

/**
 * Converts a byte arraybuffer to a hex string
 * @param {ArrayBuffer} buf   The byte array to convert to hex
 */
function buf2Hex(buf)
{
    return Array.from(new Uint8Array(buf)).map(x => ('00' + x.toString(16)).slice(-2)).join('');
}

/**
 * Returns the current time in [HH:MM:SS.MS]: format for logging.
 */
function getLogDate()
{
    const d = new Date();
    return "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds() + "]: ";
}