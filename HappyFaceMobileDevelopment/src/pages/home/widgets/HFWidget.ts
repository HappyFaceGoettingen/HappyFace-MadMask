
export abstract class HFWidget
{
    // Build a basic Widget with a Title- and Contenttext
    headerText:string = null;
    contentText:string = null;

    // Build a more complex Widget using HTML in the header and content area.
    headerHTML:string = null;
    contentHTML:string = null;


    // Providing Data
    monitoringURLS :any = null;  // Will contain the data from /sites/default/monitoring-urls.json
    config         :any = null;  // Will contain the data from /sites/default/config.json
    summary        :any = null;  // Will contain the data from /data/<INSTANCE>/index/latest/summary.json
    systems        :any = null;  // Will contain the data from /sites/default/systems.json
    visualizers    :any = null;  // Will contain the data from /sites/default/visualizers.json
    logs           :any = null;  // Will contain the data from /sites/default/logs.json
    humans         :any = null;  // Will contain the data from /sites/default/humans.json

}
