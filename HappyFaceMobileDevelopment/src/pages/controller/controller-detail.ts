import {Component} from "@angular/core";
import {AlertController, ModalController, NavParams} from "ionic-angular";
import {SSH2Wrapper} from "../modals/ssh/SSH2-Wrapper";
import {PassModal} from "../modals/ssh/pass-modal";
import {DataModel} from "../../data/DataModel";

@Component({
    selector: 'page-controller-detail',
    templateUrl: 'controller-detail.html'
})

export class ControllerDetailPage {
    system: any = null;
    sshWrapper: SSH2Wrapper = null;
    serviceTMP:any = null;

    constructor(navParams: NavParams, private alertCtrl: AlertController, private modalCtrl: ModalController, private model: DataModel) {
        this.system = navParams.get('system');
        if (this.system == null || this.system == undefined) {
            this.system = {
                'name': "Galaxy Controller", "text": "Restart Galaxy: Milky Way?",
                "img": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg",
                "services": [{"name": "Restart Mass Portals"}, {"name": "Stop Reapers"}]
            };
        }
    }

    serviceStart(service: any) {
        if (service.type != null && service.type != undefined) {
            switch (service.type) {
                case "email":
                    window.location.href = service.command.replace("mail:", "mailto:");
                    break;
                case "ticket":
                    window.open(service.command.replace("url:", ""), "_blank");
                    break;
                case "ssh":
                    this.openSSHCommand(service);
                    break;
            }
        }
    }

    openSSHCommand(service: any) {
        try {
            this.sshWrapper = new SSH2Wrapper();
        }
        catch (error) {
            if (this.alertCtrl != null) {
                if (this.model.isAndroid()) {
                    let alert = this.alertCtrl.create({
                        title: "SSH not available",
                        subTitle: "An unknown error makes SSH Cordova plugin unavailable.\nPlease use external " +
                        "clients like JuiceSSH, ConnectBot or Terminus.",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    });
                    alert.present();
                }
                else if (this.model.isiOS()) {
                    let alert = this.alertCtrl.create({
                        title: "SSH not available (yet)",
                        subTitle: "The SSH plugin is not available in iOS for now. Our intelligent (and extraordinary good looking) " +
                        "team is already working on it, but for now please use external ssh clients like Terminus or iTerminal",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    });
                    alert.present();
                }
                else {
                    let alert = this.alertCtrl.create({
                        title: "SSH not available (yet)",
                        subTitle: "The SSH client is in this version of HappyFaceMobile (probably the browser version) not available. " +
                        "Due to the limitations of portable web apps (pwa), this feature might not be included at all. Please use your " +
                        "linux terminal to connect.",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    });
                    alert.present();
                }
            }
            else {
                console.log("ERROR: SSH plugin is missing.");
            }
            this.sshWrapper = null;
            return;
        }

        this.serviceTMP = service;

        let modal = this.modalCtrl.create(PassModal);
        modal.onDidDismiss(this.gotSSHPass.bind(this));
        modal.present();
    }

    gotSSHPass(data:any)
    {
        if(data == null || data.enter == undefined || !data.enter)
            return;

        this.sshWrapper.host = data.host;
        this.sshWrapper.port = data.port;
        this.sshWrapper.username = data.user;
        this.sshWrapper.password = data.pass;
        this.sshWrapper.connect(false);
        this.sshWrapper.write(this.serviceTMP.command + "\n");
        this.sshWrapper.close();

        this.serviceTMP = null;
    }
}
