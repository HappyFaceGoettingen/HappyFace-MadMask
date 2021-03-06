import {Injectable} from "@angular/core";
import {ModalController, Platform} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {TextToSpeech} from "@ionic-native/text-to-speech";
import {ConnectionErrorPage} from "../pages/modals/error/connection-error";
import {SearchData} from "./SearchData";


export var modelCounter:number = 0;

@Injectable()
export class DataModel
{
    // Singletone Deprecated
    // private static _instance:DataModel = null;
    // public  static getInstance() { if(this._instance == null) return (this._instance = new DataModel()); else return this._instance;}
    // { return this._instance || (this._instance = new DataModel()); };

    // Debug switches
    static FORCE_SELFHOST_DEBUG:boolean = false;
    static FORCE_MOBILE_VISION:boolean = false;
    static FORCE_CLIENT_FUNCTION:boolean = false;

    static DISABLE_REQUEST_CACHE_HEADER:boolean = false;
    //static FORCE_LOAD_LOCAL_META_META_FILE:boolean = false;
    //static FORCE_MOBILE:boolean = false;

    // Seed node (unused)
    // SEED_META_META_HOST:string = "141.5.108.30";
    // SEED_META_META_MOBILE_PORT:string = "20110";
    // SEED_META_META_WEB_PORT:string = "10110";
    // SEED_META_META_DIR:string = "sites/default";
    // SEED_META_META_JSON:string = "meta-meta.json";

    // Locations
    static configJson:string = "config.json";
    static monitoringUrlsJson:string = "monitoring-urls.json";
    static systemsJson:string = "systems.json";
    static visualizersJson:string = "visualizers.json";
    static logsJson:string = "logs.json";
    static humansJson:string = "humans.json";
    static meta_meta_json:string = "meta-meta.json";
    static summaryJson:string = "index/latest/summary.json";
    static analysisJson:string = "index/latest/analysis.json";


    // Data
    metaMetaSites:any;
    //host:string = "141.5.108.30"; // HOST and PORT have initial values due to the third option in constructor
    //port:string = "20200";        // NOTE: This might get fixed (=removed) in the future
    //dir :string = "sites/default";

    config         :any = null;
    monitoringUrls :any = null;
    summary        :any = null;
    systems        :any = null;
    visualizers    :any = null;
    logs           :any = null;
    humans         :any = null;
    analysis       :any = null;

    // __backup        :InstanceObject = new InstanceObject(); (unused)
    currentlyActive :InstanceObject = new InstanceObject();

    configuration   :ConfigurationObject = new ConfigurationObject();

    constructor(private plt:Platform, private storage:Storage, private modalCtrl: ModalController, private tts:TextToSpeech) {
        modelCounter++;
        console.log("DataModel creation counter: " + modelCounter);
        this.plt.ready().then(_ => {
            this.findInitialConfiguration();
            this.initLoop();
        });
    }

    // Deprecated
    /*static loadJSON(host:string, port:string, dir:string, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
    {
      let url:string = "";
      //let jsonContent:string = "";

      if(host === "localhost") url = dir + "/" + json;
      else url = "http://" + host + ":" + port + "/" + dir + "/" + json;

      console.log("READING: " + url);

      this.readFileAsync(url, callback, errCallback);
    } */

    // Deprecated
    /* static loadJsonByConfig(config:ConfigObject, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
    {
      //ConfigReader.loadJSON(ConfigReader.current.host, (this.isMobilePlatform() ? ConfigReader.current.mobile_port : ConfigReader.current.web_port),
      //            config.data_dir, json, callback, errCallback);
      if(config.dir == null || config.dir == undefined) { config.dir = "sites/default"; console.log("USING REPLACEMENT FOR CONFIG.DIR"); }
      //this.loadJSON(DataModel.getInstance().currentlyActive.host, DataModel.getInstance().currentlyActive.mobile_port, config.dir, json, callback, errCallback);

    }*/

    /* (unused)
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
    }*/

