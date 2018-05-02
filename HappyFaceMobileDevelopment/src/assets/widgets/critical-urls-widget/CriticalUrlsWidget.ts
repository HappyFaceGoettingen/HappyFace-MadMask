import {BaseWidget} from "../BaseWidget.js";

export function instance()
{
    return new CriticalUrlsWidget();
}

export function template()
{
    return "<ion-row>\n" +
            "    <ion-col col-sm-4 *ngFor=\"let img of img_list\">\n" +
            "        <div class=\"card_temp\" (click)=\"imgClicked(img)\">\n" +
            "            <img src=\"{{img.src}}\">\n" +
            "            <p style=\"font-size: 9px\">{{img.title}}</p>\n" +
            "        </div>\n" +
            "    </ion-col>\n" +
            "</ion-row>"
}

export function cls()
{
    return CriticalUrlsWidget;
}

export class CriticalUrlsWidget extends BaseWidget
{
    imgList:any[] = [];
    constructor()
    {
        super();
        this.imgList.push({src: "http://img.youtube.com/vi/ttz4Sr0tZFg/maxresdefault.jpg", title: "IMG TITLE"});
        this.content = "";
    }
}
