import {Component} from "@angular/core";
import {ClassicalDataModel} from "./ClassicalDataModel";
import {NavController} from "ionic-angular";
import {HFModulesPage} from "./hf-modules";

@Component({
    selector: "page-hf-categories",
    templateUrl: "hf-categories.html"
})

export class HFCategoriesPage
{
    IMG_HAPPY:string = "assets/arrows/arrow-up.svg";
    IMG_WARNING:string = "assets/arrows/arrow-right.svg";
    IMG_CRITICAL:string = "assets/arrows/arrow-down.svg";
    IMG_ERROR:string = "assets/arrows/cross.svg";

    isLoading:boolean = true;
    outdated:boolean = false;
    outdateHandler:number = 0;
    data_time:string = "sometime";

    categories:any = null;

    constructor(private classicModel:ClassicalDataModel, private navCtrl:NavController) {}

    ngOnInit()
    {
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if(!this.classicModel.isLoading()) this.loadingFinishedListener();
        this.outdateHandler = setInterval(() => { this.outdated = true; }, 1200000);
    }

    loadingFinishedListener()
    {
        this.isLoading = false;
        this.categories = this.classicModel.categories;
        this.data_time = this.classicModel.lastRefreshed.toLocaleString();
    }

    reload()
    {
        clearInterval(this.outdateHandler);
        this.outdateHandler = setInterval(() => { this.outdated = true; }, 1200000);
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if(!this.classicModel.isLoading()) this.loadingFinishedListener();
        this.classicModel.reload();
    }

    imgForCategory(cat:any)
    {
        return cat.status == 1.0 ? this.IMG_HAPPY : (cat.status == 0.5 ? this.IMG_WARNING : (cat.status == 0.0 ? this.IMG_CRITICAL : this.IMG_ERROR));
    }

    categorySelected(cat:any)
    {
        this.navCtrl.push(HFModulesPage, {'category': cat});
    }
}
