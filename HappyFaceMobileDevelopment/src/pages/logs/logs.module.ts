import {NgModule} from "@angular/core";
import {LogsPage} from "./logs";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        LogsPage
    ],
    imports: [
        IonicModule
    ],
    exports: [
        LogsPage
    ],
    entryComponents: [
        LogsPage
    ]
})
export class LogsModule {}
