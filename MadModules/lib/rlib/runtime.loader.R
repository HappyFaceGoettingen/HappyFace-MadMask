##-----------------------------------------------------------
##
## Main R library loader
##
##-----------------------------------------------------------
## Command line analyzer
command.args <- commandArgs(trailingOnly = TRUE)

## args="$URLS_JSON $SYSTEMS_JSON §CAPTURE_DIR $BASE_IMAGES_DIR $CDATE_IDs $PLOT_ANALYSIS_DIR/$LATEST_DATE_ID $ANALYSIS_OBJ_DIR"

loader <- command.args[1]
file.prefix <- command.args[2]

urls.json <- command.args[3]
systems.json <- command.args[4]
capture.dir <- command.args[5]
base.images.dir <- command.args[6]
date.ids <- unlist(strsplit(command.args[7], ","))

plot.output.dir <-command.args[8]
robj.dir <-command.args[6]


message("loader               = ", loader)
message("file.prefix          = ", paste(date.ids, collapse=", "))
message("urls.json            = ", urls.json)
message("systems.json         = ", systems.json)
message("capture.dir          = ", capture.dir)
message("base.images.dir      = ", base.images.dir)
message("date.ids             = ", paste(date.ids, collapse=", "))
message("plot.output.dir      = ", plot.output.dir)
message("robj.dir             = ", robj.dir)


## Main code
loader.code <- paste(c(loader, ".R"))

## Run a code
if (! file.exists(loader.code)){
  message("A code: [", loader.code , "] does not exist!")
} else {
  source(loader.code)
}


