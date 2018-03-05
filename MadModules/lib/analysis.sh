## Max outputs for a summary of system elements
MAX_SUMMARY_OUTPUTS=3

#---------------------------------------------------------
# Function: set DATE_IDs by the given input dir
#---------------------------------------------------------
set_date_ids(){
    local input_dir="$1"
    local limit=$2

    [ ! -e $input_dir ] && ERROR "get_date_ids: input_dir [$input_dir] does not exist" && return 1
    DATE_IDs=$(ls -tr $input_dir | grep -v latest | tail -n $limit)
    CDATE_IDs=$(echo "$DATE_IDs" | perl -pe "s/\n/,/g")
    LATEST_DATE_ID=$(echo "$DATE_IDs" | tail -n 1)
    return 0
}


#---------------------------------------------------------
# Function: set analysis directories by the given DATA_HOME
#---------------------------------------------------------
set_analysis_dirs(){

    ANALYSIS_DIR=$DATA_DIR/analysis
    BASE_IMAGES_DIR="$ANALYSIS_DIR/base_images"
    PLOT_ANALYSIS_DIR="$ANALYSIS_DIR/plot_analysis"
    PLOT_PATHWAY_DIR="$ANALYSIS_DIR/plot_pathway"
    ANALYSIS_OBJ_DIR="$ANALYSIS_DIR/analysis_obj"
    MADVISION_DIR="$ANALYSIS_DIR/madvision"
    MADVISION_THUMBNAIL_DIR="$ANALYSIS_DIR/madvision_thumbnail"
    FORECAST_DIR="$ANALYSIS_DIR/forecast"

    local all_analysis_subdirs="$BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $FORECAST_DIR"
    local dir
    for dir in $all_analysis_subdirs
    do
	if [ ! -e $dir ]; then
	    mkdir -pv $dir || return 1
	fi
    done

    return 0
}


#---------------------------------------------------------------------------
#
# Functions
#
#---------------------------------------------------------------------------
generate_base_images(){
    local base_image_convert_option="-geometry $ANALYSIS_IMAGE_SIZE!"

    local date_id
    for date_id in $DATE_IDs
    do
	[ ! -e "$CAPTURE_DIR/$date_id" ] && continue
	[ -e "$BASE_IMAGES_DIR/$date_id" ] && continue

	mkdir -v $BASE_IMAGES_DIR/$date_id
	local f
	for f in $(ls $CAPTURE_DIR/$date_id)
	do
	    INFO "Converting [$CAPTURE_DIR/$date_id/$f] ($base_image_convert_option) --> [$BASE_IMAGES_DIR/$date_id/$f]"
	    convert "$CAPTURE_DIR/$date_id/$f" $base_image_convert_option "$BASE_IMAGES_DIR/$date_id/$f"
	done
    done
    return 0
}


