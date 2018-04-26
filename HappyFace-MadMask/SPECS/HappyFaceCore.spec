Summary: HappyFaceCore
Name: HappyFaceCore
Version: 3.0.0
Release: 3
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: https://ekptrac.physik.uni-karlsruhe.de/trac/HappyFace
# svn co https://ekptrac.physik.uni-karlsruhe.de/public/HappyFace/branches/v3.0 HappyFace
# svn co https://ekptrac.physik.uni-karlsruhe.de/public/HappyFaceModules/trunk modules
Source0: HappyFaceCore.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
Requires: python >= 2.6
Requires: httpd >= 2.0
Requires: python-cherrypy >= 3.0
Requires: python-sqlalchemy >= 0.5
Requires: python-migrate
Requires: python-mako
Requires: python-matplotlib
Requires: python-sqlite
Requires: python-psycopg2
Requires: python-lxml
Requires: numpy
Requires: mod_wsgi
Requires: sqlite
Requires: rpmfusion-free-release


######################################################################
#
#
# Preamble
#
# Macro definitions
%define _branch_name  master
%define _source_dir     HappyFaceCore-%{_branch_name}

%define _prefix         /var/lib
%define _sysconf_dir    /etc/httpd/conf.d
%define _profile_dir    /etc/profile.d

%define happyface_uid	373
%define happyface_user	happyface3
%define happyface_gid	373
%define happyface_group	happyface3


%description
HappyFace is a powerful site specific monitoring system for data from multiple input sources. This system collects, processes, rates and presents all important monitoring information for the overall status and the services of a local or Grid computing site. 


%prep
%setup0 -q -n %{_source_dir}

%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -p $RPM_BUILD_ROOT/%{_prefix}
! [ -d $RPM_BUILD_ROOT/%{_sysconf_dir} ] && mkdir -p $RPM_BUILD_ROOT/%{_sysconf_dir}

# copy files
cp -r %{_source_dir} $RPM_BUILD_ROOT/%{_prefix}/HappyFace3

# http WSGI config --> calling HappyFace/render.py
%if 0%{rhel} == 6
 mv -v $RPM_BUILD_ROOT/%{_prefix}/HappyFace3/happyface3_el6.conf $RPM_BUILD_ROOT/%{_sysconf_dir}
%endif

%if 0%{rhel} == 7
 mv -v $RPM_BUILD_ROOT/%{_prefix}/HappyFace3/happyface3_el7.conf $RPM_BUILD_ROOT/%{_sysconf_dir}
%endif

# a symbolic link
ln -s %{_prefix}/HappyFace3 $RPM_BUILD_ROOT/%{_prefix}/HappyFace

%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%post
echo "Creating new user ..."
groupadd %{happyface_group} -g %{happyface_gid}
useradd %{happyface_user} -u %{happyface_uid} -g %{happyface_gid} -d %{_prefix}/HappyFace3 -M
chown -R %{happyface_user}:%{happyface_group} %{_prefix}/HappyFace3

echo "------------------------------------"
echo "Populating default Happy Face database ..."
cd %{_prefix}/HappyFace3
su %{happyface_user} -c "python acquire.py"
echo "------------------------------------"

%postun
echo "Deleting user ..."
userdel -r %{happyface_user}


%files
%defattr(-,root,root)
%{_prefix}
%{_sysconfdir}
#%{_profile_dir}


%changelog
* Mon Aug 18 2016 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-3
- Added rpmfusion-free
* Mon Jun 08 2015 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-2
- Integrated with integration server and changed the package name
* Fri Jul 19 2013 Gen Kawamura <Gen.Kawamura@cern.ch> and Christian Wehrberger <cgwehrberger@gmail.com> 3.0.0-1
- rebuild to make working system

* Wed Jul 17 2013 Gen Kawamura <Gen.Kawamura@cern.ch> and Christian Wehrberger <cgwehrberger@gmail.com> 3.0.0-0
- initial packaging
