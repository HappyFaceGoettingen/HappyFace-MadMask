Summary: MadFoxd
Name: MadFoxd
Version: 1.0.0
Release: 20180129
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: http://nagios-goegrid.gwdg.de/category
Source0: MadFoxd.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
AutoReqProv: no

Requires: xorg-x11-server-Xvfb
Requires: firefox
Requires: ImageMagick
Requires: xdotool
Requires: jq
Requires: bc



######################################################################
#
#
# Preamble
#
# Macro definitions
%define _branch_name    development_2018
%define _source_dir     MadFoxd-%{_branch_name}

# Macro definitions
%define _prefix         /usr/share/madfoxd
%define _etc            /etc/madfoxd
%define _profile_dir    /etc/profile.d
%define _logdir         /var/log/madfoxd
%define _piddir         /var/run/madfoxd
%define _sbindir        /usr/sbin



%description
MadFoxd is a server which can gather many web pages as images by Firefox browsers in virtual X-window. 


%prep
%setup -q -n %{_source_dir} -b 0


%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix} $RPM_BUILD_ROOT/%{_prefix}/static
! [ -d $RPM_BUILD_ROOT/%{_module_cfg} ] && mkdir -vp $RPM_BUILD_ROOT/%{_module_cfg}
! [ -d $RPM_BUILD_ROOT/%{_category_cfg} ] && mkdir -vp $RPM_BUILD_ROOT/%{_category_cfg}
[ ! -d $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d ] && mkdir -p $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d
! [ -d $RPM_BUILD_ROOT/%{_datadir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_datadir}
! [ -d $RPM_BUILD_ROOT/%{_logdir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_logdir}
! [ -d $RPM_BUILD_ROOT/%{_piddir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_piddir}
! [ -d $RPM_BUILD_ROOT/%{_sbindir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_sbindir}


# copy MadMask modules
cp -vr %{_source_dir}/MadModules/modules $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/MadModules/config/modules-enabled/* $RPM_BUILD_ROOT/%{_module_cfg}
cp -vr %{_source_dir}/MadModules/config/categories-enabled/* $RPM_BUILD_ROOT/%{_category_cfg}



## Install MadMask and service
cp -vr %{_source_dir}/MadMask $RPM_BUILD_ROOT/%{_prefix}/
ln -s %{_prefix}/MadMask/daemon/madface.conf $RPM_BUILD_ROOT/%{_etc}/madface.conf
ln -s %{_prefix}/MadMask/daemon/madfaced $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d/
ln -s %{_prefix}/MadMask/daemon/madface-default-start $RPM_BUILD_ROOT/%{_sbindir}/
rm -v $RPM_BUILD_ROOT/%{_prefix}/MadMask/data
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_prefix}/MadMask/data


## Into static dir such as javascript and link
cp -vr %{_source_dir}/MadModules/js/* $RPM_BUILD_ROOT/%{_prefix}/static
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_prefix}/static/data



## For development, example data dir (taken from MadFace)
# Generating old structure
%define _madface_dir        /usr/lib/MadFace
! [ -d $RPM_BUILD_ROOT/%{_madface_dir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_madface_dir}
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_madface_dir}/data

## --> From Docker Volume (under /devel)
rmdir -v $RPM_BUILD_ROOT/%{_datadir}
ln -s /devel/MadMask/MadMaskExampleData $RPM_BUILD_ROOT/%{_datadir}



%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%files
%defattr(-,root,root)
%{_etc}/*
%{_sbindir}/*



%changelog
* Mon Jan 29 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180129
- initial packaging
