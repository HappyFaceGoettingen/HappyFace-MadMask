#---------------------------------------------------------------------------
# Function: set DATE_IDs by the given input dir
#---------------------------------------------------------------------------
set_date_ids(){
    local input_dir="$1"
    local limit=$2

    [ ! -e $input_dir ] && ERROR "get_date_ids: input_dir [$input_dir] does not exist" && return 1
    DATE_IDs=$(ls -tr $input_dir | grep -v latest | tail -n $limit)
    CDATE_IDs=$(echo "$DATE_IDs" | perl -pe "s/\n/,/g")
    LATEST_DATE_ID=$(echo "$DATE_IDs" | tail -n 1)
    return 0
}


#---------------------------------------------------------------------------
# Function: set analysis directories by the given DATA_HOME
#---------------------------------------------------------------------------
set_analysis_dirs(){

    ANALYSIS_DIR=$DATA_DIR/analysis
    BASE_IMAGES_DIR="$ANALYSIS_DIR/base_images"
    PLOT_ANALYSIS_DIR="$ANALYSIS_DIR/plot_analysis"
    PLOT_PATHWAY_DIR="$ANALYSIS_DIR/plot_pathway"
    MADVISION_DIR="$ANALYSIS_DIR/madvision"
    MADVISION_THUMBNAIL_DIR="$ANALYSIS_DIR/madvision_thumbnail"
    PLOT_FORECAST_DIR="$ANALYSIS_DIR/plot_forecast"
    ANALYSIS_OBJ_DIR="$ANALYSIS_DIR/analysis_obj"

    local all_analysis_subdirs="$BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR $ANALYSIS_OBJ_DIR"
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
# Common Functions used by Generator Functions
#
#---------------------------------------------------------------------------
common_imager(){
    local input_dir="$1"
    local convert_option="$2"
    local output_dir="$3"
    local ref_dir=$4    

    local f
    for f in $(ls $input_dir)
    do
	[ ! -e $output_dir ] && mkdir -v $output_dir
	if [ ! -z "$ref_dir" ] && [ -L $input_dir/$f ]; then
	    local relative_path=$(realpath -m --relative-to=$output_dir $ref_dir/$f)
	    ln -vs $relative_path $output_dir/$f
	else
            INFO "Converting: [$input_dir/$f] -->  [$output_dir/$f]"
            parallel_run convert "convert $input_dir/$f $convert_option $output_dir/$f"
	fi
    done
    check_parallel_job convert

}


common_rcaller(){
    local rcall="$1"
    local plot_dir="$2"

    [ -e "$plot_dir" ] && ERROR "common_rcaller\$$rcall: [$plot_dir] exists!" && return 1

    ## Generating analysis plots and objs
    local args="$URLS_JSON $SYSTEMS_JSON $CAPTURE_DIR $BASE_IMAGES_DIR $CDATE_IDs $plot_dir $ANALYSIS_OBJ_DIR"
    mkdir -v $plot_dir
    load_monitoringUrls_json $URLS_JSON || return 1
    local i
    for i in $(seq 0 $((${#FILE_PREFIXES[*]} - 1)))
    do
	[ "${FILE_PREFIXES[$i]}" == "null" ] && continue
        parallel_run R "R --slave -f $R_RUNTIME_LOADER --args $rcall ${FILE_PREFIXES[$i]} $args"
        [ ! -z "$DEBUG" ] && [ $i -ge 0 ] && break
    done
    check_parallel_job R
    return 0
}


single_rcaller(){
    local rcall="$1"
    local plot_dir="$2"

    [ -e "$plot_dir" ] && ERROR "generate_forecaset\$$rcall: [$plot_dir] exists!" && return 1    
    
    mkdir -v $plot_dir
    local args="$URLS_JSON $SYSTEMS_JSON $CAPTURE_DIR $BASE_IMAGES_DIR $CDATE_IDs $plot_dir $ANALYSIS_OBJ_DIR"
    R --slave -f $R_RUNTIME_LOADER --args $rcall forecast $args 
}



#---------------------------------------------------------------------------
# Generator Functions
#  {base_images|detector|madvision|pathway}
#---------------------------------------------------------------------------
generate_base_images(){
    local base_image_option="-geometry $ANALYSIS_IMAGE_SIZE!"

    local date_id
    for date_id in $DATE_IDs
    do
	[ ! -e "$CAPTURE_DIR/$date_id" ] && continue
	[ -e "$BASE_IMAGES_DIR/$date_id" ] && continue
	common_imager "$CAPTURE_DIR/$date_id" "$base_image_option" "$BASE_IMAGES_DIR/$date_id"
    done
    return 0
}


generate_detector(){
    common_rcaller "${1}_detector" "$PLOT_ANALYSIS_DIR/$LATEST_DATE_ID" || return 1
    return 0
}


generate_pathway(){
    single_rcaller "pathway" "$PLOT_PATHWAY_DIR/$LATEST_DATE_ID" || return 1
    return 0
}


generate_madvision(){
    common_rcaller "${1}_madvision" "$MADVISION_DIR/$LATEST_DATE_ID" || return 1

    ## Generating thumbnails
    generate_madvision_thumbnails "$MADVISION_DIR/$LATEST_DATE_ID" "$MADVISION_THUMBNAIL_DIR/$LATEST_DATE_ID" "$THUMBNAIL_DIR/$LATEST_DATE_ID"
    return 0
}


generate_madvision_thumbnails(){
    [ -z "$THUMBNAIL_OPTION" ] && THUMBNAIL_OPTION="-geometry 100x200!"
    common_imager "$1" "$THUMBNAIL_OPTION" "$2" "$3" 
}


generate_forecast(){
    single_rcaller "${1}_forecast" "$PLOT_FORECAST_DIR/$LATEST_DATE_ID" || return 1
    return 0
}


#---------------------------------------------------------------------------
# Final Summary Generator Functions
#  {summary}
#---------------------------------------------------------------------------
generate_latest_symlinks(){
    local all_inout_subdirs="$CAPTURE_DIR $THUMBNAIL_DIR $INDEX_DIR $BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR"
    local dir
    for dir in $all_inout_subdirs
    do
	if [ -e $dir/$LATEST_DATE_ID ]; then
	    [ -e $dir/latest ] && rm -v $dir/latest
	    ln -vs $LATEST_DATE_ID $dir/latest
	fi
    done
}


generate_analysis_index(){
    local index_dir=$INDEX_DIR/$LATEST_DATE_ID
    [ ! -e $index_dir ] && ERROR "index_dir [$index_dir] does not exist" && return 1
    local analysis_json=$index_dir/analysis.json
    
    ## Outputting index_dir/analysis.json
    local items=(capture thumbnail base_image analysis pathway madvision madvision_thumbnail forecast)
    local all_analysis_index_subdirs=($CAPTURE_DIR $THUMBNAIL_DIR $BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR)
    echo "" > $analysis_json
    local i
    for i in $(seq 0 $((${#all_analysis_index_subdirs[*]} - 1)))
    do
	echo "   ${items[$i]}: \"\"" >> $analysis_json
    done
    echo "" >> $analysis_json

    return 0
}


prepare_summary_template(){
    local summary_template=$1
    local index_dir=$(dirname $summary_template)
    [ ! -e $index_dir ] && ERROR "index_dir [$index_dir] does not exist" && return 1

    ## Copying SUMMARY_TEMPLATE to index_dir
    cp -rvfL $SUMMARY_TEMPLATE $index_dir/
    ! ls $summary_template/*.json &> /dev/null && ERROR "[$summary_template/*.json] does not exist" && return 1

    #---------------------------------------------
    # Reserved tokens in summary_tempalte/*.json
    #---------------------------------------------
    ## Easiest to get the followings
    local __MYNAME__=$CONFIG_MYNAME
    local __SITE__=$CONFIG_SITE
    local __TIME__=$(date +"%l %M %p")
    local __HISTORY__=$(echo $DATE_IDs)

    ## Applying the easiest part such as __SITE__ etc..
    sed -e "s/__MYNAME__/$__MYNAME__/g" -i $summary_template/*.json
    sed -e "s/__SITE__/$__SITE__/g" -i $summary_template/*.json
    sed -e "s/__TIME__/$__TIME__/g" -i $summary_template/*.json
    sed -e "s/__HISTORY__/$__HISTORY__/g" -i $summary_template/*.json

    return 0
}


generate_summary(){
    local rcall="${1}_summary"

    local summary_template_dir=$INDEX_DIR/$LATEST_DATE_ID/$(basename $SUMMARY_TEMPLATE)
    local summary_json=$INDEX_DIR/$LATEST_DATE_ID/summary.json

    ## Put summary template into INDEX_DIR
    prepare_summary_template $summary_template_dir || return 1

    ## Making a link "summary.json" to the final ${level}.json
    load_monitoringUrls_json $URLS_JSON || return 1
    local present_level="Normal"
    for level in ${LEVELS[*]}
    do
	[ "$level" == "null" ] && continue
	local template_json=$summary_template_dir/${level}.json
	[ ! -e $template_json ] && ERROR "A template [$template_json] does not exist" && return 1

	INFO "Generating a summary (Changing __LEVEL__, __SYSTEMS__ and __SCORE__ in [$template_json]) ..."
	single_rcaller "$rcall" "$summary_template_dir" "$template_json" || return 1

	local score=$(jq .score $template_json | perl -pe "s/\"//g")
	[ $score -ge $SUMMARY_THRESHOLD ] && present_level=$level
    done
    ln -vfs $(basename $SUMMARY_TEMPLATE)/${present_level}.json $summary_json

    ## Displaying a final status summary
    echo " ------------- [$summary_json] ------------- "
    cat $summary_json
    return 0
}

