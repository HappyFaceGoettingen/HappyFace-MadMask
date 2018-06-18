#!/bin/bash

TMP_DIR=/tmp/HappyFace-MadMask4Apk
[ ! -e $TMP_DIR ] && mkdir -pv $TMP_DIR && chmod 1777 $TMP_DIR
BUILD_ID=$(date -u +%Y%m%d-%H%M%S)


## Git location
GIT_DIR=HappyFaceGoettingen/HappyFace-MadMask
GIT_REPO=https://github.com/$GIT_DIR
GIT_BRANCH=gen_development
GIT_COMMIT=

## Buildable version
STABLE_GIT_BRANCH=gen_development
STABLE_GIT_COMMIT=4185dbaef0a65a81103135dd122d0f73cfd0e056

## Output of application apk/archive
OUTPUT_DIR=$TMP_DIR/$platform/${GIT_BRANCH}.${BUILD_ID}/application


## Usage
usage="$0 [options]

 * General
 -U:  Update this script (/usr/local/bin/$(basename $0))
 -I:  install Ionic

 * Preparation for MacOSX
 -X:  install Xcode
 -c:  Connect to [vm|ph2|clouds] via ssh with port forwarding

 * Git location
 -R:  set a git repo [default: $GIT_REPO]
 -B:  set a branch name [defaut: $GIT_BRANCH]
 -C:  set a commit ID [default: $GIT_COMMIT]
 -S:  set a stable nightly commit [default: $STABLE_GIT_BRANCH - $STABLE_GIT_COMMIT]

 * Application Build
 -i:  set a build ID [default: $BUILD_ID]
 -b:  build {android|ios} apk
 -O:  output dir [default: $OUTPUT_DIR]

 * Example
 $0 -B master -b ios
 $0 -S -b ios

 Report Bugs to Gen Kawamura <gen.kawamura@cern.ch> 
"

