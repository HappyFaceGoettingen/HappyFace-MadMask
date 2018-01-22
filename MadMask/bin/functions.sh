#---------------------------------------------------------
# Function: Basic parameters
#
#---------------------------------------------------------

## Input JSON files
config_json="site/config.json"
emails_json="site/emails.json"
servers_json="site/servers.json"

## Output JSON files
summary_json="data/$USER/json/summary.json"


## Analysis inputs & outputs
analysis_dir="data/$USER/analysis"
plot_analysis_dir="$analysis_dir/plot_analysis"
plot_infogain_dir="$analysis_dir/plot_infogain"
plot_pathway_dir="$analysis_dir/plot_pathway"
robj_dir="$analysis_dir/robj"
input_images_dir="$analysis_dir/input_images"
R_output_dir="$analysis_dir/results"
madvision_dir="$analysis_dir/mad_vision"

## Consts for picture converter 
THUMBNAIL_OPTION="-geometry 100x200!"
TRIM_FUZZ_OPTION="20%"
JPG_QUALITY="50"

## Default display resolution
DEFAULT_XRESOLUTION=1240x1024

#---------------------------------------------------------
# Function: processor of parallel jobs
#
#---------------------------------------------------------
WAIT_PARALLEL_JOB_AFTER_EXEC=0.5
WAIT_PARALLEL_JOB_CHECK=3
running_jobs=""

parallel_run(){
    RET=""
    local parallel=$1
    local job_command="$2"
    local keyword=$3

    ## run job
    INFO "$job_command"
    $job_command &
    running_jobs="$running_jobs $!"

    sleep $WAIT_PARALLEL_JOB_AFTER_EXEC
    check_parallel_job $parallel "$keyword"
}


check_parallel_job(){
    local parallel=$1
    local keyword=$2
    local final=$3

    while true
      do
      num_of_jobs=0
      jobs=""
      for proc in $running_jobs
        do
        running_procs=$(ps aux | grep ^${USER} | grep $keyword | awk '{print $2}' | grep $proc)
        if [ "$running_procs" != "" ]; then
	    let let num_of_jobs++
            jobs="$jobs $proc"
        fi
      done

      if [ "$final" == "final" ] && [ $num_of_jobs -gt 0 ]; then
          sleep $WAIT_PARALLEL_JOB_CHECK
          continue
      fi
      
      if [ $num_of_jobs -lt $parallel ]; then
          running_jobs=$jobs
          break
      else
          sleep $WAIT_PARALLEL_JOB_CHECK
      fi
    done
}


#---------------------------------------------------------
# Function: Moving data to latest dir
#
#---------------------------------------------------------
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



#---------------------------------------------------------
# Function: JSON analyzers
#
#---------------------------------------------------------
LEVELS=()

link_names=()
file_prefixes=()
urls=()
captures=()
FIREFOX_XDISPLAY_NAMES=()
FIREFOX_WAITS_BEFORE_COMMANDS=()
FIREFOX_COMMANDS=()
FIREFOX_WAITS=()

iter_monitoringUrls_json=0

