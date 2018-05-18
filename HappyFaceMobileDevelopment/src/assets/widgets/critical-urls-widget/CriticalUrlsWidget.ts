import {BaseWidget} from "../BaseWidget.js";

/*export function instance()
{
    return new CriticalUrlsWidget();
}

export function template()
{
    return "<ion-content>\n" +
        "    <ion-grid>\n" +
        "        <ion-row>\n" +
        "            <ion-col col-sm-4 *ngFor=\"let img of imgList\">\n" +
        "                <div class=\"card_temp\" (click)=\"imgClicked(img)\">\n" +
        "                    <img src=\"{{img.src}}\">\n" +
        "                    <p style=\"font-size: 9px\">{{img.title}}</p>\n" +
        "                </div>\n" +
        "            </ion-col>\n" +
        "        </ion-row>\n" +
        "    </ion-grid>\n" +
        "</ion-content>";

    /*let req:XMLHttpRequest = new XMLHttpRequest();
    req.open("GET", "./assets/widgets/critical-urls-widget/CriticalUrlsWidget.html", false);
    req.send();
    return req.responseText;
}

export function style() { return ""; }*/

export function cls()
{
    return CriticalUrlsWidget;
}

export class CriticalUrlsWidget extends BaseWidget
{
    static template:string = "<ion-content>\n" +
        "    <ion-grid>\n" +
        "        <ion-row>\n" +
        "            <ion-col col-sm-4 *ngFor=\"let img of imgList\">\n" +
        "                <div class=\"card_temp\" (click)=\"imgClicked(img)\">\n" +
        "                    <img src=\"{{img.src}}\">\n" +
        "                    <p style=\"font-size: 9px\">{{img.title}}</p>\n" +
        "                </div>\n" +
        "            </ion-col>\n" +
        "        </ion-row>\n" +
        "    </ion-grid>\n" +
        "</ion-content>";

    static templateUrl:string = "./assets/widgets/critical-urls-widget/CriticalUrlsWidget.html";

    height:number = 200;
    width:number = 220;

    imgList:any[] = [];

    statusText:string = "";
    statusColor:string = "";
    okText:string = "";

    constructor()
    {
        super();
    }

    onInit()
    {
        this.name = "Critical Urls";
        this.statusText = "No Data";
        this.statusColor = "#F1F1F1";
        this.okText = "Everything's cool.";

    }

    onReload()
    {
        let img:string = "";
        let title:string = "";
        let image:string = "";

        if(!this.summary || !this.monitoringUrls || !this.config) return;
        if(!this.summary.urls) return;

        console.log("on reload");

        this.statusText = this.summary.level;
        if(!Array.isArray(this.summary.urls)) this.okText = "No connection";
        if(this.statusText === "No Data")     this.okText = "No connection";

        for(let j:number = 0; j < this.monitoringUrls.length; j++) {
            this.monitoringUrls[j].urls.find((element) => {
                if (this.summary.urls.indexOf(element.name) > -1) {
                    img = element.thumbnail;
                    title = element.name;
                    image = element.image;
                    console.log("IMG: " + img);
                    this.imgList.push({src: img, title: title, image: image});
                }
            });
        }

        for (let i = 0; i < this.config.status.length; i++) {
            if (this.config.status[i].name === this.statusText) {
                this.statusColor = this.config.status[i].color;
                this.statusColor = super.getColor(this.statusColor);
            }
        }
    }

    imgClicked(img:any)
    {
        console.log(img.src);
        this.openImageView({ name: img.title, image: img.image })
    }
}
