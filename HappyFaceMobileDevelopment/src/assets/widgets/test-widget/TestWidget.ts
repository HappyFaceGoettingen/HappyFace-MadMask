import {BaseWidget} from "../BaseWidget.js";

export class TestWidget extends BaseWidget
{
    constructor()
    {
        super();
        this.title = "TITLE";
        this.content = "<img src='http://img.youtube.com/vi/ttz4Sr0tZFg/maxresdefault.jpg' alt='No Image'>";
    }
}

export function instance():TestWidget
{
    return new TestWidget();
}
