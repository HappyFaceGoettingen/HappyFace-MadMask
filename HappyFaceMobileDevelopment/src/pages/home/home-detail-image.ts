import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
    selector: "home-detail-image",
    templateUrl: "home-detail-image.html"
})

export class HomeDetailImagePage
{
    data:any;

    constructor(private navParams:NavParams)
    {
        this.data = this.navParams.get("data");
        if(this.data == null || this.data == undefined) this.data = null;
    }
}
