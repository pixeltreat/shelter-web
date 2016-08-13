define(["Boiler"], function (Boiler) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable(
        {

            //Start of shelter type and shelter names dropdowns code

            selectedShelterNameItem: {},

            previousShelterName: "",


            //To hide shelter header on shelter dashboard and dashboard visualization page
            // shelter header depends on whether logged in user is associated to single facility or multi facility 
            hideShelterHeader: true,
            //For multi shelter user display dropdownlists and for single shelter user display labels.
            isMultiShelterUser: true,

            isGoButtonDisabled: true,

            eventdata: {},

            //For multi shelter user display dropdownlists
            showDDLsInShelterHeader: function () {

                //initially to hide ddls section
                if (vm.get("hideShelterHeader")) {
                    return $ct.styles.getNoneStyle();
                }

                if (vm.get("isMultiShelterUser")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }
            },

            //For single shelter user display labels.
            showLabelsInShelterHeader: function () {

                //initially to hide labels section
                if (vm.get("hideShelterHeader")) {
                    return $ct.styles.getNoneStyle();
                }

                if (!vm.get("isMultiShelterUser")) {
                    return $ct.styles.getBlockStyle();
                }
                else {
                    return $ct.styles.getNoneStyle();
                }

            },

            //loads shelter types, and shelter names
            initializeEmployeeHeader: function (viewName) {

                vm.set("isMultiShelterUser", $ct.security.isMultiFacilityUser());

               // vm.populateShelterNames();
                vm.fillShelters(viewName);
            },
         //populateShelterNames: function (e) {

         //       vm.fillShelters();

         //   },

            dsShelterNames: function () {
                //this.fillShelters();
            },

            isIntialLoad: true,

            fillShelters: function (viewName) {

                vm.set("isGoButtonDisabled", true);

                var data = $ct.ds.shlt.shelter.getSheltersWithSecurityForActiveEventWithDs(function (result) {

                    //$ct.helpers.hidePageBusyCursor();

                    if (result !== undefined && result !== null && result.length > 0) {

                        vm.set("isGoButtonDisabled", false);

                        vm.set("selectedShelterNameItem", result[0]);
                        
                        $ct.ds.event.getActiveEvent(function(result) {

                            $ct.helpers.hidePageBusyCursor();
                            $ct.helpers.hideWorkAreaBusyCursor();

                            var resultData = result.Data.ActiveEvent;
                            vm.set("eventdata", resultData);
                        });

                        if (vm.isIntialLoad == true) {

                            //Turning off page level cursor dispalyed at starting point of the application.
                            $ct.helpers.hidePageBusyCursor();

                            vm.set("hideShelterHeader", false);

                            vm.set("isIntialLoad", false);

                            vm.setPreviouslySelectedShelterTypeAndShelterNameToCurrent();
                            vm.setEmployeeHeaderDataToGlobalContext();

                            if (viewName == $ct.rn.getEmployeeList()) {
                                Boiler.UrlController.goTo($ct.rn.getEmployeeList());
                            }
                            else if (viewName == $ct.rn.getEmployeeExtendedList()) {
                                Boiler.UrlController.goTo($ct.rn.getEmployeeExtendedList());
                            }
                            else {
                                alert("Error in employee header : Not a valid view ");
                            }
                            
                        }

                    }
                });
                this.set("dsShelterNames", data);

            },




            ddlShelterChange: function (e) {

                //vm.fillGrid();

                //$ct.helpers.displayWorkAreaBusyCursor();

                // $ct.ds.event.getActiveEvent( function (result) {

                //    $ct.helpers.hidePageBusyCursor();
                //    $ct.helpers.hideWorkAreaBusyCursor();

                //    var resultData = result.Data.ActiveEvent;
                //    vm.set("eventdata", resultData);

                    vm.setPreviouslySelectedShelterTypeAndShelterNameToCurrent();
                    vm.setEmployeeHeaderDataToGlobalContext();

                    if (moduleContext.parentContext.activeForm == $ct.rn.getEmployeeList()) {
                        moduleContext.notify($ct.en.getEmployeeHeaderDataChanged(), $ct.rn.getEmployeeList());
                    }

                    if (moduleContext.parentContext.activeForm == $ct.rn.getEmployeeExtendedList()) {
                        moduleContext.notify($ct.en.getEmployeeHeaderDataChanged(), $ct.rn.getEmployeeExtendedList());
                    }


              //  });

            },

            //End of shelter type and shelter names dropdowns code


            //Goto manage employees with new shelter in case it is changed, when comming back to employee tracking module
            //not first time
            goToManageEmployees: function () {

                this.setPreviouslySelectedShelterTypeAndShelterNameToCurrent();
                this.setEmployeeHeaderDataToGlobalContext();

                moduleContext.notify($ct.en.getEmployeeHeaderDataChanged(), $ct.rn.getEmployeeList());
            },

            setPreviouslySelectedShelterTypeAndShelterNameToCurrent: function () {

                vm.set("previousShelterName", vm.selectedShelterNameItem.Name);

            },

            setEmployeeHeaderDataToGlobalContext: function () {

                var empHeaderData = {};

                //empHeaderData.facilityType = vm.selectedFacilityTypeItem;
                empHeaderData.shelter = vm.selectedShelterNameItem;
                moduleContext.parentContext.empHeaderData = empHeaderData;

            },

            //END of shelter type, and shelter names dropdowns code


            intialize: function () {
                moduleContext.parentContext.empRequestData = vm.get("empRequestData");
            },

            selectedItemsCount: 0,

            empRequestData: kendo.observable({
                ViewAll: true,
                FetchSelectedOnly: false,
                SelectedEmployeeIds: new kendo.data.ObservableArray([]),
                UnSelectedEmployeeIds: new kendo.data.ObservableArray([]),
                SelectedIdsCount: 0,
                OrigSelectedIdsCount: 0,
                OrigCurPageSelectedIdsCount: 0
            }),

            

            btnManageEmployeeClick: function (e) {

                
                moduleContext.notify($ct.en.getManageEmployeeClicked());

                Boiler.UrlController.goTo($ct.rn.getEmployeeList());
            },

            btnManageEmployeeExpandedClick: function (e) {

                
                moduleContext.notify($ct.en.getManageEmployeeExpandedClicked());

                Boiler.UrlController.goTo($ct.rn.getEmployeeExtendedList());
            }

            //,
       
            //btnUploadEmployeeDataClick: function (e) {
                
            //    moduleContext.notify($ct.en.getEmployeeCreatedOrUpdated());
            //    Boiler.UrlController.goTo($ct.rn.getUploadEmployee());
            //},


            //btnDownloadEmployeeDataClick: function (e) {
               
            //    moduleContext.notify($ct.en.getEmployeeCreatedOrUpdated());
            //    Boiler.UrlController.goTo($ct.rn.getDownloadEmployee());
            //},

            //btnDownloadEmployeeTemplateClick: function () {
            //    window.location.href = $ct.other.getEmployeeTemplateURL();
            //}
            

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
