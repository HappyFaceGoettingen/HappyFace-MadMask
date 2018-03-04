## Hardcoded consts for picture converters 
THUMBNAIL_OPTION="-geometry 100x200!"
TRIM_FUZZ_OPTION="20%"
JPG_QUALITY="50"

## Images by MadFox addon are png, Outputs are jpg
MADFOX_PICTURE_TYPE=png
PICTURE_TYPE=jpg


#---------------------------------------------------------
# Function: Image importers
#---------------------------------------------------------
import_madfox_images(){
    local from_dir=$1
    local to_dir=$2

    ## Checking input/output
    [ ! -e $from_dir ] && ERROR "[$from_dir] does not exist" && return 1
    [ ! -e $to_dir ] && ERROR "[$to_dir] does not exist" && return 1

    ## Loop for importing images
    INFO "Importing MadFox images from [$from_dir] ..."
    local img=
    local i=-1
    for img in $(ls $from_dir | sort -g)
    do
	## Skipping 0.png or first file
	[ $i -eq -1 ] && i=0 && continue

	local imgfile=$from_dir/$img
	local imported_img=$to_dir/${FILE_PREFIXES[$i]}.${PICTURE_TYPE}
	INFO "Importing [$imgfile] --> [$imported_img]"
	trim_madfox_image $imgfile $imported_img
	let i++

	## For Debug
	[ $LOGLEVEL -ge $DEBUG_LEVEL ] && INFO "DEBUG mode. Exiting." && break
    done

    ## Making a symlink as "latest"
    local latest=$(dirname $to_dir)/latest
    [ -e $latest ] && rm -v $latest
    ln -vs $(basename $to_dir) $latest
}


#-------------------------------
# Thumbnail generator
#-------------------------------
generate_thumbnails(){
    local from_dir=$1
    local to_dir=$2
    [ ! -e $from_dir ] && ERROR "[$from_dir] does not exist" && return 1
    [ ! -e $to_dir ] && ERROR "[$to_dir] does not exist" && return 1

    INFO "Generating thumbnails from [$from_dir] ..."
    local img
    for img in $(ls $from_dir)
    do
	local capture_img=$from_dir/$img
	local thumbnail_img=$to_dir/$img
	INFO "Converting [$imgfile] ($THUMBNAIL_OPTION)  -->  [$thumbnail_img)]"
	convert $capture_img $THUMBNAIL_OPTION $thumbnail_img
	[ $? -ne 0 ] && rm -v $thumbnail_img

	## For Debug
	[ $LOGLEVEL -ge $DEBUG_LEVEL ] && INFO "DEBUG mode. Exiting." && break
    done

    ## Making a symlink as "latest"
    local latest=$(dirname $to_dir)/latest
    [ -e $latest ] && rm -v $latest
    ln -vs $(basename $to_dir) $latest
}


#-------------------------------
# Write indexes
#-------------------------------
write_index_json(){
    local data_dir=$1
    local date_id=$2

    ## Import dirs
    local capture_dir=$data_dir/capture/$date_id
    local thumbnail_dir=$data_dir/thumbnail/$date_id
    local index_dir=$data_dir/index/$date_id

    ## Output JSON file
    local json_out=$index_dir/index.json
    INFO "Writing a JSON file [$json_out] ..."
    echo "[{" > $json_out
    local i
    for i in $(seq 0 ${#FILE_PREFIXES[*]})
    do
	local imgfile=${FILE_PREFIXES[$i]}
	echo "     \"capture\": \"$capture_dir/${imgfile}.${PICTURE_TYPE}\"," >> $json_out
	echo "     \"thumbnail\": \"$capture_dir/${imgfile}.${PICTURE_TYPE}\"" >> $json_out
	[ $i -ne ${#FILE_PREFIXES[*]} ] && echo "  },{" >> $json_out
    done
    echo "}]" >> $json_out
}

write_index_html(){
    local data_dir=$1
    local date_id=$2

    ## Import dirs
    local capture_dir=capture/$date_id
    local thumbnail_dir=thumbnail/$date_id
    local index_dir=$data_dir/index/$date_id

    ## Output HTML file
    local html_out=$index_dir/index.html
    INFO "Writing a HTML file [$html_out] ..."
    echo "<html>" > $html_out
    echo "</html><body>" >> $html_out
    local imgfile
    for imgfile in ${FILE_PREFIXES[*]}
    do
	echo "<a href=\"../../$capture_dir/$imgfile.${PICTURE_TYPE}\">" >> $html_out
	echo "<img src=\"../../$thumbnail_dir/$imgfile.${PICTURE_TYPE}\">" >> $html_out
	echo "</a>" >> $html_out
    done
    echo "</body></html>" >> $html_out

    ## In index
    local latest=$(dirname $index_dir)/latest
    [ -e $latest ] && rm -v $latest
    ln -vs $(basename $index_dir) $latest
}



#-------------------------------
# Image manipulators
#-------------------------------
trim_madfox_image(){
    local input_image=$1
    local output_image=$2

    [ ! -e $input_image ] && ERROR "No input_image [$input_image]!" && return 1

    DEBUG -n "Trimming [$input_image] --> [$output_image], "
    convert -fuzz $TRIM_FUZZ_OPTION -trim $input_image -type TrueColor -quality $JPG_QUALITY $output_image 2>&1 | grep "geometry does not contain image"
    if [ $? -eq 0 ]; then
	ERROR "Trim error: [$input_image]"
	rm -v $output_image
	return 1
    else
	return 0
    fi
}



