export class DataModel
{
    // Singletone
    private static _instance:DataModel = null;
    public  static getInstance() { if(this._instance == null) return (this._instance = new DataModel()); else return this._instance;}
    // { return this._instance || (this._instance = new DataModel()); };

    // Debug switches
    static FORCE_LOAD_LOCAL_META_META_FILE:boolean = false;
    static FORCE_MOBILE:boolean = false;

    // Seed node
    SEED_META_META_HOST:string = "141.5.108.30";
    SEED_META_META_MOBILE_PORT:string = "20110";
    SEED_META_META_WEB_PORT:string = "10110";
    SEED_META_META_DIR:string = "sites/default";
    SEED_META_META_JSON:string = "meta-meta.json";

    // Locations
    static configJson:string = "config.json";
    static monitoringUrlsJson:string = "monitoring-urls.json";
    static systemsJson:string = "systems.json";
    static visualizersJson:string = "visualizers.json";
    static logsJson:string = "logs.json";
    static humansJson:string = "humans.json";
    static meta_meta_json:string = "meta-meta.json";
    static summaryJson:string = "index/latest/summary.json";

    // Data
    metaMetaSites:any;
    host:string = "141.5.108.30"; // HOST and PORT have initial values due to the third option in constructor
    port:string = "20200";        // NOTE: This might get fixed (=removed) in the future
    dir :string = "sites/default";

    config         :any = null;
    monitoringUrls :any = null;
    summary        :any = null;
    systems        :any = null;
    visualizers    :any = null;
    logs           :any = null;
    humans         :any = null;

    __backup        :InstanceObject = new InstanceObject();
    currentlyActive :InstanceObject = new InstanceObject();

    constructor() {
        this.reload();
    }

