import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {IonicPage, ModalController, NavController} from "ionic-angular";
import {MonitoringWebviewPage} from "./monitoring-webview";
import {ModalPage} from "../modals/config/modal";
import {TourPage} from "../tour/tour";

@IonicPage({
    name: 'monitoring'
})

@Component({
    selector: 'page-monitoring',
    templateUrl: 'monitoring.html'
})

export class MonitoringPage {

    isLoading:boolean = true;
    loadingFailed:boolean = false;

    statusLevel:string = "Warning";
    statusImg  :string = "https://i.ytimg.com/vi/RqRNd4UyA4c/maxresdefault.jpg";
    statusColor:string = "item-calm";
    statusText :string = "World wide Atlas Distributed Computing System";

    history:any[];
    latest:string;

    monitoringURLs:any[];

    constructor(private model: DataModel, private navControl : NavController, private modalCtrl : ModalController) {}

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
        this.isLoading = false;
        if(this.dataExists()) {
            this.loadingFailed = false;
            this.setHistory();
            this.setStatusCard();
            this.model.setLinks("latest").then( _ => {
                this.monitoringURLs = this.model.monitoringUrls;
            });
        }
        else
            this.loadingFailed = true;
    }

    onLoadingStartedListener()
    {
        this.isLoading = true;
    }

    dataExists()
    {
        //console.log("[MonitoringPage] summary:", this.model.summary);
        //console.log("[MonitoringPage] config: ", this.model.config);

        if(!(this.model.summary == null || this.model.summary == undefined))
        {
            if(!(this.model.config == null || this.model.config == undefined))
            {
                return true;
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
        this.model.reload();
    }

    historyChanged(event:any)
    {
        this.model.setLinks(event);
        this.monitoringURLs = this.model.monitoringUrls;
    }

    setStatusCard()
    {
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;

        this.statusImg   = this.model.summary.img;
        this.statusColor = this.model.summary.color;
    }

    openHappyFaceCore()
    {
        window.open("http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port, "_blank");
    }

    setHistory()
    {
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

    openGuide()
    {
        this.navControl.push(TourPage, {});
    }
}
