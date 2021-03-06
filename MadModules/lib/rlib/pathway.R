require(igraph)

## Standard plot for Analysis
plot.params.1 <- as.list(NULL)
plot.params.1[["vertex.label.cex"]] <- 1
plot.params.1[["vertex.size"]] <- 3 

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


append.graph.matrix <- function(graph.matrix, url.name, systems, all.systems){
  for (system.name in systems){
    graph.matrix <- rbind(graph.matrix, c(system.name, url.name))
  }
  colnames(graph.matrix) <- c("system", "url")
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
## Main Functions
##
##-----------------------------------------------------------
run.sub.pathway <- function(){
  sub.graph.matrix <- c()
  
  ## Generate from/to matrix
  message("file.prefix = [", file.prefix, "], url.name = [", url.name, "], systems = [", paste(systems, collapse=","), "]")
  if (is.null(systems) || (length(systems) == 0)) {
    message("System definition is null [", systems, "]")
    return(FALSE)
  }
  
  graph.matrix <<- append.graph.matrix(graph.matrix, url.name, systems, all.systems)

  ## Generate from/to sub matrix
  sub.graph.matrix <- append.graph.matrix(sub.graph.matrix, url.name, systems, all.systems)
  sub.pathway.obj <- generate.graph(sub.graph.matrix)
  layout <- generate.layout(sub.graph.matrix)
  
  ## Plotting a sub pathway
  plot.file <- str.concat(output.dir, "/", file.prefix, ".png")
  message("Plotting [", plot.file, "] ...")
  png(filename = plot.file, width = WIDTH, height = HEIGHT)
  plot.pathway(sub.pathway.obj, layout, plot.params=plot.params.2)
  dev.off()
  
  ## saving robj
  message("Saving [", robj.pathway, "] ...")
  save(file=robj.pathway, sub.pathway.obj, sub.graph.matrix)
}


##
## Converting "graph.matrix" to "Archemy.js type"
##
## Outputting an overall pathway in a Archemy.js JSON format
## The final JSON file is read by Vis.js or Archemy.js
## Example:
## ---------------------------------------------
## {
##  "comment": "Overall Pathway of Monitoring Systems",
##  "nodes": [{
##               "caption": "SE",
##               "type": "system",
##               "id": 0
##           },{
##               "caption": "Rucio UI",
##               "type": "url",
##               "id": 1
##           }],
##  "edges": [{
##               "caption": "Monitoring",
##               "source": 0,
##               "target": 1
##           }]
## }
## ---------------------------------------------
##
## x <- list( comment = "", nodes = c(list(caption="SE", type="system", id=1)), edges = c(list(caption="Monitoring", source=0, target=1)))
##
output.pathway.json <- function(graph.matrix, json.file){
  ## Init
  id <- 1
  nodes <- list()
  edges <- list()
  node.systems <- unique(graph.matrix[,"system"])
  node.urls <- unique(graph.matrix[,"url"])
  edge.systems <- list()
  edge.urls <- list()

  ## Looping over system components and making nodes
  for (node.system in node.systems){
    nodes[[id]] <- list(caption=node.system, type="system", id=id)
    edge.systems[[node.system]] <- id
    id <- id + 1
  }

  ## Looping over URLs and making nodes.
  for (node.url in node.urls){
    nodes[[id]] <- list(caption=node.url, type="url", id=id)
    edge.urls[[node.url]] <- id
    id <- id + 1
  }

  ## Making edges from graph.matrix
  for (i in c(1:dim(graph.matrix)[1])){
    node.system <- graph.matrix[i, "system"]
    node.url <- graph.matrix[i, "url"]
    edges[[i]] <- list(caption="Monitoring", source=edge.systems[[node.system]], target=edge.urls[[node.url]])
  }
  
  ## Merging and outputting
  message("Outputting a JSON file [", json.file, "] ...")
  json <- toJSON(list(comment = "Overall Pathway of Monitoring Systems", nodes=nodes, edges=edges))
  message(json)
  write(json, json.file)
}


##
## Main function to make graph plot/json outputs
##
run.pathway <- function(){
  graph.matrix <<- c()

  ##----------------------------------------
  ## Generating Each Pathway Plot
  ##----------------------------------------
  monitoring.urls.caller("run.sub.pathway")

  ##----------------------------------------
  ## Generating An Overall Pathway Plot
  ##----------------------------------------
  robj.overall.pathway <- str.concat(robj.dir, "/overall_pathway.robj")
  overall.pathway.obj <- generate.graph(graph.matrix)
  
  ## Plottting an overall pathway
  plot.file <- str.concat(output.dir, "/overall_pathway.png")
  message("Plotting [", plot.file, "] ...")
  png(filename = plot.file, width = L.WIDTH, height = L.HEIGHT)
  main <- "Relational map of monitoring information and systems"
  plot.pathway(overall.pathway.obj, layout=NULL, main=main, plot.params.1)
  dev.off()
  
  ## Generating An Overall Pathway JSON file
  graph.json <- str.concat(output.dir, "/overall_pathway.json")
  output.pathway.json(graph.matrix, graph.json)
  
  ## saving robj
  message("Saving [", robj.overall.pathway, "] ...")
  save(file=robj.overall.pathway, overall.pathway.obj, graph.matrix)
}


## Run
run.pathway()
