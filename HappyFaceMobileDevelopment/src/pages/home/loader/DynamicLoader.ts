import {Positions} from "../Positions";
import {
    Compiler,
    Component,
    ComponentFactoryResolver,
    Injector,
    NgModule,
    NgModuleRef,
    ViewContainerRef
} from "@angular/core";
import {WidgetCard, WidgetData} from "../WidgetLoader";
import {BaseWidget} from "../../../assets/widgets/BaseWidget";
import {AlertController, IonicPageModule} from "ionic-angular";

export class DynamicLoader
{
    counter:number = 0;

    constructor(private _compiler:Compiler, private _injector:Injector, private _m:NgModuleRef<any>, private alertCtrl:AlertController,
                private componentFactoryResolver: ComponentFactoryResolver, private vc:ViewContainerRef,
                private closeWidget:(viewIndex:number) => void) {}


    async load(entry:any, positions:Positions, viewIndex):Promise<WidgetData>
    {
        try {
            this._compiler.clearCache();

            const func = new Function("x", "return import(x)");
            const loader = await func(entry.name);

            const widget = loader.cls();
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

            const cardFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetCard);
            const cardRef = cardFactory.create(this._injector);
            const cardView = cardRef.hostView;

            const factory = factories.componentFactories.find(v => v.selector === "dynamic-component");
            const cmpRef = factory.create(this._injector, [], null, this._m);
            this.vc.insert(cardView, viewIndex);

            let dim = positions.newPosition(cmpRef.instance.width, cmpRef.instance.height);

            let baseWidget:BaseWidget = cmpRef.instance;

            cardRef.instance.showHeaderOverlay = false;
            cardRef.instance.x = dim.x;
            cardRef.instance.y = dim.y;
            cardRef.instance.width = dim.width;
            cardRef.instance.height = dim.height;
            cardRef.instance.name = cmpRef.instance.name == null ? cmpRef.instance.constructor.name : cmpRef.instance.name;
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

        } catch (e) {
            return null;
        }
    }
}
