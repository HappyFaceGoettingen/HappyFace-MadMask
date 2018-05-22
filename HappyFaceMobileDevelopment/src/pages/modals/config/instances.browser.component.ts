import {Component} from "@angular/core";
import {DataModel, InstanceObject} from "../../../data/DataModel";
import {AlertController, NavController, NavParams, ViewController} from "ionic-angular";
import {ConfigPage} from "./config";

@Component({
    templateUrl: "instances.browser.component.html"
})

export class InstancesBrowserComponent
{
    instances:InstanceObject[] = [];
    isLoading:boolean = true;

    constructor(private model:DataModel, private navParams:NavParams, private navCtrl:NavController, private alertCtrl:AlertController) {}

    ngOnInit()
    {
        this.model.addLoadingStartedCallback(this.loadingFinished.bind(this));
        if(!this.model.isLoading()) this.loadingFinished();
    }

    loadingFinished()
    {
        let req:XMLHttpRequest = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState == 4 && req.status == 200)
            {
                this.updateList(req.response);
                this.isLoading = false;
            }
        };
        req.open("GET", this.model.getRemoteURL() + "sites/default/meta-meta.json");
        req.send();
    }

    updateList(str:string)
    {
        let json = JSON.parse(str);

        for(let i:number = 0; i < json.length; i++) {
            let obj: InstanceObject = json[i];
            this.instances.push(obj);
        }

        if(this.instances.length == 1 && this.instances[0].constructor === Object)
            this.instances = [];
    }

    choose(inst:InstanceObject)
    {
        if(inst.mobile_port == null || inst.web_port == null || inst.host == null)
        {
            this.alertCtrl.create({
                title: "Not supported",
                message: "This instance is currently not supported in this application",
                cssClass: "alertText",
                buttons: ["OK"]
            }).present();
        }
        else {
            console.log("OPEN: " + inst.name);
            window.open("http://" + inst.host + ":" + inst.mobile_port + "/", "_blank");
            window.focus();
        }
    }

    extSettings()
    {
        this.navCtrl.push(ConfigPage, {"viewCtrl": this.navParams.get('viewCtrl')});
    }

    close()
    {
        let viewCtrl:ViewController = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
}
