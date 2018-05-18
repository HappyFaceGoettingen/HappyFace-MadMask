export class Positions
{
    columnIndex :number = 0;
    lineIndex   :number = 0;
    viewSpacing :number = 30;
    allX        :number = 0;
    allY        :number = 0;
    maxHeight   :number = 0;
    counter     :number = 0;

    constructor(viewSpacing?:number) {
        if(viewSpacing)
            this.viewSpacing = viewSpacing;
    }

    newPosition(instanceWidth:number, instanceHeight:number):{x:number, y:number, width:number, height:number}
    {
        let width :number = instanceWidth;
        let height:number = instanceHeight;

        if(width > window.innerWidth)
        {
            const scale:number = window.innerWidth / width;
            width = width * scale;
            height = height * scale;
        }

        if(this.allX + this.columnIndex * this.viewSpacing + width > window.innerWidth)
        {
            this.lineIndex++;
            this.columnIndex = 0;
            this.allX = 0;
            this.allY += this.maxHeight;
        }

        const posX  :number = this.allX + (this.columnIndex != 0 ? this.viewSpacing : 0);
        const posY  :number = this.allY + this.lineIndex * this.viewSpacing;

        this.allX           = posX + width;
        this.maxHeight      = height > this.maxHeight ? height : this.maxHeight;

        this.columnIndex++;

        return { x: posX, y: posY, width: width, height: height }
    }

    reset()
    {
        this.allX = 0;
        this.allY = 0;
        this.columnIndex = 0;
        this.lineIndex = 0;
        this.maxHeight = 0;
    }
}
