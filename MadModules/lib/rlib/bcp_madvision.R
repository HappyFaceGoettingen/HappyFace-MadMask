library(rimage)

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
## Main function
##-----------------------------------------------------------
run.madvision <- function(bcp.threshold=0.7){

  robj.file1 <- paste(c(robj.dir, "/", file.prefix, "__infogain.robj"), collapse="")
  robj.file2 <- paste(c(robj.dir, "/", file.prefix, "__bcp.robj"), collapse="")
  robj.file3 <- paste(c(robj.dir, "/", file.prefix, "__pathway.robj"), collapse="")
  
  ##----------------------------------------
  ## Generating plots
  ##----------------------------------------
  ## Loading data
  if (file.exists(robj.file1)) load(file=robj.file1)
  if (file.exists(robj.file2)) load(file=robj.file2)
  if (file.exists(robj.file3)) load(file=robj.file3)
  
  
  ## Mad Vision plot
  latest.date.id <- date.ids[length(date.ids)]
  latest.img.file <- paste(c(capture.dir, "/", latest.date.id, "/", file.prefix, ".jpg"), collapse="")
  mad.vision.file <- paste(c(plot.output.dir, "/", file.prefix, ".jpg"), collapse="")
  if (file.exists(latest.img.file)){
    message("Latest BCP Posterior Probability of ", file.prefix, "  = ", latest.bcp.pp)

    ## Status Not Changed
    if (latest.bcp.pp < bcp.threshold) {
      if(file.symlink(latest.img.file, mad.vision.file)) message("Symlink: ", latest.img.file, " -> ", mad.vision.file)
      next
    }

    ## Status Changed
    message("Generating MadVision: ", file.prefix, "  = ", latest.bcp.pp, " ...")
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
  }
}


## Run
source(paste(c(rlib.dir, "terminator_view.R"), collapse=""))
run.madvision()
