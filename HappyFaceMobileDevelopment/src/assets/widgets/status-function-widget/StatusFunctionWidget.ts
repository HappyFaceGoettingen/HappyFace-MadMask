import {BaseWidget} from "../BaseWidget.js";

export function cls()
{
    return StatusFunctionWidget;
}

export class StatusFunctionWidget extends BaseWidget
{
    static templateUrl:string = "./assets/widgets/status-function-widget/StatusFunctionWidget.html";

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
        this.src = this.data.image[0].url ? this.data.image[0].url : this.data.image[0];
    }

    openImage()
    {
        this.openImageView({image: this.src, name: this.data.name});
    }
}
