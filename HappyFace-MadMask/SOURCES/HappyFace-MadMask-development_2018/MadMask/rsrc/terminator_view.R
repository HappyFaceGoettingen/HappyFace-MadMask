library(rimage)
library(igraph)


generate.terminator.vision <-  function(image.matrix, png.output.file, analysis.data){
  ## Checking image resolution
  image.height <- dim(image.matrix)[1]
  image.width <- dim(image.matrix)[2]

  ## Making Terminator red background
  image.matrix <- (image.matrix ^ 1.2) * 0.4
  image.matrix[,,1] <- 0.7

  ## Adding analysis vision
  analysis.vision <- generate.terminator.analysis.vision(image.matrix, analysis.data)
  image.matrix <- image.matrix + analysis.vision
  image.matrix[image.matrix>1] <- 1

  ## Output Terminator vision
  png(png.output.file, width = image.width, height = image.height)
  par(mai = c(0, 0, 0, 0))
  plot(image.matrix)
  dev.off()
}


generate.terminator.analysis.vision <- function(image.matrix, analysis.data){
  ## Checking image resolution
  image.height <- dim(image.matrix)[1]
  image.width <- dim(image.matrix)[2]

  ## Making plot parameters
  set.draw.parameters(image.width, image.height)
  
  ## Plot
  jpg.output.file <- paste(c("/tmp/madvision_", runif(1, 1, 10^12), ".jpg"), collapse="")
  message("Generating Terminator Analysis [", jpg.output.file, "] ...")
  jpeg(jpg.output.file, bg="transparent", width = image.width, height = image.height, quality = 100)
  par(mfrow=c(3,3))

  ## Top
  plot.new()
  draw.analysis.plot(analysis.data[["plot1"]], analysis.data[["plot1.title"]])
  draw.analysis.text(analysis.data[["text1"]])
  
  ## Middle
  plot.new()
  draw.analysis.text(analysis.data[["text2"]], 2)
  draw.analysis.plot(analysis.data[["plot2"]], analysis.data[["plot2.title"]])
  
  ## Bottom
  if (is.null(analysis.data[["graph1"]])){
    plot.new()
  } else {
    draw.analysis.graph.plot(analysis.data[["graph1"]])
  }
  plot.new()
  draw.analysis.text(analysis.data[["text3"]])

  
  dev.off()

  analysis.view <- read.jpeg(jpg.output.file)
  if (file.exists(jpg.output.file)) file.remove(jpg.output.file)
  return(analysis.view)
}

draw.analysis.plot <- function(df, main=""){
  par(mar=MAR)
  plot(df, col=WHITE, fg=WHITE, col.main=WHITE, col.lab=WHITE, col.sub=WHITE, col.axis=WHITE, main=main, type="l", lwd=LWD, cex=CAPTION, font=FONT, cex.lab=CAPTION, font.lab=FONT, cex.main=MAIN, font.main=FONT, cex.axis=CAPTION/2, font.axis=FONT)
  grid(col=WHITE, lwd=LWD)
}

draw.analysis.graph.plot <- function(g, main=""){
  par(mar=c(1,1,1,1))
  V(g)$label.cex <- CAPTION.GRAPH
  v.size <- (strwidth(V(g)$name)) * VERTEX.SIZE

  ## Still trying to make rectangle edge and to use sugiyama layout function. But, an origin of an allow is always an edge of a rectangle. 
  #l <- layout.sugiyama(g)
  #plot(g, layout=layout.circle, main=main, vertex.label=V(g)$name, vertex.size=v.size, vertex.label.color="white", vertex.label.font=FONT, vertex.color="transparent", edge.color="white", edge.label.color="white", edge.arrow.size=EDGE.ARROW.SIZE, mark.col="white", vertex.frame.color="white", rescale=TRUE)
  plot(g, layout=layout.circle, main=main, vertex.label=V(g)$name, vertex.label.color="white", vertex.label.font=FONT, vertex.color="transparent", edge.color="white", edge.label.color="white", edge.arrow.size=EDGE.ARROW.SIZE, mark.col="white", rescale=TRUE)
}


draw.analysis.text <- function(text, zoom=1){
  par(mar=c(0,0,0,0))
  plot(c(0, 1), c(0, 1), ann = FONT, bty = 'n', type = 'n', xaxt = 'n', yaxt = 'n')
  text(x = 0, y = 0.4, paste(text, collapse="\n"), col=WHITE, cex=TEXT * zoom, font=FONT, adj=0)
}

set.draw.parameters <- function(width, height){

  area <- width * height
  message("Width = ", width, ", Height = ", height, ", Area = ", area)

  
  WHITE <<- rgb(1,1,1)
  FONT <<- 2

  
  if (area >= 5000000){
    ## 5000x1000 
    MAR <<- c(8,8,8,8)
    VERTEX.SIZE <<- 200
    EDGE.ARROW.SIZE <<- 4
    LWD <<- 6
    CAPTION <<- 6
    MAIN <<- 6
    TEXT <<- 6
  } else if (area >= 500000){
    ## 1000x500 
    MAR <<- c(5,5,5,5)
    VERTEX.SIZE <<- 100
    EDGE.ARROW.SIZE <<- 1
    LWD <<- 2
    CAPTION <<- 2
    MAIN <<- 3
    TEXT <<- 2
  } else if (area >= 250000){
    ## 500x500 
    MAR <<- c(3,3,3,3)
    VERTEX.SIZE <<- 100
    EDGE.ARROW.SIZE <<- 1
    LWD <<- 2
    CAPTION <<- 1
    MAIN <<- 2
    TEXT <<- 2
  } else if (area >= 0) {
    ## 200x200
    MAR <<- c(2,2,2,2)
    VERTEX.SIZE <<- 100
    EDGE.ARROW.SIZE <<- 1
    LWD <<- 1
    CAPTION <<- 1
    MAIN <<- 1
    TEXT <<- 1
  }
  CAPTION.GRAPH <<- CAPTION * 0.8
}



##------------------------------------------
##
## Main
##
##------------------------------------------

## 1
#a <- read.jpeg("input/NGIDE_Nagios_CE2.jpg")
#
#data1 <- as.list(NULL)
#data1[["plot1"]] <- rnorm(10)
#data1[["plot1.title"]] <- "test"
#data1[["plot2"]] <- rnorm(10)
#data1[["plot2.title"]] <- "test"

#data1[["text1"]] <- "Text 1"
#data1[["text2"]] <- "Text 2"
#data1[["text3"]] <- "Text 3"

#generate.terminator.vision(a, "output/terminator_view1.jpg", data1)


