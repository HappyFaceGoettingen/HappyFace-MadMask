Summary: HappyFace-MadMask
Name: HappyFace-MadMask
Version: 1.0.0
Release: 20180227
License: Apache License Version 2.0
Group: System Environment/Daemons
URL: http://nagios-goegrid.gwdg.de/category
Source0: HappyFace-MadMask.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
AutoReqProv: no

#Requires: HappyFaceCore = 3.0.0-3

Requires: nodejs
Requires: npm
Requires: tmpwatch
Requires: ImageMagick
Requires: jq
Requires: sysstat
Requires: bc



######################################################################
#
#
# Preamble
#
# Macro definitions
%define _source_dir     HappyFace-MadMask

# Macro definitions
%define _prefix         /var/lib/HappyFace3
%define _etc            /etc
%define _profile_dir    /etc/profile.d
%define _datadir        /var/lib/MadMaskData
%define _logdir         /var/log/HappyFace
%define _piddir         /var/run/HappyFace
%define _sbindir        /usr/sbin


%define _category_cfg   %{_prefix}/config/categories-enabled
%define _module_cfg     %{_prefix}/config/modules-enabled
%define _category_dis_cfg   %{_prefix}/config/categories-disabled
%define _module_dis_cfg     %{_prefix}/config/modules-disabled


%define happyface_uid	373
%define happyface_user	happyface3
%define happyface_gid	373
%define happyface_group	happyface3


%description
HappyFace-MadMask is wrapper modules for both HappyFace mobile application and Ionic server interface over HappyFace instance. The HappyFace system and HappyFace-MadMask modules enable user to use mobile application and meta-browsing/data analysis/smart administration for a local systemand Grid computing site.


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
! [ -d $RPM_BUILD_ROOT/%{_logdir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_logdir}
! [ -d $RPM_BUILD_ROOT/%{_piddir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_piddir}
! [ -d $RPM_BUILD_ROOT/%{_sbindir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_sbindir}


# copy MadMask modules
cp -vr %{_source_dir}/MadModules/modules $RPM_BUILD_ROOT/%{_prefix}
cp -vr %{_source_dir}/MadModules/config/modules-enabled/* $RPM_BUILD_ROOT/%{_module_cfg}
cp -vr %{_source_dir}/MadModules/config/categories-enabled/* $RPM_BUILD_ROOT/%{_category_cfg}



## Install MadMask (HappyFaceMobile Instance) and its service
cp -vr %{_source_dir}/HappyFaceMobile $RPM_BUILD_ROOT/%{_prefix}/MadMask
ln -s MadMask $RPM_BUILD_ROOT/%{_prefix}/HappyFaceMobile
ln -s %{_prefix}/MadMask/daemon/madmask.conf $RPM_BUILD_ROOT/%{_etc}/madmask.conf
ln -s %{_prefix}/MadMask/daemon/madmaskd $RPM_BUILD_ROOT/%{_etc}/rc.d/init.d/
ln -s %{_prefix}/MadMask/daemon/madmask-default-start $RPM_BUILD_ROOT/%{_sbindir}/
rm -v $RPM_BUILD_ROOT/%{_prefix}/MadMask/data
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_prefix}/MadMask/data


## Into static dir such as javascript, data and so on
cp -vr %{_source_dir}/MadModules/js/* $RPM_BUILD_ROOT/%{_prefix}/static
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_prefix}/static/data
ln -s %{_prefix}/MadMask/sites $RPM_BUILD_ROOT/%{_prefix}/static/sites


## For development, example data dir (taken from MadFace)
# Generating old structure
%define _madface_dir        /usr/lib/MadFace
! [ -d $RPM_BUILD_ROOT/%{_madface_dir} ] && mkdir -vp $RPM_BUILD_ROOT/%{_madface_dir}
ln -s %{_datadir} $RPM_BUILD_ROOT/%{_madface_dir}/data



%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT


%pre
service httpd stop


%post
if ! which ionic; then
    echo "Installing Ionic and Cordova modules"
    npm install -g cordova@6.0.0 bplist-parser@0.1.1
    npm install -g ionic@1.6.1
    WRONG_FILE=/usr/lib/node_modules/ionic/node_modules/ionic-app-lib/lib/config.js
    cat $WRONG_FILE | perl -pe "s/CONFIG_FILE:.*/CONFIG_FILE: \'.\/ionic\/ionic.config\',/g" > /tmp/config.js
    cp -v /tmp/config.js $WRONG_FILE
fi
which jpm || npm install -g jpm@1.0.7
which forever || npm install -g forever@0.15.2


## If HappyFace user does not exist, the create it
if ! id $happyface_user; then
    echo "Creating new user [%happyface_user] ..."
    groupadd %{happyface_group} -g %{happyface_gid}
    useradd %{happyface_user} -u %{happyface_uid} -g %{happyface_gid} -d %{_prefix} -M
fi

## Making data dir
[ ! -d %{_datadir} ] && mkdir -vp %{_datadir}


## Disabling some development modules and updating HF-DB
if rpm -q HappyFaceCore; then
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
fi


service httpd start


%preun
service httpd stop

%postun
service httpd start



%files
%defattr(-,%{happyface_user},%{happyface_group})
%{_prefix}/HappyFaceMobile
%{_prefix}/MadMask
%{_prefix}/static/*
%{_prefix}/modules/*
%{_module_cfg}/*
%{_category_cfg}/*
%{_datadir}
%{_logdir}
%{_piddir}

## Old structure
%{_madface_dir}/data


%defattr(-,root,root)
%{_etc}/*
%{_sbindir}/*



%changelog
* Tue Feb 27 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180227
- disabled a strict HappyFace dependency
* Mon Jan 15 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180115
- initial packaging
