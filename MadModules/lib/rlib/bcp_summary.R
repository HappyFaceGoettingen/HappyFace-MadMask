##-----------------------------------------------------------
##
## Functions
##
##-----------------------------------------------------------

## Main function which can be paralleled by monitoring.urls.caller
run.bcp.summary <- function(detection.method="bcp.detect.one.exceeds", bcp.threshold=0.6, combined.threshold=0.6, max.url.outputs=3, max.system.outputs=3){

  ## For Normal level (default)
  level.name <<- "Normal"
  present.level <<- level.name
  url.names <<-c()
  system.names <<- c()
  all.url.names <<-c()
  all.system.names <<- c()
  combined.score <<- 1

  ## For each level in a monitorig url json file
  monitoring.urls.caller(detection.method, list(bcp.threshold, combined.threshold, max.url.outputs, max.system.outputs))

  ## Applying the final item, before exit
  change.template.json(combined.threshold)
}


## This function is called by monitoring.urls.caller() in run.bcp.summary function
bcp.detect.one.exceeds <- function(bcp.threshold, combined.threshold, max.url.outputs, max.system.outputs){

  ## Init
  if (present.level != level.name){
    ## Applying level, score and systems to a level template file
    change.template.json(combined.threshold)

    ## Init
    present.level <<- level.name
    url.names <<- c()
    system.names <<- c()
    all.url.names <<- c()
    all.system.names <<- c()
    combined.score <<- 0
  }
  
  ## Checking R Object files
  if (!file.exists(robj.detector)) {
    message("Robj file [", file.prefix, "] does not exist. Skipping ...")
    return(-1)
  }

  if (file.info(robj.detector)$size == 0){
    message("Size of Robj file [", file.prefix, "] is zero. Skipping ...")
    return(-1)
  }
    
  ## Load R Objects
  load(file=robj.detector)
    
  ## Check objects
  if ((is.null(latest.bcp.pp)) || (! exists("latest.bcp.pp")) || (length(latest.bcp.pp) == 0)){
    message("Variable [latest.bcp.pp] of [", file.prefix, "] is not appropriate. Skipping ...")
    return(-1)
  }
    
  ## Checking if the latest status is greater than score
  ##  (combined.score == max bcp score)
  if (latest.bcp.pp > combined.score) combined.score <<- latest.bcp.pp
  
  ## Status changed --> Making lists and changing a summary template
  if (latest.bcp.pp >= bcp.threshold) {
    all.url.names <<- unique(append(all.url.names, url.name))
    all.system.names <<- unique(append(all.system.names, systems))

    if((length(url.names) < max.url.outputs))
      url.names <<- unique(append(url.names, url.name))
    
    if((length(system.names) < max.system.outputs))
      system.names <<- unique(append(system.names, systems))
  }
}



change.template.json <- function(combined.threshold){

  summary.template <<- str.concat(output.dir, "/", present.level, ".json")
  if (!file.exists(summary.template)){
    message("[", summary.template, "] does not exist")
    return(-1)
  }

  ## An inner function to change array c(a, b, c) --> ["a", "b", "c"]
  get.array.str <- function(items){
    if (length(items) == 0){
      "[]"
    } else {
      inner.str <- paste(items, collapse='\\\", \\\"')
      paste(c("[\\\"", inner.str, "\\\"]"), collapse="")
    }
  }
  
  ## Changing to comma separated strings
  c.url.names <- paste(url.names, collapse=", ")
  c.system.names <- paste(system.names, collapse=", ")
  a.url.names <- get.array.str(all.url.names)
  a.system.names <- get.array.str(all.system.names)
  
  ## Changing __LEVEL__, __SCORE__, __URLS__, __SYSTEMS__
  message("Applying (__LEVEL__, __SCORE, __URLS__, __SYSTEMS__) = (",
          present.level, ", ", combined.score, ", \"", c.url.names, "\", \"", c.system.names, "\") to [", summary.template, "] ...")
  message("   * __URLS_ARRAY__ = ", a.url.names)
  message("   * __SYSTEMS_ARRAY__ = ", a.system.names)

  system(str.concat("sed -e \"s/__LEVEL__/", present.level, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__SCORE__/", combined.score, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__URLS__/", c.url.names, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__SYSTEMS__/", c.system.names, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__URLS_ARRAY__/", a.url.names, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__SYSTEMS_ARRAY__/", a.system.names, "/g\" -i ", summary.template))
  
  ## Making a symlink to summary.json
  if (combined.score >= combined.threshold) {
    relative.path <- system(str.concat("prealpath ", dirname(summary.json), " ", summary.template), intern=TRUE)
    system(str.concat("ln -svf ", relative.path, " ", summary.json))
  }
}


##-----------------------------------------------------------
##
## Main
##
##-----------------------------------------------------------
summary.json <- others
run.bcp.summary()