start_monitoringUrls_json(){
    local jsonfile=$1

    [ ! -e $jsonfile ] && return 1

    iter_monitoringUrls_json=0
    LEVELS=(`jq ".[].level" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
}

next_monitoringUrls_json(){
    local jsonfile=$1
    local iter=$iter_monitoringUrls_json

    [ ! -e $jsonfile ] && return 1

    INFO "Level iter = $iter"
    link_names=(`jq ".[$iter].urls[].name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    file_prefixes=(`jq ".[$iter].urls[].file_prefix" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    urls=(`jq ".[$iter].urls[].link" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    captures=(`jq ".[$iter].urls[].capture" $jsonfile`)
    FIREFOX_XDISPLAY_NAMES=(`jq ".[$iter].urls[].xdisplay_name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)

    comma_separated_link_names=(`jq ".[$iter].urls[].name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g" | perl -pe "s/\n/,/g"`)
    comma_separated_file_prefixes=(`jq ".[$iter].urls[].file_prefix" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g" | perl -pe "s/\n/,/g"`)
    comma_separated_captures=(`jq ".[$iter].urls[].capture" $jsonfile | perl -pe "s/\n/,/g"`)

    let iter_monitoringUrls_json++
}


load_monitoringUrls_json(){
    local jsonfile=$1

    [ ! -e $jsonfile ] && return 1

    LEVELS=(`jq ".[].level" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    file_prefixes=(`jq ".[].urls[].file_prefix" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    urls=(`jq ".[].urls[].link" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    captures=(`jq ".[].urls[].capture" $jsonfile`)
    FIREFOX_COMMANDS=(`jq ".[].urls[].firefox_command" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    FIREFOX_WAITS=(`jq ".[].urls[].firefox_wait" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    FIREFOX_WAITS_BEFORE_COMMANDS=(`jq ".[].urls[].firefox_wait_before_command" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    FIREFOX_XDISPLAY_NAMES=(`jq ".[].urls[].xdisplay_name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
}



#---------------------------------------------------------------------
#
# config.json loader
#
#---------------------------------------------------------------------x
MYNAME=""
SITE=""
DISPLAY_NUMBERS=()
DISPLAY_RESOLUTIONS=()
DISPLAY_NAMES=()
DISPLAY_WAITS_FIREFOX=()

load_config_json(){
    local jsonfile=$1

    [ ! -e $jsonfile ] && return 1
    INFO "Reading [$jsonfile] ..."

    export MYNAME=$(jq ".myname" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g")
    export SITE=$(jq ".site" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g")

    ## For Xvfb displays
    DISPLAY_NUMBERS=(`jq ".xdisplay[].number" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    DISPLAY_NAMES=(`jq ".xdisplay[].name" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    DISPLAY_RESOLUTIONS=(`jq ".xdisplay[].resolution" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
    DISPLAY_WAITS_FIREFOX=(`jq ".xdisplay[].wait_firefox" $jsonfile | sed "s/^\"\(.*\)\"$/\1/g"`)
}



#---------------------------------------------------------------------
#
# Using Virtual XWindow
#
#---------------------------------------------------------------------
set_default_virtual_xwindow(){
    local jsonfile="$1"

    load_config_json $jsonfile

    xscreen=${DISPLAY_NUMBERS[0]}
    INFO "export DISPLAY=:${xscreen}.0"
    export DISPLAY=:${xscreen}.0
}



#---------------------------------------------------------
# Function: System load monitor
#
#---------------------------------------------------------
system_load_monitor(){
    local system_load_threshold=$1
    local mpstat_count=$2
    [ -z "$mpstat_count" ] && mpstat_count=5

    local idle=$(mpstat 1 $mpstat_count | tail -n 1 | awk '{print $11}' | perl -pe "s/\..*//g")
    local system_load=$(echo "100 - $idle" | bc)

    INFO "system load = $system_load %, threshold = $system_load_threshold %"

    if [ $system_load -gt $system_load_threshold ]; then
	return 1
    else
	return 0
    fi
}



quick_system_load_monitor(){
    local system_load_threshold=$1

    ## Estimating current system load
    local proc_cpu_usage=$(top -b -n 1 | grep "^\s*[0-9]" | awk '{print $10}')
    local cpu_usage=$(echo $proc_cpu_usage | sed "s/ / + /g" | bc)
    #local num_cpu=$(grep processor /proc/cpuinfo | wc -l)
    #local system_load=$(echo "$cpu_usage / $num_cpu" | bc)
    local system_load=$(printf "%.0f\n" $cpu_usage)

    ## Result
    echo "quick system load = $system_load %, threshold = $system_load_threshold %"
    if [ $system_load -ge $system_load_threshold ]; then
        return 1
    else
        return 0
    fi
}



#---------------------------------------------------------
# Function: Logger Info
#
#---------------------------------------------------------
INFO(){
    local message="$1"
    echo "[$(date)]: $message"
}


WAIT(){
    local wait_sec=$1
    INFO "Waiting [$wait_sec sec] ..."
    sleep $wait_sec
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


debug_functions(){
    echo "Starting debug ..."

    load_monitoringUrls_json sites/adcos/monitoring-urls.json

    i=0
    for url in ${urls[*]}
    do
	INFO "url = $url"
	INFO "command = ${firefox_commands[$i]}"
	let i++
    done

    load_config_json sites/adcos/config.json
    echo "$SITE"
}

#debug_functions
