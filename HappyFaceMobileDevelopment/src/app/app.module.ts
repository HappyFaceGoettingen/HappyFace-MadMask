import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HappyFaceApp } from './app.component';
import {TabsPage} from "../pages/tabs/tabs";
import {MonitoringPage} from "../pages/monitoring/monitoring";
import {MonitoringWebviewPage} from "../pages/monitoring/monitoring-webview";
import {AnalyzerPage} from "../pages/analyzer/analyzer";
import {AnalyzerDetailPage} from "../pages/analyzer/analyzer-detail";
import {ControllerPage} from "../pages/controller/controller";
import {ControllerDetailPage} from "../pages/controller/controller-detail";
import {VisualizersPage} from "../pages/visualizers/visualizers";
import {LogsPage} from "../pages/logs/logs";
import {HumansPage} from "../pages/humans/humans";
import {WorkingPage} from "../pages/working/working";
import {ConfigPage} from "../pages/config/config";
import {InstancesComponent} from "../pages/config/instances.component";
import {ModalPage} from "../pages/config/modal";
import {DataModel} from "../data/DataModel";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
    declarations: [
        HappyFaceApp,
        TabsPage,
        MonitoringPage,
        MonitoringWebviewPage,
        AnalyzerPage,
        AnalyzerDetailPage,
        ControllerPage,
        ControllerDetailPage,
        VisualizersPage,
        LogsPage,
        HumansPage,
        ConfigPage,
        ModalPage,
        InstancesComponent,
        WorkingPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(HappyFaceApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        HappyFaceApp,
        TabsPage,
        MonitoringPage,
        MonitoringWebviewPage,
        AnalyzerPage,
        AnalyzerDetailPage,
        ControllerPage,
        ControllerDetailPage,
        VisualizersPage,
        LogsPage,
        HumansPage,
        ConfigPage,
        ModalPage,
        InstancesComponent,
        WorkingPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataModel
    ]
})
export class AppModule {}
