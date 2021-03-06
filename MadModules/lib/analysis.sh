#---------------------------------------------------------------------------
# Basic Function: set DATE_IDs by the given input dir
#---------------------------------------------------------------------------
set_date_ids(){
    local input_dir="$1"
    local limit=$2

    [ ! -e $input_dir ] && ERROR "get_date_ids: input_dir [$input_dir] does not exist" && return 1
    DATE_IDs=$(ls -tr $input_dir | grep -v latest | tail -n $limit)
    RDATE_IDs=$(ls -t $input_dir | grep -v latest | head -n $limit)

    CDATE_IDs=$(echo "$DATE_IDs" | perl -pe "s/\n/,/g")
    RCDATE_IDs=$(echo "$RDATE_IDs" | perl -pe "s/\n/,/g")

    LATEST_DATE_ID=$(echo "$DATE_IDs" | tail -n 1)
    return 0
}


#---------------------------------------------------------------------------
# Basic Function: set analysis directories by the given DATA_HOME
#---------------------------------------------------------------------------
set_analysis_dirs(){

    ANALYSIS_DIR=$DATA_DIR/analysis
    BASE_IMAGE_DIR="$ANALYSIS_DIR/base_image"
    PLOT_ANALYSIS_DIR="$ANALYSIS_DIR/plot_analysis"
    PLOT_PATHWAY_DIR="$ANALYSIS_DIR/plot_pathway"
    MADVISION_DIR="$ANALYSIS_DIR/madvision"
    MADVISION_THUMBNAIL_DIR="$ANALYSIS_DIR/madvision_thumbnail"
    PLOT_FORECAST_DIR="$ANALYSIS_DIR/plot_forecast"
    FORECAST_DATA_DIR="$ANALYSIS_DIR/forecast_data"
    ANALYSIS_OBJ_DIR="$ANALYSIS_DIR/analysis_obj"

    local all_analysis_subdirs="$BASE_IMAGE_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR $FORECAST_DATA_DIR $ANALYSIS_OBJ_DIR"
    local dir
    for dir in $all_analysis_subdirs
    do
	[ -e $dir ] && continue
	mkdir -pv $dir || return 1
    done

    return 0
}


#---------------------------------------------------------------------------
#
# Common Functions used by Generator Functions
#
#---------------------------------------------------------------------------

## Calling Python realpath. The realpath commands in EL6 and El7 are different.
##  Originally, 'realpath -m --relative-to=$path1 $path2' was used.
prealpath(){
    local path1=$1
    local path2=$2
    python -c "import os.path; print os.path.relpath('$path2', '$path1')"
}
export -f prealpath


## Image size/format converter. This can run in parallel.
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
	    local relative_path=$(prealpath $output_dir $ref_dir/$f)
	    ln -vs $relative_path $output_dir/$f
	else
            INFO "Converting: [$input_dir/$f] -->  [$output_dir/$f]"
            parallel_run convert "convert $input_dir/$f $convert_option $output_dir/$f"
	fi
    done
    check_parallel_job convert
    return 0
}


## R runtime caller by URLs. This can run in parallel.
common_urls_rcaller(){
    local rcall="$1"
    local output_dir="$2"
    local others="$3"

    ## Load items and giving them to parallel R jobs
    load_monitoringUrls_json $URLS_JSON || return 1
    parallel_rcaller "$rcall" "$output_dir" "$others" "${FILE_PREFIXES[*]}"
}


## R runtime caller. This can run in parallel
parallel_rcaller(){
    local rcall="$1"
    local output_dir="$2"
    local others="$3"
    local items="$4"

    [ -e "$output_dir" ] && ERROR "parallel_rcaller\$$rcall: [$output_dir] exists!" && return 1
    mkdir -v $output_dir

    ## Generating analysis plots, objs and so on. Running R in parallel
    local args="$URLS_JSON $SYSTEMS_JSON $CAPTURE_DIR $BASE_IMAGE_DIR $CDATE_IDs $output_dir $ANALYSIS_OBJ_DIR $others"
    local item
    for item in $items
    do
	[ "$item" == "null" ] && continue
        parallel_run R "R --slave -f $R_RUNTIME_LOADER --args $rcall $item $args"
        [ ! -z "$DEBUG" ] && break
    done
    check_parallel_job R
    return 0
}


## R runtime caller, but this does not run in parallel
single_rcaller(){
    local rcall="$1"
    local output_dir="$2"
    local others="$3"

    [ ! -e "$output_dir" ] && mkdir -v $output_dir

    local args="$URLS_JSON $SYSTEMS_JSON $CAPTURE_DIR $BASE_IMAGE_DIR $CDATE_IDs $output_dir $ANALYSIS_OBJ_DIR $others"
    R --slave -f $R_RUNTIME_LOADER --args $rcall "" $args 
}



