import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

@Component({
    selector: "about-page",
    templateUrl: "about.html"
})

export class AboutPage
{
    versionCode:string = "2.0.1";
    constructor(private navParams:NavParams) {}

    close()
    {
        let viewCtrl:ViewController = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
}
