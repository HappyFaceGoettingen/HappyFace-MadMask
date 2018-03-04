X_DISPLAY_NUMBERS=()
X_DISPLAY_RESOLUTIONS=()
X_DISPLAY_NAMES=()


read_common_config(){
    local config_json=$1

    [ ! -e $config_json ] && ERROR "config_json [$config_json] does not exist]" && return 1

    ## Basic site information
    CONFIG_MYNAME=$(jq ".myname" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_SITE=$(jq ".site" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_DATA_DIR=$(jq ".data_dir" $config_json | sed "s/^\"\(.*\)\"$/\1/g")
    CONFIG_ANALYSIS_IMAGE_SIZE=$(jq ".analysis_image_size" $config_json | sed "s/^\"\(.*\)\"$/\1/g")

    ## For X-displays
    X_DISPLAY_NAMES=(`jq ".xdisplay[].name" $config_json | sed "s/^\"\(.*\)\"$/\1/g"`)
    X_DISPLAY_RESOLUTIONS=(`jq ".xdisplay[].resolution" $config_json | sed "s/^\"\(.*\)\"$/\1/g"`)
    X_DISPLAY_NUMBERS=(`jq ".xdisplay[].number" $config_json | sed "s/^\"\(.*\)\"$/\1/g"`)

}


