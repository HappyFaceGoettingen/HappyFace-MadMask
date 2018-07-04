import {Positions} from "../Positions";
import {WidgetCard, WidgetData} from "../WidgetLoader";
import {
    Compiler,
    Component,
    ComponentFactoryResolver,
    Injector,
    NgModule,
    NgModuleRef,
    ViewContainerRef
} from "@angular/core";
import {AlertController, IonicPageModule} from "ionic-angular";


// Static widgets
import {CriticalUrlsWidget} from "./static-widgets/critical-urls-widget/CriticalUrlsWidget";
import {ExampleWidget} from "./static-widgets/example-widget/ExampleWidget";
import {BaseWidget} from "../../../assets/widgets/BaseWidget";
import {AnalysisFunctionWidget} from "./static-widgets/searchWidgets/analysis-function-widget/AnalysisFunctionWidget";
import {DependencyFunctionWidget} from "./static-widgets/searchWidgets/dependency-function-widget/DependencyFunctionWidget";
import {HistoryFunctionWidget} from "./static-widgets/searchWidgets/history-function-widget/HistoryFunctionWidget";
import {StatusFunctionWidget} from "./static-widgets/searchWidgets/status-function-widget/StatusFunctionWidget";

export class StaticLoader
{
    counter:number = 0;

    constructor(private componentFactoryResolver:ComponentFactoryResolver, private _injector:Injector, private _compiler:Compiler,
                private vc:ViewContainerRef, private _m:NgModuleRef<any>, private closeWidget:(viewIndex:number) => void,
                private alertCtrl:AlertController) {}

    static widgetList:string[] = ["critical-urls-widget/CriticalUrlsWidget.js", "example-widget/ExampleWidget.js"];

    async load(entry:any, positions:Positions, viewIndex):Promise<WidgetData>
    {
        let widget = null;

        this._compiler.clearCache();
        if(entry.name.indexOf("CriticalUrlsWidget") >= 0) widget = CriticalUrlsWidget;
        else if(entry.name.indexOf("ExampleWidget") >= 0) widget = ExampleWidget;

        else if(entry.name.indexOf("AnalysisFunctionWidget") >= 0)   widget = AnalysisFunctionWidget;
        else if(entry.name.indexOf("DependencyFunctionWidget") >= 0) widget = DependencyFunctionWidget;
        else if(entry.name.indexOf("HistoryFunctionWidget") >= 0)    widget = HistoryFunctionWidget;
        else if(entry.name.indexOf("StatusFunctionWidget") >= 0)     widget = StatusFunctionWidget;

        const cardFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetCard);
        const cardRef = cardFactory.create(this._injector);
        const cardView = cardRef.hostView;

        const widgetModule = new Function("", "class DynamicModule" + this.counter +
            " { } \n return DynamicModule" + this.counter++ + ";")();

        let templUrl: string = widget.templateUrl;
        let templ: string = widget.template;

        if (templ == null && templUrl == null) {
            console.error("No template specified");
            let alert = this.alertCtrl.create({
                title: "Widget build error",
                subTitle: "Build error: Neither property template nor property templateUrl is specified. \nAborting build.",
                cssClass: "alertText",
                buttons: ['OK']
            });
            alert.present();
        }
        else if (templ != null && templUrl != null) templ = null;

        const cmpObj = {selector: "dynamic-component", templateUrl: templUrl, template: templ, styles: ['.scroll-content { margin: 0; }']};
        const component = Component(cmpObj)(widget);
        const module = NgModule({
            declarations: [component],
            imports: [IonicPageModule.forChild(component)]
        })(widgetModule);
        const factories = await this._compiler.compileModuleAndAllComponentsAsync(module);

        const cmpFactory  = factories.componentFactories.find(v => v.selector === "dynamic-component");
        const cmpRef = cmpFactory.create(this._injector, [], null, this._m);
        this.vc.insert(cardView, viewIndex);

        const instance:BaseWidget = <BaseWidget> cmpRef.instance;

        let dim = positions.newPosition(instance.width, instance.height);

        let baseWidget:BaseWidget = <BaseWidget>cmpRef.instance;

        cardRef.instance.showHeaderOverlay = false;
        cardRef.instance.x = dim.x;
        cardRef.instance.y = dim.y;
        cardRef.instance.width = dim.width;
        cardRef.instance.height = dim.height;
        cardRef.instance.name = instance.name == null ? instance.constructor.name : instance.name;
        cardRef.instance.viewIndex = viewIndex;
        cardRef.instance.closeFunc = (index: number) => {
            this.closeWidget(index);
        };
        cardRef.instance.card.insert(cmpRef.hostView, 0);

        return {
            cardRef: cardRef,
            baseWidget: baseWidget,
            viewIndex: viewIndex,
            path: entry.name,
            x: cardRef.instance.x,
            y: cardRef.instance.y,
            width: cardRef.instance.width,
            height: cardRef.instance.height
        }
    }
}
