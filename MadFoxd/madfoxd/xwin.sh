#-------------------------------
# Handling Virtual X-Window
#-------------------------------
fit_window(){
    local app=$1
    local resolution=$2

    [[ "$DISPLAY" =~ ^:0 ]] && return

    INFO "Fitting $app window"

    ## Fitting window
    width=$(echo $resolution | sed "s/x.*$//g")
    height=$(echo $resolution | sed "s/^.*x//g")

    windowid=$(xdotool search --onlyvisible $app 2>&1 | tail -n 1) 
    xdotool windowmove $windowid 0 0
    xdotool windowsize $windowid $width $height

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
    ! check_lock Xwin && return 1
    remove_lock Xwin
    return 0
}

