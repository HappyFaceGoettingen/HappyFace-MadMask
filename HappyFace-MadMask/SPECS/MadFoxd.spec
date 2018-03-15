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
Requires: cronie



######################################################################
#
#
# Preamble
#
# Macro definitions
%define _source_dir     MadFoxd

# Macro definitions
%define _prefix         /usr/share/madfoxd
%define _etc            /etc
%define _logdir         /var/log/madfoxd
%define _piddir         /var/run/madfoxd
%define _sbindir        /usr/sbin


%description
MadFoxd is a server which can gather many web pages as images by Firefox browsers. 


%prep
%setup -q -n %{_source_dir} -b 0


%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix}
[ ! -d $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d ] && mkdir -vp $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d
[ ! -d $RPM_BUILD_ROOT/%{_etc}/cron.d ] && mkdir -vp $RPM_BUILD_ROOT/%{_etc}/cron.d
! [ -d $RPM_BUILD_ROOT/%{_logdir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_logdir}
! [ -d $RPM_BUILD_ROOT/%{_piddir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_piddir}
! [ -d $RPM_BUILD_ROOT/%{_sbindir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_sbindir}


# copy MadFoxd main programs
cp -vr %{_source_dir}/lib $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/firefox_profiles $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/examples $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/madfox-addon $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/man $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/daemon $RPM_BUILD_ROOT/%{_prefix}


# Making symlinks of executable, daemon and default configurations
ln -sv %{_prefix}/lib/madfox $RPM_BUILD_ROOT/%{_sbindir}
ln -sv %{_prefix}/daemon/madfoxd $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d
ln -sv %{_prefix}/daemon/madfoxd.conf $RPM_BUILD_ROOT/%{_etc}
ln -sv %{_prefix}/daemon/madfoxd.cron $RPM_BUILD_ROOT/%{_etc}/cron.d


%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%files
%defattr(-,root,root)
%{_etc}/*
%{_prefix}/*
%{_sbindir}/*



%changelog
* Mon Jan 29 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180129
- initial packaging
