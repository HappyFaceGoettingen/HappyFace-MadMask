TRACE_LEVEL=100
DEBUG_LEVEL=80
INFO_LEVEL=60
WARN_LEVEL=40
ERROR_LEVEL=20

get_loglevel(){
    case $LOGLEVEL in
	$TRACE_LEVEL)
	    echo "TRACE"
	    ;;
	$DEBUG_LEVEL)
	    echo "DEBUG"
	    ;;
	$INFO_LEVEL)
	    echo "INFO"
	    ;;
	$WARN_LEVEL)
	    echo "WARN"
	    ;;
	$ERROR_LEVEL)
	    echo "ERROR"
	    ;;
    esac
}

set_loglevel(){
    local loglevel=$1
    case $loglevel in
	TRACE)
	    LOGLEVEL=$TRACE_LEVEL
	    ;;
	DEBUG)
	    LOGLEVEL=$DEBUG_LEVEL
	    ;;
	INFO)
	    LOGLEVEL=$INFO_LEVEL
	    ;;
	WARN)
	    LOGLEVEL=$WARN_LEVEL
	    ;;
	ERROR)
	    LOGLEVEL=$ERROR_LEVEL
	    ;;
	*)
	    echo "LOGLEVEL [$loglevel] is not correct!"
	    exit -1
	    ;;
    esac
    INFO "LOGLEVEL = $(get_loglevel)"
}

TRACE(){
    [ "$LOGLEVEL" -ge "$TRACE_LEVEL" ] && yellow_echo "$(date): TRACE: $*"
    return 0
}

DEBUG(){
    [ "$LOGLEVEL" -ge "$DEBUG_LEVEL" ] && green_echo "$(date): DEBUG: $*"
    return 0
}

INFO(){
    [ "$LOGLEVEL" -ge "$INFO_LEVEL" ] && cyan_echo "$(date): INFO: $*"
    return 0
}

WARN(){
    [ "$LOGLEVEL" -ge "$WARN_LEVEL" ] && magenta_echo "$(date): WARN: $*"
    return 0
}

ERROR(){
    [ "$LOGLEVEL" -ge "$ERROR_LEVEL" ] && red_echo "$(date): ERROR: $*"
    return 0
}


#-----------------------------------------
# Colorful Echos
#-----------------------------------------
red_echo(){
    echo "$(tput setaf 1)$*$(tput sgr 0)"
}

green_echo(){
    echo "$(tput setaf 2)$*$(tput sgr 0)"
}

yellow_echo(){
    echo "$(tput setaf 3)$*$(tput sgr 0)"
}

blue_echo(){
    echo "$(tput setaf 4)$*$(tput sgr 0)"
}

magenta_echo(){
    echo "$(tput setaf 5)$*$(tput sgr 0)"
}

cyan_echo(){
    echo "$(tput setaf 6)$*$(tput sgr 0)"
}

white_echo(){
    echo "$(tput setaf 7)$*$(tput sgr 0)"
}



LOGLEVEL=$INFO_LEVEL
INFO "Loading logger.sh ..."

