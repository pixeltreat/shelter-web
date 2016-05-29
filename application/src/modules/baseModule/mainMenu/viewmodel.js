define(["Boiler"], function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            showMenu: true,

            // expand/collapse main nav
            toggleSubnav: toggleSubnavView,

            // toggle active state for subnav
            showActiveState: toggleSubnavView,
            
            // setHideMenu: function () {
            //     vm.set("showMenu", false);
            // },
            //
            // showHideMenuStyle: function () {
            //     if (vm.get("showMenu")) {
            //         return $ct.styles.getBlockStyle();
            //     }
            //     else {
            //         return $ct.styles.getNoneStyle();
            //     }
            // },


            //CODE TO ENABLE INDIVIDUAL MENU ITEMS

            /*

            showAdmin: false,

            setShowAdmin: function () {

                vm.set("showAdmin", true);

            },

            showAdminMenuItem: function () {

                if (vm.get("showAdmin")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }
            },

            showDataCell: false,

            setShowDataCell: function () {

                vm.set("showDataCell", true);

            },

            showDataCellItem: function () {

                if (vm.get("showDataCell")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }
            },


            showPatientTracking: false,

            setShowPatientTracking: function () {

                vm.set("showPatientTracking", true);

            },

            showPatientTrackingItem: function () {

                if (vm.get("showPatientTracking")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }
            },


            showDashBoard: false,

            setShowDashboard: function () {

                vm.set("showDashBoard", true);

            },

            showDashboardMenuItem: function () {

                if (vm.get("showDashBoard")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }
            },

            */


            homeClick: function (e) {

                if (!this.showMenu)
                    return;

                moduleContext.notify($ct.en.getGoToHome());

                //Uncommnet below line and comment above line to have old behavior.
                //moduleContext.notify($ct.en.getGoToDashboard());

            },

            transportTypeListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayTransportTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getTransportTypeList());

            },

            agencyListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayAgencyList(), null);
                Boiler.UrlController.goTo($ct.rn.getAgencyList());

            },

            departmentListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayDepartmentList(), null);
                Boiler.UrlController.goTo($ct.rn.getDepartmentList());

            },

            medicalConditionListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayMedicalConditionList(), null);
                Boiler.UrlController.goTo($ct.rn.getMedicalConditionList());

            },

            medicalConditionTierListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayMedicalConditionTierList(), null);
                Boiler.UrlController.goTo($ct.rn.getMedicalConditionTierList());

            },

            shelterTypeListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayShelterTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getShelterTypeList());

            },

            sheltreeEmployeeRatioListClick: function (e) {

                moduleContext.notify($ct.en.getDisplaySheltreeEmployeeRatioList(), null);
                Boiler.UrlController.goTo($ct.rn.getSheltreeEmployeeRatioList());

            },

            staffSpecialtyListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayStaffSpecialtyList(), null);
                Boiler.UrlController.goTo($ct.rn.getStaffSpecialtyList());

            },

            stafftypeListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayStaffTypeList(), null);
                Boiler.UrlController.goTo($ct.rn.getStaffTypeList());

            },
            dispositionListClick: function (e) {

                moduleContext.notify($ct.en.getDisplayDispositionList(), null);
                Boiler.UrlController.goTo($ct.rn.getDispositionList());

            },
            equipmentSupplyListClick: function (e) {


                Boiler.UrlController.goTo($ct.rn.getequipmentSupplyList());

            },
            shelterIdentificationListClick: function (e) {


                Boiler.UrlController.goTo($ct.rn.getshelterIdentificationList());

            },



            isEmployeListClicked: false,
            employeeListClick: function (e) {

                if (!vm.isEmployeListClicked) {
                    moduleContext.notify($ct.en.getLoadEmployeeHeaderInfo());
                    vm.isEmployeListClicked = true;
                }
                else {
                    moduleContext.notify($ct.en.getEmployeeMenuItemClicked());
                    Boiler.UrlController.goTo($ct.rn.getEmployeeList());
                }

            },

            employeeAttendanceClick:function (e) {

                moduleContext.notify($ct.en.getEmployeeAttendenceList(), null);
                Boiler.UrlController.goTo($ct.rn.getEmployeeAttendance());
            },

            shelterStatusClick:function (e) {

                Boiler.UrlController.goTo($ct.rn.getShelterStatus());
            },
            multifacilityEmployeeAttendanceClick: function (e) {

                Boiler.UrlController.goTo($ct.rn.getMultiFacilityEmployeeAttendance());
            },

            multifacilityEmployeeExtendedClick: function (e) {

                Boiler.UrlController.goTo($ct.rn.getMultiFacilityEmployeeExtendedList());
            },
            multifacilityEmployeeClick: function (e) {

                Boiler.UrlController.goTo($ct.rn.getMultiFacilityEmployeeList());
            }


            /*
            dashboardClick: function (e) {

                if (!this.showMenu)
                    return;
                //for development purpose
                moduleContext.notify($ct.en.getGoToDashboard());

            },

            patientTrackingClick: function (e) {

               //Redirecting to third party patient tracking application for hospital facility type.
                if (moduleContext.parentContext.currentFacilityTypeId != undefined) {
                    if (moduleContext.parentContext.currentFacilityTypeId == $ct.facilitytypes.getHospitalFacTypeId()) {

                        window.open($ct.other.getHospitalURL(), "_blank");
                        return;
                    }
                }

                moduleContext.notify($ct.en.getManagePatientsList());
                Boiler.UrlController.goTo($ct.rn.getManagePatients());

            },

            dataCellClick: function (e) {

                moduleContext.notify($ct.en.getGoToDataCell());

            }
            */

        }
        );
        //end of observable

        return {
            data: vm
        };

    };
    //end of ViewModel

    return ViewModel;
});

/**
 * toogle subnav on click
 * @param  {Object} event
 */
function toggleSubnavView(event) {
    // prevent event bubbling
    event.stopPropagation();

    var $ele        = $(event.currentTarget);
    var $parent     = $ele.parent();
    var activeClass = getActiveClass($ele);
    var hasClass    = $ele.hasClass(activeClass);

    // check if class exisit, if yes, just remove
    if(hasClass) {
        $ele.removeClass(activeClass);
    } else {
        // remove active class from siblings
        $parent.children().removeClass(activeClass);

        // set active class
        $ele.addClass(activeClass);
    }
}

/**
 * return which class to add/remove based on the nav depth
 * @param  {object} $ele
 * @return {string} class name
 */
function getActiveClass($ele) {
    var mainNav = $ele.hasClass('app-nav__main__li');
    var subNav  = $ele.hasClass('app-nav__sub__li');

    // check if it is main nav element or subnav
    if(mainNav){
        return 'is-mainnav-active';
    } else if(subNav) {
        return 'is-subnav-active';
    }
}
