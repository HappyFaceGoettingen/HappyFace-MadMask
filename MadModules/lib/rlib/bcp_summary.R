##-----------------------------------------------------------
##
## Functions
##
##-----------------------------------------------------------

change.template.json <- function(level.name, score, system.names, combined.threshold=0.7){
  summary.template <<- str.concat(output.dir, "/", level.name, ".json")

  ## Changing __LEVEL__, __SCORE__, __SYSTEMS__
  system(str.concat("sed -e \"s/__LEVEL__/", level.name, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__SCORE__/", score, "/g\" -i ", summary.template))
  system(str.concat("sed -e \"s/__SYSTEMS__/", system.names, "/g\" -i ", summary.template))
  
  ## Making a symlink to summary.json
  if (score >= combined.threshold) {
    relative.path <- system(str.concat("realpath -m --relative-to=", output.dir, " ", summary.json), intern=TRUE)
    system(str.concat("ln -svf ", relative.path, " ", summary.json))
  }
}


run.bcp.summary <- function(detection.method="bcp.detect.one.exceeds", bcp.threashold=0.7, max.outputs=3){
  present.level <- "Normal"

  ## For Normal level
  level.name <<- "Normal"
  score <<- 1
  system.names <<- c()
  ## For each level in a monitorig url json file
  monitoring.urls.caller("run.bcp.level.summary")

  ## Applying the final item, before exit
  change.template.json(level.name, score, system.names)
}


bcp.detect.one.exceeds <- function(){

  ## Init
  if (present.level != level.name){
    ## Applying level, score and systems to a level template file
    change.template.json(level.name, score, system.names)

    ## Init
    present.level <<- level.name
    system.names <<- c()
    score <<- 0
  }
  
  ## Checking R Object files
  if ((!file.exists(robj.infogain)) || (!file.exists(robj.detector))){
    message("Robj file does not exist. Skipping ...")
    return
  }

  if ((file.info(robj.infogain)$size == 0) || (file.info(robj.detector)$size == 0)){
    message("Size of Robj file is zero. Skipping ...")
    return
  }
    
  ## Load R Objects
  load(file=robj.infogain)
  load(file=robj.detector)
    
  ## Check objects
  if ((is.null(latest.bcp.pp)) || (! exists("latest.bcp.pp"))){
    message("Variable [latest.bcp.pp] is not proper. Skipping ...")
    return
  }
    
  ## Checking if the latest status is greater than score
  if (latest.bcp.pp > score) score <- latest.bcp.pp
    
  ## Status changed --> Making lists and changing a summary template
  if ((latest.bcp.pp >= bcp.threshold) && (length(system.names) < max.outputs)) {
    system.names <- unique(append(system.names, systems))
  }
}


##-----------------------------------------------------------
##
## Main
##
##-----------------------------------------------------------
summary.json <- others
run.bcp.summary()
