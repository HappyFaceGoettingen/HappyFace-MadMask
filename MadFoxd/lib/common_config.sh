read_common_config(){
    local config_json=$1

    ## Reading data_dir
    CONFIG_DATA_DIR=$(jq ".data_dir" $config_json | perl -pe "s/\"//g")
}


