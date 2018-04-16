import {AlertController, NavController} from "ionic-angular";
import {DataModel} from "../../data/DataModel";
import {HFCategoriesPage} from "../hf-classical/hf-categories";
import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from "@angular/core";
import {AnalyzerDetailPage} from "./analyzer-detail";

@Component({
    selector: 'page-analyzer',
    templateUrl: 'analyzer2.html'
})

export class AnalyzerPage2
{
    // Default values
    statusLevel:string = "Normal";
    statusImg  :string = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
    statusColor:string = "item-calm";
    statusText :string = "World wide Atlas Distributed Computing System";

    isLoading:boolean = true;

    // Page plugin
    @ViewChild('parent', {read: ViewContainerRef}) parent: ViewContainerRef;
    pageHolder:ComponentRef<any> = null;

    viewers:any[] = [
        {"id": "analysis", "name": "Status Analysis", "type": "plots", "src": null},
        {"id": "pathway", "name": "Info Pathway", "type": "plots", "src": null},
        {"id": "overall_pathway", "name": "Overall Info Pathway", "type": "img", "src": "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg"},
        {"id": "happyface", "name": "HappyFace Classical Rating", "type": "page", "src": HFCategoriesPage},
        {"id": "forecast", "name": "Happy Forecast", "type": "img", "src": "assets/img/forecast.png"}
    ];
    selectedViewer:any = this.viewers.find( v => v.id === "overall_pathway");

    monitoringURLs:any[];

    constructor(private model: DataModel, private navControl: NavController, private alertCtrl: AlertController,
                private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit()
    {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if(!this.model.isLoading()) this.onReloadFinishedListener();
    }

    onReloadFinishedListener()
    {
        if(this.dataExists())
        {
            this.isLoading = false;
            this.setStatusCard();
            //this.setPlots(this.selectedViewer.id);
            this.setPlots2();
            //this.monitoringURLs = this.model.monitoringUrls;
            this.viewers.find(v => v.id === "overall_pathway").src = this.model.monitoringUrls[0].urls[0].plot_overall_pathway;
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
                    if(!(this.model.monitoringUrls == null || this.model.monitoringUrls == undefined))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    setStatusCard()
    {
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;

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
        this.model.reload();
    }

    viewerChanged(event:any)
    {
        if(this.selectedViewer.type === 'page' && !this.pageHolder == undefined)
        {
            this.pageHolder.destroy();
        }

        console.log("VIEWER CHANGED TO: " + JSON.stringify(event));
        this.selectedViewer = event;
        if(this.selectedViewer.type === 'page')
        {
            if(this.parent == undefined) console.error("PARENT UNDEFINED");
            else this.pageHolder = this.parent.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.selectedViewer.src))
        }
    }

    speakSummary()
    {
        this.setStatusCard();
        this.model.speakSummary();
    }

    openPage(url:any)
    {
        this.navControl.push(AnalyzerDetailPage, { 'url' : url });
    }

    setPlots(plot_name:string){
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

    setPlots2()
    {
        // Generate array
        this.viewers[0].src = {"monitoringURLs": []};
        this.viewers[1].src = {"monitoringURLs": []};
        this.viewers[0].src.monitoringURLs = [];
        this.viewers[1].src.monitoringURLs = [];
        for(let i:number = 0; i < this.model.monitoringUrls.length; i++)
        {
            this.viewers[0].src.monitoringURLs.push({"urls": [], "name": ""});
            this.viewers[1].src.monitoringURLs.push({"urls": [], "name": ""});
            for(let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++)
            {
                this.viewers[0].src.monitoringURLs[i].urls.push({"plot": "", "name" : "", "link" : ""});
                this.viewers[1].src.monitoringURLs[i].urls.push({"plot": "", "name" : "", "link" : ""});
            }
        }

        for(let i:number = 0; i < this.model.monitoringUrls.length; i++)
        {
            this.viewers[0].src.monitoringURLs[i].name = this.model.monitoringUrls[i].name;
            this.viewers[1].src.monitoringURLs[i].name = this.model.monitoringUrls[i].name;
            for(let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++)
            {
                if((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (! this.model.monitoringUrls[i].urls[j].capture)) console.log("DEBUG: 1nop");
                else {
                    this.viewers[0].src.monitoringURLs[i].urls[j].plot = this.model.monitoringUrls[i].urls[j].plot_analysis;
                    this.viewers[0].src.monitoringURLs[i].urls[j].name = this.model.monitoringUrls[i].urls[j].name;
                    this.viewers[0].src.monitoringURLs[i].urls[j].link = this.model.monitoringUrls[i].urls[j].link;
                    this.viewers[1].src.monitoringURLs[i].urls[j].plot = this.model.monitoringUrls[i].urls[j].plot_pathway;
                    this.viewers[1].src.monitoringURLs[i].urls[j].name = this.model.monitoringUrls[i].urls[j].name;
                    this.viewers[1].src.monitoringURLs[i].urls[j].link = this.model.monitoringUrls[i].urls[j].link;
                }
            }
        }
    }
}