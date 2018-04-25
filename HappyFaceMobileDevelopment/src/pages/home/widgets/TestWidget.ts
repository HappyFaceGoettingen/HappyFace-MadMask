import {HFWidget} from "./HFWidget";

export function instance()
{
    return new TestWidget();
}

export class TestWidget extends HFWidget
{
    headerText:string = "";
    contentText:string = "";

    constructor()
    {
        super();
        this.headerText = "Hello World";
        this.contentText = "<img src='https://img.youtube.com/vi/ttz4Sr0tZFg/maxresdefault.jpg' alt='No Image inside the widget' />";
    }
}
