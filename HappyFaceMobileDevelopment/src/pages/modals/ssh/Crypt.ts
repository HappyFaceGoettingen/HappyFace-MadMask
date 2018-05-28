
export class Crypt
{
    arr:Uint32Array = null;
    ecdh = null;

    send:(str:string) => void = null;

    constructor()
    {}


    initECDH(remoteKey)
    {
        let localKey = null;
        let secret   = null;

        window.crypto.subtle.generateKey({
            name: "ECDH",
            namedCurve: "P-521"
        }, false, ['deriveKey', 'deriveBits'])
        .then((key) => {
            localKey = key;
            return window.crypto.subtle.exportKey('raw', key.publicKey);
        })
        .then(pubKeyExported => {
            const pubKeyHex = Crypt.buf2Hex(pubKeyExported);

            if(this.send == null) return;
            this.send(pubKeyHex);

            return window.crypto.subtle.importKey('raw', Crypt.hex2Arr(remoteKey),
                {
                    name: "ECDH",
                    namedCurve: "P-521"
                }, true, []);
        })
        .then(importedRemoteKey => {

            return (<any>window).crypto.subtle.deriveBits({
                name: "ECDH",
                namedCurve: "P-521",
                public: importedRemoteKey
            }, localKey.privateKey, 528);
        })
        .then(sharedSecret => {
            // console.log(Crypt.buf2Hex(sharedSecret));  // Display Shared secret
            secret = Crypt.buf2Hex(sharedSecret);
            this.ecdh = secret;
        });
    }

    // Cryptography
    encrypt(data:string, key:any)
    {
        const iv = window.crypto.getRandomValues(new Uint8Array(16));
        const buffer = Crypt.str2ab8(data);
        const keybuffer = Crypt.hex2Arr(key);
        // SHA 256
        return window.crypto.subtle.digest('SHA-256', keybuffer).then((keyHashSHA) => {
            return window.crypto.subtle.importKey('raw', keyHashSHA, { name: 'AES-CBC', length: 256},
                false, ['encrypt']).then(cryptoKey => {
                return window.crypto.subtle.encrypt({
                    name: "AES-CBC",
                    length: 256,
                    iv: iv
                }, cryptoKey, buffer).then((encrypted) => {
                    return { enc: encrypted, iv: iv };
                });
            })

        });
    }

    decrypt(data:string, key:any, ivstring:string)
    {
        const iv  = Crypt.hex2Arr(ivstring);
        const buffer = Crypt.hex2Arr(data);
        const keybuffer = Crypt.hex2Arr(key);

        return window.crypto.subtle.digest('SHA-256', keybuffer).then(keyHashSHA => {
            return window.crypto.subtle.importKey('raw', keyHashSHA, { name: 'AES-CBC', length: 256},
                false, ['decrypt']).then(cryptoKey => {
                    return window.crypto.subtle.decrypt({
                        name: "AES-CBC",
                        length: 256,
                        iv: iv
                    }, cryptoKey, buffer).then(decrypted => {
                        return decrypted;
                    })
            })
        });
    }

    // Helpers
    static hex2Arr(str:string)
    {
        if(!str) return new Uint8Array(0);
        const tmp = [];
        for(let i = 0, len = str.length; i < len; i += 2)
            tmp.push(parseInt(str.substr(i, 2), 16));

        return new Uint8Array(tmp);
    }

    static buf2Hex(buf)
    {
        return Array.from(new Uint8Array(buf)).map(x => ('00' + x.toString(16)).slice(-2)).join('');
    }

    static str2ab(str)
    {
        const buf = new ArrayBuffer(str.length * 2);
        const bufView = new Uint16Array(buf);
        for(let i = 0, strlen = str.length; i < strlen; i++)
            bufView[i] = str.charCodeAt(i);
        return buf;
    }

    static ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    static str2ab8(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for(let i = 0; i < str.length; i++)
            bufView[i] = str.charCodeAt(i);
        return buf;
    }

    static ab82str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
}
