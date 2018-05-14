import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {DataModel} from "../../../data/DataModel";

@Component({
    selector: "about-page",
    templateUrl: "about.html"
})

export class AboutPage
{
    versionCode:string = "fetching version number ...";
    constructor(private navParams:NavParams, private model:DataModel)
    {
        this.model.addLoadingFinishedCallback(this.loadingFinished.bind(this));
        if(!this.model.isLoading()) this.loadingFinished();
    }

    loadingFinished()
    {
        this.versionCode = this.model.config.version;
    }

    close()
    {
        let viewCtrl:ViewController = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
}
