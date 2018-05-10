#!/bin/bash

TMP_DIR=/tmp/HappyFace-MadMask4iOS
[ ! -e $TMP_DIR ] && mkdir -pv $TMP_DIR && chmod 1777 $TMP_DIR
BUILD_ID=$(basename $(mktemp -u))

## Git location
GIT_REPO=https://github.com/HappyFaceGoettingen/HappyFace-MadMask
GIT_BRANCH=gen_development

## Usage
usage="$0 [options]

 * Preparation
 -I:  install Ionic
 -X:  install Xcode

 * Application Build
 -i:  set a build ID [default: $BUILD_ID]
 -B:  set a branch name [defaut: $GIT_BRANCH]
 -b:  build iPhone App in a tmp dir [$TMP_DIR/$BUILD_ID]

 * Example
 $0 -b


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

    ## Set as the default xcodebuild tool
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


build_iphone_app(){
    local tmp_dir=$TMP_DIR/$BUILD_ID

    echo "Cloning [$(basename $GIT_REPO)] - [$GIT_BRANCH] into [$tmp_dir] ..."
    git clone $GIT_REPO -b $GIT_BRANCH $tmp_dir

    [ ! -e $tmp_dir ] && echo "[$tmp_dir] does not exist" && return 1
    echo "Entering [$tmp_dir] ..."
    cd $tmp_dir

    ## Prepare devel env for MacOSX
    ./HappyFace-MadMask/build-apk4ios.sh -i $BUILD_ID -p

    ## Calling madmask builder
    ./HappyFaceMobile4iOS/madmask -b ios
    return $?
}


## Internal command for building devel env
prepare_ios_env(){
    local tmp_dir=$TMP_DIR/$BUILD_ID
    echo "Preparing env in [$tmp_dir] ..."
    cd $tmp_dir
    cp -r HappyFaceMobileDevelopment HappyFaceMobile4iOS
    cp -r HappyFaceMobile/lib HappyFaceMobile4iOS
    cp -v HappyFaceMobile/madmask HappyFaceMobile4iOS
    cp -r HappyFaceMobile/sites HappyFaceMobile4iOS
    rsync -avlp --delete HappyFaceMobile/resources HappyFaceMobile4iOS
}


#--------------------------
# Getopt
#--------------------------
while getopts "IXi:B:pbphv" op
  do
  case $op in
      I) install_ionic
	  ;;
      X) install_xcode
	  ;;
      i) BUILD_ID="$OPTARG"
	  ;;
      B) GIT_BRANCH="$OPTARG"
	  ;;
      p) prepare_ios_env
	  exit 0
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



