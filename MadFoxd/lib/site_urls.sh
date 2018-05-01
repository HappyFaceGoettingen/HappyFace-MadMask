## URL Info Arrays
LEVELS=()
LINK_NAMES=()
FILE_PREFIXES=()
URLS=()
CAPTURES=()
FIREFOX_XDISPLAY_NAMES=()
FIREFOX_COMMANDS=()

#---------------------------------------------------------
# Function: monitoring-urls.json reader/analyzer
#---------------------------------------------------------
load_monitoringUrls_json(){
    local jsonfile=$1

    [ ! -e $jsonfile ] && ERROR "load_monitoringUrls_json: [$jsonfile] does not exist" && return 1

    LEVELS=($(read_json ".[].level" $jsonfile))
    LINK_NAMES=($(read_json ".[].urls[].name" $jsonfile))
    FILE_PREFIXES=($(read_json ".[].urls[].file_prefix" $jsonfile))
    URLS=($(read_json ".[].urls[].link" $jsonfile))
    CAPTURES=($(read_json ".[].urls[].capture" $jsonfile))
    FIREFOX_XDISPLAY_NAMES=($(read_json ".[].urls[].xdisplay_name" $jsonfile))
    FIREFOX_COMMANDS=($(read_json ".[].urls[].firefox_command" $jsonfile))

    DEBUG "load_monitoringUrls_json: [$jsonfile] contains ${#URLS[*]} items"
    return 0
}

