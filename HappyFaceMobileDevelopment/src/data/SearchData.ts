import {DataModel} from "./DataModel";

export class SearchData
{
    monitoring_urls:any[] = [];
    systems:any[] = [];
    history:string[]= [];

    constructor(private model:DataModel) {}


    async updateData():Promise<SearchData>
    {
        if(this.model.monitoringUrls && this.model.summary && this.model.summary)
        {
            this.history = this.model.summary.history.split(' ');
            for(let i:number = 0; i < this.model.monitoringUrls.length; i++)
            {
                for(let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++)
                {
                    let url = Object.assign({}, this.model.monitoringUrls[i].urls[j]);
                    url.level = i;
                    for(let time of this.history)
                        url = this.generateURLS(time, url);
                    this.monitoring_urls.push(url);
                }
            }
            this.systems = this.model.systems;
        }

        return this;
    }


    generateURLS(time:string, url:any):any
    {
        if(!this.model.config) return url;

        const remote_url:string = this.model.getRemoteURL();
        const config:any = this.model.config;

        let capture_dir:string = config.data_dir + "/capture";
        let thumbnail_dir:string = config.data_dir + "/thumbnail";
        const analysis_dir:string = config.data_dir + "/analysis";

        if (this.model.configuration.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        const plot_analysis_dir:string = analysis_dir + "/plot_analysis/latest";
        const plot_pathway_dir:string = analysis_dir + "/plot_pathway/latest";

        if(!url.thumbnail)                      url.thumbnail = [];
        else if(!Array.isArray(url.thumbnail))  url.thumbnail = [url.thumbnail];
        if(!url.image)                      url.image = [];
        else if(!Array.isArray(url.image))  url.image = [url.image];
        if(!url.analysis_plot)                      url.analysis_plot = [];
        else if(!Array.isArray(url.analysis_plot))  url.analysis_plot = [url.analysis_plot];
        if(!url.plot_analysis)                      url.plot_analysis = [];
        else if(!Array.isArray(url.plot_analysis))  url.plot_analysis = [url.plot_analysis];
        if(!url.plot_pathway)                       url.plot_pathway = [];
        else if(!Array.isArray(url.plot_pathway))   url.plot_pathway = [url.plot_pathway];
        if(!url.plot_overall_pathway)                     url.plot_overall_pathway = [];
        else if(!Array.isArray(url.plot_overall_pathway)) url.plot_overall_pathway = [url.plot_overall_pathway];

        if ((url.file_prefix == null))
        {
            url.thumbnail.push({ time: time, url: remote_url + "assets/img/img-missing.svg" });
            url.image.push({ time: time, url: remote_url + "assets/img/img-missing.svg"});
            url.analysis_plot.push({ time: time, url: remote_url + "assets/img/img-missing.svg"});
            url.plot_pathway.push({ time: time, url: remote_url + "assets/img/img-missing.svg"});
            url.plot_overall_pathway.push({ time: time, url: remote_url + "assets/img/img-missing.svg"});
        }
        else {
            url.thumbnail.push({ time: time, url: remote_url + thumbnail_dir + "/" + time + "/" + url.file_prefix + ".jpg"});
            url.image.push({ time: time, url: remote_url + capture_dir + "/" + time + "/" + url.file_prefix + ".jpg"});
            url.plot_analysis.push({ time: time, url: remote_url + plot_analysis_dir + "/" + url.file_prefix + ".png"});
            url.plot_pathway.push({ time: time, url: remote_url + plot_pathway_dir + "/" + url.file_prefix + ".png"});
            url.plot_overall_pathway.push({ time: time, url: remote_url + plot_pathway_dir + "/overall_pathway.png"});
        }

        return url;
    }
}
