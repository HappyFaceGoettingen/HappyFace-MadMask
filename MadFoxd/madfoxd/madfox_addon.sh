#-------------------------------
# MadFox Addon Handler
#-------------------------------
run_madfox_addon(){
    case $1 in
	reload)
	    INFO "Pushed Alt+Shift+u for Madfox"
	    xdotool key Alt+Shift+u
	    ;;
	capture)
	    INFO "Pushed Alt+Shift+s for Madfox"
	    xdotool key Alt+Shift+s
	    ;;
	capture_and_close)
	    INFO "Pushed Shift+Ctrl+s for Madfox"
	    xdotool key Shift+Ctrl+s
	    ;;
	*)
	    echo "Such action is not defined by MadFox"
	    exit -1
	    ;;
    esac
}


get_madfox_addon_outdir(){
    echo "/tmp/madfox.${USER}__$(basename ${FIREFOX_PROFILE})"
}
