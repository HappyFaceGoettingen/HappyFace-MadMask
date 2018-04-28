import {Component} from "@angular/core";
import {NavController, NavParams, Platform, ViewController} from "ionic-angular";
import {DataModel, InstanceObject} from "../../../data/DataModel";
import {Storage} from "@ionic/storage";

@Component({
    templateUrl: 'instances.component.html'
})

export class InstancesComponent
{
    headURL:string = ""; //http://141.5.108.30:20100/sites/default/meta-meta.json";
    label:string = "";
    isLoading:boolean = false;
    locations: InstanceObject[] = [];
    favorites: InstanceObject[] = [];
    backstack: InstanceObject[] = [];
    current:   InstanceObject = null;
    level:number = 0;
    final_level:number = 2;

    levels:string[] = [ "Cloud", "Region", "Cluster"];
    isIOS:boolean = false;

    constructor(private model: DataModel, private navCtrl:NavController, private plt: Platform, private storage:Storage,
                private navParams: NavParams)
            { this.isIOS = this.plt.is('ios'); }

    ngOnInit()
    {
        this.storage.get('favorites').then((value) => {
            if(!(value == null || value == undefined))
                this.favorites = value;
            else this.favorites = [];
            console.log("FAVORITES: " + JSON.stringify(value));
        });
        /*if(this.model.configuration.get().happyFaceCompatible)
            this.headURL = "http://141.5.108.29:10100/static/sites/default/meta-meta.json";
        else
            this.headURL = "http://141.5.108.29:20100/sites/default/meta-meta.json";
        */
        this.headURL = "http://www.atopion.com/apps/hf/metadata/adc-meta-meta.json";

        this.isLoading = true;
        let req = new XMLHttpRequest();
        req.addEventListener("load",() => {
          this.updateList(req.responseText);
          this.isLoading = false;
        });
        req.open("GET", this.headURL);
        req.send();

        this.label = this.levels[this.level];
    }

    backClicked()
    {
        this.level--;
        this.move(null);
    }

    itemClicked(loc:InstanceObject)
    {
        this.level++;
        this.move(loc);
    }

    move(loc:InstanceObject)
    {
        this.locations = [];
        if(loc != null) this.backstack.push(this.current);
        else loc = this.backstack.pop();
        this.current = loc;
        let url:string = "";

        /*if(this.model.configuration.get().happyFaceCompatible)
        {
            if(this.level <= 0) { this.level = 0; url = this.headURL; }
            else if(this.level == 1) url = "http://" + loc.host + ":" + loc.web_port + "/static/sites/default/meta-meta.json";
            else if(this.level >= 2) url = "http://" + loc.host + ":" + loc.web_port + "/static/sites/default/meta-meta.json";
        }
        else {
            if(this.level <= 0) { this.level = 0; url = this.headURL; }
            else if(this.level == 1) url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
            else if(this.level >= 2) url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        }*/


        if(this.level <= 0) { this.level = 0; url = this.headURL; }
        else {
            if(this.level > this.final_level) this.level = this.final_level;
            if(this.model.configuration.get().happyFaceCompatible)
                url = "http://" + loc.host + ":" + loc.web_port + "/static/sites/default/meta-meta.json";
            else
                url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        }

        this.isLoading = true;
        let req = new XMLHttpRequest();
        req.addEventListener("load",() => {this.updateList(req.responseText); this.isLoading = false});
        req.open("GET", url);
        req.send();
        this.label = this.levels[this.level];
    }

    updateList(str:string)
    {
      let json = JSON.parse(str);

      for(let i:number = 0; i < json.length; i++) {
        let obj: InstanceObject = json[i];
        this.locations.push(obj);
      }
    }

    choose(loc: InstanceObject)
    {
        this.model.currentlyActive = loc;
        this.storage.set('instance', this.model.currentlyActive);
        this.model.reload();
        let viewCtrl:ViewController = this.navParams.get("viewCtrl");
        if(viewCtrl != null || viewCtrl != undefined) viewCtrl.dismiss();
        else this.navCtrl.pop();
    }

    favorite(loc: InstanceObject)
    {
        if(!(this.favorites.indexOf(loc) > -1)) {
            this.favorites.push(loc);
            this.storage.set('favorites', this.favorites);
        }
    }

    unfavorite(loc: InstanceObject)
    {
        if(this.favorites.indexOf(loc) > -1) {
            this.favorites = this.favorites.filter(obj => obj != loc);
            this.storage.set('favorites', this.favorites);
        }
    }
}
