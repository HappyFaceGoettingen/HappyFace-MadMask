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
    ANALYSIS_OBJ_DIR="$ANALYSIS_DIR/analysis_obj"
    MADVISION_DIR="$ANALYSIS_DIR/madvision"
    MADVISION_THUMBNAIL_DIR="$ANALYSIS_DIR/madvision_thumbnail"
    PLOT_FORECAST_DIR="$ANALYSIS_DIR/forecast"

    local all_analysis_subdirs="$BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR"
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
	    ln -vs $ref_dir/$f $output_dir/$f
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
        parallel_run R "R --slave -f $R_RUNTIME_LOADER --args $rcall ${FILE_PREFIXES[$i]} $args"
        [ ! -z "$DEBUG" ] && [ $i -ge 0 ] && break
    done
    check_parallel_job R
    return 0
}



#---------------------------------------------------------------------------
# Generator Functions
#  {base_images|detector|madvision|pathway}
#---------------------------------------------------------------------------
generate_base_images(){
    local base_image_convert_option="-geometry $ANALYSIS_IMAGE_SIZE!"

    local date_id
    for date_id in $DATE_IDs
    do
	[ ! -e "$CAPTURE_DIR/$date_id" ] && continue
	[ -e "$BASE_IMAGES_DIR/$date_id" ] && continue
	common_imager "$CAPTURE_DIR/$date_id" "$base_image_convert_option" "$BASE_IMAGES_DIR/$date_id"
    done
    return 0
}


generate_detector(){
    common_rcaller "${1}_detector" "$PLOT_ANALYSIS_DIR/$LATEST_DATE_ID" || return 1
}


generate_pathway(){
    common_rcaller "pathway" "$PLOT_PATHWAY_DIR/$LATEST_DATE_ID" || return 1

    ## Generating overall pathway
    
}


generate_madvision(){
    common_rcaller "${1}_madvision" "$MADVISION_DIR/$LATEST_DATE_ID" || return 1

    ## Generating thumbnails
    generate_madvision_thumbnails "$MADVISION_DIR/$LATEST_DATE_ID" "$MADVISION_THUMBNAIL_DIR/$LATEST_DATE_ID" "../../../$THUMBNAIL_DIR/$LATEST_DATE_ID"
    return 0
}


generate_madvision_thumbnails(){
    [ -z "$THUMBNAIL_OPTION" ] && THUMBNAIL_OPTION="-geometry 100x200!"
    common_imager "$1" "$THUMBNAIL_OPTION" "$2" "$3" 
}


generate_forecast(){
    local rcall="${1}_forecast"
    local plot_dir=$PLOT_FORECAST_DIR/$LATEST_DATE_ID
    [ -e "$plot_dir" ] && ERROR "generate_forecaset\$$rcall: [$plot_dir] exists!" && return 1    
    
    mkdir -v $plot_dir
    local args="$URLS_JSON $SYSTEMS_JSON $CAPTURE_DIR $BASE_IMAGES_DIR $CDATE_IDs $plot_dir $ANALYSIS_OBJ_DIR"
    R --slave -f $R_RUNTIME_LOADER --args $rcall forecast $args 
}


generate_latest_symlinks(){
    local all_analysis_subdirs="$BASE_IMAGES_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR"
    local dir
    for dir in $all_analysis_subdirs
    do
	if [ -e $dir/$LATEST_DATE_ID ]; then
	    [ -e $dir/latest ] && rm -v $dir/latest
	    ln -vs $LATEST_DATE_ID $dir/latest
	fi
    done
}


generate_summary(){
    local rcall="${1}_summary"

    # Reserved tokens in summary_tempalte/*.json
    ## Easy to get the followings
    local __MYNAME__=
    local __SITE__=
    local __TIME__=$(date +"%l %M %p")
    local __LEVEL__=
    local __HISTORY__=$DATE_IDs

    ## Must calculate something
    local __SYSTEMS__=
    local __SCORE__=

    # Copy templates to index dir
    
    ## Applying the easiest part


    ## Calculating __SYSTEMS__ and __SCORE__
    load_monitoringUrls_json $urlfile
    for level in ${LEVELS[*]}
    do
	
    done

    ## Getting the highest score and making a symlink


    ## Showing a summary
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
    local max_output_list=$2


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
