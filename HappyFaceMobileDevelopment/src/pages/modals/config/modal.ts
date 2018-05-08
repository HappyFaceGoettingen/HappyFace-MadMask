import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {InstancesBrowserComponent} from "./instances.browser.component";
import {DataModel} from "../../../data/DataModel";
import {ConfigPage} from "./config";

@Component({
    templateUrl: 'modal.html'
})

export class ModalPage
{
    rootPage:any = null; // ConfigPage;
    rootParams:any = null;

    constructor(model:DataModel, navParams: NavParams, viewCtrl: ViewController) {
        this.rootPage = model.isHost() ? InstancesBrowserComponent : ConfigPage;
        this.rootParams = Object.assign({}, navParams.data, {viewCtrl: viewCtrl});
    }
}
