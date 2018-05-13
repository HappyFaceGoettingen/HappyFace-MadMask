
export abstract class BaseWidget
{
    static style:string = null;
    static template:string = null;
    static templateUrl:string = null;

    name:string = null;
    abstract width:number = null;
    abstract height:number = null;

    baseWindow = null;

    onInit() {}

    protected constructor() {}

}