if [ $# -eq 0 ]; then
    echo "$usage"
    exit 0
fi


#--------------------------
# Functions
#--------------------------
install_ionic(){
    ## Install Ionic framework
    if ! which ionic; then
	## Installing Node.js & NPM
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	brew update
	brew install node
	
	# Installing Ionic and Cordova
	sudo npm install -g cordova@8.0.0
	sudo npm install -g ionic@3.20.0
	
	## Removing .configx
	[ -e $HOME/.config ] && sudo rm -rf $HOME/.config
    fi
}


extract_xip(){
    XCODE_XIP=Xcode_9.2.xip
    if [ -e $HOME/Downloads/$XCODE_XIP ]; then
	# Install PBZX
	if ! which pbzx; then
            brew install xz && brew link xz
            
            pushd /tmp
            git clone https://github.com/NiklasRosenstein/pbzx
            pushd pbzx
            clang -llzma -lxar -I /usr/local/include pbzx.c -o pbzx
            cp -v pbzx /usr/local/bin
            popd
            popd
	fi
	
	## Extracting XCode XIP
	pushd $HOME/Downloads
	echo "Extracting [$XCODE_XIP] by xar ..."
	xar -xf $XCODE_XIP
	echo "Extracting [$XCODE_XIP] by pbzx ..."
	pbzx -n Content | cpio -i
	rm -v Content Metadata
	popd
    fi
}


install_xcode(){
    [ -e /Library/Xcode.app ] && echo "[/Library/Xcode.app] already exists" && return 1

    ## Installing XCode 9.2
    XCODE_APP=Xcode.app

    ## Extract Xcode XIP file
    [ ! -e $HOME/Downloads/$XCODE_APP ] && extract_xip

    ## Set as the default xcodebuild tool
    if [ -e $HOME/Downloads/$XCODE_APP ]; then
	echo "Installing [$HOME/Downloads/$XCODE_APP] to [/Library] ..."
	sudo mv $HOME/Downloads/$XCODE_APP /Library
	sudo chown -R root:wheel /Library/Xcode.app
	[ ! -e /Application/Xcode.app ] && sudo ln -vs /Library/Xcode.app /Application/Xcode.app
	sudo xcode-select -s /Library/Xcode.app/Contents/Developer
	sudo xcodebuild -license
	echo "Execute Xcode at once and install required packages"
    fi
    return 0
}


update_script(){
    local url=https://raw.githubusercontent.com/${GIT_DIR}/${GIT_BRANCH}/PackageBuilder/build-apk.sh
    curl -fsSL $url -o /usr/local/bin/$(basename $url) && chmod 755 /usr/local/bin/$(basename $url)
}


build_application(){
    local platform=$1
    [ "$platform" != "android" ] && [ "$platform" != "ios" ] && echo "Platform [$platform] is not defined" && return 1

    ## Removing old Apks
    ls $OUTPUT_DIR/*.apk &> /dev/null && rm -v $OUTPUT_DIR/*.apk
    ls $OUTPUT_DIR/*.tgz &> /dev/null && rm -v $OUTPUT_DIR/*.tgz

    ## Preparing local Git repo
    local local_repo=$TMP_DIR/$(basename $GIT_REPO).$GIT_BRANCH
    local tmp_dir=$TMP_DIR/$platform/${GIT_BRANCH}.${BUILD_ID}

    if [ ! -e "$local_repo" ]; then 
	echo "Cloning [$(basename $GIT_REPO)] - [$GIT_BRANCH] into [$local_repo] ..."
	git clone $GIT_REPO -b $GIT_BRANCH $local_repo
	[ ! -e $local_repo ] && echo "[$local_repo] does not exist" && return 1
    else
	pushd $local_repo
	git pull origin $GIT_BRANCH
	[ ! -z "$GIT_COMMIT" ] && git reset --hard $GIT_COMMIT
	popd
    fi

    ## Prepare devel env for Mobile Application
    prepare_apk_env

    ## Calling madmask builder
    build_apk
    return $ret
}


## Internal command for building devel env
prepare_apk_env(){
    [ ! -e $TMP_DIR/$platform ] && mkdir -pv $TMP_DIR/$platform && chmod 1777 $TMP_DIR/$platform

    echo "Preparing env in [$tmp_dir] ..."
    echo "Copying [HappyFaceMobileDevelopment, resources, lib, sites and madmask] ..."
    rsync -alp --delete $local_repo/HappyFaceMobileDevelopment/ $tmp_dir
    #rsync -alp --delete $local_repo/HappyFaceMobile/resources $tmp_dir


    ## Version
    pushd $local_repo &> /dev/null
    #local version="$(cat Version.txt) - Git $(git log -1 | grep "^commit")"
    #local version=$(cat Version.txt | cut -d " " -f 1)
    popd &> /dev/null
    echo "Changing version --> [$version]"
    #sed -e "s/\(\"version\"\: \)\".*\"/\1 \"$version\"/" -i $tmp_dir/package.json


    ## NPM packages
    pushd $tmp_dir
    echo "Installing [NPM packages] ..."
    npm install sync-request@2.0.1
    npm install write-file-atomic@2.3.0
    echo "Rebuilding [node-sass] ..."
    npm rebuild node-sass --force
    popd
}


build_apk(){
    [ ! -e $OUTPUT_DIR ] && mkdir -pv $OUTPUT_DIR

    pushd $tmp_dir
    case $platform in
	ios)
	    local cordova_ver=6.1.0
	    local sdk_bin=xcodebuild
	    ! which $sdk_bin && echo "[$sdk_bin] command does not exist" && return 1
            ionic cordova platform remove $platform
            ionic cordova platform add ${platform}@${cordova_ver}
            ionic cordova build $platform --prod --release
	    local ret=$?
	    [ $ret -eq 0 ] && pushd platforms && tar zcvf HappyFace2.tgz $platform && popd
	    popd
	    [ $ret -eq 0 ] && cp -v $tmp_dir/platforms/HappyFace2.tgz $OUTPUT_DIR
	    ;;
	android)
	    local cordova_ver=4.5.4
	    local sdk_bin=android
	    local apk_out=platforms/android/build/outputs/apk
	    ! which android && echo "[android] command does not exist" && return 1
            ionic cordova platform remove $platform
            ionic cordova platform add ${platform}@${cordova_ver}
            ionic cordova build $platform
	    ionic cordova build $platform --prod --release
	    local ret=$?
	    popd
	    [ $ret -eq 0 ] && cp -v $tmp_dir/$apk_out/*.apk $OUTPUT_DIR
	    ;;
    esac

    return $ret
}


connect_via_ssh(){
    local node="$1"
    case $node in
	vm)
	    open_ssh_reverse_port gen 10.0.2.2 10000
	    ;;
	ph2)
	    open_ssh_reverse_port gen 134.76.86.39 10002 24
	    ;;
	clouds)
	    local users=(cloud cloud)
	    local hosts=(141.5.108.29 141.5.108.30)
	    local ports=(22 22)
	    local rports=(10001 10000)
	    for i in $(seq 0 $((${#hosts[*]} - 1)))
	    do
		keep_ssh ${users[$i]} ${hosts[$i]} ${rports[$i]} ${ports[$i]} &
	    done
	    ;;
    esac
}


keep_ssh(){
    local user=$1
    local host=$2
    local rport=$3
    local port=$4
    [ ! -z "$port" ] && SSH_PORT="-p $port"

    local proc=
    while true
    do
	ssh $SSH_PORT -o ConnectTimeout=30 -o PasswordAuthentication=no -o StrictHostKeyChecking=no $user@$host netstat -an | egrep "tcp .*:$rport.*LISTEN" &> /dev/null
	if [ $? -ne 0 ]; then
	    [ ! -z "$proc" ] && echo "$(date): SSH [$proc] to [$host] is not running. Killing ..." && kill -kill $proc
	    open_ssh_reverse_port $*
	    proc=$!
	    echo "$(date): Process ID is [$proc]"
	fi
	sleep 180
    done
}


open_ssh_reverse_port(){
    local user=$1
    local host=$2
    local rport=$3
    local port=$4
    [ ! -z "$port" ] && SSH_PORT="-p $port"
    #! ping -c 1 $host > /dev/null && echo "[$host] not available" && return 1
    local com="ssh $SSH_PORT -o StrictHostKeyChecking=no -N -R $rport:localhost:22 $user@$host"
    echo "Generating SSH reverse forwarding: [$com]"
    eval $com &
}


kill_ssh(){
    local ps=$(ps ax | grep build-apk4ios.sh | grep -v grep | awk '{print $1}')
    kill -kill $ps
    killall ssh
}


#--------------------------
# Getopt
#--------------------------
while getopts "IXUc:ki:R:B:C:Sb:pO:hv" op
  do
  case $op in
      I) install_ionic
	  ;;
      X) install_xcode
	  ;;
      U) update_script
	  ;;
      c) connect_via_ssh "$OPTARG"
	  ;;
      k) kill_ssh
	  ;;
      i) BUILD_ID="$OPTARG"
	  ;;
      R) GIT_REPO="$OPTARG"
	  ;;
      B) GIT_BRANCH="$OPTARG"
	  ;;
      C) GIT_COMMIT="$OPTARG"
	  ;;
      S) GIT_BRANCH="$STABLE_GIT_BRANCH"
	  GIT_COMMIT="$STABLE_GIT_COMMIT"
	  ;;
      b) build_application $OPTARG
	  exit $?
	  ;;
      O) OUTPUT_DIR=$OPTARG
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



