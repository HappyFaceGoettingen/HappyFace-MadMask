export class SSH2Wrapper
{
    conn:number = null;
    clientFailure:boolean = false;
    connectionOpen:boolean = false;

    loopHandler:any = null;

    host:string = "141.5.108.29";
    port:number = 22;

    username:string = "test";
    password:string = "passATLAS01";

    onData:(data:string) => void = null;
    onError:(error:string) => void = null;

    constructor()
    {
        if((<any>window).sshClient == null || (<any>window).sshClient == undefined)
        {
            this.clientFailure = true;
            throw new Error("NO CLIENT");
        }
    }

    connect()
    {
        if(this.clientFailure) return;
        if(this.host == "") {
            console.error("SSH: ERROR No host provided");
            return;
        }
        else if(this.port == 0 || this.port >= 65356) {
            console.error("SSH: ERROR Undefined port");
            return;
        }

        (<any>window).sshClient.sshOpenSession((success) => {
            console.log("SSH: Connection success");
            this.conn = success;
            (<any>window).sshClient.sshVerifyHost((success) => {
                console.log("SSH: Hostkey saved in known_hosts file");
            }, (error) => {
                console.log("SSH: ERROR Connection error " + error);
            }, this.host, this.port, true);
            this.connectionOpen = true;
        }, (error) => {
            console.log("SSH: ERROR Connection error " + error);
        }, this.host, this.port, this.username, this.password, 100, 80);

        this.startLoop();
    }

    startLoop()
    {
        if(!this.clientFailure && this.connectionOpen && this.conn != null)
        {
            this.loopHandler = window.setInterval(this.runLoop.bind(this), 200);
        }
    }

    runLoop()
    {
        if(!this.connectionOpen || this.conn == null) return;
        (<any>window).sshRead((success) => {
            if(this.onData != null) this.onData(success);
        }, (error) => {
            if(this.onError != null) this.onError(error);
        }, this.conn);
    }

    write(str:string)
    {
        if(this.clientFailure)
        {
            console.log("SSH: ERROR No client.");
            return;
        }
        else if(this.conn == null || this.conn == undefined)
        {
            console.log("SSH: ERROR No connection open");
            return;
        }
        else if(!this.connectionOpen)
        {
            console.log("SSH: ERROR No connection open");
            return;
        }

        (<any>window).sshWrite((success) => {},
            (error) => { console.log("SSH: ERROR Write error"); if(this.onError != null) this.onError("WRITE ERROR");}, this.conn, str);
    }
}
