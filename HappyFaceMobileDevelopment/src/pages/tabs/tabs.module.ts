import {NgModule} from "@angular/core";
import {TabsPage} from "./tabs";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        TabsPage
    ],
    imports: [
        IonicModule
    ],
    exports: [
        TabsPage
    ],
    entryComponents: [
        TabsPage
    ]
})

export class TabsModule {}
