define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "ShelterStatus  page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            selectedEventItem: {},

            dsEventNames: [],

            isRecordsPresentForShelterStatusExport: false,
            initialLoad: true,

            initializeEvents: function () {

                $ct.helpers.displayWorkAreaBusyCursor();
               
                var data = $ct.ds.shlt.shelter.getEvents(function (result) {
                    
                    $ct.helpers.hideWorkAreaBusyCursor();

                    var resultData = result.Data;

                    if (resultData !== undefined && resultData !== null && resultData.length > 0) {

                        vm.set("dsEventNames", resultData);
                        vm.set("selectedEventItem", resultData[0]);
                    }

                });

            },

            dsShelterStatus: function () {


                if (this.initialLoad) {
                    $ct.helpers.displayWorkAreaBusyCursor();
                }

                this.fillGrid();

                if (this.initialLoad) {
                    this.initialLoad = false;
                    $ct.helpers.hideWorkAreaBusyCursor();
                }

            },

            fillGrid: function () {



                var gridObj = $("#vwsstDgShelterStatus").data("kendoGrid");
                if ((gridObj != undefined) && (gridObj != null))
                    gridObj.content.scrollLeft("0");

                this.set("dsShelterStatus", $ct.ds.shlt.shelter.getShelterStatus(this, function (result) {

                    if (
                    ($ct.mt.isNoDataFound(result))
                    ||
                    ($ct.mt.getErrorObject(result) != null)

                    ) {
                        vm.set("isRecordsPresentForShelterStatusExport", false);
                    }
                    else {
                        vm.set("isRecordsPresentForShelterStatusExport", true);
                    }

                    $(".k-loading-mask").remove();

                }));


                // this.set("dsShelterStatus", $ct.ds.shlt.shelter.getShelterStatus(this));

            },

            refreshShelterStatusGrid: function (e) {
                vm.dsShelterStatus.read();
            },



            btnSaveClick: function (e) {

                e.data.set("saveClicked", true);

                if (
                        !e.data.hideOpenDateValidation() ||
                        !e.data.hideClosedDateValidation() ||
                        !e.data.hideOpenClosedDateValidation()
                    ) {

                    return;
                }

                var saveShelterStatusData = e.data.toJSON();

                var openDate = new Date(saveShelterStatusData.OpenDate);
                saveShelterStatusData.OpenDate = kendo.toString(new Date(openDate), "yyyy-MM-ddTHH:mm:ss");

                var closedDate = new Date(saveShelterStatusData.ClosedDate);
                saveShelterStatusData.ClosedDate = kendo.toString(new Date(closedDate), "yyyy-MM-ddTHH:mm:ss");



                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.shlt.shelter.saveShelterStatus(saveShelterStatusData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {

                            vm.dsShelterStatus.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getShelterStatusSuccessMsg());
                    }

                    vm.dsShelterStatus.read();

                })

            },

            btnExportToExcelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.shlt.shelter.exportShelterStatusToExcel(this, function (result) {

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

                })

            }
        });



        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
