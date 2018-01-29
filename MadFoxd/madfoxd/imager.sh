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


#-------------------------------
# Write indexes
#-------------------------------



#-------------------------------
# Image manipulators
#-------------------------------
## Hardcoded consts for picture converters 
THUMBNAIL_OPTION="-geometry 100x200!"
TRIM_FUZZ_OPTION="20%"
JPG_QUALITY="50"

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
	    ERROR "[$f] does not exist! Skipping."
	fi
    done
}

import_browser_image(){
    local input_image=$1
    local output_image=$2

    [ ! -e $input_image ] && ERROR "No input_image [$input_image]!" && return 1

    DEBUG -n "Trimming [$input_image] --> [$output_image], "
    convert -fuzz $TRIM_FUZZ_OPTION -trim $input_image -type TrueColor -quality $JPG_QUALITY $output_image 2>&1 | grep "geometry does not contain image"
    if [ $? -eq 0 ]; then
	ERROR "Trim error: [$input_image]"
	rm -v $input_image $output_image
	return 1
    else
	rm -v $input_image
	return 0
    fi
}


generate_thumbnails(){
    local input_dir=$1
    local thumbnail_dir=$2
    
    thumbnail_tmpdir=$(mktemp -d)
    picture_converter $input_dir "$THUMBNAIL_OPTION" $thumbnail_tmpdir
    
    [ ! -e "$thumbnail_dir" ] && mkdir -pv $thumbnail_dir
    mv -v $thumbnail_tmpdir/* $thumbnail_dir

    rm -v $(dirname $thumbnail_dir)/latest
    ln -vs $(basename $thumbnail_dir) $(dirname $thumbnail_dir)/latest
}

