import {Crypt} from "./Crypt";
import {PassModal} from "./pass-modal";
import {ModalController} from "ionic-angular";

export class SSH3Wrapper
{
    /* GATEWAY */
    gatewayHost:string = "127.0.0.1";
    gatewayPort:string = "1510";

    /* SSH CONNECTION */
    host:string = null;
    port:string = null;
    username:string = null;
    password:string = null;

    ws:WebSocket = null;
    connectionOpen:boolean = false;
    onConnectionEnd:() => void = null;
    onConnectionReady:() => void = null;
    lastCMD:string = "";
    crypt:Crypt = null;
    ecdh:boolean = false;
    auth:boolean = false;
    mode:string  = 'AUTH';

    term = null; // Terminal


    constructor(term, onConnectionEnd:() => void, onConnectionReady:() => void, cred:SSHCredentials)
    {
        if(cred)
        {
            this.host     = cred.host;
            this.port     = cred.port;
            this.username = cred.username;
            this.password = cred.password;
        }

        this.crypt = new Crypt();
        this.crypt.send = this.sendClear.bind(this);
        this.term = term;
        this.onConnectionEnd = onConnectionEnd;
        this.onConnectionReady = onConnectionReady;
        this.ws = new WebSocket(this.getURL());

        this.ws.onopen = () => {
            console.log("Connection established: " + this.getURL());
            this.connectionOpen = true;

        };

        this.ws.onerror = (error) => {
            console.error("Connection failed: " + this.getURL());
            this.term.writeln("Connection failed: " + this.getURL());
            this.connectionOpen = false;
        };

        this.ws.onmessage = (message:MessageEvent) => {

            switch(this.mode)
            {
                case 'AUTH':
                    // The server initiates the encryption
                    this.crypt.initECDH(message.data);
                    this.mode = "CRED";
                    break;
                case 'CRED':
                    this.authenticate();
                    this.mode = "COMM";
                    if(this.onConnectionReady) setTimeout(() => { this.onConnectionReady(); }, 1000);
                    break;
                case 'COMM':
                    // Decryption
                    let iv  = message.data.substring(0, 32);
                    let msg = message.data.substring(32);
                    this.crypt.decrypt(msg, this.crypt.ecdh, iv).then(decrypted => {
                        const clearMessage = Crypt.ab82str(decrypted);
                        const type = clearMessage.substring(0, 3);

                        msg = clearMessage.substring(4, message.data.indexOf("\n", 4)).replace(/[^\x20-\x7F]/g, "");
                        if (this.lastCMD === msg) {                                              // SSH sends the last entered command again.
                            msg = clearMessage.substring(message.data.indexOf("\n", 4) + 2);    // we dont want to display it.
                        }
                        else {
                            msg = clearMessage.substring(4);
                        }

                        if (type === "ERR:")
                            this.term.write("STDERR: " + msg);
                        else
                            this.term.write(msg);
                    });
                    break;
                default:
            }

            /*
            // The server initiates the encryption
            if(!this.ecdh) {
                this.crypt.initECDH(message.data);
                this.ecdh = true;
            }
            else {
                // Decryption
                let iv  = message.data.substring(0, 32);
                let msg = message.data.substring(32);
                this.crypt.decrypt(msg, this.crypt.ecdh, iv).then(decrypted => {
                    const clearMessage = Crypt.ab82str(decrypted);
                    console.log("CLEAR MSG: " + clearMessage);
                    const type = clearMessage.substring(0, 3);
                    msg = clearMessage.substring(4, message.data.indexOf("\n", 4)).replace(/[^\x20-\x7F]/g, "");

                    if (this.lastCMD === msg) {                                              // SSH sends the last entered command again.
                        msg = clearMessage.substring(message.data.indexOf("\n", 4) + 2);    // we dont want to display it.
                    }
                    else {
                        msg = clearMessage.substring(4);
                    }

                    if (type === "ERR:")
                        this.term.write("STDERR: " + msg);
                    else
                        this.term.write(msg);
                });
            }
            */
        };


        this.ws.onclose = (close:CloseEvent) => {
            console.error("Connection closed: " + this.getURL());
            if(close.code != 1000)
            {
                this.term.writeln("Connection closed abnormally. Code: " + close.code);
            }
            this.connectionOpen = false;
            if(this.onConnectionEnd) this.onConnectionEnd();
        };

        this.connectionOpen = true;
    }

    send(data:string):Promise<void>
    {
        if(!this.connectionOpen) return;
        this.lastCMD = data.replace(/[^\x20-\x7F]/g, "");
        //this.ws.send(data);
        return this._send(data);
    }

    sendRaw(data:string):Promise<void>
    {
        //this.ws.send(data);
        return this._send(data);
    }

    authenticate()
    {
        if(this.host && this.port && this.username && this.password)
        {
            this.sendRaw(this.host + "|" + this.port + "|" + this.username + "|" + this.password);
            this.auth = true;
        }
        else
            this.auth = false;
    }

    /**
     * Send data UNENCRYPTED over the stream. Necessary for ecdh key exchange
     * WARNING: Do never send data unencrypted if its not absolutely necessary.
     *
     * @param {string} data The string to be send
     */
    sendClear(data:string)
    {
        this.ws.send(data);
    }

    //Encryption
    private _send(data:string):Promise<void>
    {
        return Promise.resolve(this.crypt.encrypt(data, this.crypt.ecdh).then(encrypted => {
            this.ws.send(Crypt.buf2Hex(encrypted.iv) + Crypt.buf2Hex(encrypted.enc));
        }));
    }

    close()
    {
        if(!this.connectionOpen) return;
        this.connectionOpen = false;
        this.ws.close(4004, "Process killed");
        if(this.onConnectionEnd) this.onConnectionEnd();
    }

    getURL()
    {
        return "ws://" + this.gatewayHost + ":" + this.gatewayPort;
    }
}

interface SSHCredentials
{
    host:string;
    port:string;
    username:string;
    password:string;
}
