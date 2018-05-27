import {
    Compiler,
    Component, ComponentFactoryResolver, ComponentRef,
    Injector,
    NgModule,
    NgModuleRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {AlertController, IonicPageModule, LoadingController, NavController} from "ionic-angular";
import {BaseWidget} from "../../assets/widgets/BaseWidget";
import {DataModel} from "../../data/DataModel";
import {HomeDetailImagePage} from "./home-detail-image";
import {Position} from "../../directives/position/Position";
import {Positions} from "./Positions";

@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage
{
    widgets:WidgetData[] = [];
    widgetsSave:string[] = ["/assets/widgets/critical-urls-widget/CriticalUrlsWidget.js"];
    components:any[] = [];

    adding:boolean = false;

    positions:Positions = new Positions();

    viewIndex   :number = 0;
    counter     :number = 0;

    editMode    :boolean = false;
    widgetListUrl:string = "assets/widgets/list.json";

    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    constructor(private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>,
                private componentFactoryResolver: ComponentFactoryResolver, private alertCtrl:AlertController,
                private model:DataModel, private navCtrl: NavController, private loadingCtrl:LoadingController)
    {}

    ngOnInit()
    {
        this.widgetListUrl = this.model.getRemoteURL() + this.widgetListUrl;
        this.model.addLoadingFinishedCallback(this.reloaded.bind(this));
        this.initWidgets();
    }

    initWidgets()
    {
        this.clearWidgets();
        this.loadWidgets();
        //this.findWidgets().then(() => { console.log(this.widgetsSave); });
    }

    reloaded()
    {
        this.model.setLinks("latest");
        for(let i:number = 0; i < this.widgets.length; i++)
        {
            this.widgets[i].baseWidget.summary = this.model.summary;
            this.widgets[i].baseWidget.monitoringUrls = this.model.monitoringUrls;
            this.widgets[i].baseWidget.config = this.model.config;
            this.widgets[i].baseWidget.onReload();
        }
    }

    async loadWidgets()
    {
        for(let i:number = 0; i < this.widgetsSave.length; i++)
        {
            let a:string = this.widgetsSave[i];
            console.log("MODULE: " + a);
            await this.loadAndBuildWidget(a).then( (data:WidgetData) => { if(data != null) this.widgets.push(data); });
        }
    }


    async loadAndBuildWidget(name:string):Promise<WidgetData>
    {
        try {
            this._compiler.clearCache();

            try{
                eval("import('./Positions')");
            } catch(e) {
                console.log("dynamic import not supported");
                if(this.adding) this.alertCtrl.create({
                    title: "Widget build error",
                    message: "Your browser version does not support dynamic importing of widgets. Because of that the widget system cannot be used. Consider updating to a newer browser or using the Smartphone application.",
                    cssClass: "alertText",
                    buttons: ["OK"]
                }).present();
                return null;
            }

            const func = new Function("x", "return import(x)");
            const loader = await func(name);

            const widget = loader.cls();
            const widgetModule = new Function("", "class DynamicModule" + this.counter +
                " { } \n return DynamicModule" + this.counter++ + ";")();

            let templUrl: string = widget.templateUrl;
            let templ: string = widget.template;

            if (templ == null && templUrl == null) {
                console.error("No template specified");
                throw new Error("Build error: Neither property template nor property templateUrl is specified");
            }
            else if (templ != null && templUrl != null) templ = null;

            console.log("TEMPLATE: " + templ + " TEMPLATE URL: " + templUrl);

            //const widgetStyle       = ":host { display: block; left: 0; }\n" + style;

            const cmpObj = {selector: "dynamic-component", templateUrl: templUrl, template: templ, styles: ['.scroll-content { margin: 0; }']};
            const component = Component(cmpObj)(widget);
            const module = NgModule({
                declarations: [component],
                imports: [IonicPageModule.forChild(component)]
            })(widgetModule);
            const factories = await this._compiler.compileModuleAndAllComponentsAsync(module);

            const cardFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetCard);
            const cardRef = cardFactory.create(this._injector);
            const cardView = cardRef.hostView;

            const factory = factories.componentFactories.find(v => v.selector === "dynamic-component");
            const cmpRef = factory.create(this._injector, [], null, this._m);
            this.vc.insert(cardView, this.viewIndex++);

            let dim = this.positions.newPosition(cmpRef.instance.width, cmpRef.instance.height);

            cardRef.instance.showHeaderOverlay = false;
            cardRef.instance.x = dim.x;
            cardRef.instance.y = dim.y;
            cardRef.instance.width = dim.width;
            cardRef.instance.height = dim.height;
            cardRef.instance.name = cmpRef.instance.name == null ? cmpRef.instance.constructor.name : cmpRef.instance.name;
            cardRef.instance.viewIndex = this.viewIndex;
            cardRef.instance.closeFunc = (index: number) => {
                this.closeWidget(index);
            };
            cardRef.instance.card.insert(cmpRef.hostView, 0);

            /* Add BaseWidget data */
            let baseWidget: BaseWidget = cmpRef.instance;
            baseWidget.monitoringUrls = this.model.monitoringUrls;
            baseWidget.summary = this.model.summary;
            baseWidget.config = this.model.config;
            baseWidget.openImageView = this.openImageView.bind(this);

            /* Init widget */
            console.log(baseWidget.summary);
            baseWidget.onInit();

            console.log("Index: " + this.viewIndex + " X: " + cardRef.instance.x + " Y: " + cardRef.instance.y);

            return {
                cardRef: cardRef,
                viewIndex: this.viewIndex,
                baseWidget: baseWidget,
                path: name,
                x: cardRef.instance.x,
                y: cardRef.instance.y,
                width: cardRef.instance.width,
                height: cardRef.instance.height
            };

        } catch (e) {
            this.showBuildErrorDialog(e.toString());
            //throw e;
            return null;
        }
    }

    clearWidgets()
    {
        this.counter = 0;
        this.viewIndex = 0;
        for(let i:number = 0; i < this.widgets.length; i++)
        {
            this.closeWidget(this.widgets[i].viewIndex);
        }

        this._compiler.clearCache();
    }

    closeWidget(index:number)
    {
        let ind:number = -1;
        for(let i:number = 0; i < this.widgets.length; i++)
            if (this.widgets[i].viewIndex === index) {
                this.widgets[i].cardRef.destroy();
                ind = i;
            }

        if(ind > -1) {
            this.widgets.splice(ind, 1);
            this.viewIndex--;
            this.counter--;
        }

        for(let i:number = 0; i < this.widgets.length; i++)
        {
            this.widgets[i].cardRef.instance.viewIndex = i;
            this.widgets[i].viewIndex = i;
        }

        this.reloadPositions();
    }

    reloadPositions()
    {
        this.positions.reset();
        for(let wid of this.widgets)
        {
            const dim = this.positions.newPosition(wid.cardRef.instance.width, wid.cardRef.instance.height);
            wid.cardRef.instance.x = dim.x;
            wid.cardRef.instance.y = dim.y;

            wid.cardRef.instance.updatePosition();
        }
    }

    edit()
    {
        this.editMode = !this.editMode;
        for(let wid of this.widgets)
            wid.cardRef.instance.showHeaderOverlay = !wid.cardRef.instance.showHeaderOverlay;
    }

    showBuildErrorDialog(message:string)
    {
        let alert = this.alertCtrl.create({
            title: "Widget build error",
            subTitle: message + "\nAborting build.",
            cssClass: "alertText",
            buttons: ['OK']
        });
        alert.present();
    }

    openImageView(data:any)
    {
        if(!data || !data.name || !data.image) return;
        this.navCtrl.push(HomeDetailImagePage, {"data": data});
    }

    addWidgetAlert()
    {
        let widgetList:string[] = [];

        let loading = this.loadingCtrl.create({
            spinner: "dots",
            content: "Searching for widgets"
        });

        loading.present();

        let req:XMLHttpRequest = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState == 4)
            {
                if(req.status == 200)
                {
                    JSON.parse(req.response).widgets.filter((element) => {
                        widgetList.push("/assets/widgets/" + element.src);
                    });
                    loading.dismiss();


                    console.log("Add widget");
                    let alert = this.alertCtrl.create();
                    alert.setTitle("Add Widget");
                    alert.setSubTitle("Choose the widget you want to add:");
                    alert.setCssClass('alertText');

                    for(let s of widgetList)
                    {
                        /* Widgets already displaying cannot be choosen */
                        let used:boolean = false;
                        if(this.widgets.find((element) => element.path === s)) used = true;

                        alert.addInput({
                            type: 'checkbox',
                            label: s.substring(s.lastIndexOf("/") +1, s.length),
                            value: s,
                            checked: used,
                            disabled: used
                        });
                    }

                    alert.addButton('Cancel');
                    alert.addButton({
                        text: 'Ok',
                        handler: (data:Array<string>) => {
                            this.adding = true;
                            /* Dont add widgets already displayed */
                            data = data.filter((element) => this.widgets.find((e) => e.path === element) === undefined);
                            for(let a of data)
                                this.loadAndBuildWidget(a).then( (widgetData:WidgetData) => {
                                    if(widgetData != null)
                                    {
                                        this.widgets.push(widgetData);
                                        widgetData.cardRef.instance.showHeaderOverlay = this.editMode;
                                    }
                                });

                            this.adding = false;
                        }
                    });

                    alert.present();
                }
            }
        };
        req.open("GET", this.widgetListUrl, true);
        req.send();
    }
}

