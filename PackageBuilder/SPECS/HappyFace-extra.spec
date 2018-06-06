Summary: HappyFace-extra
Name: HappyFace-extra
Version: 3.0.0
Release: 20150611
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: http://nagios-goegrid.gwdg.de/category
Source0: HappyFaceExtra.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
Requires: HappyFaceCore = 3.0.0-3
Requires: MySQL-python


######################################################################
#
#
# Preamble
#
# Macro definitions
%define _branch_name  master
%define _source_dir     HappyFaceExtra-%{_branch_name}

%define _prefix         /var/lib/HappyFace3
%define _category_cfg   %{_prefix}/config/categories-enabled
%define _module_cfg     %{_prefix}/config/modules-enabled
%define _category_dis_cfg   %{_prefix}/config/categories-disabled
%define _module_dis_cfg     %{_prefix}/config/modules-disabled



%define happyface_uid	373
%define happyface_user	happyface3
%define happyface_gid	373
%define happyface_group	happyface3


%description
HappyFace is a powerful site specific monitoring system for data from multiple input sources. This system collects, processes, rates and presents all important monitoring information for the overall status and the services of a local or Grid computing site. 


%prep
%setup -q -n %{_source_dir}


%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -p $RPM_BUILD_ROOT/%{_prefix}
! [ -d $RPM_BUILD_ROOT/%{_prefix}/config ] && mkdir -p $RPM_BUILD_ROOT/%{_prefix}/config

# copy files
cp -vr %{_source_dir}/modules $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/config/modules-enabled $RPM_BUILD_ROOT/%{_prefix}/config
cp -vr %{_source_dir}/config/categories-enabled $RPM_BUILD_ROOT/%{_prefix}/config


%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

%pre
service httpd stop

%post
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

echo "------------------------------------"
echo "Populating default Happy Face database ..."
cd %{_prefix}
su %{happyface_user} -c "python acquire.py"
echo "------------------------------------"

service httpd start

%preun
service httpd stop

%postun
service httpd start



%files
%defattr(-,%{happyface_user},%{happyface_group})
%{_prefix}


%changelog
* Tue Mar 03 2014 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-20150611
- Integrated with integration-server
* Tue Mar 03 2014 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-04032014
- added Ganglia module and changed name of package from "ATLAS-devel" to "ATLAS-internal-resource"
* Thu Jan 16 2014 Gen Kawamura <Gen.Kawamura@cern.ch> and Eric Buschmann <eric.buschmann1@stud.uni-goettingen.de> 3.0.0-1
- added PBS module
* Wed Dec 18 2013 Gen Kawamura <Gen.Kawamura@cern.ch> and Eric Buschmann <eric.buschmann1@stud.uni-goettingen.de> 3.0.0-0
- initial packaging
