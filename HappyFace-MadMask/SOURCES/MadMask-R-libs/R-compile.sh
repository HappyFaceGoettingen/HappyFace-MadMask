#!/bin/sh

for p in $(cat packages/packages.txt)
do
    echo "
####################################################################
     Installing [$p] ...
####################################################################
"

    R CMD INSTALL packages/$p
done


