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
    restart:boolean = false;

    isLoading:boolean = false;

    constructor(private model:DataModel, private navCtrl: NavController, private storage:Storage,
                private alertCtrl:AlertController) {}

    ngOnInit()
    {}

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

    slides = [
        {
            title: "Welcome to HappyFace Mobile",
            description: "This tour will explain to you the basic functions of this app. <br> If you want to see this tour again, you can find it under <br> Settings [ -> Extended Settings] -> Tour.",
            image: "assets/img/tour/happyface-tour-1.png"
        },
        {
            title: "The status badge",
            description: "This badge is on top of the Monitoring and Analyze page. It tells you the status level of the monitored cluster and the failed systems. It also reads it out for you when you tap on it (if you're lazy)",
            image: "assets/img/tour/happyface-tour-2.png"
        },
        {
            title: "The systems reports",
            description: "On the Monitoring page, all systems of the monitored cluster report with a screenshot of their status screen. They are ordered by their level of severity. If one system has a critical status, their report picture will turn red.",
            image: "assets/img/tour/happyface-tour-3.png"
        },
        {
            title: "The Analyzer page",
            description: "On the Analyzer page, below the status badge, you can display the interconnection between systems (pathway and overall pathway), the dependability of the systems over time (analysis), a forecast of their dependability (Happy Forecast, still beta) and the classical version of HappyFace Mobile",
            image: "assets/img/tour/happyface-tour-4.png"
        },
        {
            title: "The controller page",
            description: "To give you the ability to react on system failures, the controller page lets you remotely connect to any system of the monitored cluster and change it. It also connects you via ticket or email to the responsible administrator in case you need help.",
            image: "assets/img/tour/happyface-tour-5.png"
        },
        {
            title: "The visualizer page",
            description: "The visualizer page provides you plots of the system dependability, etc. It also provides pretty pictures of clusters.",
            image: "assets/img/tour/happyface-tour-6.png"
        },
        {
            title: "The logs page",
            description: "If anything goes wrong, you can always have a look into the logs of the controlling servers. They might give you a hint of whats going wrong.",
            image: "assets/img/tour/happyface-tour-7.png"
        },
        {
            title: "The widget page",
            description: "This page gives you a lot of possibilities to display the information you need from this app and you can reorder them as you like, so it fits your workflow. If you don't find what you are looking for you can even build your own widgets.",
            image: "assets/img/tour/happyface-tour-8.png"
        },
        {
            title: "Settings",
            description: "In this page, you can choose the cluster to be monitored. It is a good idea to start there right after this tour. The other Settings you be self explaining",
            image: "assets/img/tour/happyface-tour-9.png"
        }
    ];
}
