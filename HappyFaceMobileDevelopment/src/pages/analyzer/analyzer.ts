import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {DataModel} from "../../data/DataModel";
import {AnalyzerDetailPage} from "./analyzer-detail";
import {HFCategoriesPage} from "./hf-classical/hf-categories";

@Component({
    selector: 'page-analyzer',
    templateUrl: 'analyzer.html'
})

export class AnalyzerPage
{
    isLoading:boolean = true;

    statusLevel:string = "Normal";
    statusImg  :string = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
    statusColor:string = "item-calm";
    statusText :string = "World wide Atlas Distributed Computing System";

    HFClassical:any = HFCategoriesPage;

    viewers:any[] = [
        {"id": "analysis", "name": "Status Analysis", "multiplots": true, "spsrc": ""},
        {"id": "pathway", "name": "Info Pathway", "multiplots": true, "spsrc": ""},
        {"id": "overall_pathway", "name": "Overall Info Pathway", "multiplots": false, "spsrc": ""},
        {"id": "happyface", "name": "HappyFace Classical Rating", "multiplots": false, "spsrc": ""},
        {"id": "forecast", "name": "Happy Forecast", "multiplots": false, "spsrc": "assets/img/forecast.png"}
    ];
    selectedViewer:any = this.viewers.find( v => v.id === "overall_pathway");

    monitoringURLs:any[];


    constructor(private model: DataModel, private navControl: NavController, private alertCtrl: AlertController) {}

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
        if(!this.connectionErrorPopup())
        {
            this.isLoading = false;
            this.setStatusCard();
            this.setPlots(this.selectedViewer.id);
            //this.monitoringURLs = DataModel.getInstance().monitoringUrls;
            this.monitoringURLs = this.model.monitoringUrls;
            this.viewers.find(v => v.id === "overall_pathway").spsrc = this.monitoringURLs[0].urls[0].plot_overall_pathway;
        }
    }

    onLoadingStartedListener()
    {
        this.isLoading = true;
    }

    connectionErrorPopup()
    {
        //let model:DataModel = DataModel.getInstance();
        if(!(this.model.summary == null || this.model.summary == undefined))
        {
            if(!(this.model.config == null || this.model.config == undefined))
            {
                if(!(this.model.config.status == null || this.model.config.status == undefined))
                {
                    if(!(this.model.monitoringUrls == null || this.model.monitoringUrls == undefined))
                    {
                        return false;
                    }
                }
            }
        }

        const alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + this.model.currentlyActive.host + '<br\>Port: ' + this.model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();

        return true;
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

    reload()
    {
        if(this.isLoading) return;
        this.isLoading = true;
        //DataModel.getInstance().reload();
        this.model.reload();
    }

    viewerChanged(event:any)
    {
        console.log("VIEWER CHANGED TO: " + JSON.stringify(event));
        this.selectedViewer = event;
        if(this.selectedViewer.multiplots) {
            this.setPlots(this.selectedViewer.id);
            this.monitoringURLs = this.model.monitoringUrls;
        }
    }

    speakSummary()
    {
        this.setStatusCard();

        //DataModel.getInstance().speakSummary();
        this.model.speakSummary();
    }

    openPage(url:any)
    {
        this.navControl.push(AnalyzerDetailPage, { 'url' : url });
    }

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
