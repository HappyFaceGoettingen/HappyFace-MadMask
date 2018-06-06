import {BaseWidget} from "../BaseWidget.js";

export function cls()
{
    return ExampleWidget;
}

export class ExampleWidget extends BaseWidget
{
    static template =
        "<ion-content>" +
        "   <img src='{{status.img}}' alt='missing'>" +
        "   <p> {{status.level}} </p>" +
        "</ion-content>";

    height:number = 200;
    width:number = 200;

    name:string = "Example Widget";

    status:any = {img: "", level: ""};

    constructor() { super(); }

    onInit()
    {
        if(!this.summary) return;
        if(!this.config || !this.config.status)  return;

        this.status.level = this.summary.level;
        this.config.status.find( (element) => {
            if(element.name === this.status.level) this.status.img = element.file;
        })
    }
}
