import {NgModule} from "@angular/core";
import {ControllerPage} from "./controller";
import {IonicModule} from "ionic-angular";
import {HappyFaceApp} from "../../app/app.component";

@NgModule({
    declarations: [
        ControllerPage
    ],
    imports: [
        IonicModule.forRoot(HappyFaceApp)
    ],
    exports: [
        ControllerPage
    ],
    entryComponents: [
        ControllerPage
    ]
})
export class ControllerModule {}
