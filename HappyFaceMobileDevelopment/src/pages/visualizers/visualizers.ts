import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";

@Component({
    selector: 'page-visualizers',
    templateUrl: 'visualizers.html'
})

export class VisualizersPage
{
    visualizers:any[] = [];
    selectedVisualizer:any = null;

    isLoading:boolean = true;
    loadingFailed:boolean = false;

    constructor(private model:DataModel) {}

    ngOnInit()
    {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if(!this.model.isLoading()) this.reloadingFinishedListener();
    }

    reloadingFinishedListener()
    {
        this.visualizers = [];
        this.isLoading = false;
        if(!(this.model.visualizers == null || this.model.visualizers == undefined))
        {
            this.loadingFailed = false;
            this.visualizers = this.model.visualizers;
            this.modifyLinks();
            this.selectedVisualizer = this.visualizers[0];
        }
        else
            this.loadingFailed = true;
    }

    onLoadingStartedListener()
    {
        this.isLoading = true;
    }

    /* Deprecated
    createErrorLoadingPopup()
    {
        //let model:DataModel = DataModel.getInstance();
        const alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + this.model.currentlyActive.host + '<br\>Port: ' + this.model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
    }*/

    reload()
    {
        if(this.isLoading) return;
        this.isLoading = true;
        //DataModel.getInstance().reload();
        this.model.reload();
    }

    modifyLinks(){
        //let model:DataModel = DataModel.getInstance();
        for (let i = 0; i < this.model.visualizers.length; i++) {
            let remote_url = this.model.getRemoteURL();
            if (this.model.isHttpURL(this.model.visualizers[i].file)) remote_url= "";
            this.model.visualizers[i].file = remote_url + this.model.visualizers[i].file;
        }
    }

    visualizerSelected($event:any)
    {
        this.selectedVisualizer = $event;
    }
}
