define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {
    var ViewModel = function (moduleContext) {
        var vm = kendo.observable({

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel, $ct.ht.getHelp());
            },


            initializeSecurity: function () {

                var data = $ct.ds.common.getUserIdentityData(function (result) {


                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {

                        $ct.security.authenticationFailedAction();
                        return;

                    }


                    if (result.Data == undefined) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (result.Data.UserIdentity == undefined) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (result.Data.UserIdentity.IsAuthenticated == undefined) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (result.Data.UserIdentity.Roles == undefined) {

                        //Donot have permission
                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    if (!result.Data.UserIdentity.IsAuthenticated) {

                        $ct.security.authenticationFailedAction();
                        return;
                    }

                    $ct.security.setUserIdentity(result.Data.UserIdentity);

                    $ct.security.setRoles();

                    //security object is available from here onwords

                    moduleContext.notify($ct.en.getUpdateSecuritySettings(), null);

                   // vm.setMenuPermissions();

                    if (!$ct.security.isValidRole()) {

                        //Donot have permission
                        $ct.security.authenticationFailedAction();
                        return;

                    }


                    //checking whether currently logged in user is associated to facilties or not
                    var data = $ct.ds.shlt.shelter.getShelters(function (result) {

                        var errorObj = $ct.mt.getErrorObject(result);
                        if (errorObj != null) {

                            vm.set("isFacilitiesAssociatedToUser", false);
                            Boiler.UrlController.goTo($ct.rn.getNoFacilitiesFound());
                            return;

                        }

                        if ($ct.mt.isNoDataFound(result)) {

                            vm.set("isFacilitiesAssociatedToUser", false);
                            Boiler.UrlController.goTo($ct.rn.getNoFacilitiesFound());
                            return;

                        }
                        else {

                            vm.set("isFacilitiesAssociatedToUser", true);

                        }


                        $ct.ds.event.getActiveEvent(function (result) {

                            var errorObj = $ct.mt.getErrorObject(result);
                            if (errorObj != null) {
                                vm.set("isActiveEventPresent", false);
                            }

                            if ($ct.mt.isNoActiveEvent(result)) {
                                vm.set("isActiveEventPresent", false);
                            }


                            if (result.Data.ActiveEvent == null) {
                                vm.set("isActiveEventPresent", false);
                            }
                            else {
                                vm.set("isActiveEventPresent", true);
                            }


                            vm.setMenuPermissions();
                            vm.goToHome();



                        });



                    });

                     


                });

            },

            goToHome: function () {

                if (!$ct.security.isValidRole())
                    return;

                if (!vm.isFacilitiesAssociatedToUser)
                {
                   
                    Boiler.UrlController.goTo($ct.rn.getNoFacilitiesFound());
                    return;
                }

                if ($ct.security.isFacilityReadOnlyRole() ) {

                    vm.sheltereeReportClick();

                }
                else if (vm.isActiveEventPresent) {

                    vm.sheltereeMedicalUpdateListClick();

                }
                else {

                    Boiler.UrlController.goTo($ct.rn.getNoActiveEvent());

                }

            },

            userFullName : "",
            showAdmin: false,
            showStaffAndShelteree: false,
            showReports: false,
            showRefresh: false,

            isActiveEventPresent: false,
            isFacilitiesAssociatedToUser : false,


            setMenuPermissions: function () {

                vm.set("userFullName", "Hi, " + $ct.security.getUserName());

                if ($ct.security.isSuperAdminRole())
                {
                    vm.set("showAdmin", true);
                    vm.set("showStaffAndShelteree", true);
                    vm.set("showReports", true);
                    vm.set("showRefresh", true);
                    vm.showAlerts();
                }

                if ($ct.security.isAdminRole()) {
                    vm.set("showAdmin", true);
                    vm.set("showStaffAndShelteree", true);
                    vm.set("showReports", true);
                    vm.set("showRefresh", true);
                    vm.showAlerts();
                }

                if ($ct.security.isFacilityUpdateRole()) {
                    vm.set("showAdmin", false);
                    vm.set("showStaffAndShelteree", true);
                    vm.set("showReports", true);
                    vm.set("showRefresh", true);
                    vm.showAlerts();
                }

                if ($ct.security.isFacilityReadOnlyRole()) {
                    vm.set("showAdmin", false);
                    vm.set("showStaffAndShelteree", false);
                    vm.set("showReports", true);
                    vm.set("showRefresh", true);
                }

                if ((!$ct.security.isValidRole()) || (!vm.get("isFacilitiesAssociatedToUser"))) {
                    vm.set("showAdmin", false);
                    vm.set("showStaffAndShelteree", false);
                    vm.set("showReports", false);
                    vm.set("showRefresh", false);
                }
                
                if(!vm.get("isActiveEventPresent"))
                {

                    vm.set("showStaffAndShelteree", false);
                 }

            },

            showAlerts: function () {

                if (vm.isActiveEventPresent) {
                    var alerts = $("#idxAlerts").removeAttr("hidden");
                    moduleContext.notify($ct.en.getActiveEventPresent());
                }

            },

            // expand/collapse main nav
            //toggleSubnav: toggleMainNavActive,

            // toggle active state for subnav
            //showActiveState: toggleSubNavActive,

            homeClick: function (e) {

                if (!$ct.security.isValidRole())
                    return;

                vm.goToHome();

            },

            refreshClick: function (e) {

                vm.collapseMenu(e);

                if (moduleContext.parentContext.currentView != undefined) {
                    moduleContext.notify($ct.en.getRefreshView(), moduleContext.parentContext.currentView);
                }
                else {
                    //for development purpose
                    $ct.helpers.displayAlertWindow("Current view not set");
                }
            },

            transportTypeListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayTransportTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getTransportTypeList());
            },

            agencyListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayAgencyList(), null);
                Boiler.UrlController.goTo($ct.rn.getAgencyList());
            },

            departmentListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayDepartmentList(), null);
                Boiler.UrlController.goTo($ct.rn.getDepartmentList());
            },

            medicalConditionListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayMedicalConditionList(), null);
                Boiler.UrlController.goTo($ct.rn.getMedicalConditionList());
            },

            medicalConditionTierListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayMedicalConditionTierList(), null);
                Boiler.UrlController.goTo($ct.rn.getMedicalConditionTierList());
            },

            shelterTypeListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayShelterTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getShelterTypeList());
            },

            sheltreeEmployeeRatioListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplaySheltreeEmployeeRatioList(), null);
                Boiler.UrlController.goTo($ct.rn.getSheltreeEmployeeRatioList());
            },

            staffSpecialtyListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayStaffSpecialtyList(), null);
                Boiler.UrlController.goTo($ct.rn.getStaffSpecialtyList());
            },

            stafftypeListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayStaffTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getStaffTypeList());
            },

            dispositionListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayDispositionList(), null);
                Boiler.UrlController.goTo($ct.rn.getDispositionList());
            },

            equipmentSupplyListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayEquipmentSupplyList(), null);
                Boiler.UrlController.goTo($ct.rn.getequipmentSupplyList());
            },
            shelterIdentificationListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayShelterIdentificationList(), null);
                Boiler.UrlController.goTo($ct.rn.getshelterIdentificationList());
            },
            questionListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayquestionList(), null);
                Boiler.UrlController.goTo($ct.rn.getQuestionList());
            },
            //moduleContext.notify($ct.en.getRefreshView(), moduleContext.parentContext.currentView);


            isEmployeeOrEmployeeExpandedListClicked: false,

            employeeListClick: function (e) {

                vm.collapseMenu(e);

                if (!vm.isEmployeeOrEmployeeExpandedListClicked) {

                    moduleContext.notify($ct.en.getLoadEmployeeHeaderInfo(), $ct.rn.getEmployeeList());
                    vm.isEmployeeOrEmployeeExpandedListClicked = true;

                } else {

                    //moduleContext.notify($ct.en.getEmployeeMenuItemClicked());
                    //Boiler.UrlController.goTo($ct.rn.getEmployeeList());

                    moduleContext.notify($ct.en.getManageEmployeeClicked());
                    Boiler.UrlController.goTo($ct.rn.getEmployeeList());

                }

            },

            employeeExpandedListClick: function (e) {

                vm.collapseMenu(e);

                if (!vm.isEmployeeOrEmployeeExpandedListClicked) {

                    moduleContext.notify($ct.en.getLoadEmployeeHeaderInfo(), $ct.rn.getEmployeeExtendedList());
                    vm.isEmployeeOrEmployeeExpandedListClicked = true;

                } else {

                    moduleContext.notify($ct.en.getManageEmployeeExpandedClicked());
                    Boiler.UrlController.goTo($ct.rn.getEmployeeExtendedList());

                }

            },

            downloadEmployeeTemplateClick:function (e) {

                vm.collapseMenu(e);

                    moduleContext.notify($ct.en.getHideErrorMsg());
                    $ct.helpers.displayWorkAreaBusyCursor();

                    $ct.ds.emp.employee.downloadEmployeeTemplate(function (result) {

                        $ct.helpers.hideWorkAreaBusyCursor();


                        if (result.Data.DownloadUrl != undefined) {

                            window.location.href = result.Data.DownloadUrl;

                        }
                        else {

                            var errorObj = $ct.mt.getErrorObject(result);
                            if (errorObj != null) {
                                moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                            }

                        }

                    });


            },

            uploadEmployeeDataClick: function (e) {

                vm.collapseMenu(e);

               // moduleContext.notify($ct.en.getEmployeeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getUploadEmployee());
            },


            downloadEmployeeDataClick: function (e) {

                vm.collapseMenu(e);

               // moduleContext.notify($ct.en.getEmployeeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getDownloadEmployee());
            },


            isSheltereeOrDischargeOrMedicalUpdateListClicked: false,

            sheltereeListClick: function (e) {

                vm.collapseMenu(e);

                if (!vm.isSheltereeOrDischargeOrMedicalUpdateListClicked) {

                    moduleContext.notify($ct.en.getLoadSheltereeHeaderInfo(), $ct.rn.getSheltereeList());
                    vm.isSheltereeOrDischargeOrMedicalUpdateListClicked = true;

                } else {

                    moduleContext.notify($ct.en.getManageSheltereeClicked());
                    Boiler.UrlController.goTo($ct.rn.getSheltereeList());

                }

            },

            sheltereeDischargeListClick: function (e) {

                vm.collapseMenu(e);

                if (!vm.isSheltereeOrDischargeOrMedicalUpdateListClicked) {

                    moduleContext.notify($ct.en.getLoadSheltereeHeaderInfo(), $ct.rn.getSheltereeDischargeList());
                    vm.isSheltereeOrDischargeOrMedicalUpdateListClicked = true;

                } else {

                    moduleContext.notify($ct.en.getManageSheltereeDischargeClicked());
                    Boiler.UrlController.goTo($ct.rn.getSheltereeDischargeList());

                }

            },

            sheltereeMedicalUpdateListClick: function (e) {

                vm.collapseMenu(e);

                if (!vm.isSheltereeOrDischargeOrMedicalUpdateListClicked) {

                    moduleContext.notify($ct.en.getLoadSheltereeHeaderInfo(), $ct.rn.getSheltereeMedicalUpdateList());
                    vm.isSheltereeOrDischargeOrMedicalUpdateListClicked = true;

                } else {

                    moduleContext.notify($ct.en.getManageSheltereeMedicalUpdateClicked());
                    Boiler.UrlController.goTo($ct.rn.getSheltereeMedicalUpdateList());

                }

            },


            downloadSheltereeTemplateClick: function (e) {

                vm.collapseMenu(e);

                    moduleContext.notify($ct.en.getHideErrorMsg());
                    $ct.helpers.displayWorkAreaBusyCursor();

                    $ct.ds.sheltree.sheltree.downloadSheltereeTemplate(function (result) {

                        $ct.helpers.hideWorkAreaBusyCursor();


                        if (result.Data.DownloadUrl != undefined) {

                            window.location.href = result.Data.DownloadUrl;

                        }
                        else {

                            var errorObj = $ct.mt.getErrorObject(result);
                            if (errorObj != null) {
                                moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                            }

                        }

                    });



            },


            uploadSheltereeDataClick: function (e) {

                vm.collapseMenu(e);

                //moduleContext.notify($ct.en.getSheltereeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getUploadShelteree());
            },


            downloadSheltereeDataClick: function (e) {

                vm.collapseMenu(e);

                //moduleContext.notify($ct.en.getSheltereeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getDownloadShelteree());
            },


            employeeAttendanceClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getEmployeeAttendenceList(), null);
                Boiler.UrlController.goTo($ct.rn.getEmployeeAttendance());
            },

            shelterStatusClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getShelterStatus());
            },

            eventListClick: function (e) {

                vm.collapseMenu(e);

                moduleContext.notify($ct.en.getDisplayEventList(), null);
                Boiler.UrlController.goTo($ct.rn.getEventList());
            },

            staffReportClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getStaffRawDataReport());
            },

            staffAttendanceReportClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getStaffAttendanceRawDataReport());
            },
            sheltereeReportClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getSheltereeRawDataReport());
           },


            multifacilityEmployeeAttendanceClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getMultiFacilityEmployeeAttendance());
            },

            multifacilityEmployeeExtendedClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getMultiFacilityEmployeeExtendedList());
            },

            multifacilityEmployeeClick: function (e) {

                vm.collapseMenu(e);

                Boiler.UrlController.goTo($ct.rn.getMultiFacilityEmployeeList());
            },

            logOutClick: function (e) {

                $(document).ajaxError(null);

                window.location.href = "logOut.aspx";

            },

            collapseMenu: function (e) {
                // check if tablet or below and touch device
                if (mediaQuery.is('TABLET') && device.has('touch')) {
                    $('html').removeClass('has-nav-expanded');
                }
            }

        });
        //end of observable

        return {data: vm};
    };
    //end of ViewModel
    return ViewModel;
});
