define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Download Employee  page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },



            dsShelters: [],


            selectedShelterItem: {},

            initializeShelters: function () {

                $ct.helpers.displayWorkAreaBusyCursor();

                var data = $ct.ds.shlt.shelter.getShelters(function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    var resultData = result.Data;

                    if (resultData !== undefined && resultData !== null && resultData.length > 0) {

                        vm.set("dsShelters", resultData);
                        vm.set("selectedShelterItem", resultData[0]);
                    }

                });

            },



            btnDownloadEmployeeDataClick: function (e) {


                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.emp.employee.downloadEmployeeToExcel(this, function (result) {

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

            }


        });



        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
