export class DataSearch
{
    searchData:any[] = [];
    data:string = "Hallo Welt";

    constructor()
    {
        //this.prodSearchData();
    }

    search(str:string):any[]
    {
        console.log("STR: " + str );
        let result:any[] = [];
        this.searchData.filter((data:any) => { if(data.name.toLowerCase().includes(str.toLowerCase())) result.push(data) } );
        return result;
    }
}
