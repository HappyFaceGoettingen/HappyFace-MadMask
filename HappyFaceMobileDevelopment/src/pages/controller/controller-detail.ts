import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
    selector: 'page-controller-detail',
    templateUrl: 'controller-detail.html'
})

export class ControllerDetailPage
{
    system:any = null;

    constructor(private navParams: NavParams)
    {
        this.system = navParams.get('system');
        if(this.system == null || this.system == undefined)
        {
            this.system = { 'name' : "Galaxy Controller", "text" : "Restart Galaxy: Milky Way?",
                            "img" : "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg",
                            "services": [ {"name": "Restart Mass Portals"}, {"name": "Stop Reapers"} ]};
        }
    }
}