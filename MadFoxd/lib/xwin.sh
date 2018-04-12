#-------------------------------
# Handling Virtual X-Window
#-------------------------------
fit_window(){
    local app=$1
    local resolution=$2

    [[ "$DISPLAY" =~ ^:0 ]] && return

    INFO "Fitting $app window"

    ## Fitting window
    local width=$(echo $resolution | sed "s/x.*$//g")
    local height=$(echo $resolution | sed "s/^.*x//g")

    local try=
    for try in $(seq 0 $WAIT_CLOUD_BOOT)
    do
	local windowid=$(xdotool search --onlyvisible $app 2>&1 | grep "^[0-9]" | tail -n 1)
	if [ -z "$windowid" ]; then
	    INFO "[$try]: Waiting [$app] to get a Window ID"
	    sleep 60
	else
	    ## Fitting Window by xdotool
	    xdotool windowmove $windowid 0 0
	    xdotool windowsize $windowid $width $height
	    break
	fi
    done

    ## Moving mouse pointer (to an unvisible point)
    xdotool mousemove 10000 10000
}


start_virutal_xwin(){
    [[ "$DISPLAY" =~ ^:0 ]] && INFO "Virtual Xwin: Using desktop [$DISPLAY]" && return 0
    check_lock Xwin && return 0

    INFO "Starting Virutal X-Window [Xvfb $DISPLAY -screen 0 ${X_RESOLUTION}x${X_COLOR_DEPTH}] ..."
    Xvfb $DISPLAY -screen 0 ${X_RESOLUTION}x${X_COLOR_DEPTH} &> /dev/null &
    [ $? -ne 0 ] && ERROR "Failed to start [$DISPLAY]" && return 1
    write_lock Xwin $!
    return 0
}


stop_virutal_xwin(){
    [[ "$DISPLAY" =~ ^:0 ]] && INFO "Virtual Xwin: Nothing to do with [$DISPLAY]" && return 0
    ! check_lock Xwin && ERROR "Xwin already stopped" && return 1
    remove_lock Xwin
    return 0
}

