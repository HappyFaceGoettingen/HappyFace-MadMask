generate_happyface_ts_data(){
    local items="$1"
    local output_dir="$2"
    local datetime_length="$3"
    local happyface_db="$4"

    ## HappyFace uses sqlite
    local SQLITE_BIN=sqlite3
    ! which $SQLITE_BIN && ERROR "[$SQLITE_BIN] does not exist" && return 1

    ## Fetching happyface.* items
    local item=
    for item in $items
    do
	[[ $item =~ ^happyface\. ]] || continue
	local output=$output_dir/${item}.csv
	fetch_happyface_ts_data "$item" "$output" "$datetime_length" "$happyface_db" "$SQLITE_BIN"
    done
    return 0
}


fetch_happyface_ts_data(){
    local happyface_table_and_field="$1"
    local output_file="$2"
    local datetime_length="$3"
    local happyface_db="$4"
    local sqlite_bin="$5"

    ## Consts
    local PROD_HF_DB=/var/lib/HappyFace/HappyFace.db
    local DEVEL_HF_DB=$HOME/var/develop/MadMask/MadModules/examples/HappyFace.db

    ## Set Variables
    local hf_table=$(echo "$happyface_table_and_field" | cut -d "." -f 2)
    local hf_field=$(echo "$happyface_table_and_field" | cut -d "." -f 3)
    [ -z "$datetime_length" ] && datetime_length=300
    [ -z "$happyface_db" ] && happyface_db=$PROD_HF_DB

    ## Check if HappyFace DB exists
    if [ ! -e $happyface_db ]; then
	if [ ! -e $DEVEL_HF_DB ]; then
	    ERROR "HappyFace Database [$happyface_db] does not exist"
	    return 1
	fi

	## For a development machine
	happyface_db=$DEVEL_HF_DB
    fi

    ## Looking for data from HappyFace DB
    local sql_query="select $hf_field from $hf_table where id > (select max(id) from $hf_table) - $datetime_length;"
    local output=$(echo "$sql_query" | $SQLITE_BIN $happyface_db)

    ## Data exist? Doing simple checks before outputting the result
    [ $? -ne 0 ] && ERROR "Failed [$sql_query] in [$happyface_db]" && return 1
    [ -z "$output" ] && ERROR "No data by [$sql_query] in [$happyface_db]" && return 1

    ## Outputting data
    INFO "Generated [$output] from [$happyface_db]"
    echo "$output" > $output_file
}

