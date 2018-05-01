#---------------------------------------------------------
# Function: JSON reader/analyzer
#---------------------------------------------------------
read_json(){
    local json_query="$1"
    local json_file=$2

    ## Don't know why we need 'cat' here, but stream output without cat is not displayed on a terminal
    jq "$json_query" $json_file | sed "s/^\"\(.*\)\"$/\1/g" | cat
}


#---------------------------------------------------------
# Function: config.json reader/analyzer
#---------------------------------------------------------
read_common_config(){
    local config_json=$1

    [ ! -e $config_json ] && ERROR "config_json [$config_json] does not exist]" && return 1

    ## Basic site information
    CONFIG_MYNAME=$(read_json ".myname" $config_json)
    CONFIG_SITE=$(read_json ".site" $config_json)
    CONFIG_SITE_NAME=$(read_json ".site_name" $config_json)
    CONFIG_PORT=$(read_json ".ionic_port" $config_json)
    CONFIG_DATA_DIR=$(read_json ".data_dir" $config_json)
    CONFIG_ANALYSIS_IMAGE_SIZE=$(read_json ".analysis_image_size" $config_json)
    CONFIG_KEEP_DATA_DAYS=$(read_json ".keep_data_days" $config_json)
    CONFIG_LOG_LEVEL=$(read_json ".log_level" $config_json)
    CONFIG_FIREFOX_PROFILE=$(read_json ".firefox_profile" $config_json)
}

