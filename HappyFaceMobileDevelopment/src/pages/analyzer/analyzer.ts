import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {DataModel} from "../../data/DataModel";
import {MonitoringPage} from "../monitoring/monitoring";
import {AnalyzerDetailPage} from "./analyzer-detail";
import {MobileConfig} from "../../data/MobileConfig";


@Component({
    selector: 'page-monitoring',
    templateUrl: 'analyzer.html'
})

export class AnalyzerPage
{
    isLoading:boolean = true;

    statusLevel:string = "Normal";
    statusImg  :string = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
    statusColor:string = "item-calm";
    statusText :string = "World wide Atlas Distributed Computing System";

    viewers:any[] = [
        {"id": "analysis", "name": "Status Analysis", "multiplots": true, "spsrc": ""},
        {"id": "pathway", "name": "Info Pathway", "multiplots": true, "spsrc": ""},
        {"id": "overall_pathway", "name": "Overall Info Pathway", "multiplots": false, "spsrc": ""},
        {"id": "happyface", "name": "HappyFace Classical Rating", "multiplots": false, "spsrc": "assets/img/happyface_classical.png"},
        {"id": "forecast", "name": "Happy Forecast", "multiplots": false, "spsrc": "assets/img/forecast.png"}
    ];
    selectedViewer:any = this.viewers.find( v => v.id === "overall_pathway");

    monitoringURLs:any[];


    constructor(private navControl: NavController, private alertCtrl: AlertController) {}

    ngOnInit()
    {
        DataModel.getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if(!DataModel.getInstance().isLoading()) this.onReloadFinishedListener();
    }

    onReloadFinishedListener()
    {
        if(!this.connectionErrorPopup())
        {
            this.isLoading = false;
            this.setStatusCard();
            MonitoringPage.setPlots(this.selectedViewer.id);
            this.monitoringURLs = DataModel.getInstance().monitoringUrls;
            this.viewers.find(v => v.id === "overall_pathway").spsrc = this.monitoringURLs[0].urls[0].plot_overall_pathway;
        }
    }

    connectionErrorPopup()
    {
        let model:DataModel = DataModel.getInstance();
        if(!(model.summary == null || model.summary == undefined))
        {
            if(!(model.config == null || model.config == undefined))
            {
                if(!(model.config.status == null || model.config.status == undefined))
                {
                    if(!(model.monitoringUrls == null || model.monitoringUrls == undefined))
                    {
                        return false;
                    }
                }
            }
        }

        const alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + model.currentlyActive.host + '<br\>Port: ' + model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();

        return true;
    }

    setStatusCard()
    {
        this.statusText  = DataModel.getInstance().summary.text;
        this.statusLevel = DataModel.getInstance().summary.level;

        let model:DataModel = DataModel.getInstance();
        for (let i = 0; i < model.config.status.length; i++) {
            if (model.config.status[i].name === this.statusLevel) {
                this.statusImg = model.config.status[i].file;
            }
        }

        for (let i = 0; i < model.config.status.length; i++) {
            if (model.config.status[i].name === this.statusLevel) {
                this.statusColor = model.config.status[i].color;
            }
        }
    }

    viewerChanged(event:any)
    {
        console.log("VIEWER CHANGED TO: " + JSON.stringify(event));
        this.selectedViewer = event;
    }

    speakSummary()
    {
        this.setStatusCard();

        if (MobileConfig.get().enableTextSpeech) {
            let u = new SpeechSynthesisUtterance();
            u.text = DataModel.getInstance().summary.text;
            u.lang = 'en-GB';
            speechSynthesis.speak(u);
        }
    }

    openPage(url:any)
    {
        this.navControl.push(AnalyzerDetailPage, { 'url' : url });
    }
}
