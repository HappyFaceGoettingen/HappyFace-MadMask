Summary: HappyFace-MadModules-Rlibs: R libraries used to analyze HappyFace MadModules data
Name: HappyFace-MadModules-Rlibs
Version: 1.0.0
Release: 20180408
License: Apache License Version 2.0
Group: Applications/Engineering
URL: https://ekptrac.physik.uni-karlsruhe.de/trac/HappyFace
Source0: rpackages.zip
BuildRoot: %{_tmppath}/%{name}-%{version}-root
AutoReqProv: no

Requires: R <= 3.4.1
BuildRequires: R-core <= 3.4.1
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
%setup -q -n rpackages -b 0

%build

%install
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT
[ ! -d $RPM_BUILD_ROOT/%{_Rlibdir} ] && mkdir -p $RPM_BUILD_ROOT/%{_Rlibdir}

## R library
for p in $(cat packages.txt)
do
	echo "Compiling [$p] ..."
	/usr/bin/R CMD INSTALL -c -l $RPM_BUILD_ROOT/%{_Rlibdir} $p
done



%clean
[ "$RPM_BUILD_ROOT" != "/" ] && rm -rf $RPM_BUILD_ROOT



%files
%defattr(-,root,root)
%{_Rlibdir}/*

%changelog
* Sun Apr 08 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 1.0.0-20180408
- Only R libraries used by HappyFace-MadModues is writted here
* Fri Mar 16 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 0.2.0-20180316
- Upgraded a builder. The all build processes are faster.
* Wed Jan 24 2018 Gen Kawamura <Gen.Kawamura@cern.ch> 0.1.0-1
- Initial packaging

