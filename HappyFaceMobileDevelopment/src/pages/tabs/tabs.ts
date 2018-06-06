import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MonitoringPage} from "../monitoring/monitoring";
import {ControllerPage} from "../controller/controller";
import {LogsPage} from "../logs/logs";
import {VisualizersPage} from "../visualizers/visualizers";
import {HumansPage} from "../humans/humans";
import {WorkingPage} from "../working/working";
import {ConfigPage} from "../modals/config/config";
import {AnalyzerPage} from "../analyzer/analyzer";
import {HomePage} from "../home/home";
import {TourPage} from "../tour/tour";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'tab'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome      : any = HomePage;
  tabMonitoring: any = MonitoringPage;
  tabAnalyzer  : any = AnalyzerPage;
  tabSystems   : any = ControllerPage;
  tabVisualizer: any = VisualizersPage;
  tabLogs      : any = LogsPage;
  tabHumans    : any = HumansPage;
  tabConfig    : any = ConfigPage;
  tabWorking   : any = WorkingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');

      setTimeout(() => {
          this.storage.get("startup").then((value) => {
              if(value == null || value == undefined || !value){
                  this.storage.set("startup", true);
                  this.navCtrl.push(TourPage, {});
                  console.log("Starting tour");
              }
          })
      }, 500);
  }

}
