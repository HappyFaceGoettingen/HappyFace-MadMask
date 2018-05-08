import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {AlertController, ModalController, NavController} from "ionic-angular";
import {MonitoringWebviewPage} from "./monitoring-webview";
import {ModalPage} from "../modals/config/modal";
import {SSHTerminalPage} from "../modals/ssh/ssh-terminal";


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


    constructor(private model: DataModel, private navControl : NavController, private modalCtrl : ModalController, private alertCtrl: AlertController) {}

    ngOnInit()
    {
        //DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        //DataModel.getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.onReloadFinishedListener();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if(!this.model.isLoading()) this.onReloadFinishedListener();
    }

    onReloadFinishedListener()
    {
        if(this.dataExists()) {
            this.isLoading = false;
            this.setHistory();
            this.setStatusCard();
            this.setLinks("latest");
        }
    }

    onLoadingStartedListener()
    {
        this.isLoading = true;
    }

    dataExists()
    {
       if(!(this.model.summary == null || this.model.summary == undefined))
        {
            if(!(this.model.config == null || this.model.config == undefined))
            {
                if(!(this.model.config.status == null || this.model.config.status == undefined))
                {
                    return true;
                }
            }
        }
        return false;
    }

    openModalConfig()
    {
        const modal = this.modalCtrl.create(ModalPage);
        modal.present();
    }

    reload()
    {
        console.log("ISLOADING: " + this.isLoading);
        if(this.isLoading) return;
        this.isLoading = true;
        // DataModel.getInstance().reload();
        this.model.reload();
    }

    historyChanged(event:any)
    {
        this.setLinks(event);
    }

    setStatusCard()
    {
        //this.statusText  = DataModel.getInstance().summary.text;
        //this.statusLevel = DataModel.getInstance().summary.level;
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;

        //let model:DataModel = DataModel.getInstance();
        for (let i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusImg = this.model.config.status[i].file;
            }
        }

        for (let i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusColor = this.model.config.status[i].color;
            }
        }
    }

    openHappyFaceCore()
    {
        window.open("http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port, "_blank");
    }

    setHistory()
    {
        //let str:string     = DataModel.getInstance().summary.history;
        let str:string     = this.model.summary.history;
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

        //DataModel.getInstance().speakSummary();
        this.model.speakSummary();
    }

    // Helper functions
    setLinks(datetime_dir) {
        //let model:DataModel = DataModel.getInstance();
        let remote_url:string = this.model.getRemoteURL();
        let config:any = this.model.config;

        let capture_dir:string = config.data_dir + "/capture";
        let thumbnail_dir:string = config.data_dir + "/thumbnail";
        let analysis_dir:string = config.data_dir + "/analysis";
        if (this.model.configuration.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        let plot_analysis_dir:string = analysis_dir + "/plot_analysis/latest";
        let plot_pathway_dir:string = analysis_dir + "/plot_pathway/latest";

        for (let i: number = 0; i < this.model.monitoringUrls.length; i++) {
            for (let j: number = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (!this.model.monitoringUrls[i].urls[j].capture)) {
                    this.model.monitoringUrls[i].urls[j].thumbnail = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].image = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].analysis_plot = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].plot_pathway = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "img/not_captured.png";
                } else {
                    this.model.monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.model.monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.model.monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.model.monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";

                    this.setPlots(this.plot_name);
                }
            }
        }
        //console.log(JSON.stringify(this.model.monitoringUrls));
        this.monitoringURLs = this.model.monitoringUrls;
    }

    /*static setPlots(plot_name:string){
        let model:DataModel = DataModel.getInstance();
        for (let i:number = 0; i < this.model.monitoringUrls.length; i++) {
            for (let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++){
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
    }*/

    setPlots(plot_name:string){
        //let model:DataModel = DataModel.getInstance();
        for (let i:number = 0; i < this.model.monitoringUrls.length; i++) {
            for (let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++){
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (! this.model.monitoringUrls[i].urls[j].capture)){
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                } else {
                    if (plot_name == "analysis" ) this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway" ) this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway" ) this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    }
}
