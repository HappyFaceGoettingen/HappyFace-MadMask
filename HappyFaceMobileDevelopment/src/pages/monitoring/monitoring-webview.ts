import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
    templateUrl: 'monitoring-webview.html'
})

export class MonitoringWebviewPage {
    url:any;

    constructor(private navParams:NavParams)
    {
        this.url = this.navParams.get('url');
        if(this.url == null || this.url == undefined)
        {
            this.url = { "name" : "", "image" : "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg"};
        }
    }

    changeToMadVision()
    {


    }
}
