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
import {ConfigPage} from "../pages/modals/config/config";
import {InstancesComponent} from "../pages/modals/config/instances.component";
import {ModalPage} from "../pages/modals/config/modal";
import {DataModel} from "../data/DataModel";
import {IonicStorageModule} from "@ionic/storage";
import {ClassicalDataModel} from "../pages/analyzer/hf-classical/ClassicalDataModel";
import {HFCategoriesPage} from "../pages/analyzer/hf-classical/hf-categories";
import {HFModulesPage} from "../pages/analyzer/hf-classical/hf-modules";
import {AnalyzerPage2} from "../pages/analyzer/analyzer2";
import {ConnectionErrorPage} from "../pages/modals/error/connection-error";
import {SSHTerminalPage} from "../pages/modals/ssh/ssh-terminal";
import {PassModal} from "../pages/modals/ssh/pass-modal";
import {HomePage, WidgetCard} from "../pages/home/home";
import {HttpClientModule} from "@angular/common/http";
import {AbsoluteDrag} from "../directives/absolute-drag/AbsoluteDrag";
import {Position} from "../directives/position/Position";

@NgModule({
    declarations: [
        HappyFaceApp,
        TabsPage,
        MonitoringPage,
        MonitoringWebviewPage,
        AnalyzerPage,
        AnalyzerPage2,
        AnalyzerDetailPage,
        ControllerPage,
        ControllerDetailPage,
        VisualizersPage,
        LogsPage,
        HumansPage,
        ConfigPage,
        ModalPage,
        InstancesComponent,
        WorkingPage,
        ConnectionErrorPage,
        SSHTerminalPage,
        PassModal,
        HFCategoriesPage,
        HFModulesPage,
        HomePage,
        AbsoluteDrag,
        Position,
        WidgetCard,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
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
        AnalyzerPage2,
        AnalyzerDetailPage,
        ControllerPage,
        ControllerDetailPage,
        VisualizersPage,
        LogsPage,
        HumansPage,
        ConfigPage,
        ModalPage,
        InstancesComponent,
        WorkingPage,
        ConnectionErrorPage,
        SSHTerminalPage,
        PassModal,
        HFCategoriesPage,
        HFModulesPage,
        HomePage,
        WidgetCard
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataModel,
        ClassicalDataModel,
        HttpClientModule
    ]
})
export class AppModule {}