    static loadJSON(host:string, port:string, dir:string, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
    {
      let url:string = "";
      //let jsonContent:string = "";

      if(host === "localhost") url = dir + "/" + json;
      else url = "http://" + host + ":" + port + "/" + dir + "/" + json;

      console.log("READING: " + url);

      this.readFileAsync(url, callback, errCallback);
    }

    static loadJsonByConfig(config:ConfigObject, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
    {
      //ConfigReader.loadJSON(ConfigReader.current.host, (this.isMobilePlatform() ? ConfigReader.current.mobile_port : ConfigReader.current.web_port),
      //            config.data_dir, json, callback, errCallback);
      if(config.dir == null || config.dir == undefined) { config.dir = "sites/default"; console.log("USING REPLACEMENT FOR CONFIG.DIR"); }
      this.loadJSON(DataModel.getInstance().currentlyActive.host, DataModel.getInstance().currentlyActive.mobile_port, config.dir, json, callback, errCallback);

    }

    static readFileAsync(url:string, callback: (response:any) => void, errCallback: (response:any) => void)
    {
        let req:XMLHttpRequest = new XMLHttpRequest();
        try {
            req.addEventListener("load", (event) => { callback(req.response); });
            req.addEventListener("error", (event) => { errCallback(req.response); });
            req.open("GET", url, false);
            req.send();
        } catch(error) {
            console.log("ERROR occurred: ", error);
            errCallback(error);
        }
    }

    // Asynchronous file loading
    private loadingFinishedCallbacks:( () => void )[] = [];
    private loading:boolean = false;

    addLoadingFinishedCallback(callback: () => void) { this.loadingFinishedCallbacks.push(callback); }
    removeLoadingFinishedCallback(callback: () => void) {
        this.loadingFinishedCallbacks = this.loadingFinishedCallbacks.filter(obj => obj !== callback);
    }

    isLoading() { return this.loading; }

    reload()
    {
        this.loading = true;
        let urls:string[] = [ DataModel.configJson, DataModel.monitoringUrlsJson, DataModel.systemsJson, DataModel.visualizersJson,
                              DataModel.logsJson, DataModel.humansJson, DataModel.meta_meta_json, DataModel.summaryJson ];

        // Find data_dir for summary JSON TODO Improve. This configuration is not secure
        let summary_data_dir:string = "data/" + this.currentlyActive.name; //this.currentlyActive.dir.replace("sites", "data");

        for(let i:number = 0; i < urls.length; i++) {
            if(this.currentlyActive.host === "localhost") urls[i] = this.currentlyActive.dir + "/" + urls[i];
            else urls[i] = "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/" +  //TODO Mobile Port is still the only used one.
                (i == urls.length -1 ? summary_data_dir : this.currentlyActive.dir) + "/" + urls[i];
        }

        this.readFileListAsync(urls, this.finishingCallback.bind(this));
    }

    readFileListAsync(urls:string[], callback: (responses:any[], statusCodes:number[]) => void)
    {
        let results:any[] = new Array(urls.length);
        let statusCodes:number[] = new Array(urls.length);
        let remainingCounter:number = urls.length;

        for(let i:number = 0; i < urls.length; i++)
        {
            console.log("READING: " + urls[i]);
            let req = new XMLHttpRequest();
            req.onreadystatechange = (function (i, req) {
                return function (event) {
                    if(req.readyState == 4) {
                        results[i] = req.response;
                        statusCodes[i] = req.status;
                        remainingCounter--;
                        if(remainingCounter == 0) callback(results, statusCodes);
                    }
                };
            }(i, req));
            req.open("GET", urls[i], true);
            req.send();
        }
    }

    finishingCallback(responses:any[], statusCodes:number[])
    {
        //console.log("THIS: " + JSON.stringify(this));
        if(statusCodes[0] == 200) this.config = JSON.parse(responses[0]);
        else this.config = null;

        if(statusCodes[1] == 200) this.monitoringUrls = JSON.parse(responses[1]);
        else this.monitoringUrls = null;

        if(statusCodes[2] == 200) this.systems = JSON.parse(responses[2]);
        else this.systems = null;

        if(statusCodes[3] == 200) this.visualizers = JSON.parse(responses[3]);
        else this.visualizers = null;

        if(statusCodes[4] == 200) this.logs = JSON.parse(responses[4]);
        else this.logs = null;

        if(statusCodes[5] == 200) this.humans = JSON.parse(responses[5]);
        else this.humans = null;

        if(statusCodes[6] == 200) this.metaMetaSites = JSON.parse(responses[6]);
        else this.metaMetaSites = null;

        if(statusCodes[7] == 200) this.summary = JSON.parse(responses[7]);
        else this.summary = null;

        this.loading = false;

        //console.log(JSON.stringify(this));

        for(let i:number = 0; i < this.loadingFinishedCallbacks.length; i++)
        {
            this.loadingFinishedCallbacks[i]();
        }
    }


    // Asynchronous load JSON file
    asyncLoadFile(url:string, callback: (jsonContent:any, statusCode:number) => void)
    {
        console.log("READING: " + url);
        let req = new XMLHttpRequest();
        req.onreadystatechange = function (event:Event) {
            if(req.readyState == 4)
            {
                callback(req.response, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    }

    // Getters
    getRemoteURL()
    {
        return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/";
    }

    isHttpURL(url:string)
    {
        return new RegExp('^(http|https)(:\\/\\/)').test(url);
    }
}

export class ConfigObject
{
    myname:string = "";
    site:string = "";
    site_name:string = "";
    port:string = "";
    dir:string = "";
    data_dir:string = "";
    analysis_image_size:string = "";
    keep_data_days:string = "";
    log_level:string = "";
    firefox_profile:string = "";
    status:StatusObject[] = [];
}

export class StatusObject
{
    name:string = "";
    color:string = "";
    file:string = "";
}

export class InstanceObject
{
    name:string = "GoeGrid";
    host:string = "141.5.108.30";
    web_port:string = "10200";
    mobile_port:string = "20200";
    dir:string = "sites/default"; // sites/GoeGrid

    changeActive(name:string, host:string, web_port:string, mobile_port:string, dir:string)
    {
        DataModel.getInstance().__backup = DataModel.getInstance().currentlyActive;
        this.name = name;
        this.host = host;
        this.web_port = web_port;
        this.mobile_port = mobile_port;
        this.dir = dir;
    }
}
