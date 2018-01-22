#!/bin/sh

cd $(dirname $0)
usage="./rebuild.sh [build|test]"

if [ $# -eq 0 ]; then
  echo "$usage"
  exit 0
fi

## create .rpmmacros
echo "%_topdir        $PWD" > rpmmacros_HappyFace-MadMask
ln -sf $PWD/rpmmacros_HappyFace-MadMask ~/.rpmmacros

specs="HappyFace-MadMask.spec"

localzip(){
    TARDIR="HappyFace-MadMask-development_2018"

   ## Making Source file
   pushd SOURCES
   [ ! -e $TARDIR ] && mkdir -v $TARDIR
   rsync -avlp --delete ../../MadMask $TARDIR/
   rsync -avlp --delete ../../MadModules $TARDIR/
   tar zcvf HappyFace-MadMask.zip ${TARDIR}
   popd
}


case "$1" in
  build)
   localzip

   ## Build
   for s in $specs
   do
     rpmbuild --define 'dist .el6' --clean -ba SPECS/$s
   done
   ;;
  test)
	yum -y remove HappyFace-MadMask
	yum -y install RPMS/x86_64/HappyFace-MadMask-1*.rpm
	chown -R happyface3:happyface3 ../MadMaskExampleData
	;;
esac
