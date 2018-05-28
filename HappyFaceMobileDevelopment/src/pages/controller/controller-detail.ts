import {Component} from "@angular/core";
import {AlertController, ModalController, NavParams} from "ionic-angular";
import {SSH2Wrapper} from "../modals/ssh/SSH2-Wrapper";
import {PassModal} from "../modals/ssh/pass-modal";
import {DataModel} from "../../data/DataModel";
import {SSH3Wrapper} from "../modals/ssh/SSH3-Wrapper";

@Component({
    selector: 'page-controller-detail',
    templateUrl: 'controller-detail.html'
})

export class ControllerDetailPage {
    system: any = null;
    sshWrapper: SSH2Wrapper = null;
    ssh: SSH3Wrapper = null;
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
        else if(!this.system.services && this.system.actions)
            this.system.services = this.system.actions;
        else if(!this.system.services) this.system.services = [];
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
                    this.openSSH(service);
                    break;
            }
        }
    }

    private activeService:any = null;

    openSSH(service:any)
    {
        this.activeService = service;
        this.askForCredentials();
    }

    askForCredentials()
    {
        let modal = this.modalCtrl.create(PassModal);
        modal.onDidDismiss(this.gotCredentials.bind(this));
        modal.present();
    }

    gotCredentials(data:any)
    {
        if(data == null || data.enter == undefined || !data.enter)
        {
            return;
        }

        this.ssh = new SSH3Wrapper(this, null, this.connReady.bind(this), {
            host: data.host,
            port: data.port,
            username: data.user,
            password: data.pass
        });
    }

    connReady()
    {
        if(this.activeService)
            this.ssh.sendRaw(this.activeService.command + "\n").then(() => { this.ssh.close(); });
        else this.ssh.close();

        this.activeService = null;
    }

    write(data:string)
    {
        console.log(data);
    }

    writeln(data:string)
    {
        this.write(data + "\n");
    }
}
