import {SearchData} from "./SearchData";
import {WidgetData, WidgetLoader} from "../pages/home/WidgetLoader";

export class Search
{
    data:SearchData = null;
    searchWidgets:WidgetData[] = [];

    stop:string[] = ['a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'b', 'back', 'backed', 'backing', 'backs', 'be', 'became', 'because', 'become', 'becomes', 'been', 'before', 'began', 'behind', 'being', 'beings', 'best', 'better', 'between', 'big', 'both', 'but', 'by', 'c', 'came', 'can', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'd', 'did', 'differ', 'different', 'differently', 'do', 'does', 'done', 'down', 'down', 'downed', 'downing', 'downs', 'during',
        'e', 'each', 'early', 'either', 'end', 'ended', 'ending', 'ends', 'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'f', 'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'g', 'gave', 'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'go', 'going', 'good', 'goods', 'got', 'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'h', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'herself', 'high', 'high', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how', 'however', 'i', 'if', 'important', 'in', 'interest', 'interested', 'interesting', 'interests', 'into', 'is', 'it', 'its', 'itself',
        'j', 'just', 'k', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'l', 'large', 'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'm', 'made', 'make', 'making', 'man', 'many', 'may', 'me', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'my', 'myself', 'n', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'new', 'newer', 'newest', 'next', 'no', 'nobody', 'non', 'noone', 'not', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'o', 'of', 'off', 'often', 'old', 'older', 'oldest', 'on', 'once', 'one', 'only', 'open', 'opened', 'opening', 'opens', 'or', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'our', 'out', 'over',
        'p', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents', 'problem', 'problems', 'put', 'puts', 'q', 'quite', 'r', 'rather', 'really', 'right', 'right', 'room', 'rooms', 's', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming', 'seems', 'sees', 'several', 'shall', 'she', 'should', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'so', 'some', 'somebody', 'someone', 'something', 'somewhere', 'still', 'still', 'such', 'sure',
        't', 'take', 'taken', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'to', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'u', 'under', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'v', 'very', 'w', 'want', 'wanted', 'wanting', 'wants', 'was', 'way', 'ways', 'we', 'well', 'wells', 'went', 'were', 'what', 'when', 'where', 'whether', 'which', 'while', 'who', 'whole', 'whose', 'why', 'will', 'with', 'within', 'without', 'work', 'worked', 'working', 'works', 'would', 'x', 'y', 'year', 'years', 'yet', 'you', 'young', 'younger', 'youngest', 'your', 'yours',
        'z'];


    // OPERATIONS:
    status:string[] = ['status', 'state', 'situation', 'condition'];
    history:string[] = ['history', 'chronic', 'past', 'annals', 'record'];
    dependency:string[] = ['dependency', 'dependence', 'depend'];
    analysis:string[] = ['analysis', 'time', 'plot', 'graph', 'stability'];


    constructor(private widgetLoader:WidgetLoader, private openImageView:(data:any) => void) {}

    setData(data:SearchData)
    {
        this.data = data;
    }

    removeData()
    {
        this.data = null;
    }

    search(str:string)
    {
        if(!this.data || !str) return;
        this.data.updateData();

        // Step 1: Tokenize  (e.g. turn "Hello world, how are you?" into ['hello', 'world', 'how', 'are', 'you'] )
        const words:string[] = str.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/gm, "").split(' ');

        // Step 2: Remove stop words
        const remaining:string[] = words.filter(word => this.stop.indexOf(word) == -1 );

        // Step 3: TODO genitiv

        // Step 4: Test the remaining words for monitoring url names
        let matches:any[] = [];
        for(const url of this.data.monitoring_urls)
        {
            const url_words:string[] = url.name.toLowerCase().split(' ');
            let count:number = 0;
            url_words.forEach( m => { if(remaining.includes(m)) count++; } );
            if(count > 0) matches.push({ url: url, count: count});
        }

        // Step 5: Use the shortest match with highest count as the most probable
        let selected:any, pre:any[], max:number = 0, min:number = Number.MAX_VALUE;
        matches.forEach(m => { if(m.count > max) { max = m.count; } } );
        matches = matches.filter(m => m.count === max );
        matches.forEach(m => { if(m.url.name.length < min) {selected = m; min = m.url.name.length; } } );

        // Step 6: Find right operation
        this.operations(remaining[0])(selected.url);
    }


    operations(op:string):(data:any) => void
    {
        if(this.status.indexOf(op) > -1)
        {
            return (data) => { console.log("STATUS: ", data); this.statusShowFunction(data); };
        }
        else if(this.history.indexOf(op) > -1)
        {
            return (data) => { console.log("HISTORY: ", data); this.historyShowFunction(data); };
        }
        else if(this.analysis.indexOf(op) > -1)
        {
            return (data) => { console.log("ANALYSIS: ", data); this.analysisShowFunction(data); };
        }
        else if(this.dependency.indexOf(op) > -1)
        {
            return (data) => { console.log("DEPENDENCY: ", data); this.dependencyShowFunction(data); }
        }

        return (data) => { console.log("DEFAULT: (op: " + op + ") ", data); this.statusShowFunction(data); };
    }

    statusShowFunction(data:any)
    {
        this.widgetLoader.addWidget({ name: "/assets/widgets/searchWidgets/status-function-widget/StatusFunctionWidget.js" })
            .then( widgetData => {
                widgetData.baseWidget.data = data;
                widgetData.baseWidget.openImageView = this.openImageView;
                widgetData.baseWidget.onReload();
                this.searchWidgets.push(widgetData);
            });
    }

    historyShowFunction(data:any)
    {
        this.widgetLoader.addWidget({name: "/assets/widgets/searchWidgets/history-function-widget/HistoryFunctionWidget.js" })
            .then(widgetData => {
                widgetData.baseWidget.data = data;
                widgetData.baseWidget.openImageView = this.openImageView;
                widgetData.baseWidget.onReload();
                this.searchWidgets.push(widgetData);
            })
    }

    dependencyShowFunction(data:any)
    {
        this.widgetLoader.addWidget({name: "/assets/widgets/searchWidgets/dependency-function-widget/DependencyFunctionWidget.js"})
            .then(widgetData => {
                widgetData.baseWidget.data = data;
                widgetData.baseWidget.openImageView = this.openImageView;
                widgetData.baseWidget.onReload();
                this.searchWidgets.push(widgetData);
            })
    }

    analysisShowFunction(data:any)
    {
        this.widgetLoader.addWidget({name: "/assets/widgets/searchWidgets/analysis-function-widget/AnalysisFunctionWidget.js"})
            .then(widgetData => {
                widgetData.baseWidget.data = data;
                widgetData.baseWidget.openImageView = this.openImageView;
                widgetData.baseWidget.onReload();
                this.searchWidgets.push(widgetData);
            })
    }
}
