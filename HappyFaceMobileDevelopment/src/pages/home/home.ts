import {Component} from "@angular/core";
import {HFWidget} from "./widgets/HFWidget";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    widgets:HFWidget[] = [];

    constructor() {}

    ngOnInit()
    {
        //this.widgets.push(new TestWidget());
        HomePage.loadWidget().then((widget) => { this.buildWidget(widget); } );
    }

    static async loadWidget():Promise<HFWidget>
    {
        const widget = await import("./widgets/TestWidget");
        return widget.instance();
    }

    buildWidget(widget:HFWidget)
    {



        this.widgets.push(widget); console.log("Pushed");
    }
}
