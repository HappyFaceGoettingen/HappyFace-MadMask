library(igraph)
library(rjson)

WIDTH <- 2048
HEIGHT <- 2048
plot.params.1 <- as.list(NULL)
plot.params.1[["vertex.label.cex"]] <- 1
plot.params.1[["vertex.size"]] <- 3 

SUB.WIDTH <- 480
SUB.HEIGHT <- 480
plot.params.2 <- as.list(NULL)
plot.params.2[["vertex.label.cex"]] <- 1
plot.params.2[["vertex.size"]] <- 30



##-----------------------------------------------------------
##
## Functions
##
##-----------------------------------------------------------
#---------------------------------- 
# create layered structure
#----------------------------------
layout.layered <- function(layout){
  input_graph <- as.matrix(layout)

  uniq_src = unique(input_graph[,1])
  uniq_dst = unique(input_graph[,2])

  ## layer ratio H:L=num_Hlayer:num_Llayer, mergin_ratio = 10%
  mergin_ratio = 0.15
  num_Hlayer = length(uniq_src)
  num_Llayer = length(uniq_dst)

  L_ratio = num_Llayer / (num_Hlayer + num_Llayer)
  if (L_ratio > (1-mergin_ratio)) {
    H_border = 2 * (L_ratio - mergin_ratio) - 1
    L_border = 2 * (L_ratio - 2 * (mergin_ratio)) - 1
  } else if (L_ratio < mergin_ratio) {
    H_border = 2 * (L_ratio + 2*(mergin_ratio)) - 1
    L_border = 2 * (L_ratio + mergin_ratio) - 1
  } else {
    H_border = 2 * (L_ratio + mergin_ratio) - 1
    L_border = 2 * (L_ratio) - 1
  }
  
  ##H_border = 0.5
  ##L_border = -0.5
  ##message(H_border, ", ", L_border)

  
  l = c()
  for (i in seq(1, length(uniq_src))) {
    pos= c(runif(1,-1,1), runif(1,H_border,1))
    if (is.null(l)){
      l = pos
    } else {
      l = rbind(l,pos)
    }
  }

  for (i in seq(1, length(uniq_dst))) {
    pos= c(runif(1,-1,1), runif(1,-1,L_border))
    l = rbind(l,pos)
  }

  return(l)
}


get.vers <- function(graph.data.matrix){
  uniq.src <- unique(graph.data.matrix[,1])
  uniq.dst <- unique(graph.data.matrix[,2])
  
  return(data.frame(c(as.character(uniq.src), as.character(uniq.dst)), stringsAsFactors=FALSE))
}


append.graph.matrix <- function(graph.matrix, url.name, services, servers){
  for (service.id in 1:length(services)){
    service.name <- services[[service.id]]$name
    graph.matrix <- rbind(graph.matrix, c(service.name, url.name))
  }
  return(graph.matrix)
}


generate.graph <- function(graph.matrix){
  ## Generating graph
  Edges <- data.frame(from=graph.matrix[,1], to=graph.matrix[,2])
  vers <- get.vers(Edges)
  g <- graph.data.frame(Edges, directed=TRUE, vertices=vers)
  g <- simplify(g, remove.loops = FALSE)
  ##V(g)$shape <- rep("box", length(vers))
  return(g)
}


generate.layout <- function(graph.matrix){
  ## Generating layout
  l <- layout.layered(graph.matrix)
  return(l)
}


plot.pathway <- function(graph.obj, layout=NULL, plot.params=plot.params.1, main=""){
  if (is.null(layout)){
    layout <- layout.fruchterman.reingold(graph.obj)
    layout <- layout.norm(layout, -1,1, -1,1)
  }
  
  plot(graph.obj, layout=layout, main=main,
       edge.color="#555555",
       vertex.label=V(graph.obj)$name, vertex.label.cex=plot.params[["vertex.label.cex"]], vertex.size=plot.params[["vertex.size"]],
       xlim=c(-1,1), ylim=c(-1,1), rescale=TRUE)
}


##-----------------------------------------------------------
##
## Main
##
##-----------------------------------------------------------
## Command line analyzer
command.args <- commandArgs(trailingOnly = TRUE)

  
monitoring.urls.json <- command.args[1]
servers.json <- command.args[2]
robj.dir <-command.args[3]
plot.dir <- command.args[4]

robj.file.pathway <- paste(c(robj.dir, "/overall_pathway.robj"), collapse="")

message("monitoring.urls.json = ", monitoring.urls.json)
message("servers.json         = ", servers.json)
message("robj.dir             = ", robj.dir)
message("robj.file.pathway    = ", robj.file.pathway)
message("plot.dir             = ", plot.dir)


message("Reading [", monitoring.urls.json, "] ...")
monitoring.urls <- fromJSON(file=monitoring.urls.json)
message("Reading [", servers.json, "] ...")
servers <- fromJSON(file=servers.json)

## Loop over monitoring pages
graph.matrix <- c()
for (level in 1:length(monitoring.urls)){
  ## Loop
  for (url.id in 1:length(monitoring.urls[[level]]$urls)){
    is.captured <- monitoring.urls[[level]]$urls[[url.id]]$capture

    ## Generating graph
    if (is.captured){
      sub.graph.matrix <- c()
      file.prefix <- monitoring.urls[[level]]$urls[[url.id]]$file_prefix
      url.name <- monitoring.urls[[level]]$urls[[url.id]]$name
      services <- monitoring.urls[[level]]$urls[[url.id]]$services

      ## Setting R objects
      robj.file2 <- paste(c(robj.dir, "/", file.prefix, "__bcp.robj"), collapse="")
      robj.file3 <- paste(c(robj.dir, "/", file.prefix, "__pathway.robj"), collapse="")
      message("robj.file2           = ", robj.file2)
      message("robj.file3           = ", robj.file3)
      
      ## Generate from/to matrix
      graph.matrix <- append.graph.matrix(graph.matrix, url.name, services, servers)

      ## Generate from/to sub matrix
      sub.graph.matrix <- append.graph.matrix(sub.graph.matrix, url.name, services, servers) 

      sub.pathway.obj <- generate.graph(sub.graph.matrix)
      layout <- generate.layout(sub.graph.matrix)

      plot.file <- paste(c(plot.dir, "/", file.prefix, ".png"), collapse="")
      message("Plotting [", plot.file, "] ...")
      png(filename = plot.file, width = SUB.WIDTH, height = SUB.HEIGHT)
      plot.pathway(sub.pathway.obj, layout, plot.params=plot.params.2)
      dev.off()

      ## saving robj
      message("Saving [", robj.file3, "] ...")
      save(file=robj.file3, sub.pathway.obj, sub.graph.matrix)
    }
  }
}





##----------------------------------------
## Generating plots
##----------------------------------------
## Standard plot for Analysis

overall.pathway.obj <- generate.graph(graph.matrix)

## Calculating probability or normalized votes ?
plot.file <- paste(c(plot.dir, "/overall_pathway.png"), collapse="")
message("Plotting [", plot.file, "] ...")
png(filename = plot.file, width = WIDTH, height = HEIGHT)
main <- "Relational map of monitoring and system"
plot.pathway(overall.pathway.obj, layout=NULL, main=main, plot.params.1)
dev.off()


## saving robj
message("Saving [", robj.file.pathway, "] ...")
save(file=robj.file.pathway, overall.pathway.obj, graph.matrix)

