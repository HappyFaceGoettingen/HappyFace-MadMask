## Max outputs for summary of system elements
MAX_SUMMARY_OUTPUTS=3

input_image_convert_option="-geometry $input_image_size!"


#---------------------------------------------------------
# Function: Picture converter
#
#---------------------------------------------------------
set_analysis_dirs(){
    local data_home="$1"

    ##
    analysis_dir=$OPTARG
    plot_analysis_dir="$analysis_dir/plot_analysis"
    plot_infogain_dir="$analysis_dir/plot_infogain"
    plot_pathway_dir="$analysis_dir/plot_pathway"
    robj_dir="$analysis_dir/robj"
    base_images_dir="$analysis_dir/base_images"
    madvision_dir="$analysis_dir/mad_vision"
    madvision_thumbnail_dir="$analysis_dir/mad_vision_thumbnail"
    R_output_dir="$analysis_dir/results"
    
    [ -z "$analysis_dir" ] && INFO "analysis_dir is empty!" && exit -1
    [ ! -e "$analysis_dir" ] && mkdir -pv $analysis_dir
}


#---------------------------------------------------------
# Function: Picture converter
#
#---------------------------------------------------------
picture_converter(){
    local input_dir="$1"
    local convert_option="$2"
    local output_dir="$3"

    for f in $(ls $input_dir/*)
    do
	if [ -e $f ]; then
	    INFO "Converting [$f] ($convert_option)  -->  [$output_dir/$(basename ${f})]"
	    convert "$f" $convert_option $output_dir/$(basename ${f})
	else
	    INFO "[$f] does not exist! Skipping."
	fi
    done
}


move_data_to_latest_dir(){
    local from_dir=$1
    local to_dir=$2

    [ -e $to_dir ] && echo "[$to_dir] already exists!" && return 1
    [ ! -e $(dirname $to_dir) ] && mkdir -vp $(dirname $to_dir)
    rm -v $(dirname $to_dir)/latest
    mv -v $from_dir $to_dir
    ln -s $(basename $to_dir) $(dirname $to_dir)/latest
}

move_data_to_dir(){
    local from_dir=$1
    local to_dir=$2

    [ ! -e $to_dir ] && mkdir -vp $to_dir
    mv -v $from_dir/* $to_dir
    rmdir -v $from_dir
}


#---------------------------------------------------------------------------
#
# Functions
#
#---------------------------------------------------------------------------
make_input_images(){
    local input_dir=$1
    local output_dir=$2

    [ ! -e "$output_dir" ] && mkdir -pv $output_dir

    date_ids=$(ls $input_dir | grep -v latest | tail -n $date_IDs_limit)
    for date_id in $date_ids
    do
	if [ ! -e "$output_dir/$date_id" ]; then
	    output_tmpdir=$(mktemp -d)
	    picture_converter $input_dir/$date_id "$input_image_convert_option" $output_tmpdir
	    mv -v $output_tmpdir $output_dir/$date_id
	fi
    done
}


#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------
generate_classifier(){
    local R_function_name=$1


    ## Making tmp dirs
    local tmp_plot_infogain_dir=$(mktemp -d)
    local tmp_plot_analysis_dir=$(mktemp -d)
    local tmp_robj_dir=$(mktemp -d)
    cp -v $robj_dir/*.robj $tmp_robj_dir/
    

    ## Making a list of capture directories 
    date_ids=$(ls $input_images_dir | grep -v latest | tail -n $date_IDs_limit | perl -pe "s/\n/,/g")
    date_id=$(ls $input_images_dir | grep -v latest | tail -n 1)

    ## Calling R
    $R_function_name $urlfile "$input_images_dir" "$date_ids" $tmp_plot_infogain_dir $tmp_plot_analysis_dir $tmp_robj_dir
    

    ## Moving temporary files
    INFO "Moving plot files to [$plot_infogain_dir, $plot_analysis_dir], Moving robj files to [$robj_dir]"

    move_data_to_latest_dir $tmp_plot_infogain_dir $plot_infogain_dir/$date_id
    move_data_to_latest_dir $tmp_plot_analysis_dir $plot_analysis_dir/$date_id
    move_data_to_dir $tmp_robj_dir $robj_dir
}


generate_results(){
    local R_function_name=$1
    [ ! -e $R_output_dir ] && mkdir -pv $R_output_dir
    $R_function_name $urlfile $MAX_OUTPUT_LIST "$robj_dir" "$R_output_dir"
}


generate_pathway(){
    local tmp_plot_pathway_dir=$(mktemp -d)
    date_id=$(ls $input_images_dir | grep -v latest | tail -n 1)

    R --slave -f rsrc/generate_pathway.R --args $urlfile $servers_json $robj_dir $tmp_plot_pathway_dir

    move_data_to_latest_dir $tmp_plot_pathway_dir $plot_pathway_dir/$date_id
}


generate_madvision(){
    local R_function_name=$1

    ## Making tmp dirs
    local tmp_madvision_dir=$(mktemp -d)

    ## Making a list of capture directories 
    date_ids=$(ls $input_images_dir | grep -v latest | tail -n $date_IDs_limit | perl -pe "s/\n/,/g")
    date_id=$(ls $input_images_dir | grep -v latest | tail -n 1)

    ## Calling R
    [ -e $madvision_dir/$date_id ] && echo "[$madvision_dir/$date_id] exists!" && return 1 
    $R_function_name $urlfile "$PWD/$capture_dir" "$date_ids" $robj_dir $tmp_madvision_dir


    ## Moving temporary files
    INFO "Moving plot files to [$tmp_madvision_dir], Moving robj files to [$madvision_dir]"

    move_data_to_latest_dir $tmp_madvision_dir $madvision_dir/$date_id

    ## Making thumbnails
    make_madvision_thumbnails $madvision_dir/$date_id $thumbnail_dir/$date_id $madvision_thumbnail_dir/$date_id
}


make_madvision_thumbnails(){
    local input_dir=$1
    local ref_thumbnail_dir=$2
    local final_thumbnail_dir=$3
    
    thumbnail_tmpdir=$(mktemp -d)

    for f in $(ls $input_dir/*)
    do
	if [ -L $f ]; then
	    ln -vs $PWD/$ref_thumbnail_dir/$(basename ${f}) $thumbnail_tmpdir/$(basename ${f})
	else
            INFO "Converting [$f] ($THUMBNAIL_OPTION)  -->  [$thumbnail_tmpdir/$(basename ${f})]"
            convert "$f" $THUMBNAIL_OPTION $thumbnail_tmpdir/$(basename ${f})
	fi
    done

    move_data_to_latest_dir $thumbnail_tmpdir $final_thumbnail_dir
}


#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------
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
