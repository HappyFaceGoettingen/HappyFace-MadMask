
export function cls()
{
    return ClockWidget;
}

export function template()
{
    return "<ion-content>\n" +
        "    <span style=\"font-weight: bold\">{{time}}</span>\n" +
        "</ion-content>";
}

export class ClockWidget
{
    time:string = "";

    hours:number = 0;
    minutes:number = 0;
    seconds:number = 0;

    constructor()
    {
        setInterval(this.setTime(), 500);
    }

    setTime()
    {
        let d:Date = new Date();
        this.hours = d.getHours();
        this.minutes = d.getMinutes();
        this.seconds = d.getSeconds();

        let m:string = (this.minutes < 10 ? "0" + this.minutes : "" + this.minutes);
        let s:string = (this.seconds < 10 ? "0" + this.seconds : "" + this.seconds);
        this.time = this.hours + ":" + m + ":" + s;
    }
}
