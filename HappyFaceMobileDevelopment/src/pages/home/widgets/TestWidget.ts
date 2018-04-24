import {Widget} from "./Widget";

export function instance()
{
    return new TestWidget();
}

export class TestWidget extends Widget
{
    header:string = "";
    content:string = "";

    constructor()
    {
        super();
        this.header = "Hello World";
        this.content = "Hello World from inside a Widget";
    }
}
