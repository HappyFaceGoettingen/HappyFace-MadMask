require(rimage)

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
  
  ##----------------------------------------
  ## Generating plots
  ##----------------------------------------
  ## Loading data
  message("Loading data [", robj.detector, "], [", robj.pathway, "] ...")
  if (file.exists(robj.detector)) load(file=robj.detector)
  if (file.exists(robj.pathway)) load(file=robj.pathway)
  
  
  ## Mad Vision plot
  latest.date.id <- date.ids[length(date.ids)]
  latest.img.file <- str.concat(capture.dir, "/", latest.date.id, "/", file.prefix, ".jpg")
  mad.vision.file <- str.concat(output.dir, "/", file.prefix, ".jpg")
  if (!file.exists(latest.img.file)){
    message("Image file [", latest.img.file, "] does not exist ...")
    return(FALSE)
  }
  
  message("Latest BCP Posterior Probability of ", file.prefix, "  = ", latest.bcp.pp)

  ## Status Not Changed
  if (latest.bcp.pp < bcp.threshold) {
    relative.path <- system(str.concat("prealpath ", output.dir, " ", latest.img.file ), intern=TRUE)
    system(str.concat("ln -sv ", relative.path, " ", mad.vision.file ))
    return(TRUE)
  }
  
  ## Status Changed
  message("Generating MadVision: ", file.prefix, "  = ", latest.bcp.pp, " ...")
  img <- read.jpeg(latest.img.file)
  data1 <- as.list(NULL)
  
  ## Graph 1
  if (exists("sub.graph.matrix")) data1[["graph1"]] <- generate.graph(sub.graph.matrix)
  
  ## Plot 1
  data1[["plot1"]] <- bcp.posterior.prob
  data1[["plot1.title"]] <- "Bayesian Posterior Probability"
  
  ## Plot 2
  data1[["plot2"]] <- info.gain.df$info.gain
  data1[["plot2.title"]] <- "Nearest Image InfoGain"
  len <- length(bcp.posterior.prob)
  
  ## Text 1,2,3
  len.end <- 0
  if (length(c(len:len.end)) > 8) len.end <- len-8
  data1[["text1"]] <- bcp.posterior.prob[len:len.end]
  data1[["text2"]] <- "■ Status Changed"
  len <- length(info.gain.df$info.gain)
  data1[["text3"]] <- c("InfoGain", "-------------------------", info.gain.df$info.gain[len:len.end])
  
  ## Plotting here
  generate.terminator.vision(img, mad.vision.file, data1)
}


## Run
source(str.concat(rlib.dir, "terminator_view.R"))
run.madvision()
