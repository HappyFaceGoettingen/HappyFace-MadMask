import {Component} from "@angular/core";
import {AlertController, ModalController, ViewController} from "ionic-angular";
import {Terminal2} from "./Terminal2";
import {DataModel} from "../../../data/DataModel";
//import {SSH2Wrapper} from "./SSH2-Wrapper";

@Component({
    selector: "page-ssh",
    templateUrl: "ssh-terminal.html"
})

export class SSHTerminalPage
{
    term:Terminal2 = null;
    promt:string = "[usr@html5] #";

    constructor(private viewCtrl:ViewController, private alertCtrl: AlertController, private model:DataModel,
                private modalCtrl: ModalController) { }

    ngOnInit()
    {
        // #input-line cmdline
        console.log("cmdLine: " + JSON.stringify(document.querySelector(".cmdline")));
        this.term = new Terminal2('.cmdline', '#container output',
            this.alertCtrl, this.model, this.modalCtrl, this.viewCtrl);
        this.term.setPromtChange(this.promtChange.bind(this));
    };

    promtChange(p:string)
    {
        this.promt = p;
    }

    closeModal()
    {
        this.viewCtrl.dismiss();
    }
}
