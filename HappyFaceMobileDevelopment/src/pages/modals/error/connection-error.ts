import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

@Component({
    selector: "page-connection-error",
    templateUrl: "connection-error.html",
})

export class ConnectionErrorPage
{
    host:string = "";
    port:string = "";
    statusCode:string = "404";
    onlyOneCode:boolean = true;

    missingFiles:any[] = [];

    constructor(private viewCtrl: ViewController, private navParams: NavParams)
    {
        this.host = this.navParams.get("host");
        this.port = this.navParams.get("port");

        this.missingFiles = this.navParams.get("errors");
        if(!(this.missingFiles == null || this.missingFiles == undefined) || this.missingFiles.length > 0)
        {
            let s:number = this.missingFiles[0].code;
            for(let i:number = 0; i < this.missingFiles.length; i++) this.onlyOneCode = (s == this.missingFiles[i].code);
            this.statusCode = s.toString(10);
        }
    }

    retry()
    {
        this.viewCtrl.dismiss({"retry": true, "host": this.host, "port": this.port});
    }

    closeModal()
    {
        this.viewCtrl.dismiss({"retry": false, "host": this.host, "port": this.port});
    }
}
