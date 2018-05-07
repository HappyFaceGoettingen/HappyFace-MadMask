import {
    Compiler,
    Component, ComponentFactoryResolver,
    Injector,
    NgModule,
    NgModuleRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {BaseWidget} from "../../assets/widgets/BaseWidget";
import {IonicPageModule} from "ionic-angular";

@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage
{
    widgets:WidgetData[] = [];
    widgetsSave:string[] = ["/assets/widgets/clock-widget/ClockWidget.js"];
    viewIndex:number = 0;

    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    constructor(private model:DataModel, private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>, private componentFactoryResolver: ComponentFactoryResolver)
    {}

    ngOnInit()
    {
        this.reloadWidgets();
    }

    reloadWidgets()
    {
        for(let i:number = 0; i < this.widgetsSave.length; i++)
        {
            for(let x:number = 0; x < 5; x++)
            {
                let a:string = this.widgetsSave[i];
                console.log("MODULE: " + a);
                this.loadAndBuildWidget(a); //.then( (base:BaseWidget) => { this.widgets.push({widget:base}); })
            }
        }
    }


    async loadAndBuildWidget(name:string):Promise<BaseWidget>
    {
        let start:number = Date.now();
        const func = new Function("x", "return import(x)");
        const loaded = await func(name);



        const widgetStyle      = ":host { display: block; left: 0; width: 300px; height: 140px }\n" + (loaded.style ? loaded.style() : "");

        const cmpData          = { selector: "dynamic-page", template: loaded.template(), styles: [widgetStyle]};
        const widgetComponent  = Component(cmpData)(loaded.cls());
        const widgetModule     = NgModule({declarations: [widgetComponent],
            imports: [IonicPageModule.forChild(widgetComponent)]})(TmpModule);

        this._compiler.compileModuleAndAllComponentsAsync(widgetModule).then(factories =>
        {
            const cardFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetCard);
            const cardRef     = cardFactory.create(this._injector);
            const cardView    = cardRef.hostView;

            const factory = factories.componentFactories.find( v => v.selector === "dynamic-page");
            const cmpRef  = factory.create(this._injector, [], null, this._m);
            this.vc.insert(cardView, this.viewIndex++);
            cardRef.instance.header = false;
            cardRef.instance.card.insert(cmpRef.hostView, 0);
            //this.vc.insert(cmpRef.hostView, this.viewIndex++);

            let end:number = Date.now();
            console.log("Finished loading Widget: " + name + " (in " + (end - start) + " ms)");
        });

        return null;
    }


}

export interface WidgetData
{
    widget:BaseWidget;
    x?:number; y?:number; width?:number; height?:number;
}

export class TmpModule {}

@Component({
    template:"<ion-card absolute-drag>" +
    "    <ion-card-header *ngIf='header'>\n" +
    "        Title" +
    "    </ion-card-header>\n" +
    "    <ion-card-content>\n" +
    "        <ng-container #card></ng-container>\n" +
    "    </ion-card-content>\n" +
    "</ion-card>\n",
    styles: ['.card { display: block; width: 200px; height: 170px }\n']
})

export class WidgetCard
{
    @ViewChild('card', {read: ViewContainerRef}) card: ViewContainerRef;
    header:boolean = true;
}
