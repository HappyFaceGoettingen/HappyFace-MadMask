import {BaseWidget} from "../../BaseWidget.js";

export function cls()
{
    return HistoryFunctionWidget;
}

export class HistoryFunctionWidget extends BaseWidget
{
    static templateUrl = "./assets/widgets/searchWidgets/history-function-widget/HistoryFunctionWidget.html";

    width:number = 300;
    height:number = 300;

    isLoading:boolean = true;
    data:any;
    src:string[];

    constructor()
    {
        super();
    }

    onInit()
    {
        this.isLoading = true;
    }

    onReload()
    {

    }
}
