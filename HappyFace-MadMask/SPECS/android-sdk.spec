Summary: Android SDK
Name: android-sdk
Version: 1.0.0
Release: 20180405
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: https://dl.google.com
BuildRoot: %{_tmppath}/%{name}-%{version}-root
Requires: java-1.7.0-openjdk-devel
Requires: ant-apache-regexp



######################################################################
#
#
# Preamble
#
# Macro definitions
%define _prefix         /usr/local
%define _profile_dir    /etc/profile.d

%description
Android SDK which is used to develop Android native application. 

%prep
#%setup -q -n %{_source_dir}

%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix}
! [ -d $RPM_BUILD_ROOT/%{_profile_dir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_profile_dir}


# Generating environments
echo "## Android SDK Environments
export ANDROID_HOME=%{_prefix}/android/sdk
export ANT_HOME=%{_prefix}/apache-ant

export PATH=\$ANDROID_HOME/platforms:\$ANDROID_HOME/platform-tools:\$ANDROID_HOME/tools:\$ANT_HOME:$ANT_HOME/bin:\$PATH
"

ANT="http://apache.lauf-forum.at//ant/binaries/apache-ant-1.9.10-bin.zip"
ADT="https://dl.google.com/android/adt/adt-bundle-linux-x86_64-20140702.zip"
[ ! -e /tmp/$(basename $ANT) ] && wget "$ANT" -O /tmp/$(basename $ANT)
[ ! -e /tmp/$(basename $ADT) ] && wget "$ADT" -O /tmp/$(basename $ADT)

[ ! -e %{_prefix}/apache-ant ] && unzip /tmp/$(basename $ANT) -d $RPM_BUILD_ROOT/%{_prefix} && ln -s %{_prefix}/apache-ant-1.9.10 $RPM_BUILD_ROOT/%{_prefix}/apache-ant
[ ! -e %{_prefix}/android ] && unzip /tmp/$(basename $ADT) -d $RPM_BUILD_ROOT/%{_prefix} && ln -s %{_prefix}/adt-bundle-linux-x86_64-20140702 $RPM_BUILD_ROOT/%{_prefix}/android



%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%files
%defattr(-,root,root)
%{_prefix}/*
%{_profile_dir}/*


%changelog
* Thu Apr 05 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180405
- initial packaging
