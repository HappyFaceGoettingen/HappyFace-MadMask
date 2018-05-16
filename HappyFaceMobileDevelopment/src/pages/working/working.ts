import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
//import {DataSearch} from "../../data/DataSearch";

@Component({
    selector: 'page-working',
    templateUrl: 'working.html'
})

export class WorkingPage
{
    //search:DataSearch = null;
    //data:any[] = [];
    //searchContent:string = "";

    //isLoading:boolean = true;
    isLoading:boolean = true;
    listIMG:Array<{src:string, title:string}> = [];

    constructor(private model:DataModel) {}

    ngOnInit()
    {
        //this.model.addLoadingFinishedCallback(this.loadingFinished.bind(this));
        //if(!this.model.isLoading()) this.loadingFinished();
    }

    loadingFinished()
    {
        //this.isLoading = false;
        //this.search = new DataSearch(this.model);
        //console.log("PROD: " + JSON.stringify(this.search.searchData));
        //this.data = this.search.searchData;
        //if(this.searchContent !== "") this.data = this.search.search(this.searchContent);
        if(this.model.monitoringUrls == undefined) return;
        this.isLoading = false;
        this.setLinks("latest");

        this.listIMG = [];
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[0].thumbnail, title: this.model.monitoringUrls[0].urls[0].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[1].thumbnail, title: this.model.monitoringUrls[0].urls[1].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[2].thumbnail, title: this.model.monitoringUrls[0].urls[2].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[3].thumbnail, title: this.model.monitoringUrls[0].urls[3].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });


        console.log("LIST: " + JSON.stringify(this.listIMG));
    }

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

                    //this.setPlots(this.plot_name);
                }
            }
        }
        //console.log(JSON.stringify(this.model.monitoringUrls));
        //this.monitoringURLs = this.model.monitoringUrls;
    }

    imgClicked(img:any)
    {
        //this.data = this.search.searchData;
        //let val:string = event.target.value;
        //if(val && val.trim() !== '')
        //{
        //    this.data = this.search.search(val);
        //}
        //this.searchContent = val;

    }

}
