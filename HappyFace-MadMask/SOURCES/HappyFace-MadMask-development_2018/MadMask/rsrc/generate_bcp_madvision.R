library(rimage)
source("rsrc/terminator_view.R")

##-----------------------------------------------------------
##
## Functions
##
##-----------------------------------------------------------
get.vers <- function(graph.data.matrix=graph.data.matrix){
  uniq.src <- unique(graph.data.matrix[,1])
  uniq.dst <- unique(graph.data.matrix[,2])
  return(data.frame(c(as.character(uniq.src), as.character(uniq.dst)), stringsAsFactors=FALSE))
}


generate.graph <- function(graph.matrix){
  ## Generating graph
  Edges <- data.frame(from=graph.matrix[,1], to=graph.matrix[,2])
  vers <- get.vers(Edges)
  g <- graph.data.frame(Edges, directed=TRUE, vertices=vers)
  g <- simplify(g, remove.loops = FALSE)
  V(g)$shape <- rep("rectangle", length(vers))
  return(g)
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
robj.dir <-command.args[4]
bcp.threshold <- command.args[5]
mad.vision.dir <- command.args[6]

robj.file1 <- paste(c(robj.dir, "/", link.name, "__infogain.robj"), collapse="")
robj.file2 <- paste(c(robj.dir, "/", link.name, "__bcp.robj"), collapse="")
robj.file3 <- paste(c(robj.dir, "/", link.name, "__pathway.robj"), collapse="")

message("capture.dir          = ", capture.dir)
message("date.ids             = ", paste(date.ids, collapse=", "))
message("link.name            = ", link.name)
message("robj.dir             = ", robj.dir)
message("robj.file1           = ", robj.file1)
message("robj.file2           = ", robj.file2)
message("robj.file3           = ", robj.file3)
message("bcp.threshold        = ", bcp.threshold)
message("mad.vision.dir       = ", mad.vision.dir)



##----------------------------------------
## Generating plots
##----------------------------------------
## Loading data
if (file.exists(robj.file1)) load(file=robj.file1)
if (file.exists(robj.file2)) load(file=robj.file2)
if (file.exists(robj.file3)) load(file=robj.file3)


## Mad Vision plot
latest.date.id <- date.ids[length(date.ids)]
latest.img.file <- paste(c(capture.dir, "/", latest.date.id, "/", link.name, ".jpg"), collapse="")
mad.vision.file <- paste(c(mad.vision.dir, "/", link.name, ".jpg"), collapse="")
if (file.exists(latest.img.file)){
  message("Latest BCP Posterior Probability of ", link.name, "  = ", latest.bcp.pp)
  if (latest.bcp.pp >= bcp.threshold){
    message("Generating MadVision: ", link.name, "  = ", latest.bcp.pp, " ...")
    img <- read.jpeg(latest.img.file)
    data1 <- as.list(NULL)

    ## Graph 1
    data1[["graph1"]] <- generate.graph(sub.graph.matrix)

    ## Plot 1
    data1[["plot1"]] <- bcp.posterior.prob
    data1[["plot1.title"]] <- "Bayesian Posterior Probability"

    ## Plot 2
    data1[["plot2"]] <- info.gain.df$info.gain
    data1[["plot2.title"]] <- "Nearest Image InfoGain"
    len <- length(bcp.posterior.prob)

    ## Text 1,2,3
    data1[["text1"]] <- bcp.posterior.prob[len:(len-8)]
    data1[["text2"]] <- "■ Status Changed"
    len <- length(info.gain.df$info.gain)
    data1[["text3"]] <- c("Mad Vision v0.21", "-------------------------", info.gain.df$info.gain[len:(len-8)])

    ## Plotting here
    generate.terminator.vision(img, mad.vision.file, data1)
  } else {
    if(file.symlink(latest.img.file, mad.vision.file)) message("Symlink: ", latest.img.file, " -> ", mad.vision.file)
  }
}

