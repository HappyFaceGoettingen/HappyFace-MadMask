import {Directive, ElementRef, Input, Renderer, Renderer2} from "@angular/core";

@Directive({
    selector: '[position]',
    exportAs: 'position-directive'
})
export class Position {

    @Input('startX') startX: any;
    @Input('startY') startY: any;
    @Input('width')  width:  any;
    @Input('height') height: any;


    constructor(public element: ElementRef, public renderer: Renderer) {}

    ngAfterViewInit() {
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startX + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startY + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'width', this.width + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + 'px');
    }

    update(x:number, y:number, width:number, height:number)
    {
        this.renderer.setElementStyle(this.element.nativeElement, 'left', x + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', y + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'width', width + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', height + 'px');
        
        
    }
}
