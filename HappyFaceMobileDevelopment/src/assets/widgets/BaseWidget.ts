
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

    onInit() {}

    protected constructor() {}

}
