#!/bin/bash

TMP_DIR=/tmp/HappyFace-MadMask4iOS
[ ! -e $TMP_DIR ] && mkdir -pv $TMP_DIR && chmod 1777 $TMP_DIR
[ ! -e $TMP_DIR/ios ] && mkdir -pv $TMP_DIR/ios && chmod 1777 $TMP_DIR/ios
BUILD_ID=$(date -u +%Y%m%d-%H%M%S)


## Git location
GIT_DIR=HappyFaceGoettingen/HappyFace-MadMask
GIT_REPO=https://github.com/$GIT_DIR
GIT_BRANCH=gen_development
GIT_COMMIT=

## Usage
usage="$0 [options]

 * Preparation
 -I:  install Ionic
 -X:  install Xcode
 -U:  Update this script (/usr/local/bin/$(basename $0))
 -c:  Connect to [vm|cloud] via ssh

 * Git location
 -R:  set a git repo [default: $GIT_REPO]
 -B:  set a branch name [defaut: $GIT_BRANCH]
 -C:  set a commit ID [default: $GIT_COMMIT]

 * Application Build
 -i:  set a build ID [default: $BUILD_ID]
 -b:  build iPhone App in a tmp dir [$TMP_DIR/ios/${GIT_BRANCH}.${BUILD_ID}]

 * Example
 $0 -B master -b


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
	sudo xcode-select -s /Library/Xcode.app/Contents/Developer
	sudo xcodebuild -license
	echo "Execute Xcode at once and install required packages"
    fi
    return 0
}


update_script(){
    local url=https://raw.githubusercontent.com/${GIT_DIR}/${GIT_BRANCH}/HappyFace-MadMask/build-apk4ios.sh
    curl -fsSL $url -o /usr/local/bin/$(basename $url) && chmod 755 /usr/local/bin/$(basename $url)
}


build_iphone_app(){
    local local_repo=$TMP_DIR/$(basename $GIT_REPO).$GIT_BRANCH
    local tmp_dir=$TMP_DIR/ios/${GIT_BRANCH}.${BUILD_ID}

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

    ## Prepare devel env for MacOSX
    prepare_ios_env

    ## Calling madmask builder
    /usr/local/bin/node $tmp_dir/madmask -b ios
    return $?
}


## Internal command for building devel env
prepare_ios_env(){
    echo "Preparing env in [$tmp_dir] ..."
    echo "Copying [HappyFaceMobileDevelopment, resources, lib, sites and madmask] ..."
    rsync -alp --delete $local_repo/HappyFaceMobileDevelopment/ $tmp_dir
    rsync -alp --delete $local_repo/HappyFaceMobile/resources $tmp_dir
    rsync -alp --delete $local_repo/HappyFaceMobile/lib $tmp_dir
    rsync -alp --delete $local_repo/HappyFaceMobile/sites $tmp_dir
    cp -v $local_repo/HappyFaceMobile/madmask $tmp_dir

    pushd $tmp_dir
    echo "Installing [sync-request] ..."
    npm install sync-request@2.0.1
    echo "Rebuilding [node-sass] ..."
    npm rebuild node-sass --force
    popd
}


connect_via_ssh(){
    local node="$1"
    case $node in
	vm)
	    open_ssh_reverse_port 10.0.2.2 10000
	    ;;
	clouds)
	    local hosts=(141.5.108.30 141.5.108.29 134.76.86.39)
	    local ports=(22 22 24)
	    local rports=(10000 10001 10002)
	    for i in $(0 $((${#hosts[*]} - 1)))
	    do
		open_ssh_reverse_port ${hosts[$i]} ${rports[$i]} ${ports[$i]}
	    done
	    ;;
    esac
}

open_ssh_reverse_port(){
    local host=$1
    local rport=$2
    local port=$3
    [ ! -z "$port" ] && SSH_PORT="-p $port"
    ! ping -c 1 $host > /dev/null && echo "[$host] not available" && return 1
    local com="ssh $SSH_PORT -f -R $rport:localhost:22 $host"
    echo "Generating SSH reverse forwarding: [$com]"
    eval $com
    return $?
}


#--------------------------
# Getopt
#--------------------------
while getopts "IXUc:i:R:B:C:bphv" op
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
      i) BUILD_ID="$OPTARG"
	  ;;
      R) GIT_REPO="$OPTARG"
	  ;;
      B) GIT_BRANCH="$OPTARG"
	  ;;
      C) GIT_COMMIT="$OPTARG"
	  ;;
      b) build_iphone_app
	  exit $?
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



