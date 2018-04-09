import {__backup, currentlyActive} from "./Current";

export class ConfigObject
{
    myname:string = "";
    site:string = "";
    site_name:string = "";
    port:string = "";
    dir:string = "";
    data_dir:string = "";
    analysis_image_size:string = "";
    keep_data_days:string = "";
    log_level:string = "";
    firefox_profile:string = "";
    status:StatusObject[] = [];
}

export class StatusObject
{
    name:string = "";
    color:string = "";
    file:string = "";
}
