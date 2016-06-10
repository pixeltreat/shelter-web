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
            initializeSheltereeHeader: function () {

                vm.set("isMultiShelterUser", $ct.security.isMultiFacilityUser());

                vm.populateShelterNames();

            },
         populateShelterNames: function (e) {

                vm.fillShelters();

            },

            dsShelterNames: function () {
                //this.fillShelters();
            },

            isIntialLoad: true,

            fillShelters: function () {

                vm.set("isGoButtonDisabled", true);

                var data = $ct.ds.shlt.shelter.getSheltersWithDs(function (result) {

                    $ct.helpers.hidePageBusyCursor();

                    if (result !== undefined && result !== null && result.length > 0) {

                        vm.set("isGoButtonDisabled", false);

                        vm.set("selectedShelterNameItem", result[0]);

                        if (vm.isIntialLoad == true) {

                            //Turning off page level cursor dispalyed at starting point of the application.
                            $ct.helpers.hidePageBusyCursor();

                            vm.set("hideShelterHeader", false);

                            vm.set("isIntialLoad", false);

                            vm.setPreviouslySelectedShelterTypeAndShelterNameToCurrent();
                            vm.setSheltereeHeaderDataToGlobalContext();

                            Boiler.UrlController.goTo($ct.rn.getSheltereeList());

                        }

                    }
                });
                this.set("dsShelterNames", data);

            },




            ddlShelterNames: function (e) {

                //vm.fillGrid();

            },

            //End of shelter type and shelter names dropdowns code


            //Goto manage shelterees with new shelter in case it is changed, when comming back to shelteree tracking module
            //not first time
            goToManageShelterees: function () {

                this.setPreviouslySelectedShelterTypeAndShelterNameToCurrent();
                this.setSheltereeHeaderDataToGlobalContext();

                moduleContext.notify($ct.en.getSheltereeHeaderDataChanged(), $ct.rn.getSheltereeList());
            },

            btnGoClick: function (e) {

                this.setPreviouslySelectedShelterTypeAndShelterNameToCurrent();
                this.setSheltereeHeaderDataToGlobalContext();

                if (moduleContext.parentContext.activeForm == $ct.rn.getSheltereeList()) {
                    moduleContext.notify($ct.en.getSheltereeHeaderDataChanged(), $ct.rn.getSheltereeList());
                }

                if (moduleContext.parentContext.activeForm == $ct.rn.getSheltereeDischargeList()) {
                    moduleContext.notify($ct.en.getSheltereeHeaderDataChanged(), $ct.rn.getSheltereeDischargeList());
                }


                if (moduleContext.parentContext.activeForm == $ct.rn.getSheltereeMedicalUpdateList()) {
                    moduleContext.notify($ct.en.getSheltereeHeaderDataChanged(), $ct.rn.getSheltereeMedicalUpdateList());
                }
            },


            setPreviouslySelectedShelterTypeAndShelterNameToCurrent: function () {

                vm.set("previousShelterName", vm.selectedShelterNameItem.Name);

            },

            setSheltereeHeaderDataToGlobalContext: function () {

                var sheltereeHeaderData = {};

                //sheltereeHeaderData.facilityType = vm.selectedFacilityTypeItem;
                sheltereeHeaderData.shelter = vm.selectedShelterNameItem;
                moduleContext.parentContext.sheltereeHeaderData = sheltereeHeaderData;

            },

            //END of shelter type, and shelter names dropdowns code


            intialize: function () {
                moduleContext.parentContext.sheltereeRequestData = vm.get("sheltereeRequestData");
            },

            selectedItemsCount: 0,

            sheltereeRequestData: kendo.observable({
                ViewAll: true,
                FetchSelectedOnly: false,
                SelectedSheltereeIds: new kendo.data.ObservableArray([]),
                UnSelectedSheltereeIds: new kendo.data.ObservableArray([]),
                SelectedIdsCount: 0,
                OrigSelectedIdsCount: 0,
                OrigCurPageSelectedIdsCount: 0
            }),

            

            btnManageSheltereeClick: function (e) {

                this.activateCurrentMenuItem(e);
                //moduleContext.notify($ct.en.getPatientCreatedOrUpdated());
                moduleContext.notify($ct.en.getManageSheltereeClicked());

                Boiler.UrlController.goTo($ct.rn.getSheltereeList());
            },

            btnManageSheltereeDischargeClick: function (e) {

                this.activateCurrentMenuItem(e);
                //moduleContext.notify($ct.en.getPatientMedicalEquipCreatedOrUpdated());
                moduleContext.notify($ct.en.getManageSheltereeDischargeClicked());

                Boiler.UrlController.goTo($ct.rn.getSheltereeDischargeList());
            },

            btnManageSheltereeMedicalUpdateClick: function (e) {

                this.activateCurrentMenuItem(e);
                //moduleContext.notify($ct.en.getPatientMedicalEquipCreatedOrUpdated());
                moduleContext.notify($ct.en.getManageSheltereeMedicalUpdateClicked());

                Boiler.UrlController.goTo($ct.rn.getSheltereeMedicalUpdateList());
            },

       
            btnUploadSheltereeDataClick: function (e) {
                this.activateCurrentMenuItem(e);
                moduleContext.notify($ct.en.getSheltereeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getUploadShelteree());
            },


            btnDownloadSheltereeDataClick: function (e) {
                this.activateCurrentMenuItem(e);
                moduleContext.notify($ct.en.getSheltereeCreatedOrUpdated());
                Boiler.UrlController.goTo($ct.rn.getDownloadShelteree());
            },

            btnDownloadSheltereeTemplateClick: function () {
                window.location.href = $ct.other.getSheltereeTemplateURL();
            },


            activateCurrentMenuItem: function (e) {

                $(e.target.parentElement.parentElement).find(".item_nav_active").removeClass("item_nav_active");
                $(e.target.parentElement).addClass("item_nav_active");

            }
            

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
