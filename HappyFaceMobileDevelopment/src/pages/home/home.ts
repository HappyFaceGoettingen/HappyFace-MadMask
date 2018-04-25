import {Component} from "@angular/core";
import {HFWidget} from "./widgets/HFWidget";
import {DataModel} from "../../data/DataModel";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    widgets:any[] = [];

    widgetsDATA:string[] = [ "C:\\Users\\atopi\\Codes\\bachelor\\HappyFace-MadMask\\HappyFaceMobileDevelopment\\src\\pages\\home\\widgets\\TestWidget" ];

    constructor(private model:DataModel) {}

    ngOnInit()
    {


        for(let i:number = 0; i < this.widgetsDATA.length; i++)
        {
            let a:string = this.widgetsDATA[i];
            console.log("MODULE: " + a);
            HomePage.loadWidget(a).then((widget) => { this.buildWidget(widget); } );
        }
    }

    static async loadWidget(name:string):Promise<HFWidget>
    {
        let s:string = "http://141.5.108.29:19000/widgets/TestWidget.js";
        for(let i:number = 0; i < s.length; i++) console.log("NUMBER: " + s.charCodeAt(i));
        const widget = await import(s);// "./widgets/TestWidget");
        return widget.instance();
    }

    buildWidget(widget:HFWidget)
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
}
