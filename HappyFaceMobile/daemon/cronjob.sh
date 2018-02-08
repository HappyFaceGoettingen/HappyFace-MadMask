#!/bin/bash

## Env
. /etc/profile
. /etc/madface.conf

## Default display
export DISPLAY=:0.0

## Set up site config
site_def=$1
[ -z "$site_def" ] && echo "No site info" && exit -1

## Go to MadFace home
cd $MADFACE_HOME

## Stating caputring firefox
./madface -x -c sites/$site_def

echo "$(date) Starting [./madface -f -c sites/$site_def]"
time ./madface -f -c sites/$site_def &> data/$site_def/log/firefox.log

## Starting analysis
echo "$(date) Starting [./madface -a -c sites/$site_def]"
time ./madface -a -c sites/$site_def &> data/$site_def/log/analysis.log

## Wiping old data
WIPE_LOG=data/$site_def/log/wipe.log
[ -e $WIPE_LOG ] && [ $(cat $WIPE_LOG | wc -l) -gt 50000 ] && rm $WIPE_LOG
time ./madface -w -c sites/$site_def >> $WIPE_LOG

## Outputting voice
echo "$(date) Starting [./madface -v -c sites/$site_def]"
time ./madface -v -c sites/$site_def &> data/$site_def/log/mad-voice.log

