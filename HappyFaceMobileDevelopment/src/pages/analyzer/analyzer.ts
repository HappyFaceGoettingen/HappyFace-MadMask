import {IonicPage, NavController} from "ionic-angular";
import 'hammerjs';
import {DataSet, Network} from "vis";
import {DataModel} from "../../data/DataModel";
import {HFCategoriesPage} from "./hf-classical/hf-categories";
import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from "@angular/core";
import {AnalyzerDetailPage} from "./analyzer-detail";

/*@IonicPage({
    name: 'analyzer'
})*/

@Component({
    selector: 'page-analyzer',
    templateUrl: 'analyzer.html'
})

export class AnalyzerPage
{
    // Default values
    statusLevel:string = "Normal";
    statusImg  :string = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
    statusColor:string = "item-calm";
    statusText :string = "World wide Atlas Distributed Computing System";

    isLoading:boolean = true;
    loadingFailed:boolean = false;
    visAble:boolean = false;

    visNetwork = null;

    // Page plugin
    @ViewChild('parent', {read: ViewContainerRef}) parent: ViewContainerRef;
    pageHolder:ComponentRef<any> = null;

    viewers:any[] = [
        {"id": "analysis", "name": "Status Analysis", "type": "plots", "src": null},
        {"id": "pathway", "name": "Info Pathway", "type": "plots", "src": null},
        {"id": "overall_pathway", "name": "Overall Info Pathway", "type": "img", "src": "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg"},
        //{"id": "vis-network", "name": "Overall Info Pathway", "type": "vis-network", "src": null},
        {"id": "happyface", "name": "HappyFace Classical Rating", "type": "page", "src": HFCategoriesPage},
        {"id": "forecast", "name": "Happy Forecast", "type": "imgs", "src": Array<string>(0)}
    ];
    selectedViewer:any = this.viewers.find( v => v.id === "overall_pathway");

    monitoringURLs:any[];

    constructor(private model: DataModel, private navControl: NavController,
                private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit()
    {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if(!this.model.isLoading()) this.onReloadFinishedListener();
    }

    onReloadFinishedListener()
    {
        this.isLoading = false;
        if(this.dataExists())
        {
            this.loadingFailed = false;
            this.setStatusCard();
            this.setPlots2();
            this.viewers.find(v => v.id === "overall_pathway").src = this.model.monitoringUrls[0].urls[0].plot_overall_pathway;
            this.setForecast();
            //this.model.asyncLoadFile(this.model.getPathwayPath() + "overall_pathway.json" /*"http://localhost:8100/assets/structure.json"*/, this.network.bind(this));
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
        //console.log("[AnalyzerPage] summary:", this.model.summary);
        //console.log("[AnalyzerPage] config: ", this.model.config);
        //console.log("[AnalyzerPage] monitoringURLs: ", this.model.monitoringUrls);

        if(!(this.model.summary == null || this.model.summary == undefined))
        {
            if(!(this.model.config == null || this.model.config == undefined))
            {
                if(!(this.model.monitoringUrls == null || this.model.monitoringUrls == undefined))
                {
                    return true;
                }
            }
        }
        return false;
    }

    setStatusCard()
    {
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;

        this.statusImg   = this.model.summary.img;
        this.statusColor = this.model.summary.color;
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
        else if(this.selectedViewer.type === 'vis-network')
        {

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

    async network(content:any, statusCode:number)
    {
        if(statusCode !== 200) { this.visAble = false; return; }

        const d = JSON.parse(content);
        const nData = d.nodes.map(m => { return {id: m.id, label: m.caption}; });
        const eData = d.edges.map(m => { return {from: m.source, to: m.target}; });

        const nodes = new DataSet(nData);
        const edges = new DataSet(eData);
        const container = document.getElementById('vis-network');

        const data = {
            nodes: nodes,
            edges: edges
        };
        const options = {
            width: "100%",
            height: (window.innerHeight - 400) + "px",
            layout: {
                improvedLayout: false
            },
            nodes: {
                shapeProperties: {
                    interpolation: false
                }
            }
        };

        console.log("Prior");
        this.visNetwork = new Network(container, data, options);
        console.log("After");

        //this.visNetwork.fit();

        this.visAble = true;
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
                if((this.model.monitoringUrls[i].urls[j].file_prefix == null)) console.log("DEBUG: 1nop");
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

    setForecast()
    {
        let tmp:string[] = this.model.analysis[0].forecast;
        for(let i:number = 0; i < tmp.length; i++) tmp[i] = this.model.getRemoteURL() + this.model.analysis[0].forecast[i].substring(1);

        this.viewers.find(v => v.id === "forecast").src = this.model.analysis[0].forecast;
    }
}
