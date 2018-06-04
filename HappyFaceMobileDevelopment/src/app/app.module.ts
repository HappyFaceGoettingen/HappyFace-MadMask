import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HappyFaceApp } from './app.component';
import {TabsPage} from "../pages/tabs/tabs";
import {MonitoringPage} from "../pages/monitoring/monitoring";
import {MonitoringWebviewPage} from "../pages/monitoring/monitoring-webview";
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
import {AnalyzerPage} from "../pages/analyzer/analyzer";
import {ConnectionErrorPage} from "../pages/modals/error/connection-error";
import {SSHTerminalPage} from "../pages/modals/ssh/ssh-terminal";
import {PassModal} from "../pages/modals/ssh/pass-modal";
import {InstancesBrowserComponent} from "../pages/modals/config/instances.browser.component";
import {AboutPage} from "../pages/modals/about/about";
import {WidgetCard} from "../pages/home/WidgetLoader";
import {HomeDetailImagePage} from "../pages/home/home-detail-image";
import {HttpClientModule} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Position} from "../directives/position/Position";
import {TourPage} from "../pages/tour/tour";
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";
import {HomePage} from "../pages/home/home";
import {HomePage2} from "../pages/home/_home";

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
        InstancesBrowserComponent,
        AboutPage,
        WorkingPage,
        ConnectionErrorPage,
        SSHTerminalPage,
        PassModal,
        HFCategoriesPage,
        HFModulesPage,
        TourPage,
        HomePage,
        Position,
        WidgetCard,
        HomeDetailImagePage,
        HomePage2
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(HappyFaceApp, {}, {
            links: [
                { component: HomePage, name: 'home', segment: 'home' },
                { component: AnalyzerPage, name: 'analyzer', segment: 'analyzer' },
                { component: ControllerPage, name: 'controller', segment: 'controller' },
                { component: LogsPage, name: 'logs', segment: 'logs' },
                { component: MonitoringPage, name: 'monitoring', segment: 'monitoring' },
                { component: TabsPage, name: 'tab', segment: 'tab' },
                { component: VisualizersPage, name: 'visualizers', segment: 'visualizers' }
            ]
        }),
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
        InstancesBrowserComponent,
        AboutPage,
        WorkingPage,
        ConnectionErrorPage,
        SSHTerminalPage,
        PassModal,
        HFCategoriesPage,
        HFModulesPage,
        TourPage,
        HomePage,
        WidgetCard,
        HomeDetailImagePage,
        HomePage2
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataModel,
        InAppBrowser,
        File,
        FileChooser,
        ClassicalDataModel,
        HttpClientModule
    ]
})
export class AppModule {}
