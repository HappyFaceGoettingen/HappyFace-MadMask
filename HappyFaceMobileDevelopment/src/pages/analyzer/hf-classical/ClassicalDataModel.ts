import {Injectable} from "@angular/core";
import {DataModel} from "../../../data/DataModel";

@Injectable()
export class ClassicalDataModel
{
    categories:any = [];
    lastRefreshed:any = new Date();
    loading:boolean = false;

    loadingFinishedCallbacks: (() => void)[] = [];

    constructor(private model:DataModel)
    {
        this.reload();
    }

    reload()
    {
        this.loading = true;
        let url:string = "http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port + "/category?action=getxml";
        this.asyncReadFile(url, this.parseXMLResult.bind(this));
    }

    asyncReadFile(url:string, callback: (response:any, statusCode:number) => void)
    {
        let req:XMLHttpRequest = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState == 4)
            {
                callback(req.responseText, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    }

    parseXMLResult(response:string, statusCode:number)
    {
        let HFTree:any = [];
        if(statusCode == 200)
        {
            response = response.replace("\\n", "");
            let cat:any = XML2JSON.xmlStringToJSON(response);
            HFTree = cat.happyface;
        }
        else {
            this.categories = null;
            this.loading = false;
            for(let i:number = 0; i < this.loadingFinishedCallbacks.length; i++)
            {
                this.loadingFinishedCallbacks[i]();
            }
            return;
        }

        // Parsing
        for(let i:number = 0; i < HFTree.category.length; i++) HFTree.category[i].status = parseFloat(HFTree.category[i].status);
        this.categories = HFTree.category;
        this.lastRefreshed = new Date();
        this.loading = false;
        for(let i:number = 0; i < this.loadingFinishedCallbacks.length; i++)
        {
            this.loadingFinishedCallbacks[i]();
        }
    }

    addLoadingFinishedCallback(callback: () => void) { this.loadingFinishedCallbacks.push(callback)};
    isLoading() { return this.loading; }

    loadModuleContent(module:any, callback: (data:any) => void)
    {

    }
}

export class XML2JSON
{
    // Credits to http://davidwalsh.name/convert-xml-json and https://gist.github.com/chinchang/8106a82c56ad007e27b1

    static xmlToJSON(xml:XMLDocument)
    {
        let obj:any = {};
        if(xml.nodeType == 1)
        {
            if(xml.attributes.length > 0)
            {
                obj['@attributes'] = {};
                for(let j:number = 0; j < xml.attributes.length; j++)
                {
                    const attribute = xml.attributes.item(j);
                    obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                }
            }
        }
        else if(xml.nodeType == 3)
        {
            obj = xml.nodeValue;
        }

        if(xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3)
        {
            obj = xml.childNodes[0].nodeValue;
        }
        else if(xml.hasChildNodes())
        {
            for(let i:number = 0; i < xml.childNodes.length; i++)
            {
                const item:any = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                if(nodeName === "#text") continue;
                if(typeof(obj[nodeName]) == 'undefined')
                {
                    obj[nodeName] = this.xmlToJSON(item);
                }
                else {
                    if(typeof(obj[nodeName].push) == 'undefined')
                    {
                        const old:any = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJSON(item));
                }
            }
        }
        return obj;
    }

    static xmlStringToJSON(str:string)
    {
        let xmlDOM:XMLDocument = new DOMParser().parseFromString(str, 'text/xml');
        return this.xmlToJSON(xmlDOM);
    }
}
