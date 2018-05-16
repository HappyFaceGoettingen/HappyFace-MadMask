export abstract class BaseWidget
{
    static style:string = null;
    static template:string = null;
    static templateUrl:string = null;

    name:string = null;
    abstract width:number = null;
    abstract height:number = null;

    monitoringUrls:any = null;
    summary:any = null;
    config:any = null;

    openImageView:(data:any) => void = null;

    getColor(col:string):string {
        switch (col)
        {
            case "item-calm": return "#32db64";
            case "item-balanced": return "#fffe00";
            case "item-energized": return "#ff9800";
            case "item-assertive": return "#f53d3d";
            default: return "#ffffff";
        }
    }

    onInit() {}

    protected constructor() {}

}
