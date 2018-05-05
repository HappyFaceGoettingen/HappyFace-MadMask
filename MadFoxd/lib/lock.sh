#-------------------------------
# Handling a lock file
#-------------------------------
get_lockfile(){
    local type=$1
    echo "$PIDDIR/${COMMAND}.$type.${X_DISPLAY}__${X_RESOLUTION}.lock"
    return 0
}

has_lock(){
    local type=$1
    [ -e $(get_lockfile $type) ] && return 0
    return 1
}

write_lock(){
    local type=$1
    local pid=$2
    INFO "Writing a lock file of pid [$pid] for [$type]"
    echo "$pid" > $(get_lockfile $type)
    return 0
}

read_lock(){
    local type=$1
    local lockfile=$(get_lockfile $type)
    [ ! -e $lockfile ] && return 1
    cat $lockfile
    return 0
}

check_lock(){
    local type=$1
    ! has_lock $type && return 1
    local pid=$(read_lock $type)
    if [ ! -z "$pid" ] && ps ax | grep "^ *$pid " &> /dev/null; then
	INFO "$type: [$pid] is running"
	return 0
    else
	DEBUG "$(ps ax | grep firefox)"
	ERROR "$type: [$pid] in lockfile exists. But process is not running."
	return 1
    fi
}

remove_lock(){
    local type=$1
    local pid=$(read_lock $type)
    [ $? -ne 0 ] && return 1
    INFO "Killing $type [$pid]"
    kill -kill $pid
    rm -v $(get_lockfile $type)
    return 0
}


remove_all_locks(){
    for lockfile in $(ls $PIDDIR/${COMMAND}.*.lock)
    do
	local pid=$(cat $lockfile)
	kill -kill $pid
	rm -v $lockfile
    done
}


really_kill(){
    killall $1
}
