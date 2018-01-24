Summary: MadMask-R-libs
Name: MadMask-R-libs
Version: 0.1.0
Release: 1
License: GPL
Group: Applications/Engineering
URL: http://goegrid-controller.ph2.physik.uni-goettingen.de:8111
#Source0: ftp://rpm.org/%{name}_%{version}.source.tar.gz
Source0: %{name}.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
AutoReqProv: no

Requires: R >= 3.3.0
BuildRequires: R-core >= 3.3.0
BuildRequires: fftw-devel
BuildRequires: fftw2-devel
BuildRequires: libjpeg-turbo
BuildRequires: libjpeg-turbo-devel


######################################################################
#
#
# Preamble
#
# Macro definitions
%define _Rlibdir        /usr/lib64/R/library



%description
MadMask R libraries


%prep
%setup -q -b 0 -n %{name}

%build

%install
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT
[ ! -d $RPM_BUILD_ROOT/%{_Rlibdir} ] && mkdir -p $RPM_BUILD_ROOT/%{_Rlibdir}
cd ..

## R library
for p in $(cat MadMask-R-libs/packages/packages.txt)
do
	echo "Compiling [$p] ..."
	/usr/bin/R CMD INSTALL -c -l $RPM_BUILD_ROOT/%{_Rlibdir} MadMask-R-libs/packages/$p
done



%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT



%files
%defattr(-,root,root)
%{_Rlibdir}/*

%changelog
* Wed Jan 24 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 0.1.0-1
- initial packaging

