/*
    Singletone class that provides the currently monitored site and its data.
    To be changed from instances-detail.html
    Heavily used inside ConfigReader
    Default location is GoeGrid
*/

export class Current
{
    name:string = "GoeGrid";
    host:string = "141.5.108.30";
    web_port:string = "10200";
    mobile_port:string = "20200";
    dir:string = "sites/GoeGrid";

    changeActive(name:string, host:string, web_port:string, mobile_port:string, dir:string)
    {
        __backup = currentlyActive;
        this.name = name;
        this.host = host;
        this.web_port = web_port;
        this.mobile_port = mobile_port;
        this.dir = dir;
    }
}

export var currentlyActive:Current = new Current();
export var __backup:Current = new Current();
