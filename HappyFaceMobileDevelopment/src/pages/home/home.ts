import {
    Compiler,
    Component, ComponentFactoryResolver, ComponentRef,
    Injector,
    NgModule,
    NgModuleRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {AlertController, IonicPageModule} from "ionic-angular";
import {BaseWidget} from "../../assets/widgets/BaseWidget";
import {DataModel} from "../../data/DataModel";

@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage
{
    widgets:WidgetData[] = [];
    widgetsSave:string[] = /*["/assets/widgets/clock-widget/ClockWidget.js", */ ["/assets/widgets/critical-urls-widget/CriticalUrlsWidget.js"];
    components:any[] = [];

    viewIndex   :number = 0;
    columnIndex :number = 0;
    lineIndex   :number = 0;
    viewSpacing :number = 30;
    allX        :number = 0;
    allY        :number = 0;
    maxHeight   :number = 0;
    counter     :number = 0;

    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    constructor(private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>,
                private componentFactoryResolver: ComponentFactoryResolver, private alertCtrl:AlertController,
                private model:DataModel)
    {}

    ngOnInit()
    {
        this.model.addLoadingStartedCallback(this.reloaded.bind(this));
        if(!this.model.isLoading()) this.reloaded();
        this.reloadWidgets();
    }

    reloaded()
    {

    }

    async reloadWidgets()
    {
        for(let i:number = 0; i < this.widgetsSave.length; i++)
        {
            for(let x:number = 0; x < 1; x++)
            {
                let a:string = this.widgetsSave[i];
                console.log("MODULE: " + a);
                await this.loadAndBuildWidget(a).then( (data:WidgetData) => { this.widgets.push(data); })
            }
        }
        for(let i:number = 0; i < this.widgets.length; i++)
        {
            let widget:WidgetData = this.widgets[i];
            widget.baseWidget.monitoringUrls = this.model.monitoringUrls;
            widget.baseWidget.summary = this.model.summary;
            widget.baseWidget.onInit();
        }
    }


    async loadAndBuildWidget(name:string):Promise<WidgetData>
    {
        try {
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

            const cmpObj = {selector: "dynamic-component", templateUrl: templUrl, template: templ};
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

            let dim = this.calcPositions(cmpRef.instance.width, cmpRef.instance.height);

            cardRef.instance.showHeaderOverlay = false;
            /*cardRef.instance.x = this.columnIndex * width + this.columnIndex * this.viewSpacing;
            cardRef.instance.y = this.lineIndex * 200 + this.lineIndex * this.viewSpacing;
            cardRef.instance.width = width;
            cardRef.instance.height = height;*/
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

            /* Init widget */
            baseWidget.onInit();

            console.log("Index: " + this.viewIndex + " X: " + cardRef.instance.x + " Y: " + cardRef.instance.y);

            return {
                cardRef: cardRef,
                viewIndex: this.viewIndex,
                baseWidget: baseWidget,
                x: cardRef.instance.x,
                y: cardRef.instance.y,
                width: cardRef.instance.width,
                height: cardRef.instance.height
            };

        } catch (e) {
            this.showBuildErrorDialog(e.toString());
            return null;
        }
    }

    closeWidget(index:number)
    {
        let ind:number = -1;
        for(let i:number = 0; i < this.widgets.length; i++)
            if (this.widgets[i].viewIndex === index) {
                this.widgets[i].cardRef.destroy();
                ind = i;
            }

        if(ind > -1) this.widgets.splice(ind, 1);

        console.log(this.widgets);
        for(let i:number = 0; i < this.widgets.length; i++)
        {
            this.widgets[i].cardRef.instance.viewIndex = i;
            this.widgets[i].viewIndex = i;
        }
        console.log(this.widgets);

        this.reloadPositions();
    }

    reloadPositions()
    {
        this.columnIndex = 0;
        this.lineIndex = 0;
        this.allX = 0;
        this.maxHeight = 0;
        this.allY = 0;

        for(let wid of this.widgets) {

            const dim = this.calcPositions(wid.cardRef.instance.width, wid.cardRef.instance.height);
            wid.cardRef.instance.x = dim.x;
            wid.cardRef.instance.y = dim.y;
        }

        this.repaint();
    }

    repaint()
    {
        for(let wid of this.widgets)
        {
            wid.cardRef.instance.updatePosition();
        }
    }

    calcPositions(instanceWidth:number, instanceHeight:number)
    {
        let width :number = instanceWidth;
        let height:number = instanceHeight;

        if(width > window.innerWidth)
        {
            const scale:number = window.innerWidth / width;
            width = width * scale;
            height = height * scale;
        }

        if(this.allX + this.columnIndex * this.viewSpacing + width > window.innerWidth)
        {
            this.lineIndex++;
            this.columnIndex = 0;
            this.allX = 0;
            this.allY += this.maxHeight;
        }

        const posX  :number = this.allX + this.viewSpacing;
        const posY  :number = this.allY + this.lineIndex * this.viewSpacing;

        this.allX           = posX + width;
        this.maxHeight      = height > this.maxHeight ? height : this.maxHeight;

        this.columnIndex++;

        return { x: posX, y: posY, width: width, height: height }
    }

    edit()
    {
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
}

export interface WidgetData
{
    cardRef:ComponentRef<WidgetCard>,
    baseWidget:BaseWidget,
    viewIndex:number,
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
             '.label { padding-top: 5px; padding-left: 10px; display: inline-flex }', '.closebutton { position: absolute; right: 12px; top: 17px; background: transparent}'],
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
