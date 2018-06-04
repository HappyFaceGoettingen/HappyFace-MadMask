import {NgModule} from "@angular/core";
import {HomePage} from "./home";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicModule
    ],
    exports: [
        HomePage
    ],
    entryComponents: [
        HomePage
    ]
})
export class HomeModule {}
