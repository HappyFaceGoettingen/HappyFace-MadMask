import {HFWidget} from "./HFWidget";

export function instance()
{
    return new TestWidget();
}

export class TestWidget extends HFWidget
{
    constructor()
    {
        super();
        this.headerHTML = "<b>Hello World</b>";
        this.contentHTML = "<img src='https://img.youtube.com/vi/ttz4Sr0tZFg/maxresdefault.jpg' alt='No Image inside the widget' /><br/>";
    }
}
