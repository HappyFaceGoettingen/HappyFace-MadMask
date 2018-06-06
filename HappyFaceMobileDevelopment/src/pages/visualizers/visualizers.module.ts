import {NgModule} from "@angular/core";
import {VisualizersPage} from "./visualizers";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        VisualizersPage
    ],
    imports: [
        IonicModule
    ],
    exports: [
        VisualizersPage
    ],
    entryComponents: [
        VisualizersPage
    ]
})
export class VisualizersModule {}
