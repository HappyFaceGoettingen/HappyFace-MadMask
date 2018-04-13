import {Component} from "@angular/core";
import {ConfigurationObject, DataModel} from "../../data/DataModel";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {InstancesComponent} from "./instances.component";

@Component({
    selector: 'page-config',
    templateUrl: 'config.html'
})

export class ConfigPage
{
    constructor(private model: DataModel, private navCtrl:NavController, private navParams: NavParams) {}

    automaticFetch:boolean = true;
    interval:number = 1;
    automaticRotation:boolean = false;
    detectOnlyChange:boolean = true;
    enableMadVision:boolean = true;
    enableTextSpeech:boolean = true;
    enableAutoReadout:boolean = false;
    speakInterval:number = 1;
    happyFaceCompatible:boolean = false;

    notify()
    {
        //let model:DataModel = DataModel.getInstance();
        this.model.configuration.setAutomaticFetch(this.automaticFetch);
        this.model.configuration.setAutomaticRotation(this.automaticRotation);
        this.model.configuration.setDetectOnlyChange(this.detectOnlyChange);
        this.model.configuration.setEnableMadVision(this.enableMadVision);
        this.model.configuration.setEnableTextSpeech(this.enableTextSpeech);
        this.model.configuration.setHappyFaceCompatible(this.happyFaceCompatible);
        this.model.configuration.setEnableAutoReadout(this.enableAutoReadout);
        this.model.configuration.setReloadInterval(this.interval);
        this.model.configuration.setSpeakInterval(this.speakInterval);

        this.model.updateLoop();
    }

    chooseInstance()
    {
        this.navCtrl.push(InstancesComponent);
    }

    closeModal()
    {
        let viewCtrl:ViewController = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
}
