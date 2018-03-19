read_common_config(){
    local config_json=$1

    [ ! -e $config_json ] && ERROR "config_json [$config_json] does not exist]" && return 1

    ## Basic site information
    CONFIG_MYNAME=$(jq ".myname" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_SITE=$(jq ".site" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_SITE_NAME=$(jq ".site_name" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_PORT=$(jq ".port" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_DATA_DIR=$(jq ".data_dir" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_ANALYSIS_IMAGE_SIZE=$(jq ".analysis_image_size" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_KEEP_DATA_DAYS=$(jq ".keep_data_days" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_LOG_LEVEL=$(jq ".log_level" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_FIREFOX_PROFILE=$(jq ".firefox_profile" $config_json | sed "s/^\"\(.*\)\"$/\1/g")

}

