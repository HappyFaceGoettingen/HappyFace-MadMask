#!/bin/bash

usage="$0 [option]

 -c:  configuration file [default:$conf]
 
"

if [ $# -eq 0 ]; then
    echo "$usage"
    exit 0
fi


#--------------------------
# Getopt
#--------------------------
while getopts "c:dhv" op
  do
  case $op in
      c) conf=$OPTARG
	  if ! [ -e $conf ]; then
	      echo "configuration file [$conf] does not exist!"
	      exit -1
	  fi
	  ;;
      d) dryrun="on"
	  ;;
      h) echo "$usage"
	  exit 0
	  ;;
      v) echo "$version"
	  exit 0
	  ;;
      ?) echo "$usage"
	  exit 0
	  ;;
  esac
done



