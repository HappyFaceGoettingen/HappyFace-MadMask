import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {MobileConfig} from "../../data/MobileConfig";
import {AlertController, NavController} from "ionic-angular";
import {MonitoringWebviewPage} from "./monitoring-webview";


@Component({
    selector: 'page-monitoring',
    templateUrl: 'monitoring.html'
})

export class MonitoringPage {

    isLoading:boolean = true;

    statusLevel:string = "Warning";
    statusImg  :string = "https://i.ytimg.com/vi/RqRNd4UyA4c/maxresdefault.jpg";
    statusColor:string = "item-calm";
    statusText :string = "World wide Atlas Distributed Computing System";

    history:any[];
    latest:string;

    monitoringURLs:any[];

    // Helper
    private plot_name:string = "analysis";


    constructor(private navControl : NavController, private alertCtrl : AlertController) {}

    ngOnInit()
    {
        DataModel.getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if(!DataModel.getInstance().isLoading()) this.onReloadFinishedListener();
    }

    onReloadFinishedListener()
    {
        if(!this.connectionErrorPopup()) {
            this.isLoading = false;
            this.setHistory();
            this.setStatusCard();
            this.setLinks("latest");
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
                    return false;
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

    openModalConfig()
    {

    }

    historyChanged(event:any)
    {
        this.setLinks(event);
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

    setHistory()
    {
        let str:string     = DataModel.getInstance().summary.history;
        let array:string[] = str.split(" ");
        this.history       = [];
        for(let i:number = 0; i < array.length; i++) this.history.push({"name" : array[i], "datetime" : array[i]});
        if(this.history.length != 0) this.latest = this.history[0].datetime;
        else this.latest = "";
    }

    openPage(url:any)
    {
        this.navControl.push(MonitoringWebviewPage, { 'url' : url });
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

    // Helper functions
    setLinks(datetime_dir) {
        let model:DataModel = DataModel.getInstance();
        let remote_url:string = model.getRemoteURL();
        let config:any = model.config;

        let capture_dir:string = config.data_dir + "/capture";
        let thumbnail_dir:string = config.data_dir + "/thumbnail";
        let analysis_dir:string = config.data_dir + "/analysis";
        if (MobileConfig.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        let plot_analysis_dir:string = analysis_dir + "/plot_analysis/latest";
        let plot_pathway_dir:string = analysis_dir + "/plot_pathway/latest";

        for (let i: number = 0; i < model.monitoringUrls.length; i++) {
            for (let j: number = 0; j < model.monitoringUrls[i].urls.length; j++) {
                if ((model.monitoringUrls[i].urls[j].file_prefix == null) || (!model.monitoringUrls[i].urls[j].capture)) {
                    model.monitoringUrls[i].urls[j].thumbnail = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].image = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].analysis_plot = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].plot_pathway = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "img/not_captured.png";
                } else {
                    model.monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    model.monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    model.monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    model.monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";

                    MonitoringPage.setPlots(this.plot_name);
                }
            }
        }
        console.log(JSON.stringify(model.monitoringUrls));
        this.monitoringURLs = model.monitoringUrls;
    }

    static setPlots(plot_name:string){
        let model:DataModel = DataModel.getInstance();
        for (let i:number = 0; i < model.monitoringUrls.length; i++) {
            for (let j:number = 0; j < model.monitoringUrls[i].urls.length; j++){
                if ((model.monitoringUrls[i].urls[j].file_prefix == null) || (! model.monitoringUrls[i].urls[j].capture)){
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                } else {
                    if (plot_name == "analysis" ) model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway" ) model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway" ) model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    }
}
