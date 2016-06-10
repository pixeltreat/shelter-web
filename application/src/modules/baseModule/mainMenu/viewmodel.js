define(["Boiler"], function (Boiler) {
    var ViewModel = function (moduleContext) {
        var vm = kendo.observable({
            showMenu: true,

            // expand/collapse main nav
            toggleSubnav: toggleMainNavActive,

            // toggle active state for subnav
            showActiveState: toggleSubNavActive,

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

            //moduleContext.notify($ct.en.getRefreshView(), moduleContext.parentContext.currentView);


            isEmployeeOrEmployeeExpandedListClicked: false,

            employeeListClick: function (e) {

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

                if (!vm.isEmployeeOrEmployeeExpandedListClicked) {

                    moduleContext.notify($ct.en.getLoadEmployeeHeaderInfo(), $ct.rn.getEmployeeExtendedList());
                    vm.isEmployeeOrEmployeeExpandedListClicked = true;

                } else {

                    moduleContext.notify($ct.en.getManageEmployeeExpandedClicked());
                    Boiler.UrlController.goTo($ct.rn.getEmployeeExtendedList());

                }

            },

            employeeAttendanceClick: function (e) {
                moduleContext.notify($ct.en.getEmployeeAttendenceList(), null);
                Boiler.UrlController.goTo($ct.rn.getEmployeeAttendance());
            },

            shelterStatusClick: function (e) {
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
        });
        //end of observable

        return {data: vm};
    };
    //end of ViewModel
    return ViewModel;
});

/**
 * Main nav active state toggle
 * @param  {Object} event
 */
function toggleMainNavActive(event) {
    var $ele               = $(event.currentTarget);
    var mainNavActiveClass = 'is-mainnav-active';
    var isActive           = $ele.hasClass(mainNavActiveClass);

    // if the main menu already has active class remove
    if (isActive) {
        resetMainSubNavState(mainNavActiveClass);
    } else {
        resetMainSubNavState(mainNavActiveClass);

        // add active class to current element
        $ele.addClass(mainNavActiveClass);
    }
}

/**
 * remove active class from main nav and subnav
 * @param {string} mainNavActiveClass
 */
function resetMainSubNavState(mainNavActiveClass) {
    var subNavActiveClass  = 'is-subnav-active';
    var $mainNav           = $('.app-nav__main__li');
    var $subNav            = $('.app-nav__sub__li');

    $mainNav.removeClass(mainNavActiveClass);
    $subNav.removeClass(subNavActiveClass);
}

/**
 * Subnav active state update based on clicked element
 * @param  {Object} event
 */
function toggleSubNavActive(event) {
    var $ele               = $(event.currentTarget);
    var subNavActiveClass  = 'is-subnav-active';
    var $subNavSiblings    = $ele.siblings('.'+subNavActiveClass);

    event.stopPropagation();

    // remove active class from siblings
    $subNavSiblings.removeClass(subNavActiveClass);

    // add active class to current element
    $ele.addClass(subNavActiveClass);
}
