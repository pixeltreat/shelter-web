define(["Boiler", 'text!./help/help.html',
 'text!./comments/view.html',
'./comments/viewmodel',
'i18n!./comments/nls/resources'
], function (Boiler, helpTmpl,
    commentsTmpl,
    commentsViewModel,
    commentsNls) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            dsFacilities: [],
            selectedFacility: {},
            dsShifts: [],
            selectedShift: {},
            attendenceDate: new Date(),
            attendenceDatestring: "",

            shelterFilterLookUp: [],
            shiftTimeFilterLookUp: [],
            staffSpecialityFilterLookUp: [],
            statusFilterLookUp: [],

            previousAttendenceDatestring: "",
            previousSelectedShift: -1,
            previousSelectedFacility: -1,

            hideMessage: true,

            hideWorkArea: true,
            initialLoadforGo: true,

            isRecordsPresentForExport: false,
            employeeAttendanceSummary: {},


            ActiveEvent: {},


            dcRequestData: {
                viewAll: true,
                fetchSelectedOnly: false,
                selectedEmployeeIds: new kendo.data.ObservableArray([]),
                unSelectedEmployeeIds: new kendo.data.ObservableArray([])
            },

            initializeEvent: function () {
                $ct.ds.emp.empattendance.getEmployeeAttendenceEvent(function (result) {

                    var resultData = result.Data;
                    vm.set("ActiveEvent", resultData.ActiveEvent);
                });
            },

            initializeGlobalData: function () {

                vm.set("dcRequestData", moduleContext.parentContext.dcRequestData);
                moduleContext.parentContext.StatusLookUpData = [];
            },

            showWorkArea: function () {

                if (vm.get("hideWorkArea")) {
                    return $ct.styles.getNoneStyle();
                }
                else {
                    return $ct.styles.getBlockStyle();
                }
            },

            showMessage: function () {

                if (vm.get("hideMessage")) {
                    return $ct.styles.getNoneStyle();
                }
                else {
                    return $ct.styles.getBlockStyle();
                }
            },

            isattendenceDateValid: function () {

                if (vm.get("initialLoadforGo")) {
                    return true;
                }


                var satartDt = vm.get("attendenceDate");

                if ((satartDt == "") || (satartDt == null)) {
                    return false;
                }


                return true;

            },

            initializeFacilities: function () {
                $ct.ds.emp.empattendance.getEmployeeAttendenceFacilities(function (result) {


                    var resultData = result.Data;

                    if (resultData !== undefined && resultData !== null && resultData.length > 0) {


                        var selectItem = {};
                        selectItem.Id = -1;
                        selectItem.Name = "--All--";

                        resultData.splice(0, 0, selectItem);

                        vm.set("dsFacilities", result.Data);
                        vm.set("selectedFacility", result.Data[0]);






                    }
                    vm.initializeShifts();

                });


            },

            initializeShifts: function () {
                $ct.ds.emp.empattendance.getEmployeeAttendenceInitialLoad(function (result) {

                    var resultData = result.Data;

                    if (resultData !== undefined && resultData !== null && resultData.length > 0) {



                        vm.set("dsShifts", result.Data);
                        vm.set("selectedShift", result.Data[0]);
                        var start = $("#vweaAttendenceDate").data("kendoDateTimePicker");
                        var date = (vm.attendenceDate.getMonth() + 1) + "/" + vm.attendenceDate.getDate() + "/" + vm.attendenceDate.getFullYear();
                        vm.set("previousAttendenceDatestring", date);


                        vm.btnGoClick();


                    }

                });


            },

            btnGoClick: function () {

                vm.set("initialLoadforGo", false);
                if (vm.isattendenceDateValid()) {
                    var date = (vm.attendenceDate.getMonth() + 1) + "/" + vm.attendenceDate.getDate() + "/" + vm.attendenceDate.getFullYear();
                    vm.set("attendenceDatestring", date);
                    vm.set("previousSelectedShift", vm.selectedShift.Key);
                    vm.set("previousSelectedFacility", vm.selectedFacility.Id);

                    this.fillGrid();

                    $ct.helpers.displayWorkAreaBusyCursor();
                }



            },
            dsEmployeeAttendance: function () {
                //this.fillGrid();
            },

            fillGrid: function () {



                moduleContext.parentContext.attendenceDate = vm.attendenceDatestring;
                moduleContext.parentContext.selectedShift = vm.previousSelectedShift;
                moduleContext.parentContext.facilityId = vm.previousSelectedFacility;

                this.set("dsEmployeeAttendance", $ct.ds.emp.empattendance.getEmployeeAttendence(this, function (result) {

                    vm.set("previousAttendenceDatestring", vm.attendenceDatestring);


                    vm.shelterFilterLookUp = result.Data.EmployeeAttendanceShelterLookUpData;
                    vm.shiftTimeFilterLookUp = result.Data.EmployeeAttendanceShiftTimeLookUpData;
                    vm.staffSpecialityFilterLookUp = result.Data.EmployeeAttendanceStaffSpecialityLookUpData;
                    vm.statusFilterLookUp = result.Data.EmployeeAttendanceStatusLookUpData;
                    vm.hasCachedData = result.Data.HasCachedData;
                    vm.isLastPageCachedData = result.Data.IsLastPageCachedData;

                    $("#vweaDgEmployeeListParent").find(".k-grid-filter").click(function (e) {


                        if ($(e.target).closest("th[data-field='FacilityName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.shelterFilterLookUp;
                            fmc.container.empty();
                            fmc.refresh();
                        }


                        if ($(e.target).closest("th[data-field='ShiftTime']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.shiftTimeFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }


                        if ($(e.target).closest("th[data-field='StaffSpecialityName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.staffSpecialityFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='StatusName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.statusFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }


                    });
                    /*To handle hide of data for multi facility user based on isMultiFacilityUser */
                    if (!$ct.security.isMultiFacilityUser()) {
                        var gridObj = $("#vweaDgEmployeeList").data("kendoGrid");
                        if ((gridObj != undefined) && (gridObj != null)) {
                            gridObj.showColumn("FacilityName");
                            gridObj.hideColumn("FacilityName");
                        }

                    }

                    if (result.Data.EmployeeAttendanceRawData.length == 0) {


                        vm.set("isRecordsPresentForExport", false);
                    }
                    else {

                        vm.set("isRecordsPresentForExport", true);
                    }

                    if (result.Data.StatusLookUpData != undefined) {
                        moduleContext.parentContext.StatusLookUpData = result.Data.StatusLookUpData;
                    }


                    vm.set("hideWorkArea", false);
                    vm.set("hideMessage", true);

                    if (result.Data.EmployeeAttendanceSummary != undefined) {

                        vm.set("employeeAttendanceSummary", result.Data.EmployeeAttendanceSummary);


                        if (vm.employeeAttendanceSummary.TotalEmployees == 0) {
                            vm.set("hideWorkArea", true);
                            vm.set("hideMessage", false);

                        }
                        else {
                            vm.set("hideWorkArea", false);
                            vm.set("hideMessage", true);
                        }

                    }



                    //Resetting properties
                    vm.set("dcRequestData.viewAll", false);
                    vm.set("dcRequestData.fetchSelectedOnly", false);
                    vm.set("dcRequestData.selectedEmployeeIds", new kendo.data.ObservableArray([]));
                    vm.set("dcRequestData.unSelectedEmployeeIds", new kendo.data.ObservableArray([]));
                    $.each(result.Data.EmployeeAttendanceRawData, function (index, record) {
                        if (record.IsSelected) {
                            vm.get("dcRequestData.selectedEmployeeIds").push(record.EmployeeId);
                        }
                    });


                     moduleContext.parentContext.dcRequestData.viewAll = false;
                     moduleContext.parentContext.dcRequestData.fetchSelectedOnly = false;

                     moduleContext.parentContext.dcRequestData.selectedEmployeeIds = vm.get("dcRequestData.selectedEmployeeIds");
                    moduleContext.parentContext.dcRequestData.unSelectedEmployeeIds = vm.get("dcRequestData.unSelectedEmployeeIds");

                    $ct.helpers.hideWorkAreaBusyCursor();




                }));







            },



            refreshEmployeeAttendanceGrid: function (e) {
                if (vm.dsEmployeeAttendance.read != undefined)
                    vm.dsEmployeeAttendance.read();
            },

            btnBulkUpdateClick: function (e) {



                vm.setFetchSelectedDataParams();

                //if (this.dsEmployeeList.data().length == 0) {

                if (
                      !(
                            (vm.get("dcRequestData.selectedEmployeeIds").length > 0) ||
                            (vm.hasCachedData && !vm.isLastPageCachedData)
                      )
                   ) {


                    var errorObject = {};
                    errorObject.messageType = $ct.mt.getError();
                    errorObject.message = "Please select records to bulk update";
                    moduleContext.notify($ct.en.getShowValidationMsg(), "Please select atleast one Employee.");
                    return;
                }



                Boiler.UrlController.goTo($ct.rn.getBulkUpdateEmployeeAttendance());
            },


        setFetchSelectedDataParams: function () {

            //Making viewall false
            if (
                    (vm.dcRequestData.ViewAll)
                    &&
                    (
                        (vm.get("dcRequestData.selectedEmployeeIds").length > 0) ||
                        (vm.hasCachedData && !vm.isLastPageCachedData)
                    )
                ) {


                vm.dcRequestData.ViewAll = false;
                moduleContext.parentContext.dcRequestData.ViewAll = false;




            }





        },

            btnExportExcelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.emp.empattendance.exportEmployeeAttendenceToExcel(this, function (result) {

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


            },

            btnSaveClick: function (e) {

                e.data.set("saveClicked", true);



                if (e.data.ReportId == "-1")
                    return;

                var saveEmployeeAttendenceData = {};
                Objforsave = {};

                Objforsave = e.data;



                Objforsave.toJSON();
                saveEmployeeAttendenceData.EmployeeAttendanceRaw = Objforsave;
                saveEmployeeAttendenceData.FacilityId = vm.previousSelectedFacility;
                saveEmployeeAttendenceData.ShiftDate = vm.attendenceDatestring;
                saveEmployeeAttendenceData.ShiftId = vm.previousSelectedShift;

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.emp.empattendance.saveEmployeeAttendence(saveEmployeeAttendenceData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {

                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.refreshEmployeeAttendanceGrid();
                        }

                        return;

                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }

                    else {

                        if (data.Data.EmployeeAttendanceRawData != undefined) {


                            e.data.set("EmployeeId", data.Data.EmployeeAttendanceRawData.EmployeeId);
                            e.data.set("EmployeeAttendanceVersion", data.Data.EmployeeAttendanceRawData.EmployeeAttendanceVersion);
                            e.data.set("IsNew", data.Data.EmployeeAttendanceRawData.IsNew);
                            e.data.set("StatusName", data.Data.EmployeeAttendanceRawData.StatusName);

                            e.data.set("EmployeeAttendanceUpdatedUserName", data.Data.EmployeeAttendanceRawData.EmployeeAttendanceUpdatedUserName);
                            e.data.set("EmployeeAttendanceUpdatedOnValue", data.Data.EmployeeAttendanceRawData.EmployeeAttendanceUpdatedOnValue);

                            vm.set("employeeAttendanceSummary", data.Data.EmployeeAttendanceSummary);
                            vm.dsEmployeeAttendance.read();

                        }

                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEmployeeAttendenceUpdatedSuccessMsg());


                    }

                })

            },

            vweaChkEmployee: function (e) {

                $ct.helpers.displayWorkAreaBusyCursor();

                var arrayUnSel = vm.get("dcRequestData.unSelectedEmployeeIds");
                var arraySel = vm.get("dcRequestData.selectedEmployeeIds");

                if (e.target.checked) {

                    if ($.inArray(e.data.EmployeeId, arrayUnSel) > -1) {
                        vm.get("dcRequestData.unSelectedEmployeeIds").splice($.inArray(e.data.EmployeeId, arrayUnSel), 1);
                    }

                    if ($.inArray(e.data.EmployeeId, arraySel) < 0) {
                        vm.get("dcRequestData.selectedEmployeeIds").push(e.data.EmployeeId);
                    }
                }
                else {


                    if ($.inArray(e.data.EmployeeId, arraySel) > -1) {
                        vm.get("dcRequestData.selectedEmployeeIds").splice($.inArray(e.data.EmployeeId, arraySel), 1);
                    }

                    if ($.inArray(e.data.EmployeeId, arrayUnSel) < 0) {
                        vm.get("dcRequestData.unSelectedEmployeeIds").push(e.data.EmployeeId);
                    }
                }


                var ds = vm.get("dsEmployeeAttendance");

                if (ds.data() != undefined) {

                    $(ds.data()).each(function (index, obj) {


                        if (jQuery.inArray(obj.EmployeeId, vm.get("dcRequestData.selectedEmployeeIds")) >= 0) {
                            obj.IsSelected = true;
                        }
                        else {
                            obj.IsSelected = false;
                        }
                    });

                    moduleContext.parentContext.dcRequestData.selectedEmployeeIds = vm.get("dcRequestData.selectedEmployeeIds");
                    moduleContext.parentContext.dcRequestData.unSelectedEmployeeIds = vm.get("dcRequestData.unSelectedEmployeeIds");



                }
                $ct.helpers.hideWorkAreaBusyCursor();
            },



            vweaDataBoundEvent: function (dataEve) {

                var columnHeader = $("#vwEmployeeAttendance").find("th[role='columnheader']").first();
                $(columnHeader).html('<label class="checkbox"><input class="checkbox__inp" id="chkAll" type="checkbox" /><span class="checkbox__text"></span></label>');

                $("#vwEmployeeAttendance").find("#chkAll").click(function (e) {
                    var arrayUnSel = vm.get("dcRequestData.unSelectedEmployeeIds");
                    var arraySel = vm.get("dcRequestData.selectedEmployeeIds");

                    var childItems = $("#vwEmployeeAttendance").find("input[data-item-type='child']");

                    if (e.target.checked) {

                        $(childItems).prop("checked", true);

                        $(childItems).each(function (index, obj) {
                            var id = $(obj).attr("data-id");

                            if ($.inArray(id, arrayUnSel) > -1) {
                                vm.get("dcRequestData.unSelectedEmployeeIds").splice($.inArray(id, arrayUnSel), 1);
                            }

                            if ($.inArray(id, arraySel) < 0) {
                                vm.get("dcRequestData.selectedEmployeeIds").push(id);
                            }
                        })
                    }
                    else {

                        $(childItems).prop("checked", false);

                        $(childItems).each(function (index, obj) {
                            var id = $(obj).attr("data-id");

                            if ($.inArray(id, arraySel) > -1) {

                                vm.get("dcRequestData.selectedEmployeeIds").splice($.inArray(id, arraySel), 1);
                            }

                            if ($.inArray(id, arrayUnSel) < 0) {
                                vm.get("dcRequestData.unSelectedEmployeeIds").push(id);
                            }
                        })
                    }

                    var ds = vm.get("dsEmployeeAttendance");
                    if (ds.data() != undefined) {

                        $(ds.data()).each(function (index, obj) {


                            if (jQuery.inArray(obj.EmployeeId, vm.get("dcRequestData.selectedEmployeeIds")) >= 0) {
                                obj.IsSelected = true;
                            }
                            else {
                                obj.IsSelected = false;
                            }
                        });
                    }

                    moduleContext.parentContext.dcRequestData.selectedEmployeeIds = vm.get("dcRequestData.selectedEmployeeIds");
                    moduleContext.parentContext.dcRequestData.unSelectedEmployeeIds = vm.get("dcRequestData.unSelectedEmployeeIds");
                });





            },

            clearData: function () {

                vm.dcRequestData.viewAll = true;
                vm.dcRequestData.FetchSelectedOnly = false;
                vm.dcRequestData.selectedEmployeeIds = new kendo.data.ObservableArray([]);
                vm.dcRequestData.unSelectedEmployeeIds = new kendo.data.ObservableArray([]);
                moduleContext.parentContext.dcRequestData.viewAll = true;
                moduleContext.parentContext.dcRequestData.FetchSelectedOnly = false;
                moduleContext.parentContext.dcRequestData.selectedEmployeeIds = new kendo.data.ObservableArray([]);
                moduleContext.parentContext.dcRequestData.unSelectedEmployeeIds = new kendo.data.ObservableArray([]);
                vm.fillGrid();

            },

            btnFilterOffClick: function () {

                vm.clearData();
            },

            btnEditClick: function (e) {

                var bulkupdateobj = {};
                bulkupdateobj.griddata = e.data;
                bulkupdateobj.date = moduleContext.parentContext.attendenceDate;
                bulkupdateobj.shift = moduleContext.parentContext.selectedShift;
                bulkupdateobj.facilityId = moduleContext.parentContext.facilityId;
                var panel = new Boiler.ViewTemplate(null, commentsTmpl, commentsNls);
                var vm = new commentsViewModel(moduleContext);
                $ct.helpers.displayWindow(panel, "Comment", vm.data);
                vm.data.initialize(bulkupdateobj);

            }






        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
