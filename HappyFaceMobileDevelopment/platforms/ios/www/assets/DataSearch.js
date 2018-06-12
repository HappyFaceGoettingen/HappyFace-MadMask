var DataSearch = /** @class */ (function () {
    function DataSearch() {
        this.searchData = [];
        this.data = "Hallo Welt";
        //this.prodSearchData();
    }
    DataSearch.prototype.search = function (str) {
        console.log("STR: " + str);
        var result = [];
        this.searchData.filter(function (data) { if (data.name.toLowerCase().includes(str.toLowerCase()))
            result.push(data); });
        return result;
    };
    return DataSearch;
}());
export { DataSearch };
