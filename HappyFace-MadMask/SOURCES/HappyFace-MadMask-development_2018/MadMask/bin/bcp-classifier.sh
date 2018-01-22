export CLASSIFIER="Bayesian Change Point"
export BCP_THRESHOLD=0.7


#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------
R_generate_classifier(){
    local urlfile=$1
    local input_images_dir=$2
    local date_ids="$3"
    local R_plot_infogain_dir=$4
    local R_plot_analysis_dir=$5
    local R_robj_dir=$6

    local rfile="rsrc/generate_bcp_classifier.R"
    start_monitoringUrls_json $urlfile
    for level in ${LEVELS[*]}
    do
	local i=0
	next_monitoringUrls_json $urlfile
	for file_prefix in ${file_prefixes[*]}
	do
	    if [ "${captures[$i]}" == "true" ]; then
		parallel_run $parallel "R --slave -f $rfile --args $input_images_dir $date_ids $file_prefix $R_plot_infogain_dir $R_plot_analysis_dir $R_robj_dir" $rfile
	    fi
	    [ ! -z "$DEBUG" ] && [ $i -gt 1 ] && break
	    let i++
	done
    done
    check_parallel_job $parallel $rfile "final"     
}

R_generate_madvision(){
    local urlfile=$1
    local input_images_dir=$2
    local date_ids="$3"
    local R_robj_dir=$4
    local R_mad_vision_dir=$5

    local rfile="rsrc/generate_bcp_madvision.R"
    start_monitoringUrls_json $urlfile
    for level in ${LEVELS[*]}
    do
	local i=0
	next_monitoringUrls_json $urlfile
	for file_prefix in ${file_prefixes[*]}
	do
	    if [ "${captures[$i]}" == "true" ]; then
		parallel_run $parallel "R --slave -f $rfile --args $input_images_dir $date_ids $file_prefix $R_robj_dir $BCP_THRESHOLD $R_mad_vision_dir" $rfile
	    fi
	    [ ! -z "$DEBUG" ] && [ $i -gt 1 ] && break
	    let i++
	done
    done
    check_parallel_job $parallel $rfile "final"     
}


#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------
R_generate_results(){
    local urlfile=$1
    local max_output_list=$2
    local robj_dir=$3
    local R_output_dir=$4

    local rfile="rsrc/generate_bcp_results.R"

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
