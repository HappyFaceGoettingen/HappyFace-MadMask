import {BaseWidget} from "../../BaseWidget.js";

export function cls()
{
    return AnalysisFunctionWidget;
}

export class AnalysisFunctionWidget extends BaseWidget
{
    static templateUrl:string = "./assets/widgets/searchWidgets/analysis-function-widget/AnalysisFunctionWidget.html";

    width:number  = 300;
    height:number = 300;

    isLoading:boolean;
    data:any;
    src:string = "";

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
        this.isLoading = false;
        this.src = this.data.plot_analysis[0].url ? this.data.plot_analysis[0].url : this.data.plot_analysis[0];
    }

    openImage()
    {
        this.openImageView({image: this.src, name: this.data.name});
    }
}
