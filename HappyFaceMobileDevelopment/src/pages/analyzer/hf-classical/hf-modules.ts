import {Component} from "@angular/core";
import {ClassicalDataModel} from "./ClassicalDataModel";
import {NavParams, Platform} from "ionic-angular";
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@Component({
    selector: "page-hf-modules",
    templateUrl: "hf-modules.html"
})

export class HFModulesPage
{
    IMG_HAPPY:string = "assets/arrows/arrow-up.svg";
    IMG_WARNING:string = "assets/arrows/arrow-right.svg";
    IMG_CRITICAL:string = "assets/arrows/arrow-down.svg";
    IMG_ERROR:string = "assets/arrows/cross.svg";

    category:any = null;
    isLoading:boolean = false;
    modulesExisting:boolean = true;

    outdated:boolean = false;
    outdateHandler:number = 0;

    constructor(private classicModel:ClassicalDataModel, private navParams:NavParams, private iab: InAppBrowser,
                private plt:Platform)
    {
        this.category = this.navParams.get('category');
        if(this.category == null || this.category == undefined)
        {
            this.modulesExisting = false;
        }
        if(!Array.isArray(this.category.module))
            this.category.module = [this.category.module];
    }

    ngOnInit()
    {
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if(!this.classicModel.isLoading()) this.loadingFinishedListener();
        this.outdateHandler = window.setInterval(() => { this.outdated = true; }, 1200000);
    }

    loadingFinishedListener()
    {
        this.isLoading = false;
    }

    reload()
    {
        clearInterval(this.outdateHandler);
        this.outdateHandler = window.setInterval(() => { this.outdated = true; }, 1200000);
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if(!this.classicModel.isLoading()) this.loadingFinishedListener();
        this.classicModel.reload();
    }

    imgForModule(mod:any)
    {
        return mod.status == 1.0 ? this.IMG_HAPPY : (mod.status == 0.5 ? this.IMG_WARNING : (mod.status == 0.0 ? this.IMG_CRITICAL : this.IMG_ERROR));
    }

    moduleSelected(mod:any)
    {
        //window.open(mod.link, "_blank");
        this.plt.ready().then(() => {
            let options: InAppBrowserOptions = {
                location: 'yes',//Or 'no'
                hidden: 'no', //Or  'yes'
                clearcache: 'yes',
                clearsessioncache: 'yes',
                zoom: 'yes',//Android only ,shows browser zoom controls
                hardwareback: 'yes',
                mediaPlaybackRequiresUserAction: 'no',
                shouldPauseOnSuspend: 'no', //Android only
                closebuttoncaption: 'Close', //iOS only
                disallowoverscroll: 'no', //iOS only
                toolbar: 'yes', //iOS only
                enableViewportScale: 'no', //iOS only
                allowInlineMediaPlayback: 'no',//iOS only
                presentationstyle: 'pagesheet',//iOS only
                fullscreen: 'yes',//Windows only
            };

            const browser = this.iab.create(mod.link, "_blank", options);
            //browser.on("loadstop").subscribe(()=> console.log("loadstop"));
        });
    }
}
