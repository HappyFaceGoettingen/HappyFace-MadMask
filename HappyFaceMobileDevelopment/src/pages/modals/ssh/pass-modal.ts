import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {Storage} from "@ionic/storage";
import { File, Entry, FileEntry } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import {DataModel} from "../../../data/DataModel";

@Component({
    templateUrl: "pass-modal.html"
})

export class PassModal
{
    isiOS:boolean = false;
    isAndroid:boolean = false;
    isHost:boolean = false;

    host:string = "";
    port:number = 22;
    user:string = "";
    pass:string = "";

    gateway:boolean = false;
    gatewayHost:string = "127.0.0.1";
    gatewayPort:string = "1510";

    saveConfig:boolean = false;

    constructor(private viewCtrl:ViewController, private storage:Storage, private model:DataModel,
                private file:File, private chooser:FileChooser)
    {}

    ngOnInit()
    {
        this.isiOS = this.model.isiOS();
        this.isAndroid = this.model.isAndroid();
        this.isHost = this.model.isHost();

        this.storage.get("SSH-Storage").then(value =>
        {
            if(value)
            {
                this.storage.get("SSH-Storage-host").then(value => { this.host = value; });
                this.storage.get("SSH-Storage-port").then(value => { this.port = value; });
                this.storage.get("SSH-Storage-user").then(value => { this.user = value; });

                this.storage.get("SSH-Storage-gateway-host").then(value => { this.gatewayHost = value; });
                this.storage.get("SSH-Storage-gateway-port").then(value => { this.gatewayPort = value; });

                this.saveConfig = true;
            }
            else
                this.saveConfig = false;
        })
    }

    closeModal()
    {
        this.viewCtrl.dismiss({enter: false, host: "", port: 0, user: "", pass: "",
            ghost: this.gatewayHost, gport: this.gatewayPort});
    }

    enter()
    {
        if(this.saveConfig)
        {
            this.storage.set("SSH-Storage", true);

            this.storage.set("SSH-Storage-host", this.host);
            this.storage.set("SSH-Storage-port", this.port);
            this.storage.set("SSH-Storage-user", this.user);

            this.storage.set("SSH-Storage-gateway-host", this.gatewayHost);
            this.storage.set("SSH-Storage-gateway-port", this.gatewayPort);
        }
        else
            this.storage.set("SSH-Storage", false);

        this.viewCtrl.dismiss({enter: true, host: this.host, port: this.port, user: this.user, pass: this.pass,
            ghost: this.gatewayHost, gport: this.gatewayPort});
    }

    toogleGateway()
    {
        this.gateway = !this.gateway;
    }

    /*selectFile()
    {
        if(this.chooser)
        {
            this.chooser.open().then(uri => {
                console.log("FILE URI: " + uri);
                this.file.resolveLocalFilesystemUrl(uri).then( entry => {
                    if(entry.isFile)
                    {

                    }
                })
            });
        }
    }*/
}