common_rcaller(){
    local rcall="$1"
    local plot_dir="$2"

    [ -e "$plot_dir" ] && ERROR "common_rcaller\$$rcall: [$plot_dir] exists!" && return 1

    ## Generating analysis plots and objs
    local args="$URLS_JSON $SYSTEMS_JSON §CAPTURE_DIR $BASE_IMAGES_DIR $CDATE_IDs $plot_dir $ANALYSIS_OBJ_DIR"
    mkdir -v $plot_dir
    load_monitoringUrls_json $URLS_JSON || return 1
    local i
    for i in $(seq 0 $((${#FILE_PREFIXES[*]} - 1)))
    do
        parallel_run R "R --slave -f $R_RUNTIME_LOADER --args $rcall ${FILE_PREFIXES[$i]} $args"
        [ ! -z "$DEBUG" ] && [ $i -ge 0 ] && break
    done
    check_parallel_job "R" "final"
    return 0
}


#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------
generate_detector(){
    common_rcaller "${1}_detector" "$PLOT_ANALYSIS_DIR/$LATEST_DATE_ID" || return 1
}


generate_pathway(){
    common_rcaller "pathway" "$PLOT_PATHWAY_DIR_DIR/$LATEST_DATE_ID" || return 1

    ## Generating overall pathway
    
}


generate_madvision(){
    common_rcaller "${1}_madvision" "$MADVISION_DIR/$LATEST_DATE_ID" || return 1

    ## Generating thumbnails
    mkdir -v $MADVISION_THUMBNAIL_DIR/$LATEST_DATE_ID
    generate_madvision_thumbnails "$MADVISION_DIR/$LATEST_DATE_ID" "$MADVISION_THUMBNAIL_DIR/$LATEST_DATE_ID" "../../../$THUMBNAIL_DIR/$LATEST_DATE_ID"
    return 0
}


generate_madvision_thumbnails(){
    local input_dir=$1
    local thumbnail_dir=$2
    local ref_thumbnail_dir=$3

    [ -z "$THUMBNAIL_OPTION" ] && THUMBNAIL_OPTION="-geometry 100x200!"
    local f
    for f in $(ls $input_dir)
    do
	if [ -L $input_dir/$f ]; then
	    ln -vs $ref_thumbnail_dir/$f $thumbnail_dir/$f
	else
            INFO "Generating thumbnail: [$input_dir/$f] -->  [$thumbnail_dir/$f]"
            convert $input_dir/$f $THUMBNAIL_OPTION $thumbnail_dir/$f
	fi
    done
}


generate_latest_symlinks(){
    local all_analysis_subdirs="$BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $FORECAST_DIR"
    local dir
    for dir in $all_analysis_subdirs
    do
	if [ -e $dir/$LATEST_DATE_ID ]; then
	    [ -e $dir/latest ] && rm -v $dir/latest
	    ln -vs $LATEST_DATE_ID $dir/latest
	fi
    done
}


#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------
generate_results(){
    local R_function_name=$1
    [ ! -e $R_output_dir ] && mkdir -pv $R_output_dir
    $R_function_name $urlfile $MAX_OUTPUT_LIST "$robj_dir" "$R_output_dir"
}


make_summary_text(){
    local level=$1
    local text_template_file=$(ls $summary_template_dir/$level/* | shuf | head -n 1)
    eval "echo $(cat $text_template_file)"
}


write_summary_json(){
    [ -z "$summary_json" ] && "summary_json is null" && return 1

    ## Environment variables
    export VOICE_DATE=$(date +"%l %M %p")

    ## loading config_json
    load_config_json $config_json

    ## Here, we are generating summary text by template.
    ## The order is defined by a given monitoring-urls.json

    ## Default level is Normal
    local level="Normal"
    local text=$(make_summary_text $level)
    
    load_monitoringUrls_json $urlfile
    for level in ${LEVELS[*]}
    do
	if [ -e $R_output_dir/$level ]; then
	    ## Setting environment variales for voice template
	    source $R_output_dir/$level
	    
	    ## Calling template generator
	    if [ "$R_LEVEL_ACTIVE" == "TRUE" ]; then
                ## According to the level, selecting a summary template
		text=$(make_summary_text $level)
		break
		
	    fi
	fi
	level="Normal"
    done

    INFO "Level = $level"

    ## Writing summary_json
    [ ! -e $(dirname $summary_json) ] && mkdir -p $(dirname $summary_json)

    date_ids=$(ls -r $capture_dir | grep -v latest | head -n $date_IDs_limit)
    date_ids=$(echo $date_ids)
    echo "{
        \"text\": \"$text\",
        \"level\": \"$level\",
        \"history\": \"$date_ids\"
}" > $summary_json
    
    echo " ------------- $summary_json ------------- "
    cat $summary_json
    return 0
}



##-----------------------------------------------------
## Moved from bcp.sh for now
##
##
##-----------------------------------------------------

bcp__results(){
    local urlfile=$1
    local max_output_list=$2
    local robj_dir=$3
    local R_output_dir=$4

    ## Reading JSON file for each level
    start_monitoringUrls_json $urlfile
    for level in ${LEVELS[*]}
    do
	[ "$level" == "null" ] && continue

	next_monitoringUrls_json $urlfile
	
	## Calling R
	R --slave -f $rfile --args $robj_dir "${comma_separated_link_names[*]}" "${comma_separated_file_prefixes[*]}" "${comma_separated_captures[*]}" $BCP_THRESHOLD $max_output_list $R_output_dir/$level
    done

}