#---------------------------------------------------------------------------
# Generator Functions
#  {base_images|detector|madvision|pathway}
#---------------------------------------------------------------------------
## Generating common image file. The base_image size is defined in config.json (analysis_image_size)
generate_base_image(){
    local base_image_option="-geometry $ANALYSIS_IMAGE_SIZE!"

    local date_id
    for date_id in $DATE_IDs
    do
	[ ! -e "$CAPTURE_DIR/$date_id" ] && continue
	[ -e "$BASE_IMAGE_DIR/$date_id" ] && continue
	common_imager "$CAPTURE_DIR/$date_id" "$base_image_option" "$BASE_IMAGE_DIR/$date_id"
    done
    return 0
}

## Generating a basic detector to identify a status change point. 
##   Note: RAW time series data (1-D) will be written into forecast_data_dir.
generate_detector(){
    local forecast_data_dir="$FORECAST_DATA_DIR/$LATEST_DATE_ID"
    [ ! -e $forecast_data_dir ] && mkdir -v $forecast_data_dir
    common_urls_rcaller "${1}_detector" "$PLOT_ANALYSIS_DIR/$LATEST_DATE_ID" "$forecast_data_dir" || return 1
    return 0
}

## Generating system pathways (relations), according to monitoring-urls.json and systems.json
generate_pathway(){
    local output_dir="$PLOT_PATHWAY_DIR/$LATEST_DATE_ID"
    [ -e "$output_dir" ] && ERROR "generate_patyway: [$output_dir] exists!" && return 1
    single_rcaller "pathway" "$output_dir" || return 1
    return 0
}

## Generating red-vision (madvision) like a terminator view. This view can emphasize the browser view/thumbnails which have a status change point.
generate_madvision(){
    common_urls_rcaller "${1}_madvision" "$MADVISION_DIR/$LATEST_DATE_ID" || return 1

    ## Generating thumbnails
    generate_madvision_thumbnails "$MADVISION_DIR/$LATEST_DATE_ID" "$MADVISION_THUMBNAIL_DIR/$LATEST_DATE_ID" "$THUMBNAIL_DIR/$LATEST_DATE_ID"
    return 0
}

## The above generated madvision is changed to thumbnail views
generate_madvision_thumbnails(){
    [ -z "$THUMBNAIL_OPTION" ] && THUMBNAIL_OPTION="-geometry 100x200!"
    common_imager "$1" "$THUMBNAIL_OPTION" "$2" "$3" 
}


## Generating forecasts according to systems.json definition. HappyFace DB (in system.definition) will be used in future
generate_forecast(){
    local detector_alg=${1}_detector
    local forecast_alg=${2}_forecast

    local forecast_data_dir="$FORECAST_DATA_DIR/$LATEST_DATE_ID"
    local output_dir="$PLOT_FORECAST_DIR/$LATEST_DATE_ID"
    [ -e "$output_dir" ] && ERROR "generate_forecast: [$output_dir] exists!" && return 1

    ## Getting unique forecast items
    local forecast_items=$(jq -c ".[].forecast" $SYSTEMS_JSON | perl  -pe "s/[,\"\]\[]/\n/g" | sort | uniq)

    ## Generating RAW time series data from HappyFace DB and Elasticsearch DB. Using plugins here.
    # generate_ts_data "happyface" "$forecast_items" $forecast_data_dir
    # generate_ts_data "elasticsearch" "$forecast_items" $forecast_data_dir

    ## Generating analysis plots and objs
    parallel_rcaller $forecast_alg $output_dir "$forecast_data_dir" "$forecast_items"
    return 0
}


## Sub-function of generate_forecast
generate_ts_data(){
    local plugin=$1
    case $plugin in
	happyface|elasticsearch)
	    generate_${plugin}_ts_data "$2" "$3"
	    return $?
	    ;;
	*)
	    echo "Forecast data plugin [$plugin] is not defined" && return 1
	    ;;
    esac
}


#---------------------------------------------------------------------------
# Final Summary Generator Functions
#  {summary}
#  Summarization process runs by the following order
#   "prepare_summary" --> "generate_summary" --> "index" --> "generate_symlink"
#---------------------------------------------------------------------------

