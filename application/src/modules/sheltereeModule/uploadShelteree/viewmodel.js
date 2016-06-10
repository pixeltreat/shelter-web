define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({


            FileContentId: 0,
            FacilityId: 0,
            fileCount: 0,
            dsFacilityNames: [],
            selectedFacilityNameItem: {},

            dsImportOptions: [],
            selectedImportAction: 1,

            //TODO: Turn off busy cursor after both facility and radio button is loaded

            initialize: function () {

                $ct.helpers.displayWorkAreaBusyCursor();

                var data = $ct.ds.shlt.shelter.getShelters(function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    result = result.Data;
                    if (result !== undefined && result !== null && result.length > 0) {

                        vm.set("selectedFacilityNameItem", result[0]);

                    }

                    vm.set("dsFacilityNames", result);

                });


                var data1 = $ct.ds.sheltree.sheltree.getImportActionOptions(function (result) {
                    result = result.Data;
                    $ct.helpers.hideWorkAreaBusyCursor();

                    vm.set("dsImportOptions", result);


                });



            },


            ddlFacilityNames: function (e) {
                vm.clearData();

            },

            radiobtnClick: function (e) {
                vm.clearData();
            },

            helpClick: function (e) {
                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },


            fileProgress: function (percentage) {
                if (percentage == "") {
                    return "";
                }
                return "File Uploading..";
            },

            onUploadFile: function (e) {

                if (e.files[0].extension === ".xls" || e.files[0].extension === ".xlsx") {
                    //$ct.helpers.displayWorkAreaBusyCursor();
                    $("#vwusUploadProgess").show();

                    if (vm.selectedImportAction == 1) {
                        moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getSheltereeUploadImportOption());
                        $("#vwusUploadProgess").hide();
                        e.preventDefault();

                    }
                    e.data = {
                        FacilityId: vm.selectedFacilityNameItem.Id,
                        ImportAction: vm.selectedImportAction
                    };



                }
                else {

                    vm.get("clearData")();
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getUploadValidFile());
                    e.preventDefault();
                }
            },


            onSelectFile: function (e) {

                /*Work around for multiple file upload */
                if (vm.fileCount > 0) {
                    $(".k-upload-files").remove();
                }
                /*Work around for multiple file upload */
                $(".k-upload-files.k-reset").show();
                $(".k-upload-selected").show();
                vm.fileCount++;

            },

            onProgressFileUpload: function (e) {

                $("#vwusUploadProgess").show();
                vm.get("fileProgress")(e.percentComplete);

            },
            onSuccees: function (e) {

                //vm.refreshSnapShot()

                $(".k-upload-files.k-reset").find("li").remove();
                $(".k-upload-files.k-reset").hide();
                $("#vwusUploadProgess").hide();
                $ct.helpers.hideWorkAreaBusyCursor();
                vm.get("fileProgress")("");
                var resObj = e.response;

                var result = e.response;

                var grid = $("#vwuSheltereesList").data("kendoGrid");

                if (grid.dataSource.filter != undefined)
                    grid.dataSource.filter({});

                if (grid.dataSource.sort != undefined)
                    grid.dataSource.sort({});

                vm.set("UploadSummary", result);
               

                if (resObj.FailedImportedShelterees.length === 0) {

                    if (resObj.TotalCount == 0 && resObj.SuccessCount == 0) {

                        moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getSheltereeUploadError());
                        return;
                    }
                    moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getSheltereeUploadSuccessMsg());
                }
                else {


                    for (var errorIndex = 0; errorIndex < resObj.FailedImportedShelterees.length; errorIndex++) {
                        var item = resObj.FailedImportedShelterees[errorIndex];
                        result.FailedImportedShelterees[errorIndex].ValidationError = item.ValidationError.replace(/\\r\\n/g, '\r\n');
                    }
                    vm.set("UploadSummary", result);

                    if (result.FailedImportedShelterees.length > 0) {

                        vm.set("FacilityId", result.FailedImportedShelterees[0].FacilityId);

                    }
                    vm.set("FileContentId", result.FileContentId);

                    if (result.FailCount > 0) {
                        $("#vwusExcel").show();
                        $("#vwusDivGrid").show();
                        $("#vwuSheltereesList").data("kendoGrid").dataSource.page(1);
                    }
                    else {

                        $("#vwusExcel").hide();
                        $("#vwusDivGrid").hide();
                    }

                }
                $("#vwusSummary").show();


            },
            onError: function (e) {

                $("#vwusUploadProgess").hide();
                $ct.helpers.hideWorkAreaBusyCursor();
                vm.get("fileProgress")("");

            },
            onCompleteFileUpload: function (e) {

            },


            replaceString: function (str) {
                return str.replace("\|\g", "<br />");
            },


            clearData: function (e) {

                $("#vwusExcel").hide(); //added this as export to excel is visible once user comes from other view
                $("#vwusSummary").hide();
                $("#vwueDivGrid").hide();
                $(".k-upload-files.k-reset").find("li").remove();
                $(".k-upload-files.k-reset").hide();
                $("#vwusUploadProgess").hide();

                $(".k-upload-selected").hide();

                $(".k-upload-files").remove();
                $(".k-upload-status").remove();
                $(".k-upload.k-header").addClass("k-upload-empty");
                $(".k-upload-button").removeClass("k-state-focused");

            },




            btnExportExcelClick: function (e) {

                $ct.ds.sheltree.sheltree.getExportFailedImportedSheltereeDataToExcel(this, function (result) {

                    if (result.AcknowledgeType !== "Failure") {
                        $('#vwusExportExcel').attr("href", result.Data.DownloadUrl)
                        $("#vwusExportExcel").click(function (e) {
                            window.location.href = $("#vwusExportExcel").attr('href');
                        })
                        var e = jQuery.Event("click");
                        $("#vwusExportExcel").trigger(e);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowValidationMsg(), result.Message);
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
