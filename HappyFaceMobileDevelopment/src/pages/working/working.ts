import {Component} from "@angular/core";
import {DataModel} from "../../data/DataModel";
//import {DataSearch} from "../../data/DataSearch";

@Component({
    selector: 'page-working',
    templateUrl: 'working.html'
})

export class WorkingPage
{
    //search:DataSearch = null;
    //data:any[] = [];
    //searchContent:string = "";

    //isLoading:boolean = true;

    constructor(private model:DataModel) {}

    ngOnInit()
    {
        //this.model.addLoadingFinishedCallback(this.loadingFinished.bind(this));
        //if(!this.model.isLoading()) this.loadingFinished();
    }

    loadingFinished()
    {
        //this.isLoading = false;
        //this.search = new DataSearch(this.model);
        //console.log("PROD: " + JSON.stringify(this.search.searchData));
        //this.data = this.search.searchData;
        //if(this.searchContent !== "") this.data = this.search.search(this.searchContent);
    }

    searchData(event:any)
    {
        //this.data = this.search.searchData;
        //let val:string = event.target.value;
        //if(val && val.trim() !== '')
        //{
        //    this.data = this.search.search(val);
        //}
        //this.searchContent = val;
    }

}
