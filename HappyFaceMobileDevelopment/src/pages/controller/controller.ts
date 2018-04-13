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

    constructor(private model: DataModel, private navCtrl : NavController) {}

    ngOnInit()
    {
        // DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        // DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        // if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if(!this.model.isLoading()) this.reloadingFinishedCallback();
    }

    onLoadingStartedListener()
    {
        this.isLoading = true;
    }

    reloadingFinishedCallback()
    {
        //this.systems = DataModel.getInstance().systems;
        this.systems = this.model.systems;
        this.isLoading = false;
    }

    reload()
    {
        if(this.isLoading) return;
        this.isLoading = true;
        //DataModel.getInstance().reload();
        this.model.reload();
    }

    openPage(system:any)
    {
        this.navCtrl.push(ControllerDetailPage, { "system": system});
    }
}
