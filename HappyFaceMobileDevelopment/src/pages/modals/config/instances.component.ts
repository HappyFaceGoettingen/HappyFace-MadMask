import {Component} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import {DataModel, InstanceObject} from "../../../data/DataModel";
import {Storage} from "@ionic/storage";

@Component({
    templateUrl: 'instances.component.html'
})

export class InstancesComponent
{
    headURL:string = "http://141.5.108.30:20100/sites/default/meta-meta.json";
    label:string = "";
    locations: InstanceObject[] = [];
    favorites: InstanceObject[] = [];
    backstack: InstanceObject[] = [];
    current:   InstanceObject = null;
    level:number = 0;

    levels:string[] = [ "Country", "Region", "Server"];
    isIOS:boolean = false;

    constructor(private model: DataModel, private navCtrl:NavController, private plt: Platform, private storage:Storage)
            { this.isIOS = this.plt.is('ios'); }

    ngOnInit()
    {
        this.storage.get('favorites').then((value) => {
            if(!(value == null || value == undefined))
                this.favorites = value;
            else this.favorites = [];
            console.log("FAVORITES: " + JSON.stringify(value));
        });

        let req = new XMLHttpRequest();
        req.addEventListener("load",() => {
          this.updateList(req.responseText);
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

        if(this.level <= 0) { this.level = 0; url = this.headURL; }
        else if(this.level == 1) url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        else if(this.level >= 2) url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";

        let req = new XMLHttpRequest();
        req.addEventListener("load",() => {this.updateList(req.responseText)});
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
        this.navCtrl.pop();
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