    // Asynchronous file loading
    private loadingFinishedCallbacks:( () => void )[] = [];
    private loadingStartedCallbacks: ( () => void )[] = [];
    private loading:boolean = false;
    private loadingFailed:boolean = false;

    addLoadingFinishedCallback(callback: () => void) { this.loadingFinishedCallbacks.push(callback); }
    removeLoadingFinishedCallback(callback: () => void) {
        this.loadingFinishedCallbacks = this.loadingFinishedCallbacks.filter(obj => obj !== callback);
    }

    addLoadingStartedCallback(callback: () => void ) { this.loadingStartedCallbacks.push(callback); }
    removeLoadingStartedCallback(callback: () => void) {
        this.loadingStartedCallbacks = this.loadingStartedCallbacks.filter(obj => obj !== callback);
    }

    isLoading() { return this.loading; }

    isLoadingFailed() { return this.loadingFailed; }

    /* Deprecated
    reload2()
    {
        this.loading = true;
        for(let i:number = 0; i < this.loadingStartedCallbacks.length; i++)
        {
            console.log("Started start callback");
            this.loadingStartedCallbacks[i]();
        }

        this.config = this.syncLoadFile(this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel.configJson);

        let urls:string[] = [ DataModel.monitoringUrlsJson, DataModel.systemsJson, DataModel.visualizersJson,
                              DataModel.logsJson, DataModel.humansJson, DataModel.meta_meta_json, DataModel.summaryJson ];

        // Find data_dir for summary JSON TODO Improve. This configuration is not secure
        let summary_data_dir:string = "data/" + this.currentlyActive.name; //this.currentlyActive.dir.replace("sites", "data");

        for(let i:number = 0; i < urls.length; i++) {
            if(this.currentlyActive.host === "localhost") urls[i] = this.currentlyActive.dir + "/" + urls[i];
            else urls[i] = "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/" +  //TODO Mobile Port is still the only used one.
                (i == urls.length -1 ? summary_data_dir : this.currentlyActive.dir) + "/" + urls[i];
        }

        this.readFileListAsync(urls, this.finishingCallback.bind(this));
    }*/

    errors:any[] = [];

    reload()
    {
        this.loading = true;
        this.loadingFailed = false;
        this.errors = [];
        for(let i:number = 0; i < this.loadingStartedCallbacks.length; i++)
        {
            this.loadingStartedCallbacks[i]();
        }
        this.asyncLoadFile(this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel.configJson, this.reload_next.bind(this));
    }

