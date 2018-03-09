##-----------------------------------------------------------
##
## Main R library loader
##
##-----------------------------------------------------------
library(futile.logger)
library(rjson)

##-----------------------------------------------------------
## Useful Common Functions
##-----------------------------------------------------------
str.concat <- function(...){
  paste(c(...), collapse="")
}


monitoring.urls.caller <- function(func=NULL, func.vars=list()){
  message("Reading [", urls.json, "] ...")
  monitoring.urls <- fromJSON(file=urls.json)
  message("Reading [", systems.json, "] ...")
  all.systems <- fromJSON(file=systems.json)
  
  ## Loop over Levels
  for (level in length(monitoring.urls):1){
    urls <- monitoring.urls[[level]]$urls
    level.name <<- monitoring.urls[[level]]$level
    if (is.null(level.name)){
      message("Level is null. Skipping ..")
      next
    }
    message("Level = [", level.name, "]")

    ## Loop over monitoring pages
    for (url.id in 1:length(urls)){
      ## If capture = true, then call a function
      if (urls[[url.id]]$capture){
        file.prefix <<- urls[[url.id]]$file
        url.name <<- urls[[url.id]]$name
        systems <<- urls[[url.id]]$systems

        ## Definitions of R Object files
        robj.infogain <<- str.concat(robj.dir, "/", file.prefix, "__infogain.robj")
        robj.detector <<- str.concat(robj.dir, "/", file.prefix, "__detector.robj")
        robj.pathway <<- str.concat(robj.dir, "/", file.prefix, "__pathway.robj")

        ## Calling a function
        do.call(func, func.vars)
      }
    }
  }
}



##-----------------------------------------------------------
## Main
##-----------------------------------------------------------
## Command line analyzer
command.args <- commandArgs(trailingOnly = TRUE)

## args="$URLS_JSON $SYSTEMS_JSON §CAPTURE_DIR $BASE_IMAGES_DIR $CDATE_IDs $output_dir $ANALYSIS_OBJ_DIR $others"
loader <- command.args[1]
file.prefix <- command.args[2]

urls.json <- command.args[3]
systems.json <- command.args[4]
capture.dir <- command.args[5]
base.images.dir <- command.args[6]
date.ids <- unlist(strsplit(command.args[7], ","))

output.dir <-command.args[8]
robj.dir <-command.args[9]
others <-command.args[10]


message("loader          = ", loader)
message("file.prefix     = ", file.prefix)
message("urls.json       = ", urls.json)
message("systems.json    = ", systems.json)
message("capture.dir     = ", capture.dir)
message("base.images.dir = ", base.images.dir)
message("date.ids        = ", paste(date.ids, collapse=", "))
message("output.dir      = ", output.dir)
message("robj.dir        = ", robj.dir)
message("others          = ", others)


## Main code
rlib.dir <- paste(c(Sys.getenv("MADANALYZER_LIB_DIR"), "/rlib/"), collapse="")
consts.code <- paste(c(rlib.dir, "consts.R"), collapse="")
loader.code <- paste(c(rlib.dir, tolower(loader), ".R"), collapse="")


## Definitions of R-Object files
robj.detector <- str.concat(robj.dir, "/", file.prefix, "__detector.robj")
robj.pathway <- str.concat(robj.dir, "/", file.prefix, "__pathway.robj")


## Run a code
if (!file.exists(consts.code) || !file.exists(loader.code)){
  message("Code: [", consts.code , "] or [", loader.code, "] does not exist!")
} else {
  message("loader.code = ",  loader.code)
  source(consts.code)
  source(loader.code)
}


