define(["Boiler"], function (Boiler) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable(
        {


            showMenu: true,

            setHideMenu: function () {

                vm.set("showMenu", false);

            },

             

            showHideMenuWithPullRightClass: function () {

                if (vm.get("showMenu")) {
                    return $ct.styles.getDisplayInlineBlockClass() + " pull-right";
                }
                else {
                    return $ct.styles.getDisplayNoneImportantClass();
                }
            },

            showHideMenuClass: function () {

                if (vm.get("showMenu")) {
                    return $ct.styles.getDisplayInlineBlockClass();
                }
                else {
                    return $ct.styles.getDisplayNoneImportantClass();
                }
            },

            //CODE TO ENABLE INDIVIDUAL FOOTER ITEMS
            /*
            showDataCell: false,

            setShowDataCell: function () {

                vm.set("showDataCell", true);

            },

            showDataCellItem: function () {

                if (vm.get("showDataCell")) {
                    return $ct.styles.getDisplayInlineBlockClass();
                }
                else {
                    return $ct.styles.getDisplayNoneImportantClass();
                }
            },


            showPatientTracking : false,

            setShowPatientTracking: function () {

                vm.set("showPatientTracking", true);

            },

            showPatientTrackingItem: function () {

                if (vm.get("showPatientTracking")) {
                    return $ct.styles.getDisplayInlineBlockClass();
                }
                else {
                    return $ct.styles.getDisplayNoneImportantClass();
                }
            },


            showDashBoard: false,

            setShowDashboard: function () {

                vm.set("showDashBoard", true);

            },


            showDashboardMenuItem: function () {

                if (vm.get("showDashBoard")) {
                    return $ct.styles.getDisplayInlineBlockClass();
                    
                }
                else {
                    return $ct.styles.getDisplayNoneImportantClass();
                }
            },

            */



            /*
            //dashboard click
            dashBoardClick: function (e) {

                if (!this.showMenu)
                    return;
                //for development purpose

                moduleContext.notify($ct.en.getGoToDashboard());
            },


            patientTrackingClick: function (e) {

//                //Redirecting to third party patient tracking application for hospital facility type.
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

            homeClick: function (e) {

                if (!this.showMenu)
                    return;

                moduleContext.notify($ct.en.getGoToHome());

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
