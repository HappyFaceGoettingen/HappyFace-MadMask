Summary: Android SDK
Name: android-sdk
Version: 1.0.0
Release: 20180405
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: https://dl.google.com
Source0: android-sdk.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
Requires: java-1.7.0-openjdk-devel
Requires: ant-apache-regexp
Requires: glibc



######################################################################
#
#
# Preamble
#
# Macro definitions
%define _prefix         /usr/local/android-tools
%define _ant_dir        /opt
%define _bin_dir        /usr/bin
%define _profile_dir    /etc/profile.d

%description
Android SDK which is used to develop Android native application. 

%prep
%setup -q -n android-sdk -b 0

%build
#make

%install

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix}
! [ -d $RPM_BUILD_ROOT/%{_ant_dir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_ant_dir}
! [ -d $RPM_BUILD_ROOT/%{_bin_dir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_bin_dir}
! [ -d $RPM_BUILD_ROOT/%{_profile_dir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_profile_dir}


# Environments
cp -v android-sdk.sh $RPM_BUILD_ROOT/%{_profile_dir}/android-sdk.sh

## A script installing the latest SDK packages
cp -v update-android-sdk $RPM_BUILD_ROOT/%{_bin_dir}/


## Ant
ln -vs apache-ant-1.9.11 $RPM_BUILD_ROOT/%{_ant_dir}/apache-ant
unzip -q apache-ant-1.9.11-bin.zip -d $RPM_BUILD_ROOT/%{_ant_dir}



%post

## Installing Android SDK Tools
if [ ! -e %{_prefix}/android ]; then
    ## Making symlinks
    ln -vs adt-bundle-linux-x86_64-20140702 %{_prefix}/android
    
    ## Android SDK
    ADT="https://dl.google.com/android/adt/adt-bundle-linux-x86_64-20140702.zip"
    wget -q "$ADT" -O /tmp/$(basename $ADT) || rm -v /tmp/$(basename $ADT)
    unzip -q /tmp/$(basename $ADT) -d %{_prefix} && rm -v /tmp/$(basename $ADT)
fi




%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%files
%defattr(-,root,root)
%{_prefix}
%{_ant_dir}/*
%{_bin_dir}/*
%{_profile_dir}/*


%changelog
* Thu Apr 05 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180405
- initial packaging
