import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {AlertController, ModalController, NavController} from "ionic-angular";
import {MonitoringWebviewPage} from "./monitoring-webview";
import {ModalPage} from "../modals/config/modal";


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
            this.model.setLinks("latest");
            this.monitoringURLs = this.model.monitoringUrls;
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
        this.model.setLinks(event);
        this.monitoringURLs = this.model.monitoringUrls;
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
}
