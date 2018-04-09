import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";

@Component({
    selector: 'page-humans',
    templateUrl: 'humans.html'
})

export class HumansPage
{
    humans:any[] = [];

    constructor() {}

    ngOnInit()
    {
        DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
    }

    reloadingFinishedCallback()
    {
        this.humans = DataModel.getInstance().humans;
        if(this.humans == null || this.humans == undefined)
        {
            this.humans = [{ "name" : "Commander John Shepard", "img" : "https://yt3.ggpht.com/a-/AJLlDp22ITbg7LJa22ARdZVTVnouLreNJE6M60QYjA=s900-mo-c-c0xffffffff-rj-k-no",
                             "email": "john.shepard@navy.alliace", "tel": "01713387554", "text" : "The chances of surviving are... slim.", "url": ""}];
        }
    }

    openHuman(human:any)
    {
        console.log("HUMAN: " +JSON.stringify(human));
        window.open(human.url, "_system");
    }
}
