import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {AlertController} from "ionic-angular";

@Component({
    selector: 'page-visualizers',
    templateUrl: 'visualizers.html'
})

export class VisualizersPage
{
    visualizers:any[] = [];
    selectedVisualizer:any = null;

    constructor(private alertCtrl: AlertController) {}

    ngOnInit()
    {
        DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if(!DataModel.getInstance().isLoading()) this.reloadingFinishedListener();
    }

    reloadingFinishedListener()
    {
        this.visualizers = DataModel.getInstance().visualizers;
        if(this.visualizers == null || this.visualizers == undefined)
        {
            this.createErrorLoadingPopup();
        }
        else {
            // TODO modify visulizer urls
            this.selectedVisualizer = this.visualizers[0];
        }
    }

    createErrorLoadingPopup()
    {
        let model:DataModel = DataModel.getInstance();
        const alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + model.currentlyActive.host + '<br\>Port: ' + model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
    }

    visualizerSelected($event:any)
    {
        this.selectedVisualizer = $event;
    }
}
