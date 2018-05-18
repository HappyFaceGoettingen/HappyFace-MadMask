import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {AlertController, NavController} from "ionic-angular";
import {MonitoringPage} from "../monitoring/monitoring";
import {Storage} from "@ionic/storage";

@Component({
    templateUrl: "tour.html"
})

export class TourPage
{
    url:string = "";

    slides:any = null;
    isLoading:boolean = false;

    constructor(private model:DataModel, private navCtrl: NavController, private storage:Storage,
                private alertCtrl:AlertController) {}

    ngOnInit()
    {
        this.url = "http://localhost:8100/" + "assets/tour.json";

        this.isLoading = true;
        this.model.asyncLoadFile(this.url, (content:any, statusCode:number) => {
            if(statusCode == 200) {
                this.slides = JSON.parse(content).slides;
                this.isLoading = false;
            }
        });
    }

    skip()
    {
        console.log("SKIP");
        this.storage.set("startup", true);
        this.navCtrl.pop();
    }

    continue()
    {
        console.log("CONTINUE");
        let alert = this.alertCtrl.create({
            title: "Show guide on next startup ?",
            buttons: [{
                text: "Yes",
                handler: () => { this.storage.set("startup", false); this.navCtrl.pop(); }
            },{
                text: "No",
                handler: () => { this.storage.set("startup", true);  this.navCtrl.pop(); }
            }]
        });
        alert.setCssClass("alertText");
        alert.present();
    }
}
