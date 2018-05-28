import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {ModalController, NavController} from "ionic-angular";
import {ControllerDetailPage} from "./controller-detail";
import {SSHTerminalPage} from "../modals/ssh/ssh-terminal";

@Component({
    selector: 'page-controller',
    templateUrl: 'controller.html'
})

export class ControllerPage
{
    isLoading:boolean = true;
    loadingFailed:boolean = false;
    systems:any[] = [];

    constructor(private model: DataModel, private navCtrl : NavController, private modalCtrl:ModalController) {}

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
        this.systems = [];
        this.isLoading = false;
        if(!(this.model.systems == null || this.model.systems == undefined))
        {
            this.systems = this.model.systems;
            this.loadingFailed = false;
        }
        else
            this.loadingFailed = true;
    }

    reload()
    {
        if(this.isLoading) return;
        this.isLoading = true;
        this.model.reload();
    }

    openPage(system:any)
    {
        this.navCtrl.push(ControllerDetailPage, { "system": system});
    }

    openSSH()
    {
        console.log("SSH");
        this.modalCtrl.create(SSHTerminalPage).present();
    }
}
