Summary: admin-server
Name: admin-server
Version: 1.0.0
Release: 0
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: https://ekptrac.physik.uni-karlsruhe.de/trac/HappyFace
Source0: admin-server.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
Requires: httpd >= 2.0
Requires: nodejs
Requires: npm


######################################################################
#
#
# Preamble
#
# Macro definitions
%define _prefix         /usr/share
%define _etc_dir        /etc
%define _initd_dir        /etc/init.d
%define _sysconf_dir    /etc/httpd/conf.d

%define admin_uid	401
%define admin_user	admin-server
%define admin_gid	401
%define admin_group	admin-server


%description
Admin server can provide 2 ways of connectivities into a large system: one is a secure web gateway socket, second is a standard openssl server. The admin server system must be protected by robust security mechanisms, e.g. used by HappyFace Mobile client. These demands are accompalished by a layer from the secure web (https) gateway socket to the openssl server.


%prep
%setup0 -q -n admin-server

%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -p $RPM_BUILD_ROOT/%{_prefix}
! [ -d $RPM_BUILD_ROOT/%{_initd_dir} ] && mkdir -p $RPM_BUILD_ROOT/%{_initd_dir}
! [ -d $RPM_BUILD_ROOT/%{_sysconf_dir} ] && mkdir -p $RPM_BUILD_ROOT/%{_sysconf_dir}


# copy files
cp -r admin-server $RPM_BUILD_ROOT/%{_prefix}
ln -s %{_prefix}/admin-server/admin-served.conf $RPM_BUILD_ROOT/%{_etc_dir}
ln -s %{_prefix}/admin-server/admin-served $RPM_BUILD_ROOT/%{_initd_dir}
ln -s %{_prefix}/admin-server/httpd_admin_server_command_logs.conf $RPM_BUILD_ROOT/%{_sysconf_dir}


%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%post
echo "Creating new user ..."
groupadd %{admin_group} -g %{admin_gid}
useradd %{admin_user} -u %{admin_uid} -g %{admin_gid} -d %{_prefix}/admin-server -M
chown -R %{admin_user}:%{admin_group} %{_prefix}/admin-server


%postun
echo "Deleting user ..."
userdel -r %{happyface_user}


%files
%defattr(-,root,root)
%{_prefix}/*
%{_etc_dir}/*
%{_sysconf_dir}/*


%changelog
* Wed May 30 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-0
- initial packaging
