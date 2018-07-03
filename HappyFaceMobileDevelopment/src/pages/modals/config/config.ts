import {Component} from "@angular/core";
import {DataModel} from "../../../data/DataModel";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {InstancesComponent} from "./instances.component";
import {AboutPage} from "../about/about";
import {TourPage} from "../../tour/tour";

@Component({
    selector: 'page-config',
    templateUrl: 'config.html'
})

export class ConfigPage
{
    isHost:boolean = false;

    automaticFetch:boolean = true;
    interval:number = 1;
    automaticRotation:boolean = false;
    detectOnlyChange:boolean = true;
    enableMadVision:boolean = true;
    enableTextSpeech:boolean = true;
    enableAutoReadout:boolean = false;
    speakInterval:number = 1;
    happyFaceCompatible:boolean = false;

    constructor(private model: DataModel, private navCtrl:NavController, private navParams: NavParams)
    {
        this.isHost = this.model.isHost();

        this.automaticFetch = this.model.configuration.get().automaticFetch;
        this.interval = this.model.configuration.get().reloadInterval;
        this.automaticRotation = this.model.configuration.get().automaticRotation;
        this.detectOnlyChange = this.model.configuration.get().detectOnlyChange;
        this.enableTextSpeech = this.model.configuration.get().enableTextSpeech;
        this.enableAutoReadout = this.model.configuration.get().enableAutoReadout;
        this.speakInterval = this.model.configuration.get().speakInterval;
        this.happyFaceCompatible = this.model.configuration.get().happyFaceCompatible;
    }

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
        this.navCtrl.push(InstancesComponent, {"viewCtrl": this.navParams.get('viewCtrl')});
    }

    tour()
    {
        setTimeout(() => {
            this.navCtrl.push(TourPage, {});
            console.log("Starting tour");
        }, 500);
    }

    about()
    {
        this.navCtrl.push(AboutPage, {"viewCtrl" : this.navParams.get('viewCtrl')});
    }

    contact()
    {
        window.open("mailto:happyface-dev@lists.kit.edu", "_blank");
    }

    closeModal()
    {
        let viewCtrl:ViewController = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
}
