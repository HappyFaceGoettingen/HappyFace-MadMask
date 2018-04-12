Summary: HappyFace-MadMask-devel
Name: HappyFace-MadMask-devel
Version: 1.0.0
Release: 20180316
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: http://nagios-goegrid.gwdg.de/category
Source0: HappyFaceMobile.zip
Source1: HappyFaceMobileDevelopment.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
AutoReqProv: no

Requires: MadFoxd

Requires: nodejs
Requires: npm
Requires: tmpwatch
Requires: ImageMagick
Requires: jq
Requires: sysstat
Requires: bc
Requires: coreutils
Requires: cronie


######################################################################
#
#
# Preamble
#
# Macro definitions
%define _prefix         /var/lib/HappyFace3
%define _etc            /etc
%define _profile_dir    /etc/profile.d
%define _datadir        /var/lib/MadMaskData
%define _logdir         /var/log/HappyFace
%define _piddir         /var/run/HappyFace
%define _sbindir        /usr/sbin


%define happyface_uid	373
%define happyface_user	happyface3
%define happyface_gid	373
%define happyface_group	happyface3


%description
HappyFace-MadMask is several wrapper modules for both HappyFace mobile application and Ionic server interface over a HappyFace instance. The HappyFace system and HappyFace-MadMask modules enable HF users to use a mobile application and meta-browsing/data analysis/smart administration for a global system and Grid computing systems.


%prep
%setup -q -n HappyFaceMobile -b 0
%setup -q -n HappyFaceMobileDevelopment -b 1


%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix}
[ ! -d $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d ] && mkdir -p $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d
[ ! -d $RPM_BUILD_ROOT/%{_etc}/cron.d ] && mkdir -p $RPM_BUILD_ROOT/%{_etc}/cron.d
! [ -d $RPM_BUILD_ROOT/%{_logdir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_logdir}
! [ -d $RPM_BUILD_ROOT/%{_piddir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_piddir}
! [ -d $RPM_BUILD_ROOT/%{_sbindir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_sbindir}


# Install MadMask (HappyFaceMobile Instance) and its service
echo "Installing [HappyFaceMobile] ..."
cp -r HappyFaceMobileDevelopment $RPM_BUILD_ROOT/%{_prefix}/MadMask

cp -r HappyFaceMobile/lib $RPM_BUILD_ROOT/%{_prefix}/MadMask
cp -r HappyFaceMobile/daemon $RPM_BUILD_ROOT/%{_prefix}/MadMask
cp -r HappyFaceMobile/sites $RPM_BUILD_ROOT/%{_prefix}/MadMask
cp -v HappyFaceMobile/madmask $RPM_BUILD_ROOT/%{_prefix}/MadMask

cp -v HappyFaceMobile/daemon/madmask.cron $RPM_BUILD_ROOT/%{_etc}/cron.d/madmask.cron
ln -s MadMask $RPM_BUILD_ROOT/%{_prefix}/HappyFaceMobile

ln -s %{_prefix}/MadMask/daemon/madmask.conf $RPM_BUILD_ROOT/%{_etc}/madmask.conf
ln -s %{_prefix}/MadMask/daemon/madmaskd $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d/
ln -s %{_prefix}/MadMask/daemon/madmask-default-start $RPM_BUILD_ROOT/%{_sbindir}/
[ -e $RPM_BUILD_ROOT/%{_prefix}/MadMask/data ] && rm -v $RPM_BUILD_ROOT/%{_prefix}/MadMask/data
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_prefix}/MadMask/data
ln -s ../data $RPM_BUILD_ROOT/%{_prefix}/MadMask/www/data
ln -s ../sites $RPM_BUILD_ROOT/%{_prefix}/MadMask/www/sites



%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%post

## Installing Basic packages for Ionic and Cordova
echo "Installing Ionic and Cordova modules ..."
npm install -g cordova@7.0.0
npm install -g ionic@2.0.0

echo "Installing JPM and Forever ..."
which jpm || npm install -g jpm@1.0.7 &> /dev/null
which forever || npm install -g forever@0.15.2 &> /dev/null


## If HappyFace user does not exist, the create it
if ! id $happyface_user; then
    echo "Creating new user [%happyface_user] ..."
    groupadd %{happyface_group} -g %{happyface_gid}
    useradd %{happyface_user} -u %{happyface_uid} -g %{happyface_gid} -d %{_prefix} -M
fi

## Making data dir
[ ! -d %{_datadir} ] && mkdir -vp %{_datadir}

## Making a symlink
[ -e /sites ] && mv -v %{_prefix}/MadMask/sites %{_prefix}/MadMask/sites.org && ln -sv /sites %{_prefix}/MadMask/sites

## Installing sync-request for madmask command
pushd %{_prefix}/MadMask
npm install sync-request@2.0.1
popd


%preun
service madmaskd stop

## Changing a symlink of sites dir
[ -L %{_prefix}/MadMask/sites ] && rm -v %{_prefix}/MadMask/sites
[ -e %{_prefix}/MadMask/sites.org ] && mv -v %{_prefix}/MadMask/sites.org %{_prefix}/MadMask/sites


%files
%defattr(-,%{happyface_user},%{happyface_group})
%{_prefix}/HappyFaceMobile
%{_prefix}/MadMask
%{_logdir}
%{_piddir}


%defattr(-,root,root)
%{_etc}/*
%{_sbindir}/*



%changelog
* Fri Mar 16 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180316
- Upgraded a builder. The all build processes are faster.
* Tue Feb 27 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180227
- disabled a strict HappyFace dependency
* Mon Jan 15 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180115
- initial packaging
