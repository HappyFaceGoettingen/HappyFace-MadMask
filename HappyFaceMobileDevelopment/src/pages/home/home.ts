import {Compiler, Component, Injector, NgModule, NgModuleRef, ViewChild, ViewContainerRef} from "@angular/core";
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
    widgetsSave:string[] = ["/assets/widgets/critical-urls-widget/CriticalUrlsWidget.js"];


    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    constructor(private model:DataModel, private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>)
    {}

    ngOnInit()
    {
        this.reloadWidgets();
    }

    reloadWidgets()
    {
        for(let i:number = 0; i < this.widgetsSave.length; i++)
        {
            let a:string = this.widgetsSave[i];
            console.log("MODULE: " + a);
            this.loadAndBuildWidget(a); //.then( (base:BaseWidget) => { this.widgets.push({widget:base}); })
        }
    }

    async loadAndBuildWidget(name:string):Promise<BaseWidget>
    {
        const func = new Function("x", "return import(x)");
        const loaded = await func(name);

        //console.log(loaded);
        //return loaded.instance();

        //const template = '<span>generated on the fly: {{name}}</span>';

        const tmpCmp = Component({selector: "dynamic-page", template: loaded.template()})(loaded.cls());
        const tmpModule = NgModule({declarations: [tmpCmp], imports: [IonicPageModule.forChild(tmpCmp)]})(class {});

        this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                //console.log("INSTANCE: " + JSON.stringify(cmpRef.instance));
                //console.log("HEADER: " + cmpRef.instance.headerText);
                //const cmpRef = this.vc.createComponent(tmpCmp);
                //cmpRef.instance.name = 'B component';
                this.vc.insert(cmpRef.hostView);
            });

        return null;
    }


}

export interface WidgetData
{
    widget:BaseWidget;
    x?:number; y?:number; width?:number; height?:number;
}