export interface WidgetData
{
    cardRef:ComponentRef<WidgetCard>,
    baseWidget:BaseWidget,
    viewIndex:number,
    path:string,
    x?:number; y?:number; width?:number; height?:number;
}

export class TmpModule {}

@Component({
    template:"<ion-card position startX='{{x}}' startY='{{y}}' width='{{width}}' height='{{height}}' #cdire='position-directive'>" +
    "    <div no-padding class='header-overlay' *ngIf='showHeaderOverlay'>" +
    "       <ion-label no-padding>{{name}} </ion-label>" +
    "       <button class='closebutton' (click)='close()'><ion-icon name='close'></ion-icon></button>" +
    "    </div>" +
    "    <ion-card-content no-padding no-margin>\n" +
    "        <ng-container #card></ng-container>\n" +
    "    </ion-card-content>\n" +
    "</ion-card>\n",
    styles: ['.card { display: block; position: absolute; width: 200px; height: 170px }\n', '.card-content { height: 100%; width: 100% }',
             '.header-overlay { z-index: 20; font-weight: bold; top: 0; left: 0; position: inherit; width: 100%; height: 50px; background-color: #0a9dc7}',
             '.label { padding-top: 5px; padding-left: 10px; display: inline-flex }', '.closebutton { position: absolute; right: 12px; top: 17px; background: transparent}',
             'ion-content .scroll-content, .fixed-content { padding-left: 0; margin-bottom: 0px !important;}' ],
})

export class WidgetCard
{
    @ViewChild('card', {read: ViewContainerRef}) card: ViewContainerRef;
    @ViewChild('cdire') positionDirective;
    showHeaderOverlay:boolean = false;

    x:number = 0;
    y:number = 0;
    width:number = 0;
    height:number = 0;

    name:string = "TITLE";

    viewIndex:number = 0;
    closeFunc:(index:number) => void = null;

    close()
    {
        console.log("CLOSE NUMBER " + this.viewIndex + ".");
        this.closeFunc(this.viewIndex);
    }

    updatePosition()
    {
        this.positionDirective.update(this.x, this.y, this.width, this.height);
    }
}
