#!/bin/sh

cd $(dirname $0)
BUILDER_DIR=$PWD
WORK_DIR=/tmp/MadMask.$(whoami)
PRJ_DIR=$PWD/..

usage="./rebuild.sh [options]

   -p:    copy prebuild packages from [$BUILD_DIR/RPMS/*/*.rpm]
   -b:    build {hf|hf_atlas|madmask|devel|madmodules|rlibs|madfoxd|android-sdk|all}
   -t:    test installation
   -w:    workdir [default: $WORK_DIR]
   -C:    clean packages


 Report Bugs to Gen Kawamura <gen.kawamura@cern.ch>
"

if [ $# -eq 0 ]; then
  echo "$usage"
  exit 0
fi


#-----------------------------------------
# Functions
#-----------------------------------------
make_rpmdirs(){
    ## create .rpmmacros
    echo "%_topdir        $PWD" > rpmmacros_HappyFace-MadMask
    ln -sf $PWD/rpmmacros_HappyFace-MadMask ~/.rpmmacros
    
    ## Making required dirs for rpmbuild
    local dirs="BUILD BUILDROOT RPMS SOURCES SPECS SRPMS"
    for dir in $dirs
    do
	[ ! -e $dir ] && mkdir -v $dir
    done

    ## Making RPMS subdirs
    local rpm_subdirs="athlon  i386  i486  i586  i686  noarch  x86_64"
    for rpm_subdir in $rpm_subdirs
    do
	[ ! -e RPMS/$rpm_subdir ] && mkdir -v RPMS/$rpm_subdir
    done

    ## Copying SPEC files
    cp -v $BUILDER_DIR/SPECS/* SPECS

}

happyface_zip(){
    ## Consts
    GIT_GROUP=HappyFaceGoettingen
    GIT_PROJECT=HappyFaceCore
    GIT_BRANCH=master

    ## HappyFaceCore.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/${GIT_PROJECT}.zip <-- ${GIT_PROJECT}"
    GIT_ZIP="https://codeload.github.com/${GIT_GROUP}/${GIT_PROJECT}/zip"
    wget -q $GIT_ZIP/$GIT_BRANCH -O $WORK_DIR/SOURCES/${GIT_PROJECT}.zip
    popd
}

happyface_atlas_zip(){
    ## Consts
    GIT_GROUP=HappyFaceGoettingen
    GIT_PROJECT=HappyFaceATLASModules
    GIT_BRANCH=Lino201506

    ## HappyFaceCore.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/${GIT_PROJECT}.zip <-- ${GIT_PROJECT}"
    GIT_ZIP="https://codeload.github.com/${GIT_GROUP}/${GIT_PROJECT}/zip"
    wget -q $GIT_ZIP/$GIT_BRANCH -O $WORK_DIR/SOURCES/${GIT_PROJECT}.zip
    popd
}


madmask_zip(){
    ## HappyFaceMobile.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/HappyFaceMobile.zip <-- HappyFaceMobile"
    tar zcf $WORK_DIR/SOURCES/HappyFaceMobile.zip HappyFaceMobile
    popd
}


madmask_devel_zip(){
    ## HappyFaceMobileDevelopment.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/HappyFaceMobileDevelopment.zip <-- HappyFaceMobileDevelopment"
    tar zcf $WORK_DIR/SOURCES/HappyFaceMobileDevelopment.zip HappyFaceMobileDevelopment
    popd
}


madfoxd_zip(){
    ## MadFoxd.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/MadFoxd.zip <-- MadFoxd"
    tar zcf $WORK_DIR/SOURCES/MadFoxd.zip MadFoxd
    popd
}


madmodules_zip(){
    ## MadModules.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/MadModules.zip <-- MadModules"
    tar zcf $WORK_DIR/SOURCES/MadModules.zip MadModules
    popd
}


rlibs_zip(){
    ## rpackages.zip
    pushd $BUILDER_DIR/SOURCES
    echo "Archiving $WORK_DIR/SOURCES/rpackages.zip <-- rpackages"
    tar zcf $WORK_DIR/SOURCES/rpackages.zip rpackages
    popd
}


android_sdk_zip(){
    ## android-sdk.zip
    pushd $BUILDER_DIR/SOURCES
    echo "Archiving $WORK_DIR/SOURCES/android-sdk.zip <-- android-sdk"
    tar zcf $WORK_DIR/SOURCES/android-sdk.zip android-sdk
    popd
}


build_packages(){
    local package=$1
    echo "Starting a build process for a package [$package] ..."

    case "$package" in 
	hf)
	    happyface_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFaceCore.spec
	    ;;
	hf_atlas)
	    happyface_atlas_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-ATLAS.spec
	    ;;
	madmask)
	    madmask_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadMask.spec
	    ;;
	devel)
	    madmask_zip
	    madmask_devel_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadMask-devel.spec
	    ;;
	madfoxd)
	    madfoxd_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/MadFoxd.spec
	    ;;
	madmodules)
	    madmodules_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadModules.spec
	    ;;
	rlibs)
	    ls /tmp/MadMask.$(whoami)/RPMS/*/HappyFace-MadModules-Rlibs-*.rpm && echo "A RPM for R libraries exists" && return 0
	    rlibs_zip
	    ## Skipping check-buildroot
	    export QA_SKIP_BUILD_ROOT=1
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadModules-Rlibs.spec
	    ;;
	android-sdk)
	    android_sdk_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/android-sdk.spec
	    ;;
	all)
	    ## MadMask
	    madmask_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadMask.spec
	    
	    ## Madfox
	    madfoxd_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/MadFoxd.spec

	    ## MadModules
	    madmodules_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadModules.spec
	    ;;
	*)
	    echo "-b [$package] does not exist"
	    exit -1
	    ;;
    esac
}

copy_prebuilt_packages(){
    ## Copying pre-built packages
    cp -rv $BUILDER_DIR/RPMS .
}


set_workdir(){
    [ ! -e $WORK_DIR ] && mkdir -pv $WORK_DIR
    echo "Entering $WORK_DIR"
    cd $WORK_DIR
}

test_install(){
    yum -y remove HappyFace-MadMask HappyFace-MadModules MadFoxd
    rpm -q HappyFaceCore || yum -y install RPMS/x86_64/HappyFaceCore-*.rpm
    rpm -q HappyFace-ATLAS || yum -y install RPMS/x86_64/HappyFace-ATLAS-*.rpm
    yum -y install RPMS/x86_64/MadFoxd-*.rpm
    yum -y install RPMS/x86_64/HappyFace-*.rpm
    ls RPMS/x86_64/android-sdk-*.rpm && yum -y install RPMS/x86_64/android-sdk-*.rpm
}

clean_packages(){
    rm -vf RPMS/*/*.rpm
}


#--------------------------
# Getopt
#--------------------------
while getopts "pb:w:tChv" op
  do
  case $op in
      p) set_workdir
	  make_rpmdirs
	  copy_prebuilt_packages
	  ;;
      b)  set_workdir
	  make_rpmdirs
	  build_packages $OPTARG
          ;;
      w) WORK_DIR=$OPTARG
          ;;
      t) set_workdir
	  test_install
	  ;;
      C) set_workdir
	  clean_packages
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
