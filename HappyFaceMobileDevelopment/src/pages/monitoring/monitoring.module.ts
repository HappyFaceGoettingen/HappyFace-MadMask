import {NgModule} from "@angular/core";
import {MonitoringPage} from "./monitoring";
import {IonicModule} from "ionic-angular";
import {HappyFaceApp} from "../../app/app.component";

@NgModule({
    declarations: [
        MonitoringPage
    ],
    imports: [
        IonicModule
    ],
    exports: [
        MonitoringPage
    ],
    entryComponents: [
        MonitoringPage
    ]
})
export class MonitoringModule {}
