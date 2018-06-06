Summary: HappyFace-ATLAS
Name: HappyFace-ATLAS
Version: 3.0.0
Release: 20150611
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: http://nagios-goegrid.gwdg.de/category
Source0: HappyFaceATLASModules.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
Requires: HappyFaceCore = 3.0.0-3
#Requires: python-beautifulsoup
Requires: python-BeautifulSoup
Requires: python-matplotlib


######################################################################
#
#
# Preamble
#
# Macro definitions
%define _branch_name  Lino201506
%define _source_dir     HappyFaceATLASModules-%{_branch_name}


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
%setup0 -q -n %{_source_dir}


%build
#make

%install
cd ..

[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

# make directories
! [ -d $RPM_BUILD_ROOT/%{_prefix} ] && mkdir -vp $RPM_BUILD_ROOT/%{_prefix}
! [ -d $RPM_BUILD_ROOT/%{_module_cfg} ] && mkdir -vp $RPM_BUILD_ROOT/%{_module_cfg}
! [ -d $RPM_BUILD_ROOT/%{_category_cfg} ] && mkdir -vp $RPM_BUILD_ROOT/%{_category_cfg}


# copy files
cp -vr %{_source_dir}/modules $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/config/modules-enabled/* $RPM_BUILD_ROOT/%{_module_cfg}
cp -vr %{_source_dir}/config/categories-enabled/* $RPM_BUILD_ROOT/%{_category_cfg}
cp -vr %{_source_dir}/modified_core_system $RPM_BUILD_ROOT/%{_prefix}

%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT

%pre
%if 0%{rhel} == 6
 service httpd stop
%endif

%post
echo "Deploying modified core system ...."
mkdir -v %{_prefix}/modified_core_system/original_code
mv -v %{_prefix}/hf/downloadservice.* %{_prefix}/modified_core_system/original_code
ln -s %{_prefix}/modified_core_system/downloadservice.py %{_prefix}/hf/


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


%files
%defattr(-,%{happyface_user},%{happyface_group})
%{_prefix}/modified_core_system/*
%{_category_cfg}/*
%{_module_cfg}/*
%{_prefix}/modules/*


%changelog
* Wed Jun 03 2015 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-20150611
- integrated with integration-server
* Mon May 12 2014 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-20140512
- modified category name and module config according to O/R schema relationships
* Tue Mar 03 2014 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-04032014
- decomissioned ganglia and moved it to ATLAS-internal-resource rpm
- upgraded Panda module
* Mon Mar 03 2014 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-03032014
- decomissioned webservice and moved it to ATLAS-webservice rpm
* Wed Dec 18 2013 Gen Kawamura <Gen.Kawamura@cern.ch> 3.0.0-18122013
- quasi-stable version

* Fri Jul 19 2013 Gen Kawamura <Gen.Kawamura@cern.ch> and Christian Wehrberger <cgwehrberger@gmail.com> 3.0.0-16072013
- initial packaging
