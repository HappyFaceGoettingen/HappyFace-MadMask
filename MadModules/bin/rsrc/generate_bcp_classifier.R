library(rimage)
library(bcp)
library(entropy)
library(xts)
DEBUG.R <- FALSE


##-----------------------------------------------------------
##
## Functions
##
##-----------------------------------------------------------
check.jpeg <- function(filename){
  res <- .C("get_imagesize_of_JPEG_file", as.character(filename),
            width = integer(1), height = integer(1), depth = integer(1),
            ret = integer(1), PACKAGE = "rimage")
  if (res$ret < 0){
    message("Jpeg file error [", filename, "]")
    return(FALSE)
  } else {
    return(TRUE)
  }
}

check.robj <- function(filename){
  con <- gzfile(filename)
  on.exit(close(con))
  magic <- readChar(con, 5L, useBytes = TRUE)
  if (!length(magic)){
    message("empty (zero-byte) input file [", filename, "]")
    return(FALSE)
  } else {
    return(TRUE)
  }
}

img.to.color.histgram <- function(img0){

  ## changing img to color histgram
  color.histgram0 <- hist(img0, breaks=seq(0,1, by=0.01), plot=FALSE)$density
  return(color.histgram0)
}

white.histgram <- function(hist0){
  ## Making white histgram
  color.histgram1 <- rep(10^-10, length(hist0))
  color.histgram1[length(color.histgram1)] <- 100
  return(color.histgram1)
}


calc.information.gain <- function(x0, x1){
  ## calculating information gain (KL-divergence), this is using KL.plugin method in entropy lib.
  information.gain <- KL.plugin(x0, x1)
  
  return(information.gain)
}


calc.bcp <- function(ds){
  #return(bcp(xtsds)$posterior.prob)
  return(bcp(ds))
}


generate.plot.analysis <- function(plot.df, filename, width, height){
  message("Plotting [", filename, "] ...")
  png(filename = filename, width = width, height = height)
  plot(plot.df)
  dev.off()
}


generate.plot.infogain <- function(info.gain.ts, filename, width, height){
  plot.df <- as.xts(read.zoo(data.frame(datetime=rownames(info.gain.ts), info.gain.ts), tz="", format="%Y%m%d-%H%M"))
  message("Plotting [", filename, "] ...")
  png(filename = filename, width = width, height = height)
  plot(plot.df, main="Image InfoGain")
  dev.off()
}




##-----------------------------------------------------------
##
## Main
##
##-----------------------------------------------------------
## Command line analyzer
command.args <- commandArgs(trailingOnly = TRUE)

  
capture.dir <- command.args[1]
date.ids <- unlist(strsplit(command.args[2], ","))
link.name <- command.args[3]
plot.infogain.dir <-command.args[4]
plot.analysis.dir <-command.args[5]
robj.dir <-command.args[6]

plot.infogain.file <- paste(c(plot.infogain.dir, "/", link.name, ".png"), collapse="")
plot.analysis.file <- paste(c(plot.analysis.dir, "/", link.name, ".png"), collapse="")
robj.file1 <- paste(c(robj.dir, "/", link.name, "__infogain.robj"), collapse="")
robj.file2 <- paste(c(robj.dir, "/", link.name, "__bcp.robj"), collapse="")


message("capture.dir          = ", capture.dir)
message("date.ids             = ", paste(date.ids, collapse=", "))
message("link.name            = ", link.name)
message("plot.infogain.dir    = ", plot.infogain.dir)
message("plot.analysis.dir    = ", plot.analysis.dir)
message("robj.dir             = ", robj.dir)
message("plot.infogain.file   = ", plot.infogain.file)
message("plot.analysis.file   = ", plot.analysis.file)
message("robj.file1           = ", robj.file1)
message("robj.file2           = ", robj.file2)


## loop over image files
if (file.exists(robj.file1)){
  if (check.robj(robj.file1)) load(file=robj.file1)
} else {
  message("[", robj.file1, "] does not exist!")
}
  
info.gain <- c()
rownames.info.gain <- c()
for (date.id in date.ids){
  file <- paste(c(capture.dir, "/", date.id, "/", link.name, ".jpg"), collapse="")
  if (!check.jpeg(file)) next

  found <- FALSE
  ## reading existing robj
  if (exists("info.gain.df")){
    if (DEBUG.R) message("Checking info.gain.df for [", date.id, "] ...")

    a.value <- info.gain.df[date.id, "info.gain"]
    if ((!is.null(a.value)) && (!is.na(a.value))) {
      if (DEBUG.R) message("Found info.gain.df for [", date.id, "] ...")
      info.gain <- append(info.gain, info.gain.df[date.id, "info.gain"])
      found <- TRUE
    }
  }
  
  ## generating information gain    
  if (!found){
    message("Reading [", file, "] ...")
    img <- read.jpeg(file)
    color.hist0 <- img.to.color.histgram(img)
    color.hist1 <- white.histgram(color.hist0)
    info.gain <- append(info.gain, calc.information.gain(color.hist0, color.hist1))
  }
    
  rownames.info.gain <- append(rownames.info.gain, date.id)
  gc();gc()
}

## Detecting a status change point
if (is.null(info.gain)){
  bcpobj <- NULL
  bcp.posterior.prob <- c(0)
  latest.bcp.pp <- 0
} else {
  bcpobj <- calc.bcp(info.gain)
  bcp.posterior.prob <- bcpobj$posterior.prob[!is.na(bcpobj$posterior.prob)]
  latest.bcp.pp <- bcp.posterior.prob[length(bcp.posterior.prob)]
}

## making df
info.gain.df <- data.frame(info.gain)
rownames(info.gain.df) <- rownames.info.gain

## saving robj
message("Saving [", robj.file1, "] ...")
message("Saving [", robj.file2, "] ...")
save(file=robj.file1, info.gain.df)
save(file=robj.file2, bcpobj, latest.bcp.pp, bcp.posterior.prob)


##----------------------------------------
## Generating plots
##----------------------------------------
## Standard plots for InfoGain and Analysis
WIDTH <- 640
HEIGHT <- 640
generate.plot.infogain(info.gain.df, plot.infogain.file, WIDTH, HEIGHT)
generate.plot.analysis(bcpobj, plot.analysis.file, WIDTH, HEIGHT)


