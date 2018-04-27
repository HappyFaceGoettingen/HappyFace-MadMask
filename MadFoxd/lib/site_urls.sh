#---------------------------------------------------------
# Function: JSON analyzer
#---------------------------------------------------------
LEVELS=()
LINK_NAMES=()
FILE_PREFIXES=()
URLS=()
CAPTURES=()
FIREFOX_XDISPLAY_NAMES=()


load_monitoringUrls_json(){
    local jsonfile=$1

    [ ! -e $jsonfile ] && ERROR "load_monitoringUrls_json: [$jsonfile] does not exist" && return 1

    LEVELS=(`jq ".[].level" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    LINK_NAMES==(`jq ".[].urls[].name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    FILE_PREFIXES=(`jq ".[].urls[].file_prefix" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    URLS=(`jq ".[].urls[].link" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    CAPTURES=(`jq ".[].urls[].capture" $jsonfile`)
    FIREFOX_XDISPLAY_NAMES=(`jq ".[].urls[].xdisplay_name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    DEBUG "load_monitoringUrls_json contains ${#URLS[*]} items"
    return 0
}