## Copying summary_template to INDEX_DIR and applying basic properties such as SITE_NAME, TIME and so on
prepare_summary_template(){
    local summary_template=$1
    local index_dir=$(dirname $summary_template)
    [ ! -e $index_dir ] && ERROR "index_dir [$index_dir] does not exist" && return 1

    ## Copying SUMMARY_TEMPLATE to index_dir
    cp -rvfL $SUMMARY_TEMPLATE $index_dir/
    ! ls $summary_template/*.json &> /dev/null && ERROR "[$summary_template/*.json] does not exist" && return 1

    #---------------------------------------------
    # Reserved tokens in summary_tempalte/*.json
    # are modified.
    #---------------------------------------------
    ## Easiest part is to get the followings
    local __MYNAME__=$CONFIG_MYNAME
    local __SITE__=$CONFIG_SITE
    local __TIME__=$(date +"%l %M %p")
    local __HISTORY__=$(echo $RDATE_IDs)

    ## Applying the easiest part such as __SITE__ etc..
    sed -e "s/__MYNAME__/$__MYNAME__/g" -i $summary_template/*.json
    sed -e "s/__SITE__/$__SITE__/g" -i $summary_template/*.json
    sed -e "s/__TIME__/$__TIME__/g" -i $summary_template/*.json
    sed -e "s/__HISTORY__/$__HISTORY__/g" -i $summary_template/*.json

    return 0
}


## Generating a summary json 'summary.json' in INDEX_DIR
generate_summary(){
    local rcall="${1}_summary"

    ## Set index dir
    local output_dir=$INDEX_DIR/$LATEST_DATE_ID
    local summary_template_dir=$output_dir/$(basename $SUMMARY_TEMPLATE)
    local summary_json=$output_dir/summary.json

    ## Putting summary template into INDEX_DIR
    prepare_summary_template $summary_template_dir || return 1

    ## Making a link "summary.json" from a modified ${level}.json
    INFO "Generating summary.json (Changing __LEVEL__, __URLS__, __SYSTEMS__ and __SCORE__ in [$summary_template_dir/*.json]) ..."
    single_rcaller "$rcall" "$summary_template_dir" "$summary_json" || return 1

    ## Displaying a final status summary
    echo " ------------- [$summary_json] ------------- "
    cat $summary_json
    return 0
}


## Generating an index file 'analysis.json' in INDEX_DIR
generate_analysis_index(){
    local index_dir=$INDEX_DIR/$LATEST_DATE_ID
    [ ! -e $index_dir ] && ERROR "index_dir [$index_dir] does not exist" && return 1
    local analysis_json=$index_dir/analysis.json
    
    ## Outputting index_dir/analysis.json
    local items=(capture thumbnail base_image analysis pathway madvision madvision_thumbnail forecast)
    local all_analysis_subdirs=($CAPTURE_DIR $THUMBNAIL_DIR $BASE_IMAGE_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR)
    echo "[{" > $analysis_json
    echo "   \"datetime\": \"$LATEST_DATE_ID\"," >> $analysis_json
    local i
    for i in $(seq 0 $((${#all_analysis_subdirs[*]} - 1)))
    do
	local dir=${all_analysis_subdirs[$i]}/$LATEST_DATE_ID
	INFO "Collecting index data [${items[$i]}] from [$dir] --> [$analysis_json]"

	## Outputting contents
	echo -n "   \"${items[$i]}\": [" >> $analysis_json
	ls $dir/* &> /dev/null && echo -n $(ls $dir/*) | perl -pe "s/ /\", \"/g"  | perl -pe "s/^(.*)$/\"\1\"/g" >> $analysis_json
	[ $i -ne $((${#all_analysis_subdirs[*]} - 1)) ] && echo "]," >> $analysis_json
	[ $i -eq $((${#all_analysis_subdirs[*]} - 1)) ] && echo "]" >> $analysis_json
    done
    echo "}]" >> $analysis_json

    return 0
}


## Genelating "latest" symlinks in each LATEST_DATE_ID directory (e.g. 20180101-2300)
generate_latest_symlinks(){
    local all_inout_subdirs="$CAPTURE_DIR $THUMBNAIL_DIR $INDEX_DIR $BASE_IMAGE_DIR $PLOT_ANALYSIS_DIR $PLOT_PATHWAY_DIR $MADVISION_DIR $MADVISION_THUMBNAIL_DIR $PLOT_FORECAST_DIR $FORECAST_DATA_DIR"
    local dir
    for dir in $all_inout_subdirs
    do
	[ ! -e $dir/$LATEST_DATE_ID ] && continue
	[ -e $dir/latest ] && rm -v $dir/latest
	ln -vs $LATEST_DATE_ID $dir/latest
    done
}
