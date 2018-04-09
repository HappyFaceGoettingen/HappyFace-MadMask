import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
    selector: 'page-analyzer-detail',
    templateUrl: 'analyzer-detail.html'
})

export class AnalyzerDetailPage
{
    url:any;

    constructor(private navParams:NavParams)
    {
        this.url = this.navParams.get('url');
        if(this.url == null || this.url == undefined)
        {
            this.url = { "name": "", "analysis_plot": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg"};
        }
    }
}
