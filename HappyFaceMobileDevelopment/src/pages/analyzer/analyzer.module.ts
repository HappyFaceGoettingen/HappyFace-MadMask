import {NgModule} from "@angular/core";
import {AnalyzerPage} from "./analyzer";
import {IonicModule} from "ionic-angular";
import {HappyFaceApp} from "../../app/app.component";

@NgModule({
    declarations: [
        AnalyzerPage
    ],
    imports: [
        IonicModule.forRoot(HappyFaceApp)
    ],
    exports: [
        AnalyzerPage
    ],
    entryComponents: [
        AnalyzerPage
    ]
})

export class AnalyzerModule {}
