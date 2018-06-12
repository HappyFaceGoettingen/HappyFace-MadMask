#!/bin/sh

for file in "$(pwd)"/*;
do
    if [ -d "$file" ]
    then
        for ffile in $file/*
        do
            if [[ $ffile =~ \.ts$ ]]
            then
                echo "transpiling: $ffile"
                tsc --module esnext $ffile
            fi
        done
    elif [[ $file =~ \.ts$ ]]
        then
            echo "transpiling: $file"
            tsc --module esnext $file
    fi
    #
    #echo "transpiling: $file"
done
