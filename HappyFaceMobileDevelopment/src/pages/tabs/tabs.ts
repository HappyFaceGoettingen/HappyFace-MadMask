import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {MonitoringPage} from "../monitoring/monitoring";
import {ControllerPage} from "../controller/controller";
import {LogsPage} from "../logs/logs";
import {VisualizersPage} from "../visualizers/visualizers";
import {HumansPage} from "../humans/humans";
import {WorkingPage} from "../working/working";
import {ConfigPage} from "../modals/config/config";
import {AnalyzerPage} from "../analyzer/analyzer";
import {HomePage} from "../home/home";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
