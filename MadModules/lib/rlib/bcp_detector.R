library(rimage)
library(bcp)
library(entropy)
library(xts)


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


run.bcp.detector <- function(){
  
  plot.analysis.file <- paste(c(output.dir, "/", file.prefix, ".png"), collapse="")

  ## loop over image files
  if (file.exists(robj.detector)){
    if (check.robj(robj.detector)) load(file=robj.detector)
  } else {
    message("[", robj.detector, "] does not exist!")
  }
  
  info.gain <- c()
  rownames.info.gain <- c()
  for (date.id in date.ids){
    file <- paste(c(capture.dir, "/", date.id, "/", file.prefix, ".jpg"), collapse="")
    if (!check.jpeg(file)) next
    
    found <- FALSE
    ## reading cached robj
    if (exists("info.gain.df")){
      a.value <- info.gain.df[date.id, "info.gain"]
      if ((!is.null(a.value)) && (!is.na(a.value))) {
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
  message("Saving [", robj.detector, "] ...")
  save(file=robj.detector, info.gain.df, bcpobj, latest.bcp.pp, bcp.posterior.prob)
  
  
  ##----------------------------------------
  ## Generating plots
  ##----------------------------------------
  generate.plot.analysis(bcpobj, plot.analysis.file, WIDTH, HEIGHT)
  
}



## Start
run.bcp.detector()

