#!/bin/sh

for file in "$(pwd)"/*;
do
    if [ -d "$file" ]
    then
        for ffile in $file/*
        do
            if [ -d "$ffile" ]
            then
                for fffile in $ffile/*
                do
                    if [[ $fffile =~ \.ts$ ]]
                    then
                        echo "transpiling: $fffile"
                        tsc --module esnext $fffile
                    fi
                done
            elif [[ $ffile =~ \.ts$ ]]
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
