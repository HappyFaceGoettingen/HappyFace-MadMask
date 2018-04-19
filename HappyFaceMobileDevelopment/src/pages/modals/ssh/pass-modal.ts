import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
    templateUrl: "pass-modal.html"
})

export class PassModal
{
    host:string = "";
    port:number = 22;

    user:string = "";
    pass:string = "";

    constructor(private viewCtrl:ViewController) {}

    closeModal()
    {
        this.viewCtrl.dismiss({enter: false, host: "", port: 0, user: "", pass: ""});
    }

    enter()
    {
        this.viewCtrl.dismiss({enter: true, host: this.host, port: this.port, user: this.user, pass: this.pass})
    }
}