    reload_next(content:any, statusCode:number)
    {
        if(statusCode == 200) this.config = JSON.parse(content);
        else {
            this.errors.push({"url" : this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel.configJson, "code" : statusCode});
            this.initError();
            this.loadingFailed = true;
            this.loading = false;
            for(let i:number = 0; i < this.loadingFinishedCallbacks.length; i++)
            {
                this.loadingFinishedCallbacks[i]();
            }
            return;
        }
        let urls:string[] = [ DataModel.monitoringUrlsJson, DataModel.systemsJson, DataModel.visualizersJson,
            DataModel.logsJson, DataModel.meta_meta_json, DataModel.summaryJson, DataModel.analysisJson ];
        for(let i:number = 0; i < urls.length; i++)
        {
            if(this.currentlyActive.host == "localhost") urls[i] = this.currentlyActive.dir + "/" + urls[i];
            else urls[i] = this.getRemoteURL() + ((i == urls.length -2) || (i == urls.length -1)
                ? this.config.data_dir : this.currentlyActive.dir) + "/" + urls[i];
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
                return function () {
                    if(req.readyState == 4) {
                        results[i] = req.response;
                        statusCodes[i] = req.status;
                        console.log("XHR: (" + urls[i] + "): ", req);
                        remainingCounter--;
                        if(remainingCounter == 0) callback(results, statusCodes);
                    }
                };
            }(i, req));
            req.open("GET", urls[i], true);
            if(!DataModel.DISABLE_REQUEST_CACHE_HEADER)
            {
                req.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
                req.setRequestHeader('cache-control', 'max-age=0');
                req.setRequestHeader('expires', '0');
                req.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
                req.setRequestHeader('pragma', 'no-cache');
            }
            req.send();
        }
    }

    finishingCallback(responses:any[], statusCodes:number[])
    {
        //console.log("THIS: " + JSON.stringify(this));
        //if(statusCodes[0] == 200) this.config = JSON.parse(responses[0]);
        //else this.config = null;

        this.errors = [];

        // Prevent error through missing urls and systems
        if(statusCodes[5] == 200 && responses[5])
            responses[5] = responses[5].replace("__SYSTEMS_ARRAY__", "\"__SYSTEMS_ARRAY__\"").replace("__URLS_ARRAY__", "\"__URLS_ARRAY__\"");

        if(statusCodes[0] == 200) this.monitoringUrls = JSON.parse(responses[0]);
        else { this.monitoringUrls = null; this.pushError(DataModel.monitoringUrlsJson, statusCodes[0]); }

        if(statusCodes[1] == 200) this.systems = JSON.parse(responses[1]);
        else { this.systems = null; this.pushError(DataModel.systemsJson, statusCodes[1]); }

        if(statusCodes[2] == 200) this.visualizers = JSON.parse(responses[2]);
        else { this.visualizers = null; this.pushError(DataModel.visualizersJson, statusCodes[2]); }

        if(statusCodes[3] == 200) this.logs = JSON.parse(responses[3]);
        else { this.logs = null; this.pushError(DataModel.logsJson, statusCodes[3]); }

        /*if(statusCodes[4] == 200) this.humans = JSON.parse(responses[4]);
        else { this.humans = null; this.pushError(DataModel.humansJson, statusCodes[4]); }*/

        if(statusCodes[4] == 200) this.metaMetaSites = JSON.parse(responses[4]);
        else { this.metaMetaSites = null; this.pushError(DataModel.meta_meta_json, statusCodes[4]); }

        if(statusCodes[5] == 200) this.summary = JSON.parse(responses[5]);
        else { this.summary = null; this.pushError(DataModel.summaryJson, statusCodes[5]); }

        if(statusCodes[6] == 200) this.analysis = JSON.parse(responses[6]);
        else { this.analysis = null; this.pushError(DataModel.analysisJson, statusCodes[6])}

        this.loading = false;
        this.loadingFailed = this.errors.length > 6;

        if(this.loadingFailed)
        {
            this.loading = false;
            this.initError();
        }

        for(let i:number = 0; i < this.loadingFinishedCallbacks.length; i++)
        {
            this.loadingFinishedCallbacks[i]();
        }

        let d = new SearchData(this);
        d.updateData();
    }

    // Asynchronous load file
    asyncLoadFile(url:string, callback: (content:any, statusCode:number) => void)
    {
        console.log("READING: " + url);
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if(req.readyState == 4)
            {
                callback(req.response, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    }

    // Synchronous load JSON file (for config)
    syncLoadFile(url:string)
    {
        console.log("Loading: " + url);
        let result:any = null;
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if(req.readyState == 4)
            {
                result = JSON.parse(req.response);
            }
        };
        req.onerror = () => { console.log("ERROR LOADING FILE SYNC."); result = null;};
        req.open("GET", url, false);
        req.send();
        return result;
    }

    initError()
    {
        let preset:boolean = this.configuration.get().automaticFetch;
        this.configuration.setAutomaticFetch(false);
        console.log("ERROR initialized");
        const modal = this.modalCtrl.create(ConnectionErrorPage,
            {"host": this.currentlyActive.host, "mport": this.currentlyActive.mobile_port,
                "wport": this.currentlyActive.web_port, "errors" : this.errors});
        modal.onDidDismiss(data => {
            if(!(data == null || data == undefined || data.retry == null || data.retry == undefined) && data.retry) {
                this.currentlyActive.host = data.host;
                this.currentlyActive.web_port = data.wport;
                this.currentlyActive.mobile_port = data.mport;
                this.reload();
                this.configuration.setAutomaticFetch(preset);
                if(data.save != null || data.save != undefined || data.save)
                    this.storage.set('instance', this.currentlyActive);
            }
            else {
                this.configuration.setAutomaticFetch(preset);
            }
        });
        modal.present();
    }

    // Helpers
    getRemoteURL()
    {
        if(this.configuration.get().happyFaceCompatible)
            return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.web_port + "/" + "static/";
        else
            return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/";
    }

    isHttpURL(url:string)
    {
        return new RegExp('^(http|https)(:\\/\\/)').test(url);
    }

    pushError(website:string, code:number)
    {
        this.errors.push({"url" : this.getRemoteURL() + this.currentlyActive.dir + "/" + website, "code" : code})
    }

    private plot_name:string = "analysis";

    async setLinks(datetime_dir) {
        if(!this.config) return;
        //let model:DataModel = DataModel.getInstance();
        let remote_url:string = this.getRemoteURL();
        let config:any = this.config;

        let capture_dir:string = config.data_dir + "/capture";
        let thumbnail_dir:string = config.data_dir + "/thumbnail";
        let analysis_dir:string = config.data_dir + "/analysis";
        if (this.configuration.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        let plot_analysis_dir:string = analysis_dir + "/plot_analysis/latest";
        let plot_pathway_dir:string = analysis_dir + "/plot_pathway/latest";

        for (let i: number = 0; i < this.monitoringUrls.length; i++) {
            for (let j: number = 0; j < this.monitoringUrls[i].urls.length; j++) {
                if ((this.monitoringUrls[i].urls[j].file_prefix == null)) {
                    this.monitoringUrls[i].urls[j].thumbnail = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].image = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].analysis_plot = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].plot_pathway = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "assets/img/img-missing.svg";
                } else {
                    this.monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";

                    this.setPlots(this.plot_name);
                }
            }
        }
    }

    setPlots(plot_name:string){
        for (let i:number = 0; i < this.monitoringUrls.length; i++) {
            for (let j:number = 0; j < this.monitoringUrls[i].urls.length; j++) {
                if ((this.monitoringUrls[i].urls[j].file_prefix == null)){
                    console.log("DEBUG: nop");
                } else {
                    if (plot_name == "analysis" ) this.monitoringUrls[i].urls[j].analysis_plot = this.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway" ) this.monitoringUrls[i].urls[j].analysis_plot = this.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway" ) this.monitoringUrls[i].urls[j].analysis_plot = this.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    }

    getPathwayPath()
    {
        return this.getRemoteURL() + this.config.data_dir + "/analysis/" + "plot_pathway/latest" + "/";
    }


    speakSummary()
    {
        if(this.configuration == null || this.summary == null || this.summary.text == null) return;
        if(this.configuration == undefined || this.summary == undefined || this.summary.text == undefined) return;
        if (this.configuration.get().enableTextSpeech)
        {
            const speechrate:number = (this.isiOS() ? 1.65 : 0.95);
            if(this.isiOS() || this.isAndroid())
            {
                if((<any>window).tts != null || (<any>window).tts != undefined)
                {
                    console.log("USING window.tts");
                    (<any>window).tts.speak({
                        text: this.summary.text,
                        locale: "en-GB",
                        rate: speechrate
                    })
                }
                else if(this.tts)
                {
                    console.log("USING this tts");
                    this.tts.speak({
                        text: this.summary.text,
                        locale: "en-US",
                        rate: speechrate
                    })
                }
                else {
                    try { new SpeechSynthesisUtterance(); }
                    catch(error) {
                        console.log("SpeechSynthesisUtterance not found. No voiceout possible. NOTE: SpeechSynthesis is not available in Firefox on Android");
                        return;
                    }
                    console.log("USING SpeechSynthesisUtterance");
                    let u = new SpeechSynthesisUtterance();
                    u.text = this.summary.text;
                    u.lang = 'en-GB';
                    u.rate = speechrate;
                    speechSynthesis.speak(u);
                }
            }
            else {
                try { new SpeechSynthesisUtterance(); }
                catch(error) {
                    console.log("SpeechSynthesisUtterance not found. No voiceout possible. NOTE: SpeechSynthesis is not available in Firefox on Android");
                    return;
                }
                console.log("USING SpeechSynthesisUtterance");
                let u = new SpeechSynthesisUtterance();
                u.text = this.summary.text;
                u.lang = 'en-GB';
                u.rate = speechrate;
                speechSynthesis.speak(u);
            }
        }
    }


    // Loop
    loopHandler:number = null;
    loopCounter:number = 0;

    initLoop()
    {
        if(this.configuration.get().automaticFetch && this.configuration.get().enableTextSpeech) // List all loop content with &&
        {
            this.loopHandler = window.setInterval(() =>
            {
                this.loopCounter++;
                // List all loop dependent configurations as if (like in automaticFetch below)
                if(this.configuration.get().automaticFetch && (this.loopCounter % this.configuration.get().reloadInterval == 0))
                    this.reload();

                if(this.configuration.get().enableAutoReadout && (this.loopCounter % this.configuration.get().speakInterval == 0))
                    this.speakSummary();

            }, 60000);
        }
    }

    updateLoop()
    {
        if(!this.loopHandler == null) clearInterval(this.loopHandler);
        this.initLoop();
    }

    // Initial configuration
    findInitialConfiguration()
    {
        // App running on a webserver:
        /* Deprecated
        console.log("SELFHOST: " + this.isHost() );
        if(this.isHost())
        {
            this.currentlyActive.host = window.location.hostname;
            this.currentlyActive.mobile_port = window.location.port;
            this.currentlyActive.web_port = window.location.port;
            this.currentlyActive.dir = "sites/default";

            console.log("POSITION: " + window.location.hostname + ":" + window.location.port);
            /*this.loadConfig();
            this.currentlyActive.name = this.config.site_name;
            //this.reload();
        }
        // App running on a clients device
        else {
            // Initial configuration
            this.currentlyActive.name = "GoeGrid";
            this.currentlyActive.host = "141.5.108.30";
            this.currentlyActive.mobile_port = "20200";
            this.currentlyActive.web_port = "10200";
            this.currentlyActive.dir = "sites/default";

        }

        this.storage.get('instance').then((value) => {
            if(value !== null && value !== undefined)
                this.currentlyActive = value;
            console.log("Saved Instance is: " + JSON.stringify(value));
            console.log("Running instance: " + JSON.stringify(this.currentlyActive));
            this.reload();
        }); */

        if(!this.isCordova())
        {
            this.currentlyActive.name = window.location.hostname;
            this.currentlyActive.host = window.location.hostname;
            this.currentlyActive.mobile_port = window.location.port;
            this.currentlyActive.dir = "sites/default";

            if(parseInt(window.location.port) >= 20000)
                this.currentlyActive.web_port = (parseInt(window.location.port) - 10000).toString();
            else this.currentlyActive.web_port = window.location.port;

            console.log("Position: " + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port);

            this.reload();
        }
        else {
            // Initial configuration
            this.currentlyActive.name = "ADC";
            this.currentlyActive.host = "141.5.108.30";
            this.currentlyActive.mobile_port = "20100";
            this.currentlyActive.web_port = "10100";
            this.currentlyActive.dir = "sites/default";

            this.storage.get('instance').then((value) => {
                if(value !== null && value !== undefined) this.currentlyActive = value;

                console.log("Using saved instance: " + JSON.stringify(this.currentlyActive));
                this.reload();
            });
        }
    }

    // Determinations.
    // isMobilePhone() is used to rearrange the UI based on the smaller screen size on mobile phones
    // isHost() is used to add/remove functions unnecessary on mobile phone / browser
    // NOTE: isHost() is based on whether or not the mobile phone application is used because browsers are most likely connected to a remote host.

    // Determine if screen size fits to a mobile device. NOTE: This doesn't say anything about device native functions
    isMobilePhone()
    {
        return DataModel.FORCE_MOBILE_VISION || !this.plt.is('core');
    }

    // Determine whether this instance should show content hosted by itself or should connect to a remote host
    // NOTE: connect to host is most likely true for mobile applications and self hosted content is most likely true for browser applications
    isHost()
    {
        return (!DataModel.FORCE_CLIENT_FUNCTION) &&
            (DataModel.FORCE_SELFHOST_DEBUG || this.plt.is('core') || this.plt.is('mobileweb'));
    }

    isAndroid()
    {
        return this.plt.is('android');
    }

    isiOS()
    {
        return this.plt.is('ios');
    }

    isCordova()
    {
        return DataModel.FORCE_CLIENT_FUNCTION || this.plt.is('cordova');
    }

    /* Deprecated
    isMobileApp()
    {
        if(this.plt.is('core')) return false;
        else if(this.plt.is('android')) return true;
        else if(this.plt.is('ios')) return true;
        else if(this.plt.is('ipad')) return true;
        else if(this.plt.is('iphone')) return true;
        else if(this.plt.is('phablet')) return true;
        else if(this.plt.is('tablet')) return true;
        else return false;
    }

    isSelfServing()
    {
        // this has to be better in the future
        let knownHosts:string[] = ["141.5.108.30", "141.5.108.29"];

        let ownIP:string = "";
        let req:XMLHttpRequest = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if(req.readyState == 4 && req.status == 200) ownIP = req.response;
        };
        req.open("GET", "https://api.ipify.org", false);
        req.send();

        console.log("OWN IP: " + ownIP);
        return knownHosts.indexOf(ownIP) > -1;
    }*/
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
    name:string = ""; //"GoeGrid";
    host:string = ""; //"141.5.108.30";
    web_port:string = ""; //"10200";
    mobile_port:string = ""; //"20200";
    dir:string = ""; //"sites/default"; // sites/GoeGrid

    /*changeActive(name:string, host:string, web_port:string, mobile_port:string, dir:string)
    {
        DataModel.getInstance().__backup = DataModel.getInstance().currentlyActive;
        this.name = name;
        this.host = host;
        this.web_port = web_port;
        this.mobile_port = mobile_port;
        this.dir = dir;
    }*/
}

export class ConfigurationObject
{
    private _automaticFetch:boolean = false;
    private _reloadInterval:number = 10;
    private _automaticRotation:boolean = false;
    private _detectOnlyChange:boolean = true;
    private _enableMadVision:boolean = true;
    private _enableTextSpeech:boolean = true;
    private _enableAutoReadout:boolean = false;
    private _speakInterval:number = 10;
    private _happyFaceCompatible:boolean = true;

    get() {
        return {
            "automaticFetch" : this._automaticFetch,
            "reloadInterval" : this._reloadInterval,
            "automaticRotation" : this._automaticRotation,
            "detectOnlyChange" : this._detectOnlyChange,
            "enableMadVision": this._enableMadVision,
            "enableTextSpeech" : this._enableTextSpeech,
            "enableAutoReadout" : this._enableAutoReadout,
            "speakInterval" : this._speakInterval,
            "happyFaceCompatible" : this._happyFaceCompatible
        }
    }

    setAutomaticFetch(value: boolean) {this._automaticFetch = value;}
    setReloadInterval(value: number) {this._reloadInterval = value;}
    setAutomaticRotation(value: boolean) {this._automaticRotation = value;}
    setDetectOnlyChange(value: boolean) {this._detectOnlyChange = value;}
    setEnableMadVision(value: boolean) {this._enableMadVision = value;}
    setEnableTextSpeech(value: boolean) {this._enableTextSpeech = value;}
    setEnableAutoReadout(value: boolean) {this._enableAutoReadout = value; }
    setSpeakInterval(value: number) {this._speakInterval = value;}
    setHappyFaceCompatible(value: boolean) {this._happyFaceCompatible = value;}
}
