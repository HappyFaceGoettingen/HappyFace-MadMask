import {Component} from "@angular/core";
import {AlertController} from "ionic-angular";
import {DataModel} from "../../data/DataModel";

@Component({
    selector: 'page-logs',
    templateUrl: 'logs.html'
})

export class LogsPage
{
    logs:any[] = [];
    selectedLog:any = null;
    logText:string = "";

    isLoading:boolean = false;

    constructor(private model: DataModel, private alertCtrl: AlertController) {}

    ngOnInit()
    {
        //DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.reloadingFinishedListener();
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if(!this.model.isLoading()) this.reloadingFinishedListener();
    }

    reloadingFinishedListener()
    {
        //let model:DataModel = DataModel.getInstance();
        if(this.model.logs == null || this.model.logs == undefined || this.model.config == null || this.model.config == undefined)
        {
            const alert = this.alertCtrl.create({
                title: '<b>Connection error</b>',
                subTitle: 'Unable to  connect to given instance<br\>Host: ' + this.model.currentlyActive.host + '<br\>Port: ' + this.model.currentlyActive.mobile_port,
                buttons: ['OK']
            });
            alert.present();
        }
        else {
            this.modifyURLs();
            this.logs = this.model.logs;
            this.selectedLog = this.logs[0];
            this.loadSelectedLog();
        }
    }

    reload()
    {
        if(this.isLoading) return;
        this.loadSelectedLog();
    }

    logSelected($event)
    {
        this.selectedLog = $event;
        this.loadSelectedLog();
    }

    loadSelectedLog()
    {
        this.isLoading = true;
        //DataModel.getInstance().asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this))
        this.model.asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this));
    }

    modifyURLs()
    {
        // let model:DataModel = DataModel.getInstance();
        let log_dir = this.model.config.data_dir + "/log";
        let remote_url = this.model.getRemoteURL();
        for (let i = 0; i < this.model.logs.length; i++) {
            // If it does not begin with 'http', then basename of log name is set
            // For example, /tmp/cron.log --> cron.log --> remote_url + data_dir + '/log/' + cron.log

            if (!this.model.isHttpURL(this.model.logs[i].file)){
                let logname = this.model.logs[i].file;
                let base_logfile = logname.split('/').reverse()[0];
                this.model.logs[i].file = remote_url + "/" + log_dir + "/" + base_logfile;
            }
        }
    }

    logLoaded(log:string, statusCode:number)
    {
        if(statusCode == 200) this.logText = log;
        else this.logText = "ERROR: Log could not be loaded";
        this.isLoading = false;
    }
}
