##-----------------------------------------------------------
##
## Functions
##
##-----------------------------------------------------------

##-----------------------------------------------------------
##
## Main
##
##-----------------------------------------------------------
## Command line analyzer
command.args <- commandArgs(trailingOnly = TRUE)

robj.dir <-command.args[1]
link.names <- unlist(strsplit(command.args[2], ","))
file.prefixes <- unlist(strsplit(command.args[3], ","))
captures <- unlist(strsplit(command.args[4], ","))
bcp.threshold <- command.args[5]
max.output.list <- command.args[6]
output <- command.args[7]

message("robj.dir             = ", robj.dir)
message("link_names           = ", paste(link.names, collapse=", "))
message("file_prefixes        = ", paste(file.prefixes, collapse=", "))
message("captures             = ", paste(captures, collapse=", "))
message("bcp.threshold        = ", bcp.threshold)
message("max.output.list      = ", max.output.list)
message("output               = ", output)


## Loop over filenames
R.level.active <- FALSE
R.names <- c()
R.files <- c()
i <- 1
output.list <- 1
max.bcp.pp <- 0

for (file.prefix in file.prefixes){
  robj.file1 <- paste(c(robj.dir, "/", file.prefix, "__infogain.robj"), collapse="")
  robj.file2 <- paste(c(robj.dir, "/", file.prefix, "__bcp.robj"), collapse="")

  message("Analyzing [", file.prefix, "] ...")
  message("robj.file1           = ", robj.file1)
  message("robj.file2           = ", robj.file2)

  ## Skipping
  if (captures[i] != "true"){
    message("Skipping ...")
    i <- i + 1; next
  }

  if ((!file.exists(robj.file1)) || (!file.exists(robj.file2))){
    message("Robj file does not exist. Skipping ...")
    i <- i + 1; next
  }
  
  if ((file.info(robj.file1)$size == 0) || (file.info(robj.file2)$size == 0)){
    message("Size of Robj file is zero. Skipping ...")
    i <- i + 1; next
  }

  ## Load
  load(file=robj.file1)
  load(file=robj.file2)

  ## Check objects
  if ((is.null(latest.bcp.pp)) || (! exists("latest.bcp.pp"))){
    message("Variable [latest.bcp.pp] is not proper. Skipping ...")
    i <- i + 1; next
  }
  
  ## Checking if the latest status is changed
  if (latest.bcp.pp > max.bcp.pp) max.bcp.pp <- latest.bcp.pp
  
  ## Status changed --> Making lists
  if (latest.bcp.pp >= bcp.threshold){
    R.level.active <- TRUE
    if (output.list <= max.output.list){
      R.names <- append(R.names, link.names[i])
      R.files <- append(R.files, file.prefix)
      output.list <- output.list + 1
    }
  }
  i <- i + 1
}


## Output
message("Is Active: ", R.level.active)
message("names: ", paste(R.names, collapse=", "))
message("max.bcp.pp: ", max.bcp.pp)
sink(output)
cat("export R_LEVEL_ACTIVE=", R.level.active, "\n", sep="")
cat("export R_LINK_NAMES=\"", paste(R.names, collapse=", "), "\"\n", sep="")
cat("export R_FILE_PREFIXES=\"", paste(R.files, collapse=" "), "\"\n", sep="")
cat("export R_MAX_BCP_PP=", max.bcp.pp, "\n", sep="")
sink()
