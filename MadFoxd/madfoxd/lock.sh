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
    echo "$pid" > $(get_lockfile $type)
    return 0
}

read_lock(){
    local type=$1
    local lockfile=$(get_lockfile $type)
    [ ! -e $lockfile ] && ERROR "$type: $lockfile does not exist" && return 1
    cat $lockfile
    return 0
}

check_lock(){
    local type=$1
    local pid=$(read_lock $type)
    [ $? -ne 0 ] && return 1
    if ps ax | grep "^$pid " &> /dev/null; then
	echo "$type: [$pid] is running"
	return 0
    else
	echo "$type: [$pid] in lockfile exists. But process is not running."
	return 1
    fi
}

remove_lock(){
    local type=$1
    local pid=$(read_lock $type)
    [ $? -ne 0 ] && return 1
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
