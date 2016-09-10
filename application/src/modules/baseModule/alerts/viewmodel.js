define(["Boiler"], function (Boiler) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({

            showAlerts: false,
            activeEventPresent: false,

            isActiveEventPresent: function () {
                
                vm.set("activeEventPresent", true);
            },

            alertsData: [],

            alertButtonClicked: function () {

                //if (vm.get("showAlerts"))
                //{
                //    vm.set("showAlerts", false);
                //    return;
                //}

                vm.set("showAlerts", false);

            $ct.ds.common.getAlertsData(function (result) {
             
                var errorObj = $ct.mt.getErrorObject(result);
                if (errorObj != null) {

                    moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    return;

                }

                var resultData = result.Data;
               
                if (resultData != null) {
                    vm.set("alertsData", resultData);                                
                }
                else
                {
                    vm.set("alertsData", []);
                }

                vm.set("showAlerts", true);

                });

            },


        });
        //end of observable

        return {
            data: vm
        };

    };
    //end of ViewModel

    return ViewModel;
});
