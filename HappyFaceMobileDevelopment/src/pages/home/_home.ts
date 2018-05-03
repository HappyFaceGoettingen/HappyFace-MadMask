import {
    Compiler,
    Component,
    Injector,
    NgModule,
    NgModuleRef, SystemJsNgModuleLoader,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {DataModel} from "../../data/DataModel";
import {HttpClient} from "@angular/common/http";
import {DataSearch} from "../../data/DataSearch";

declare var require: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})

export class HomePage
{
    widgets:any[] = [];
    scrdata:string = "";
    widgetsDATA:string[] = [ "C:\\Users\\atopi\\Codes\\bachelor\\HappyFace-MadMask\\HappyFaceMobileDevelopment\\src\\pages\\home\\widgets\\TestWidget" ];

    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

    constructor(private model:DataModel, private _compiler: Compiler, private _injector:Injector, private _m:NgModuleRef<any>,
                    private http: HttpClient) {}

    ngOnInit()
    {
        for(let i:number = 0; i < this.widgetsDATA.length; i++)
        {
            let a:string = this.widgetsDATA[i];
            console.log("MODULE: " + a);
            this.loadWidget(a).then((data) => { this.scrdata = "<script>" + data + "</script>" } );
        }
    }

    async loadWidget(name:string):Promise<string>
    {
        //cmp.compile("var x = 'string'; console.log(x); ");

        /*let s:string = "./widgets/TestWidget"; //"http://141.5.108.29:19000/widgets/TestWidget.js";
        for(let i:number = 0; i < s.length; i++) console.log("NUMBER: " + s.charCodeAt(i));
        const widget = await import(s);// "./widgets/TestWidget");
        return widget.instance();  "http://atopion.com/apps/hf/marketplace/TestWidget.js"*/

        /*const template = '<span>generated on the fly: {{name}}</span>';

        const tmpCmp = Component({selector: "dynamic-page", template: template})(class TestWid extends Hfwidget {

            public name:string = "Dynamic component";
            public data:string = "DATADATADATA";

            constructor() { super(); this.name = " second dynamic component"; this.headerText = "Header Text"; }

            getData():string { return this.data; }
        });
        const tmpModule = NgModule({declarations: [tmpCmp]})(class {});

        this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                console.log("INSTANCE: " + JSON.stringify(cmpRef.instance));
                console.log("HEADER: " + cmpRef.instance.headerText);
                //const cmpRef = this.vc.createComponent(tmpCmp);
                //cmpRef.instance.name = 'B component';
                this.vc.insert(cmpRef.hostView);
            });*/

        //var instance = Object.create(eval(classData));

        //const s:string = "/assets/DataSearch.js";
        //const s:string = "http://atopion.com/apps/hf/marketplace/DataSearch.js";
        const s:string = "C:\\Users\\atopi\\Codes\\bachelor\\HappyFace-MadMask\\HappyFaceWidgets\\test-widget\\TestWidget";
        const func = new Function("x", "return import(x)");
        const instance = await func(s); //eval('import')(s);
        /*console.log(instance);
        const search   = new instance.DataSearch(null);
        console.log("DATA: " + search.data);*/

        console.log(instance);
        const widget = new instance.TestWidget();
        console.log("DATA: " + widget.titleTEXT);


        /*const template = '<span>generated on the fly: {{name}}</span>';

        const tmpCmp = Component({selector: "dynamic-page", template: template})(eval(classData));
        const tmpModule = NgModule({declarations: [tmpCmp]})(class {});

        this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                console.log("INSTANCE: " + JSON.stringify(cmpRef.instance));
                console.log("HEADER: " + cmpRef.instance.headerText);
                //const cmpRef = this.vc.createComponent(tmpCmp);
                //cmpRef.instance.name = 'B component';
                this.vc.insert(cmpRef.hostView);
            });
        */

        return "data";
    }

    buildWidget(widget:any)
    {
        widget.config  = this.model.config;
        widget.humans  = this.model.humans;
        widget.logs    = this.model.logs;
        widget.systems = this.model.systems;
        widget.summary = this.model.summary;
        widget.visualizers = this.model.visualizers;
        widget.monitoringURLS = this.model.monitoringUrls;

        let htmlHeader:boolean = widget.headerHTML !== null;
        let textHeader:boolean = widget.headerText !== null;

        let htmlContent:boolean = widget.contentHTML !== null;
        let textContent:boolean = widget.contentText !== null;

        this.widgets.push({widget: widget, htmlHeader: htmlHeader, textHeader: textHeader, htmlContent: htmlContent,
            textContent: textContent});
        console.log("Pushed");
    }

    makeAccess()
    {

    }

    constructWidgetData(str:string)
    {
        console.log(str);
        /* Building component */
        let component:any;
        if(str.indexOf("@Component") > -1)
        {
            let i1:number = str.indexOf("@Component") + "@Component".length +1;
            let i2:number = str.indexOf(")", i1 +2);
            console.log(str.substring(i1, i2));
        }
    }
}

interface PluginsConfig
{
    system: any;
}
