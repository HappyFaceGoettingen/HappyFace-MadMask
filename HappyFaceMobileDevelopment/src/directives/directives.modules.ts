import { NgModule } from '@angular/core';
import { AbsoluteDrag } from './absolute-drag/AbsoluteDrag';
import { Position } from './position/Position';
@NgModule({
    declarations: [AbsoluteDrag, Position],
    imports: [],
    exports: [AbsoluteDrag, Position]
})
export class DirectivesModule {}
