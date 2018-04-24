import {Component} from "@angular/core";
import {Widget} from "./widgets/Widget";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    widgets:Widget[] = [];

    constructor() {}

    ngOnInit()
    {
        //this.widgets.push(new TestWidget());
        this.loadWidget().then((widget) => { this.widgets.push(widget); console.log("Pushed")});
    }

    async loadWidget():Promise<Widget>
    {
        const widget = await import("./widgets/TestWidget");
        return widget.instance();
    }
}
