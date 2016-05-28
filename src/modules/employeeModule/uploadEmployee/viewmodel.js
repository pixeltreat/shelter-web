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


                var data1 = $ct.ds.emp.employee.getImportActionOptions(function (result) {
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
                    $("#vwueUploadProgess").show();

                    if (vm.selectedImportAction == 1) {
                        moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getEmployeesUploadImportOption());
                        $("#vwueUploadProgess").hide();
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
             
                $("#vwueUploadProgess").show();
                vm.get("fileProgress")(e.percentComplete);

            },
            onSuccees: function (e) {

                //vm.refreshSnapShot()

                $(".k-upload-files.k-reset").find("li").remove();
                $(".k-upload-files.k-reset").hide();
                $("#vwueUploadProgess").hide();
                $ct.helpers.hideWorkAreaBusyCursor();
                vm.get("fileProgress")("");
                var resObj = e.response;
               
                    var result = e.response;

                    var grid = $("#vwueEmployeesLst").data("kendoGrid");

                    if (grid.dataSource.filter != undefined)
                        grid.dataSource.filter({});

                    if (grid.dataSource.sort != undefined)
                        grid.dataSource.sort({});

                    vm.set("UploadSummary", result);

                 
                    if (resObj.FailedImportedEmployees.length === 0) {
                       
                        if (resObj.TotalCount == 0 && resObj.SuccessCount == 0) {
                          
                            moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getEmployeeUploadError());
                            return;
                        }
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEmployeeUploadSuccessMsg());
                    }
                    else {

                       
                        for (var errorIndex = 0; errorIndex < resObj.FailedImportedEmployees.length; errorIndex++) {
                            var item = resObj.FailedImportedEmployees[errorIndex];
                            result.FailedImportedEmployees[errorIndex].ValidationError = item.ValidationError.replace(/\\r\\n/g, '\r\n');
                        }
                        vm.set("UploadSummary", result);

                        if (result.FailedImportedEmployees.length > 0) {

                            vm.set("FacilityId", result.FailedImportedEmployees[0].FacilityId);

                        }
                        vm.set("FileContentId", result.FileContentId);

                        if (result.FailCount > 0) {
                            $("#vwueExcel").show();
                            $("#vwueDivGrid").show();
                            $("#vwueEmployeesLst").data("kendoGrid").dataSource.page(1);
                        }
                        else {

                            $("#vwueExcel").hide();
                            $("#vwueDivGrid").hide();
                        }

                    }
                    $("#vwupdSummary").show();

                
            },
            onError: function (e) {

                $("#vwueUploadProgess").hide();
                $ct.helpers.hideWorkAreaBusyCursor();
                vm.get("fileProgress")("");

            },
            onCompleteFileUpload: function (e) {

            },


            replaceString: function (str) {
                return str.replace("\|\g", "<br />");
            },


            clearData: function (e) {

                $("#vwueExcel").hide(); //added this as export to excel is visible once user comes from other view
                $("#vwupdSummary").hide();
                $("#vwueDivGrid").hide();
                $(".k-upload-files.k-reset").find("li").remove();
                $(".k-upload-files.k-reset").hide();
                $("#vwueUploadProgess").hide();

                $(".k-upload-selected").hide();

                $(".k-upload-files").remove();
                $(".k-upload-status").remove();
                $(".k-upload.k-header").addClass("k-upload-empty");
                $(".k-upload-button").removeClass("k-state-focused");
   
            },




            btnExportExcelClick: function (e) {

                $ct.ds.emp.employee.getExportFailedImportedEmployeeDataToExcel(this, function (result) {

                    if (result.AcknowledgeType !== "Failure") {
                        $('#vwueExportExcel').attr("href", result.Data.DownloadUrl)
                        $("#vwueExportExcel").click(function (e) {
                            window.location.href = $("#vwueExportExcel").attr('href');
                        })
                        var e = jQuery.Event("click");
                        $("#vwueExportExcel").trigger(e);
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
