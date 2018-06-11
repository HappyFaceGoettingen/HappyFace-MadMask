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
import {SearchData} from "../../data/SearchData";
import {Search} from "../../data/Search";

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

    search:Search = null;
    searchData:SearchData = null;

    constructor(private loadingCtrl:LoadingController, private model:DataModel, private navCtrl:NavController,
                private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>,
                private componentFactoryResolver: ComponentFactoryResolver, private alertCtrl:AlertController,
                private storage:Storage)
    {}

    ngOnInit()
    {
        this.model.addLoadingFinishedCallback(this.reloaded.bind(this));
        this.initWidget();
        this.search = new Search(this.loader, this.openImageView.bind(this));
        this.searchData = new SearchData(this.model);
        this.searchData.updateData();
        this.search.data = this.searchData;
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
                this.loader.loadWidgetList(value).then(_ => {
                    this.loader.updateWidgets();
                });
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
        this.search.search(event.target.value);
        this.isSearch = !this.isSearch;
    }


    // Helpers
    openImageView(data:any)
    {
        if(!data || !data.name || !data.image) return;
        this.navCtrl.push(HomeDetailImagePage, {"data": data});
    }
}
