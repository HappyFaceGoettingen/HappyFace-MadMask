import {Directive, Input, ElementRef, Renderer, Renderer2} from '@angular/core';
import { DomController } from 'ionic-angular';

@Directive({
    selector: '[absolute-drag]'
})
export class AbsoluteDrag {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;

    private lastX:number = 0;
    private lastY:number = 0;
    private isDragging:boolean = false;

    constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController, private r2: Renderer2) {}

    ngAfterViewInit()
    {
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

        hammer.on('pan', (ev) => {
            this.handlePan(ev);
        });
    }

    handlePan(ev)
    {
        const elem = ev.target;

        if(!this.isDragging) {
            this.isDragging = true;
            this.lastX = AbsoluteDrag.cutPX(elem.style.left);
            this.lastY = AbsoluteDrag.cutPX(elem.style.top);
        }

        elem.style.left = ev.deltaX + this.lastX + "px";
        elem.style.top  = ev.deltaY + this.lastY + "px";

        if(ev.isFinal) {
            this.isDragging = false;
        }
    }

    static cutPX(str:string):number
    {
        return +str.substring(0, str.length -2);
    }

    /*let left:number = ev.target.offsetLeft;
        let top:number  = ev.target.offsetTop;
        let comp:any = ev.target.offsetParent;

        do {
            left += comp.offsetLeft;
            top  += comp.offsetTop;
            if(comp.className === 'scroll-content') break;
            comp = comp.offsetParent;
        } while(comp != null);

        let newLeft = ev.center.x - left;
        let newTop = ev.center.y - top;

        //console.log(ev.target.offsetParent.className);
        console.log(ev);

        this.domCtrl.write(() => {
            this.r2.setStyle(this.element.nativeElement, 'left', newLeft + 'px');
            this.r2.setStyle(this.element.nativeElement, 'top', newTop + 'px');
        });*/
}
