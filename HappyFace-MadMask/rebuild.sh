#!/bin/sh

cd $(dirname $0)
[ ! -e SOURCES ] && mkdir -v SOURCES
usage="./rebuild.sh [build|test]
   build {madmask|libs|madfoxd}
"

if [ $# -eq 0 ]; then
  echo "$usage"
  exit 0
fi

## create .rpmmacros
echo "%_topdir        $PWD" > rpmmacros_HappyFace-MadMask
ln -sf $PWD/rpmmacros_HappyFace-MadMask ~/.rpmmacros


madmask_zip(){
    TARDIR="HappyFace-MadMask"

    pushd SOURCES
    [ ! -e $TARDIR ] && mkdir -v $TARDIR
    
    ## HappyFace-MadMask.zip
    rsync -avlp --delete ../../HappyFaceMobile $TARDIR/
    rsync -avlp --delete ../../MadModules $TARDIR/
    tar zcvf HappyFace-MadMask.zip ${TARDIR}

    popd
}

libs_zip(){
    pushd SOURCES

    ## MadMask-R-libs.zip
    tar zcvf MadMask-R-libs.zip MadMask-R-libs
    
    popd
}

madfoxd_zip(){
    pushd SOURCES

    ## MadFoxd.zip
    rsync -avlp --delete ../../MadFoxd .
    tar zcvf MadFoxd.zip MadFoxd
    
    popd
}


case "$1" in
  build)
   case "$2" in 
       madmask)
	   madmask_zip
	   rpmbuild --define "debug_package %{nil}" --clean -ba SPECS/HappyFace-MadMask.spec
	   ;;
       madfoxd)
	   madfoxd_zip
	   rpmbuild --define "debug_package %{nil}" --clean -ba SPECS/MadFoxd.spec
	   ;;
       libs)
	   libs_zip
	   ## Skipping check-buildroot
	   export QA_SKIP_BUILD_ROOT=1
	   rpmbuild --define "debug_package %{nil}" --clean -ba SPECS/MadMask-R-libs.spec
	   ;;
       all)
	   ## MadMask
	   madmask_zip
	   rpmbuild --define "debug_package %{nil}" --clean -ba SPECS/HappyFace-MadMask.spec
	   libs_zip

	   ## Madfox
	   madfoxd_zip
	   rpmbuild --define "debug_package %{nil}" --clean -ba SPECS/MadFoxd.spec

	   ## Skipping check-buildroot
	   export QA_SKIP_BUILD_ROOT=1
	   rpmbuild --define "debug_package %{nil}" --clean -ba SPECS/MadMask-R-libs.spec
	   ;;
   esac
   ;;
  test)
	yum -y remove HappyFace-MadMask MadFoxd
	yum -y install RPMS/x86_64/MadFoxd-*.rpm
	yum -y install RPMS/x86_64/HappyFace-MadMask-*.rpm RPMS/x86_64/MadMask-R-libs-*.rpm
	;;
esac
