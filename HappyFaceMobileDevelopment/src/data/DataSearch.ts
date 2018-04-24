import {DataModel} from "./DataModel";

export class DataSearch
{
    searchData:any[] = [];

    constructor(private model:DataModel)
    {
        this.prodSearchData();
    }

    prodSearchData()
    {
        if(this.model.monitoringUrls == null || this.model.monitoringUrls == undefined) return;
        for(let i:number = 0; i < this.model.monitoringUrls.length; i++)
        {
            for(let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++)
            {
                //console.log("PROD: " + JSON.stringify(this.model.monitoringUrls[i].urls[j]));
                let obj:any = this.model.monitoringUrls[i].urls[j];
                obj["category"] = this.model.monitoringUrls[i].name;
                let index:number = this.searchData.length;
                this.searchData.push(this.model.monitoringUrls[i].urls[j]);
            }
        }
    }

    search(str:string):any[]
    {
        console.log("STR: " + str );
        let result:any[] = [];
        this.searchData.filter((data:any) => { if(data.name.toLowerCase().includes(str.toLowerCase())) result.push(data) } );
        return result;
    }
}
