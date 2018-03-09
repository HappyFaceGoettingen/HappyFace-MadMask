#---------------------------------------------------------
# Function: System load monitor
#
#---------------------------------------------------------
system_load_monitor(){
    local system_load_max=$1
    local top_count=$2
    [ -z "$top_count" ] && top_count=3

    INFO "Checking system load ..."
    local system_load=$(top -b -n $top_count | grep Cpu | awk '{print $2 + $16}' | tail -n 1)
    system_load=$(printf "%0.0f" $system_load)
    INFO "System load = $system_load %, max = $system_load_max %"

    [ $system_load -ge $system_load_max ] && return 1
    return 0
}


#---------------------------------------------------------
# Function: processor of parallel jobs
#
#---------------------------------------------------------
parallel_run(){
    local prog="$1"
    local job_command="$2"

    ## run job
    INFO "$job_command"
    $job_command &
    TRACE "Submitted [$!]"

    check_parallel_job "$prog" "submitting"
}


check_parallel_job(){
    local prog="$1"
    local final=$2
    [ -z "$PARALLEL" ] && PARALLEL=$(($(nproc) / 4 ))
    [ -z "$WAIT_PARALLEL_JOB_CHECK" ] && WAIT_PARALLEL_JOB_CHECK=0.5

    while true
      do
        local jobs=$(pstree -p $$ | grep -v -e sleep -e grep -e pstree)
        [ ! -z "$prog" ] && jobs=$(pstree -p $$ | grep "\-$prog" | grep -v grep | perl -pe "s/.*-$prog\((.*)\).*/\1/g")
        jobs=($jobs)
        local num_of_jobs=${#jobs[*]}
        
        ## Check until 0
        if [ -z "$final" ] && [ $num_of_jobs -gt 0 ]; then
          sleep $WAIT_PARALLEL_JOB_CHECK
          INFO "Final: remaining jobs are [$num_of_jobs] ${jobs[*]} ..."
          continue
        fi
        
        ## Check until less than PARALLEL
        if [ $num_of_jobs -lt $PARALLEL ]; then
            INFO "Number of [$prog] jobs = $num_of_jobs, accepting next (${jobs[*]}) ..."
            break
	fi
        sleep $WAIT_PARALLEL_JOB_CHECK
    done
}
