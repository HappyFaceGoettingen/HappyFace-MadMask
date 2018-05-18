import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {NavController} from "ionic-angular";
import {MonitoringPage} from "../monitoring/monitoring";

@Component({
    templateUrl: "tour.html"
})

export class TourPage
{
    url:string = "";

    slides:any = null;
    isLoading:boolean = false;

    constructor(private model:DataModel, private navCtrl: NavController) {}

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
    }

    continue()
    {
        console.log("CONTINUE");
        this.navCtrl.push(MonitoringPage, {});
    }
}
