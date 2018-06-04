import {
    Compiler,
    Component,
    ComponentFactoryResolver,
    Injector,
    NgModuleRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {WidgetLoader} from "./WidgetLoader";
import {Storage} from "@ionic/storage";
import {HomeDetailImagePage} from "./home-detail-image";
import {AlertController, IonicPage, LoadingController, NavController} from "ionic-angular";
import {DataModel} from "../../data/DataModel";

@IonicPage({
    name: 'home'
})

@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage
{
    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    loader:WidgetLoader = null;
    editMode:boolean = false;
    isSearch:boolean = false;

    constructor(private loadingCtrl:LoadingController, private model:DataModel, private navCtrl:NavController,
                private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>,
                private componentFactoryResolver: ComponentFactoryResolver, private alertCtrl:AlertController,
                private storage:Storage)
    {}

    ngOnInit()
    {
        this.model.addLoadingFinishedCallback(this.reloaded.bind(this));
        this.initWidget();
    }

    reloaded()
    {
        if(this.loader) this.loader.updateWidgets();
    }

    initWidget()
    {
        if(!this.loader)
            this.loader = new WidgetLoader(this.model, this.openImageView.bind(this), this.loadingCtrl, this._compiler, this._injector, this._m, this.componentFactoryResolver, this.alertCtrl, this.vc, this.storage);

        this.storage.get('previous-widgets-list').then( value =>
        {
            if(value)
                this.loader.loadWidgetList(value);
        });
    }

    edit()
    {
        this.editMode = !this.editMode;
        if(this.loader)
        {
            this.loader.editMode = !this.loader.editMode;
            this.editMode = this.loader.editMode;
            this.loader.updateWidgetsOverlay();
        }
    }

    addWidget()
    {
        if(this.loader)
            this.loader.addWidgetAlert();
    }


    searchFkt(event)
    {

    }


    // Helpers
    openImageView(data:any)
    {
        if(!data || !data.name || !data.image) return;
        this.navCtrl.push(HomeDetailImagePage, {"data": data});
    }
}
