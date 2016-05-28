define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({

            helpClick: function (e) {
                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            initialSearchToken: "",
            searchToken: "",
            selectedId: $ct.constants.getemptyGUID(),
            selectedShelterId: -1,
            selectedRecordVersion: -1,
            isBulkUpdateEnabled: false,
            isExportExcelEnabled: false,

            isFilteredData: false,

            hasCachedData: false,
            isLastPageCachedData: false,

            agencyFilterLookUp: [],
            departmentFilterLookUp: [],
            shelterFilterLookUp: [],
            shiftTimeFilterLookUp: [],
            staffSpecialityFilterLookUp: [],
            staffTypeFilterLookUp: [],

            filterText: function () {

                if (this.get("isFilteredData")) {
                    return "Filter On";
                }
                else {
                    return "Filter Off";
                }

            },

            eventdata: {},

            initialize: function () {

                vm.set("empRequestData", moduleContext.parentContext.empRequestData);

                //                if (moduleContext.parentContext.selectedFacilityType !== undefined) {

                //                    vm.set("selectedFacilityTypeItem", moduleContext.parentContext.selectedFacilityType);
                //                    vm.set("facilityTypeId", moduleContext.parentContext.selectedFacilityType.Key);

                //                }


            },

            empHeaderData: {

                shelter: {}

            },


            initializeEmployeeHeader: function () {

                vm.set("empHeaderData", moduleContext.parentContext.empHeaderData);

                $ct.ds.emp.employee.getActiveEvents(this, function (result) {

                    var resultData = result.Data.ActiveEvent;
                    vm.set("eventdata", resultData);
                });


            },


            empRequestData: {
                ViewAll: true,
                FetchSelectedOnly: false,
                SelectedEmployeeIds: new kendo.data.ObservableArray([]),
                UnSelectedEmployeeIds: new kendo.data.ObservableArray([])
            },

            /*
            loadFacilityTypes: function () {

            var data = $ct.ds.common.getFacilityTypes(true, function (result) {

            if (result !== undefined && result !== null && result.length > 0) {

            vm.set("selectedFacilityTypeItem", result[1]);
            vm.set("facilityTypeId", result[1].Key);
            moduleContext.parentContext.selectedFacilityType = vm.selectedFacilityTypeItem;

            vm.refreshSnapShot();

            }

            vm.initialize();
            vm.fillGrid();

            }, "All");

            this.set("dsFacilityTypes", data);



            },

            */

            setFetchSelectedDataParams: function () {

                //Making viewall false
                if (
                        (vm.empRequestData.ViewAll)
                        &&
                        (
                            (vm.get("empRequestData.SelectedEmployeeIds").length > 0) ||
                            (vm.hasCachedData && !vm.isLastPageCachedData)
                        )
                    ) {


                    vm.empRequestData.ViewAll = false;
                    moduleContext.parentContext.empRequestData.ViewAll = false;

                    vm.empRequestData.FetchSelectedOnly = true;
                    moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;


                }


                //                vm.empRequestData.ViewAll = false;
                //                vm.empRequestData.FetchSelectedOnly = true;

                //                moduleContext.parentContext.empRequestData.ViewAll = false;
                //                moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;


            },


            shelterChange: function (e) {

                $ct.helpers.displayWorkAreaBusyCursor();

                this.setFetchSelectedDataParams();
                this.initializeEmployeeHeader();
                this.fillGrid();
            },


            //            facilityTypeChange: function (e) {

            //                $ct.helpers.displayWorkAreaBusyCursor();

            //                this.setFetchSelectedDataParams();

            //                vm.set("facilityTypeId", vm.selectedFacilityTypeItem.Key);

            //                moduleContext.parentContext.selectedFacilityType = vm.selectedFacilityTypeItem;

            //                this.refreshSnapShot();

            //                this.fillGrid();
            //            },


            //            refreshSnapShot: function () {
            //                moduleContext.parentContext.FacilityTypeId = vm.get("selectedFacilityTypeItem.Key");
            //                moduleContext.notify($ct.en.getpatientHeaderRefresh(), null);
            //            },


            //            dsFacilityTypes: function () {

            //            },

            dsEmployeeList: function () {
                //vm.fillGrid();
            },


            fillGrid: function () {

                var gridObj = $("#vwelDgEmployeeList").data("kendoGrid");   
               
               
                if ((gridObj != undefined) && (gridObj != null))

                    gridObj.content.scrollLeft("0");

                //if ($ct.security.isMultiFacilityUser()) {

                //    gridObj.hideColumn("FacilityName");
                //}

                this.set("dsEmployeeList", $ct.ds.emp.employee.getEmployees(this, function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    vm.agencyFilterLookUp = result.Data.AgencyLookupData;
                    vm.departmentFilterLookUp = result.Data.DepartmentLookupData;
                    vm.shelterFilterLookUp = result.Data.ShelterLookupData;
                    vm.shiftTimeFilterLookUp = result.Data.ShiftTimeLookupData;
                    vm.staffSpecialityFilterLookUp = result.Data.StaffSpecialityLookupData;
                    vm.staffTypeFilterLookUp = result.Data.StaffTypeLookupData;

                    $("#vwelDgEmployeeListParent").find(".k-grid-filter").click(function (e) {

                     
                        if ($(e.target).closest("th[data-field='FacilityName']").data("kendoFilterMultiCheck") != undefined) {
                           
                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.shelterFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='StaffTypeName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.staffTypeFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='AgencyName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.agencyFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='DepartmentName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.departmentFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }


                        if ($(e.target).closest("th[data-field='StaffSpecialityName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.staffSpecialityFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }


                        if ($(e.target).closest("th[data-field='ShiftTime']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.shiftTimeFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                    });

                    if (!$ct.security.isMultiFacilityUser()) {

                        var gridObj = $("#vwelDgEmployeeList").data("kendoGrid");
                        if ((gridObj != undefined) && (gridObj != null)) {
                            gridObj.showColumn("FacilityName");
                            gridObj.hideColumn("FacilityName");
                        }
                    }


                    if (vm.get("dsEmployeeList").total() > 0) {
                        $("#vwelBtnExcel").show();
                    }
                    else {
                        $("#vwelBtnExcel").hide();
                    }

                    if ($ct.mt.isNoDataFound(result) && result.TotalRecords <= 0) {
                       
                        moduleContext.notify($ct.en.getShowValidationMsg(), result.Message);
                    }

                    vm.set("isFilteredData", result.Data.IsFilteredData);
                    vm.set("hasCachedData", result.Data.HasCachedData);
                    vm.set("isLastPageCachedData", result.Data.IsLastPageCachedData);


                    vm.empRequestData.SelectedIdsCount = result.Data.SelectedEmployeesCount;
                    moduleContext.parentContext.empRequestData.SelectedIdsCount = result.Data.SelectedEmployeesCount;

                    vm.empRequestData.OrigSelectedIdsCount = result.Data.OrigSelectedEmployeesCount;
                    moduleContext.parentContext.empRequestData.OrigSelectedIdsCount = result.Data.OrigSelectedEmployeesCount;

                    vm.empRequestData.OrigCurPageSelectedIdsCount = result.Data.OrigCurPageSelectedEmployeesCount;
                    moduleContext.parentContext.empRequestData.OrigCurPageSelectedIdsCount = result.Data.OrigCurPageSelectedEmployeesCount;


                    if ((result.Data.HasCachedData) && vm.empRequestData.ViewAll) {

                        vm.empRequestData.FetchSelectedOnly = true;
                        moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;

                    }


                    //                    vm.empRequestData.ViewAll = false;
                    //                    vm.empRequestData.FetchSelectedOnly = true;
                    vm.empRequestData.SelectedEmployeeIds = new kendo.data.ObservableArray([]);
                    vm.empRequestData.UnSelectedEmployeeIds = new kendo.data.ObservableArray([]);


                    $.each(result.Data.Employees, function (index, record) {

                        if (record.IsSelected)
                            vm.get("empRequestData.SelectedEmployeeIds").push(record.Id);

                    });



                    //                  moduleContext.parentContext.empRequestData.ViewAll = false;
                    //                  moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;
                    moduleContext.parentContext.empRequestData.SelectedEmployeeIds = vm.get("empRequestData.SelectedEmployeeIds");
                    moduleContext.parentContext.empRequestData.UnSelectedEmployeeIds = new kendo.data.ObservableArray([]);

                }));



            },


            isRowSelected: function (e) {
                if (this.get("selectedId") === $ct.constants.getemptyGUID() || this.get("selectedId") === null || this.get("selectedId") === undefined) {
                    return false;
                }
                else {
                    return true;
                }
            },


            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();


                // e.data.Id : patient id
                // e.data.Version : patient version

                $ct.ds.emp.employee.deleteEmployeeById(e.data.Id, e.data.Version, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsEmployeeList.read();
                        }
                        return;
                    }


                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {

                        //Removing deleted patient id from selected, unselected id's list, updating SelectedIdsCount  and refreshing header

                        var arrayUnSel = vm.get("empRequestData.UnSelectedEmployeeIds");
                        var arraySel = vm.get("empRequestData.SelectedEmployeeIds");
                      
                        if ($.inArray(vm.selectedId, arraySel) > -1) {
                            vm.get("empRequestData.SelectedEmployeeIds").splice($.inArray(vm.selectedId, arraySel), 1);
                        }
                       
                        if ($.inArray(vm.selectedId, arrayUnSel) < 0) {
                            vm.get("empRequestData.UnSelectedEmployeeIds").push(vm.selectedId);

                            var dbSelCnt = vm.get("empRequestData.SelectedIdsCount");
                            if (dbSelCnt == undefined || dbSelCnt <= 0)
                                dbSelCnt = 1;

                            vm.set("empRequestData.SelectedIdsCount", dbSelCnt - 1);
                        }

                        moduleContext.parentContext.empRequestData.SelectedEmployeeIds = vm.get("empRequestData.SelectedEmployeeIds");
                        moduleContext.parentContext.empRequestData.UnSelectedEmployeeIds = vm.get("empRequestData.UnSelectedEmployeeIds");

                        if ((vm.empRequestData.ViewAll) && (vm.get("empRequestData.SelectedEmployeeIds").length > 0)) {

                            vm.empRequestData.FetchSelectedOnly = true;
                            moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;

                        }

                        //vm.refreshSnapShot();

                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEmployeeDeleteSuccessMsg());
                    }

                    vm.dsEmployeeList.read();

                });

            },



            rowSelectionChange: function (e) {
                this.set("selectedId", e.sender.dataItem(e.sender.select()).Id);

                this.set("selectedShelterId", e.sender.dataItem(e.sender.select()).FacilityId);
                this.set("selectedRecordVersion", e.sender.dataItem(e.sender.select()).Version);


            },

            searchEmployees: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            vwelChkEmployee: function (e) {
                $ct.helpers.displayWorkAreaBusyCursor();

                var arrayUnSel = vm.get("empRequestData.UnSelectedEmployeeIds");
                var arraySel = vm.get("empRequestData.SelectedEmployeeIds");

                if (e.target.checked) {

                    if ($.inArray(e.data.Id, arrayUnSel) > -1) {
                        vm.get("empRequestData.UnSelectedEmployeeIds").splice($.inArray(e.data.Id, arrayUnSel), 1);
                    }

                    if ($.inArray(e.data.Id, arraySel) < 0) {
                        vm.get("empRequestData.SelectedEmployeeIds").push(e.data.Id);
                        var dbSelCnt = vm.get("empRequestData.SelectedIdsCount");
                        if (dbSelCnt == undefined || dbSelCnt <= 0)
                            dbSelCnt = 0;

                        vm.set("empRequestData.SelectedIdsCount", dbSelCnt + 1);
                    }
                }
                else {
                    //                    var chkAll = $("#vwEmployeeList").find("#chkAll");

                    //                    if (chkAll.prop("checked")) {
                    //                        chkAll.prop("checked", false);
                    //                    }

                    if ($.inArray(e.data.Id, arraySel) > -1) {
                        vm.get("empRequestData.SelectedEmployeeIds").splice($.inArray(e.data.Id, arraySel), 1);
                    }

                    if ($.inArray(e.data.Id, arrayUnSel) < 0) {
                        vm.get("empRequestData.UnSelectedEmployeeIds").push(e.data.Id);

                        var dbSelCnt = vm.get("empRequestData.SelectedIdsCount");
                        if (dbSelCnt == undefined || dbSelCnt <= 0)
                            dbSelCnt = 1;

                        vm.set("empRequestData.SelectedIdsCount", dbSelCnt - 1);
                    }
                }

                var ds = vm.get("dsEmployeeList");
                $(ds.data()).each(function (index, obj) {

                    if (jQuery.inArray(obj.Id, vm.get("empRequestData.SelectedEmployeeIds")) >= 0) {
                        obj.IsSelected = true;
                    }
                    else {
                        obj.IsSelected = false;
                    }
                })

                moduleContext.parentContext.empRequestData.SelectedEmployeeIds = vm.get("empRequestData.SelectedEmployeeIds");
                moduleContext.parentContext.empRequestData.UnSelectedEmployeeIds = vm.get("empRequestData.UnSelectedEmployeeIds");

                if ((vm.empRequestData.ViewAll) && (vm.get("empRequestData.SelectedEmployeeIds").length > 0)) {

                    vm.empRequestData.FetchSelectedOnly = true;
                    moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;

                }

                //vm.refreshSnapShot();
                $ct.helpers.hideWorkAreaBusyCursor();
            },

            dsDataBoundEvent: function (dataEve) {

                var columnHeader = $("#vwEmployeeList").find("th[role='columnheader']").first();

                $(columnHeader).html("<input type='checkbox' id='chkAll' />");

                $("#vwEmployeeList").find("#chkAll").click(function (e) {

                    var arrayUnSel = vm.get("empRequestData.UnSelectedEmployeeIds");
                    var arraySel = vm.get("empRequestData.SelectedEmployeeIds");

                    var childItems = $("#vwEmployeeList").find("input[data-item-type='child']");
                    if (e.target.checked) {

                        var dbOrigSelCnt = vm.get("empRequestData.OrigSelectedIdsCount");
                        var dbOrigCurPageSelCnt = vm.get("empRequestData.OrigCurPageSelectedIdsCount");
                        dbOrigSelCnt = dbOrigSelCnt - dbOrigCurPageSelCnt;
                        if (dbOrigSelCnt === undefined || dbOrigSelCnt < 0)
                            dbOrigSelCnt = 0;

                        $(childItems).prop("checked", true);
                        $(childItems).each(function (index, obj) {
                            var id = $(obj).attr("data-id")

                            if ($.inArray(id, arrayUnSel) > -1) {
                                vm.get("empRequestData.UnSelectedEmployeeIds").splice($.inArray(id, arrayUnSel), 1);
                            }

                            if ($.inArray(id, arraySel) < 0) {
                                vm.get("empRequestData.SelectedEmployeeIds").push(id);
                            }

                            dbOrigSelCnt = dbOrigSelCnt + 1;
                        })

                        if (dbOrigSelCnt < 0)
                            dbOrigSelCnt = 0;
                        vm.set("empRequestData.SelectedIdsCount", dbOrigSelCnt);

                    }
                    else {

                        var dbSelCnt = vm.get("empRequestData.SelectedIdsCount");


                        $(childItems).prop("checked", false);
                        $(childItems).each(function (index, obj) {
                            var id = $(obj).attr("data-id");

                            if ($.inArray(id, arraySel) > -1) {
                                vm.get("empRequestData.SelectedEmployeeIds").splice($.inArray(id, arraySel), 1);
                            }

                            if ($.inArray(id, arrayUnSel) < 0) {
                                vm.get("empRequestData.UnSelectedEmployeeIds").push(id);
                            }

                            dbSelCnt = dbSelCnt - 1;
                        })

                        if (dbSelCnt < 0)
                            dbSelCnt = 0;

                        vm.set("empRequestData.SelectedIdsCount", dbSelCnt);
                    }

                    var ds = vm.get("dsEmployeeList");


                    $(ds.data()).each(function (index, obj) {

                        if (jQuery.inArray(obj.Id, vm.get("empRequestData.SelectedEmployeeIds")) >= 0) {
                            obj.IsSelected = true;

                        }
                        else {
                            obj.IsSelected = false;
                        }
                    })


                    if ((vm.empRequestData.ViewAll) && (vm.get("empRequestData.SelectedEmployeeIds").length > 0)) {

                        vm.empRequestData.FetchSelectedOnly = true;
                        moduleContext.parentContext.empRequestData.FetchSelectedOnly = true;

                    }


                    //vm.refreshSnapShot();
                })
            },


            refreshEmployeeGrid: function (e) {
                $ct.helpers.displayWorkAreaBusyCursor();
                //                $("#vwmpPatientsLst").data("kendoGrid").dataSource.filter({});
                //                vm.set("searchToken", "");
                //                vm.set("selectedFacilityTypeItem", vm.get("dsFacilityTypes").at(1));
                //                vm.set("facilityTypeId", vm.get("dsFacilityTypes").at(1).Key);
                //vm.refreshSnapShot();
                vm.dsEmployeeList.read();
                $ct.helpers.hideWorkAreaBusyCursor();
            },


            clearData: function () {

                //$ct.helpers.displayWorkAreaBusyCursor();


                vm.empRequestData.ViewAll = true;
                vm.empRequestData.FetchSelectedOnly = false;
                vm.empRequestData.SelectedEmployeeIds = new kendo.data.ObservableArray([]);
                vm.empRequestData.UnSelectedEmployeeIds = new kendo.data.ObservableArray([]);

                moduleContext.parentContext.empRequestData.ViewAll = true;
                moduleContext.parentContext.empRequestData.FetchSelectedOnly = false;
                moduleContext.parentContext.empRequestData.SelectedEmployeeIds = new kendo.data.ObservableArray([]);
                moduleContext.parentContext.empRequestData.UnSelectedEmployeeIds = new kendo.data.ObservableArray([]);

                vm.set("empRequestData.SelectedIdsCount", 0);

                //vm.refreshSnapShot();
                vm.set("searchToken", "");

                //$("#vwmpPatientsLst").data("kendoGrid").dataSource.filter({});


                vm.fillGrid();
                //$ct.helpers.hideWorkAreaBusyCursor();

            },


            btnFilterOffClick: function () {
                this.clearData();
            },

            //clear the filters and set the patient header information
            reinitializeData: function () {

                //                vm.set("selectedFacilityTypeItem", this.dsFacilityTypes.data()[1]);
                //                vm.set("facilityTypeId", this.dsFacilityTypes.data()[1].Key);
                //                moduleContext.parentContext.selectedFacilityType = vm.selectedFacilityTypeItem;


                this.initializeEmployeeHeader();
                this.clearData();

            },


            btnAddClick: function (e) {
                //moduleContext.notify($ct.en.getAddEditPatientRefresh(), null);
                this.setFetchSelectedDataParams();
                Boiler.UrlController.goTo(this.employeeEditUrl(true));
            },




            btnBulkUpdateClick: function () {

              
                this.setFetchSelectedDataParams();
                
                //if (this.dsEmployeeList.data().length == 0) {

                    if (
                          !(
                                (vm.get("empRequestData.SelectedEmployeeIds").length > 0) ||
                                (vm.hasCachedData && !vm.isLastPageCachedData)
                          )
                       )
                    {
                       

                    var errorObject = {};
                    errorObject.messageType = $ct.mt.getError();
                    errorObject.message = "Please select records to bulk update";
                    moduleContext.notify($ct.en.getShowErrorMsg(), errorObject);

                    return;
                }


                $ct.ds.emp.employee.getEmployeeBulkUpdateLookup(this, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        // Boiler.UrlController.goTo($ct.rn.getPatients());
                    } else {
                        //moduleContext.notify($ct.en.getBulkUpdatePatients(), null);
                        Boiler.UrlController.goTo($ct.rn.getBulkUpdateEmployee());
                    }
                });
                //ds.fetch();

            },

            btnEditClick: function (e) {

                this.setFetchSelectedDataParams();

                this.set("selectedId", e.data.Id);
                this.set("selectedShelterId", e.data.FacilityId);
                this.set("selectedRecordVersion", e.data.Version);

                //moduleContext.notify($ct.en.getAddEditPatientRefresh(), null);
                Boiler.UrlController.goTo(this.employeeEditUrl(false));
            },


            btnExportExcelClick: function () {


                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();


                $ct.ds.emp.employee.exportEmployeesListToExcel(this, function (result) {

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

            },


            employeeEditUrl: function (isNew) {

                if (!isNew) {
                    return $ct.rn.getEmployee() + "/" + this.selectedId + "/" + this.selectedShelterId;

                }
                else {
                    return $ct.rn.getEmployee() + "/" + $ct.constants.getemptyGUID() + "/" + moduleContext.parentContext.empHeaderData.shelter.Id;
                }

            }







        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
