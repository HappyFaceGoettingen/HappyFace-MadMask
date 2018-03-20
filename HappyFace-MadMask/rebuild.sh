#!/bin/sh

cd $(dirname $0)
BUILDER_DIR=$PWD
WORK_DIR=/tmp/MadMask.$USER
PRJ_DIR=$PWD/..

usage="./rebuild.sh [options]

   -b:    build {madmask|madmodules|madfoxd|all}
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

make_rpmmacros(){
    ## create .rpmmacros
    echo "%_topdir        $PWD" > rpmmacros_HappyFace-MadMask
    ln -sf $PWD/rpmmacros_HappyFace-MadMask ~/.rpmmacros
}

madmask_zip(){
    ## HappyFace-MadMask.zip
    pushd $PRJ_DIR
    echo "Archiving $WORK_DIR/SOURCES/HappyFaceMobile.zip <-- HappyFaceMobile"
    tar zcf $WORK_DIR/SOURCES/HappyFaceMobile.zip HappyFaceMobile
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

    ## MadMask-R-libs.zip
    pushd $BUILDER_DIR
    echo "Archiving $WORK_DIR/SOURCES/rpackages.zip <-- rpackages"
    tar zcf $WORK_DIR/SOURCES/rpackages.zip rpackages
    popd
}


build_packages(){
    local package=$1

    case "$package" in 
	madmask)
	    madmask_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadMask.spec
	    ;;
	madfoxd)
	    madfoxd_zip
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/MadFoxd.spec
	    ;;
	madmodules)
	    madmodules_zip
	    ## Skipping check-buildroot
	    export QA_SKIP_BUILD_ROOT=1
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadModules.spec
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
	    ## Skipping check-buildroot
	    export QA_SKIP_BUILD_ROOT=1
	    rpmbuild --define "debug_package %{nil}" --clean -bb SPECS/HappyFace-MadModules.spec
	    ;;
	*)
	    echo "-b [$package] does not exist"
	    exit -1
	    ;;
    esac
}


set_workdir(){
    [ ! -e $WORK_DIR ] && mkdir -pv $WORK_DIR
    echo "Entering $WORK_DIR"
    cd $WORK_DIR
    make_rpmdirs
    make_rpmmacros
}

test_install(){
    yum -y remove HappyFace-MadMask HappyFace-MadModules MadFoxd
    yum -y install RPMS/x86_64/MadFoxd-*.rpm
    yum -y install RPMS/x86_64/HappyFace-*.rpm
}

clean_packages(){
    rm -vf RPMS/*/*.rpm
}


#--------------------------
# Getopt
#--------------------------
while getopts "b:w:tChv" op
  do
  case $op in
      b)  set_workdir
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
