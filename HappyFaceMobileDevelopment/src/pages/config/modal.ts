import {Component} from "@angular/core";
import {ConfigPage} from "./config";
import {NavParams, ViewController} from "ionic-angular";

@Component({
    templateUrl: 'modal.html'
})

export class ModalPage
{
    rootPage:any = ConfigPage;
    rootParams:any = null;

    constructor(navParams: NavParams, private viewCtrl: ViewController) {
        this.rootParams = Object.assign({}, navParams.data, {viewCtrl: viewCtrl});
    }
}
