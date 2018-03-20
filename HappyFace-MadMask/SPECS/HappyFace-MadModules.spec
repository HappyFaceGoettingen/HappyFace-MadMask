Summary: HappyFace-MadModules
Name: HappyFace-MadModules
Version: 1.0.0
Release: 20180316
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: http://nagios-goegrid.gwdg.de/category
Source0: MadModules.zip
Source1: rpackages.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
AutoReqProv: no

Requires: R >= 3.3.0
BuildRequires: R-core >= 3.3.0
BuildRequires: fftw-devel
BuildRequires: fftw2-devel
BuildRequires: libjpeg-turbo
BuildRequires: libjpeg-turbo-devel


Requires: HappyFaceCore = 3.0.0-3
Requires: jq
Requires: sysstat
Requires: bc
Requires: coreutils



######################################################################
#
#
# Preamble
#
# Macro definitions
%define _Rlibdir        /usr/lib64/R/library

%define _prefix         /var/lib/HappyFace3
%define _etc            /etc
%define _profile_dir    /etc/profile.d
%define _datadir        /var/lib/MadMaskData
%define _sbindir        /usr/sbin
%define _libdir         /usr/share/madanalyzer/lib

%define _category_cfg   %{_prefix}/config/categories-enabled
%define _module_cfg     %{_prefix}/config/modules-enabled
%define _category_dis_cfg   %{_prefix}/config/categories-disabled
%define _module_dis_cfg     %{_prefix}/config/modules-disabled


%define happyface_uid	373
%define happyface_user	happyface3
%define happyface_gid	373
%define happyface_group	happyface3


%description
HappyFace-MadMask is several wrapper modules for both HappyFace mobile application and Ionic server interface over a HappyFace instance. The HappyFace system and HappyFace-MadMask modules enable HF users to use a mobile application and meta-browsing/data analysis/smart administration for a global system and Grid computing systems.


%prep
%setup -q -n MadModules -b 0
%setup -q -n rpackages -b 1


%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix} $RPM_BUILD_ROOT/%{_prefix}/static
! [ -d $RPM_BUILD_ROOT/%{_module_cfg} ] && mkdir -vp $RPM_BUILD_ROOT/%{_module_cfg}
! [ -d $RPM_BUILD_ROOT/%{_category_cfg} ] && mkdir -vp $RPM_BUILD_ROOT/%{_category_cfg}
[ ! -d $RPM_BUILD_ROOT/%{_etc}/cron.d ] && mkdir -p $RPM_BUILD_ROOT/%{_etc}/cron.d
! [ -d $RPM_BUILD_ROOT/%{_sbindir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_sbindir}
! [ -d $RPM_BUILD_ROOT/%{_libdir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_libdir}
! [ -d $RPM_BUILD_ROOT/%{_Rlibdir} ] && mkdir -p $RPM_BUILD_ROOT/%{_Rlibdir}


# Copy MadMask modules
echo "Installing [HappyFace MadModules] ..."
cp -vr MadModules/modules $RPM_BUILD_ROOT/%{_prefix}
cp -vr MadModules/config/modules-enabled/* $RPM_BUILD_ROOT/%{_module_cfg}
cp -vr MadModules/config/categories-enabled/* $RPM_BUILD_ROOT/%{_category_cfg}

## Into static dir such as javascript, data and so on
echo "Generating [HappyFace MadModules static dirs] ..."
cp -vr MadModules/js/* $RPM_BUILD_ROOT/%{_prefix}/static
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_prefix}/static/data
ln -s %{_prefix}/MadMask/sites $RPM_BUILD_ROOT/%{_prefix}/static/sites

## Into lib dir
echo "Installing [HappyFace MadModules lib] ..."
cp -vr MadModules/lib/* $RPM_BUILD_ROOT/%{_libdir}
ln -s %{_libdir}/madanalyzer $RPM_BUILD_ROOT/%{_sbindir}/



## R library
cd rpackages
for p in $(cat packages.txt)
do
	echo "Compiling [$p] ..."
	/usr/bin/R CMD INSTALL -c -l $RPM_BUILD_ROOT/%{_Rlibdir} $p
done

%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%pre
service httpd stop


%post


## If HappyFace user does not exist, the create it
if ! id $happyface_user; then
    echo "Creating new user [%happyface_user] ..."
    groupadd %{happyface_group} -g %{happyface_gid}
    useradd %{happyface_user} -u %{happyface_uid} -g %{happyface_gid} -d %{_prefix} -M
fi

## Making data dir
[ ! -d %{_datadir} ] && mkdir -vp %{_datadir}


## Disabling some development modules and updating HF-DB
## making default categories disabled
! [ -e %{_module_dis_cfg} ] && mkdir -v %{_module_dis_cfg}
! [ -e %{_category_dis_cfg} ] && mkdir -v %{_category_dis_cfg}

## disabling default categories
[ -e %{_category_cfg}/batch_system.cfg ] && mv -v %{_category_cfg}/batch_system.cfg %{_category_dis_cfg}
[ -e %{_category_cfg}/infrastructure.cfg ] && mv -v %{_category_cfg}/infrastructure.cfg %{_category_dis_cfg}
[ -e %{_category_cfg}/phedex_prod.cfg ] && mv -v %{_category_cfg}/phedex_prod.cfg %{_category_dis_cfg}

## disabling default modules
[ -e %{_module_cfg}/batch_system.cfg ] && mv -v %{_module_cfg}/batch_system.cfg %{_module_dis_cfg}
[ -e %{_module_cfg}/phedex_prod.cfg ] && mv -v %{_module_cfg}/phedex_prod.cfg %{_module_dis_cfg}
[ -e %{_module_cfg}/uschi_basic_dcap.cfg ] && mv -v %{_module_cfg}/uschi_*.cfg %{_module_dis_cfg}


##----------------------------------
## Disabling outdated ones
##----------------------------------
[ -e %{_category_cfg}/panda.cfg ] && mv -v %{_category_cfg}/panda*.cfg %{_category_dis_cfg}
[ -e %{_category_cfg}/site_services.cfg ] && sed -e "s/,g__stat//g" -i %{_category_cfg}/site_services.cfg


## Making database
echo "------------------------------------"
echo "Populating default Happy Face database ..."
cd %{_prefix}
su %{happyface_user} -c "python acquire.py"
echo "------------------------------------"


service httpd start
service crond start

%preun
service httpd stop

%postun
service httpd start



%files
%defattr(-,%{happyface_user},%{happyface_group})
%{_prefix}/static/*
%{_prefix}/modules/*
%{_module_cfg}/*
%{_category_cfg}/*


%defattr(-,root,root)
%{_etc}/*
%{_sbindir}/*
%{_libdir}/*
%{_Rlibdir}/*


%changelog
* Fri Mar 16 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180316
- Upgraded a builder. The all build processes are faster.
* Tue Feb 27 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180227
- disabled a strict HappyFace dependency
* Mon Jan 15 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180115
- initial packaging
