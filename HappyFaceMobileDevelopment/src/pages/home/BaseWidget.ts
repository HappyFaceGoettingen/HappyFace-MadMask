
export abstract class BaseWidget
{
    titleHTML:string;
    titleTEXT:string;

    contentHTML:string;
    contentTEXT:string;

    constructor()
    {
        this.titleHTML = "";
        this.titleTEXT = "";
        this.contentHTML = "";
        this.contentTEXT = "";
    }
}
