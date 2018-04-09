import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {NavController} from "ionic-angular";
import {ControllerDetailPage} from "./controller-detail";

@Component({
    selector: 'page-controller',
    templateUrl: 'controller.html'
})

export class ControllerPage
{
    isLoading:boolean = true;
    systems:any[] = [];

    constructor(private navCtrl : NavController) {}

    ngOnInit()
    {
        DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
    }

    reloadingFinishedCallback()
    {
        this.systems = DataModel.getInstance().systems;
        this.isLoading = false;
    }

    openPage(system:any)
    {
        this.navCtrl.push(ControllerDetailPage, { "system": system});
    }
}
