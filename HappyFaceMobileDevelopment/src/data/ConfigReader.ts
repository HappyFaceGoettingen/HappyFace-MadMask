import {ConfigObject} from "./ConfigObject";
import {Current, currentlyActive} from "./Current";

export class ConfigReader
{
    // Import (unused)
    //static current = Current.active;

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

    // Callbacks
    initFinished:any = null;

    constructor()
    {
        if(ConfigReader.FORCE_LOAD_LOCAL_META_META_FILE)
          ConfigReader.loadJSON("localhost", "8111", "sites/default", ConfigReader.meta_meta_json,
            (response:any) => {
                this.metaMetaSites = JSON.parse(response);
                this.host = this.metaMetaSites[0].host;
                this.port = this.metaMetaSites[0].mobile_port;
                this.dir  = this.metaMetaSites[0].dir;
                if(this.dir == undefined) this.dir = "sites/default";
            },
            (response) => { console.log("READING ERROR")});

        else if(ConfigReader.isMobilePlatform())
          ConfigReader.loadJSON(this.SEED_META_META_HOST, this.SEED_META_META_MOBILE_PORT, this.SEED_META_META_DIR, this.SEED_META_META_JSON,
            (response:any) => {
                this.metaMetaSites = JSON.parse(response);
                this.host = this.metaMetaSites[0].host;
                this.port = this.metaMetaSites[0].mobile_port;
                this.dir  = this.metaMetaSites[0].dir;
            },
            (response:any) => { console.log("READING ERROR"); });

        else ConfigReader.loadJSON(this.host, this.port, "sites/default", ConfigReader.meta_meta_json,
            (response:any) => {
                this.metaMetaSites = JSON.parse(response);
                for(let i:number; i < this.metaMetaSites.length; i++) {
                  if(this.metaMetaSites[i].host == this.host && this.metaMetaSites[i].port == this.port) {
                    this.dir = this.metaMetaSites[i].dir;
                    break;
                } }
            },
            (response:any)=> { console.log("READING ERROR"); });

        ConfigReader.loadJSON(this.host, this.port, this.dir, ConfigReader.configJson, this.initByConfig.bind(this),
          (response:any)=> { console.log("READING ERROR"); });
    }

    initByConfig(response:any)
    {
        this.config = JSON.parse(response);
        this.config.dir = this.dir;

        ConfigReader.loadJsonByConfig(this.config, ConfigReader.monitoringUrlsJson, (response:any) => { this.monitoringUrls = JSON.parse(response);},
          (response:any)=> { console.log("READING ERROR"); });

        ConfigReader.loadJsonByConfig(this.config, ConfigReader.systemsJson, (response:any) => { this.systems = JSON.parse(response);},
          (response:any)=> { console.log("READING ERROR"); });

        ConfigReader.loadJsonByConfig(this.config, ConfigReader.visualizersJson, (response:any) => { this.visualizers = JSON.parse(response);},
          (response:any)=> { console.log("READING ERROR"); });

        ConfigReader.loadJsonByConfig(this.config, ConfigReader.logsJson, (response:any) => { this.logs = JSON.parse(response);},
          (response:any)=> { console.log("READING ERROR"); });

        ConfigReader.loadJsonByConfig(this.config, ConfigReader.humansJson, (response:any) => { this.humans = JSON.parse(response);},
          (response:any)=> { console.log("READING ERROR"); });

        if(this.config.data_dir == null) this.config.data_dir = "data/ADC";

        ConfigReader.loadJSON(this.host, this.port, "", this.config.data_dir + "/index/latest/summary.json",
          (response:any) => { this.summary = JSON.parse(response);},
          (response:any)=> { console.log("READING ERROR"); });

        if(!this.initFinished == null) this.initFinished();
    }

    // To be executed once the initalisation finished, i.e. once everything is loaded
    setInitFinished(callback: () => void)
    {
        this.initFinished = callback;
    }

    // Reloads everything to new currentlyActive
    reload()
    {
        this.host = currentlyActive.host;
        this.port = currentlyActive.mobile_port;
        this.dir  = currentlyActive.dir;
        ConfigReader.loadJSON(this.host, this.port, this.dir, ConfigReader.configJson, this.initByConfig.bind(this),
          (response:any)=> { console.log("READING ERROR"); });
    }


    /*
      Loads a JSON file from the given remote webserver. Asynchronous !!!!
      callback is executed once the loading is finished
     */
    static loadJSON(host:string, port:string, dir:string, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
    {
        let url:string = "";
        let jsonContent:string = "";

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
        ConfigReader.loadJSON(currentlyActive.host, currentlyActive.mobile_port, config.dir, json, callback, errCallback);

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

    static isMobilePlatform()
    {
        if(ConfigReader.FORCE_MOBILE) return true;
        return (navigator.userAgent.match(/android|iPhone|iPad|iPod/i));
    }

    /*
        Checks whether the string str starts with http:// | https://
     */
    static isHttpUrl(str:string)
    {
        return new RegExp('^(http|https)(:\\/\\/)').test(str);
    }

    static getMobileUrl() {
        return "http://" + "141.5.108.30" + ":" + "20200" + "/";
    }
}

var reader = new ConfigReader();
