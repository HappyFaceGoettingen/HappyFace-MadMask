import {BaseWidget} from "../BaseWidget.js";

export function cls()
{
    return ClockWidget;
}

export class ClockWidget extends BaseWidget
{
    width = 200;
    height = 170;

    static template = "<ion-content>\n" +
        "    <span style=\"font-weight: bold\">{{time}}</span>\n" +
        "</ion-content>";

    name = "Clock";

    time:string = "";

    hours:number = 0;
    minutes:number = 0;
    seconds:number = 0;

    constructor()
    {
        super();
    }

    onInit()
    {
        this.baseWindow.setTimeout(this.setTime(), 12000);
    }

    setTime()
    {
        console.log("New Time");
        let d:Date = new Date();
        this.hours = d.getHours();
        this.minutes = d.getMinutes();
        this.seconds = d.getSeconds();

        let m:string = (this.minutes < 10 ? "0" + this.minutes : "" + this.minutes);
        let s:string = (this.seconds < 10 ? "0" + this.seconds : "" + this.seconds);
        this.time = this.hours + ":" + m + ":" + s;
    }
}
