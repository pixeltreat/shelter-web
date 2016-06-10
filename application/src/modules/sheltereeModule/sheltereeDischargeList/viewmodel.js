
define(["Boiler", 'text!./help/help.html'],
function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {


        var vm = kendo.observable({

            pageName: "Shelteree Discharge List page",

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

            shelterFilterLookUp: [],
            parishFilterLookUp: [],
            regionFilterLookUp: [],
            dispositionFilterLookUp: [],
            caregiversFilterLookUp: [],
            transportationTypeFilterLookUp: [],
         

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

                vm.set("sheltereeRequestData", moduleContext.parentContext.sheltereeRequestData);

                //                if (moduleContext.parentContext.selectedFacilityType !== undefined) {

                //                    vm.set("selectedFacilityTypeItem", moduleContext.parentContext.selectedFacilityType);
                //                    vm.set("facilityTypeId", moduleContext.parentContext.selectedFacilityType.Key);

                //                }


            },

            sheltereeHeaderData: {

                shelter: {}

            },


            initializeSheltereeHeader: function () {

                vm.set("sheltereeHeaderData", moduleContext.parentContext.sheltereeHeaderData);

                $ct.ds.sheltree.sheltree.getActiveEvents(this, function (result) {

                    var resultData = result.Data.ActiveEvent;
                    vm.set("eventdata", resultData);
                });


            },


            sheltereeRequestData: {
                ViewAll: true,
                FetchSelectedOnly: false,
                SelectedSheltereeIds: new kendo.data.ObservableArray([]),
                UnSelectedSheltereeIds: new kendo.data.ObservableArray([]),
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
                        (vm.sheltereeRequestData.ViewAll)
                        &&
                        (
                            (vm.get("sheltereeRequestData.SelectedSheltereeIds").length > 0) ||
                            (vm.hasCachedData && !vm.isLastPageCachedData)
                        )
                    ) {


                    vm.sheltereeRequestData.ViewAll = false;
                    moduleContext.parentContext.sheltereeRequestData.ViewAll = false;

                    vm.sheltereeRequestData.FetchSelectedOnly = true;
                    moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;


                }


                //                vm.sheltereeRequestData.ViewAll = false;
                //                vm.sheltereeRequestData.FetchSelectedOnly = true;

                //                moduleContext.parentContext.sheltereeRequestData.ViewAll = false;
                //                moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;


            },


            shelterChange: function (e) {

                $ct.helpers.displayWorkAreaBusyCursor();

                this.setFetchSelectedDataParams();
                this.initializeSheltereeHeader();
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

            dsSheltereeDischargeList: function () {
                //vm.fillGrid();
            },


            fillGrid: function () {

                var gridObj = $("#vwsdlDgSheltereeDischargeList").data("kendoGrid");


                if ((gridObj != undefined) && (gridObj != null))

                    gridObj.content.scrollLeft("0");

                //if ($ct.security.isMultiFacilityUser()) {

                //    gridObj.hideColumn("FacilityName");
                //}

                this.set("dsSheltereeDischargeList", $ct.ds.sheltree.sheltree.getSheltereeDischargees(this, function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    vm.shelterFilterLookUp = result.Data.ShelterLookupData;
                    vm.parishFilterLookUp = result.Data.ParishLookupData;
                    vm.regionFilterLookUp = result.Data.RegionLookupData;
                    vm.dispositionFilterLookUp = result.Data.DispositionLookupData;
                    vm.caregiversFilterLookUp = result.Data.CaregiversLookupData;
                    vm.transportationTypeFilterLookUp = result.Data.TransportationTypeLookupData;
                    

                    $("#vwsdlDgSheltereeDischargeListParent").find(".k-grid-filter").click(function (e) {


                        if ($(e.target).closest("th[data-field='FacilityName']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.shelterFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='HomeParish']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.parishFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='Region']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.regionFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                        if ($(e.target).closest("th[data-field='Caregivers']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.caregiversFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }


                        if ($(e.target).closest("th[data-field='TransportationType']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.transportationTypeFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }


                    

                        if ($(e.target).closest("th[data-field='Disposition']").data("kendoFilterMultiCheck") != undefined) {

                            var fmc = $(e.target).closest("th").data("kendoFilterMultiCheck");
                            fmc.checkSource._view = vm.dispositionFilterLookUp;

                            fmc.container.empty();
                            fmc.refresh();
                        }

                    });

                    if (!$ct.security.isMultiFacilityUser()) {

                        var gridObj = $("#vwslDgSheltereeList").data("kendoGrid");
                        if ((gridObj != undefined) && (gridObj != null)) {
                            gridObj.showColumn("FacilityName");
                            gridObj.hideColumn("FacilityName");
                        }
                    }


                    if (vm.get("dsSheltereeDischargeList").total() > 0) {
                        $("#vwsdlBtnExcel").show();
                    }
                    else {
                        $("#vwsdlBtnExcel").hide();
                    }

                    if ($ct.mt.isNoDataFound(result) && result.TotalRecords <= 0) {

                        moduleContext.notify($ct.en.getShowValidationMsg(), result.Message);
                    }

                    vm.set("isFilteredData", result.Data.IsFilteredData);
                    vm.set("hasCachedData", result.Data.HasCachedData);
                    vm.set("isLastPageCachedData", result.Data.IsLastPageCachedData);


                    vm.sheltereeRequestData.SelectedIdsCount = result.Data.SelectedSheltereesCount;
                    moduleContext.parentContext.sheltereeRequestData.SelectedIdsCount = result.Data.SelectedSheltereesCount;

                    vm.sheltereeRequestData.OrigSelectedIdsCount = result.Data.OrigSelectedSheltereesCount;
                    moduleContext.parentContext.sheltereeRequestData.OrigSelectedIdsCount = result.Data.OrigSelectedSheltereesCount;

                    vm.sheltereeRequestData.OrigCurPageSelectedIdsCount = result.Data.OrigCurPageSelectedSheltereesCount;
                    moduleContext.parentContext.sheltereeRequestData.OrigCurPageSelectedIdsCount = result.Data.OrigCurPageSelectedSheltereesCount;

                    if ((result.Data.HasCachedData) && vm.sheltereeRequestData.ViewAll) {

                        vm.sheltereeRequestData.FetchSelectedOnly = true;
                        moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;

                    }


                    //                    vm.sheltereeRequestData.ViewAll = false;
                    //                    vm.sheltereeRequestData.FetchSelectedOnly = true;
                    vm.sheltereeRequestData.SelectedSheltereeIds = new kendo.data.ObservableArray([]);
                    vm.sheltereeRequestData.UnSelectedSheltereeIds = new kendo.data.ObservableArray([]);


                    $.each(result.Data.DischargeRawData, function (index, record) {

                        if (record.IsSelected)
                            vm.get("sheltereeRequestData.SelectedSheltereeIds").push(record.Id);

                    });



                    //                  moduleContext.parentContext.sheltereeRequestData.ViewAll = false;
                    //                  moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;
                    moduleContext.parentContext.sheltereeRequestData.SelectedSheltereeIds = vm.get("sheltereeRequestData.SelectedSheltereeIds");
                    moduleContext.parentContext.sheltereeRequestData.UnSelectedSheltereeIds = new kendo.data.ObservableArray([]);

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


                // e.data.Id : shelteree id
                // e.data.Version : shelteree version

                $ct.ds.sheltree.sheltree.deleteSheltereeDischargeById(e.data.Id, e.data.Version, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsSheltereeDischargeList.read();
                        }
                        return;
                    }


                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {

                        //Removing deleted shelteree id from selected, unselected id's list, updating SelectedIdsCount  and refreshing header

                        var arrayUnSel = vm.get("sheltereeRequestData.UnSelectedSheltereeIds");
                        var arraySel = vm.get("sheltereeRequestData.SelectedSheltereeIds");

                        if ($.inArray(vm.selectedId, arraySel) > -1) {
                            vm.get("sheltereeRequestData.SelectedSheltereeIds").splice($.inArray(vm.selectedId, arraySel), 1);
                        }

                        if ($.inArray(vm.selectedId, arrayUnSel) < 0) {
                            vm.get("sheltereeRequestData.UnSelectedSheltereeIds").push(vm.selectedId);

                            var dbSelCnt = vm.get("sheltereeRequestData.SelectedIdsCount");
                            if (dbSelCnt == undefined || dbSelCnt <= 0)
                                dbSelCnt = 1;

                            vm.set("sheltereeRequestData.SelectedIdsCount", dbSelCnt - 1);
                        }

                        moduleContext.parentContext.sheltereeRequestData.SelectedSheltereeIds = vm.get("sheltereeRequestData.SelectedSheltereeIds");
                        moduleContext.parentContext.sheltereeRequestData.UnSelectedSheltereeIds = vm.get("sheltereeRequestData.UnSelectedSheltereeIds");

                        if ((vm.sheltereeRequestData.ViewAll) && (vm.get("sheltereeRequestData.SelectedSheltereeIds").length > 0)) {

                            vm.sheltereeRequestData.FetchSelectedOnly = true;
                            moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;

                        }

                        //vm.refreshSnapShot();

                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getSheltereeDeleteSuccessMsg());
                    }

                    vm.dsSheltereeDischargeList.read();

                });

            },



            rowSelectionChange: function (e) {
                this.set("selectedId", e.sender.dataItem(e.sender.select()).Id);

                this.set("selectedShelterId", e.sender.dataItem(e.sender.select()).FacilityId);
                this.set("selectedRecordVersion", e.sender.dataItem(e.sender.select()).Version);


            },

            searchSheltereeDischargees: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            vwsdlChkSheltereeDischarge: function (e) {
                $ct.helpers.displayWorkAreaBusyCursor();

                var arrayUnSel = vm.get("sheltereeRequestData.UnSelectedSheltereeIds");
                var arraySel = vm.get("sheltereeRequestData.SelectedSheltereeIds");

                if (e.target.checked) {

                    if ($.inArray(e.data.Id, arrayUnSel) > -1) {
                        vm.get("sheltereeRequestData.UnSelectedSheltereeIds").splice($.inArray(e.data.Id, arrayUnSel), 1);
                    }

                    if ($.inArray(e.data.Id, arraySel) < 0) {
                        vm.get("sheltereeRequestData.SelectedSheltereeIds").push(e.data.Id);
                        var dbSelCnt = vm.get("sheltereeRequestData.SelectedIdsCount");
                        if (dbSelCnt == undefined || dbSelCnt <= 0)
                            dbSelCnt = 0;

                        vm.set("sheltereeRequestData.SelectedIdsCount", dbSelCnt + 1);
                    }
                }
                else {
                    //                    var chkAll = $("#vwEmployeeList").find("#chkAll");

                    //                    if (chkAll.prop("checked")) {
                    //                        chkAll.prop("checked", false);
                    //                    }

                    if ($.inArray(e.data.Id, arraySel) > -1) {
                        vm.get("sheltereeRequestData.SelectedSheltereeIds").splice($.inArray(e.data.Id, arraySel), 1);
                    }

                    if ($.inArray(e.data.Id, arrayUnSel) < 0) {
                        vm.get("sheltereeRequestData.UnSelectedSheltereeIds").push(e.data.Id);

                        var dbSelCnt = vm.get("sheltereeRequestData.SelectedIdsCount");
                        if (dbSelCnt == undefined || dbSelCnt <= 0)
                            dbSelCnt = 1;

                        vm.set("sheltereeRequestData.SelectedIdsCount", dbSelCnt - 1);
                    }
                }

                var ds = vm.get("dsSheltereeDischargeList");
                $(ds.data()).each(function (index, obj) {

                    if (jQuery.inArray(obj.Id, vm.get("sheltereeRequestData.SelectedSheltereeIds")) >= 0) {
                        obj.IsSelected = true;
                    }
                    else {
                        obj.IsSelected = false;
                    }
                })

                moduleContext.parentContext.sheltereeRequestData.SelectedSheltereeIds = vm.get("sheltereeRequestData.SelectedSheltereeIds");
                moduleContext.parentContext.sheltereeRequestData.UnSelectedSheltereeIds = vm.get("sheltereeRequestData.UnSelectedSheltereeIds");

                if ((vm.sheltereeRequestData.ViewAll) && (vm.get("sheltereeRequestData.SelectedSheltereeIds").length > 0)) {

                    vm.sheltereeRequestData.FetchSelectedOnly = true;
                    moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;

                }

                //vm.refreshSnapShot();
                $ct.helpers.hideWorkAreaBusyCursor();
            },

            dsDataBoundEvent: function (dataEve) {

                var columnHeader = $("#vwSheltereeDischargeList").find("th[role='columnheader']").first();

                $(columnHeader).html("<input type='checkbox' id='chkAll' />");

                $("#vwSheltereeDischargeList").find("#chkAll").click(function (e) {

                    var arrayUnSel = vm.get("sheltereeRequestData.UnSelectedSheltereeIds");
                    var arraySel = vm.get("sheltereeRequestData.SelectedSheltereeIds");

                    var childItems = $("#vwSheltereeDischargeList").find("input[data-item-type='child']");
                    if (e.target.checked) {

                        var dbOrigSelCnt = vm.get("sheltereeRequestData.OrigSelectedIdsCount");
                        var dbOrigCurPageSelCnt = vm.get("sheltereeRequestData.OrigCurPageSelectedIdsCount");
                        dbOrigSelCnt = dbOrigSelCnt - dbOrigCurPageSelCnt;
                        if (dbOrigSelCnt === undefined || dbOrigSelCnt < 0)
                            dbOrigSelCnt = 0;

                        $(childItems).prop("checked", true);
                        $(childItems).each(function (index, obj) {
                            var id = $(obj).attr("data-id")

                            if ($.inArray(id, arrayUnSel) > -1) {
                                vm.get("sheltereeRequestData.UnSelectedSheltereeIds").splice($.inArray(id, arrayUnSel), 1);
                            }

                            if ($.inArray(id, arraySel) < 0) {
                                vm.get("sheltereeRequestData.SelectedSheltereeIds").push(id);
                            }

                            dbOrigSelCnt = dbOrigSelCnt + 1;
                        })

                        if (dbOrigSelCnt < 0)
                            dbOrigSelCnt = 0;
                        vm.set("sheltereeRequestData.SelectedIdsCount", dbOrigSelCnt);

                    }
                    else {

                        var dbSelCnt = vm.get("sheltereeRequestData.SelectedIdsCount");


                        $(childItems).prop("checked", false);
                        $(childItems).each(function (index, obj) {
                            var id = $(obj).attr("data-id");

                            if ($.inArray(id, arraySel) > -1) {
                                vm.get("sheltereeRequestData.SelectedSheltereeIds").splice($.inArray(id, arraySel), 1);
                            }

                            if ($.inArray(id, arrayUnSel) < 0) {
                                vm.get("sheltereeRequestData.UnSelectedSheltereeIds").push(id);
                            }

                            dbSelCnt = dbSelCnt - 1;
                        })

                        if (dbSelCnt < 0)
                            dbSelCnt = 0;

                        vm.set("sheltereeRequestData.SelectedIdsCount", dbSelCnt);
                    }

                    var ds = vm.get("dsSheltereeDischargeList");


                    $(ds.data()).each(function (index, obj) {

                        if (jQuery.inArray(obj.Id, vm.get("sheltereeRequestData.SelectedSheltereeIds")) >= 0) {
                            obj.IsSelected = true;

                        }
                        else {
                            obj.IsSelected = false;
                        }
                    })


                    if ((vm.sheltereeRequestData.ViewAll) && (vm.get("sheltereeRequestData.SelectedSheltereeIds").length > 0)) {

                        vm.sheltereeRequestData.FetchSelectedOnly = true;
                        moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = true;

                    }


                    //vm.refreshSnapShot();
                })
            },


            refreshSheltereeGrid: function (e) {
                $ct.helpers.displayWorkAreaBusyCursor();
                //                $("#vwmpPatientsLst").data("kendoGrid").dataSource.filter({});
                //                vm.set("searchToken", "");
                //                vm.set("selectedFacilityTypeItem", vm.get("dsFacilityTypes").at(1));
                //                vm.set("facilityTypeId", vm.get("dsFacilityTypes").at(1).Key);
                //vm.refreshSnapShot();
                vm.dsSheltereeDischargeList.read();
                $ct.helpers.hideWorkAreaBusyCursor();
            },


            clearData: function () {

                //$ct.helpers.displayWorkAreaBusyCursor();


                vm.sheltereeRequestData.ViewAll = true;
                vm.sheltereeRequestData.FetchSelectedOnly = false;
                vm.sheltereeRequestData.SelectedSheltereeIds = new kendo.data.ObservableArray([]);
                vm.sheltereeRequestData.UnSelectedSheltereeIds = new kendo.data.ObservableArray([]);

                moduleContext.parentContext.sheltereeRequestData.ViewAll = true;
                moduleContext.parentContext.sheltereeRequestData.FetchSelectedOnly = false;
                moduleContext.parentContext.sheltereeRequestData.SelectedSheltereeIds = new kendo.data.ObservableArray([]);
                moduleContext.parentContext.sheltereeRequestData.UnSelectedSheltereeIds = new kendo.data.ObservableArray([]);

                vm.set("sheltereeRequestData.SelectedIdsCount", 0);

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


                this.initializeSheltereeHeader();
                this.clearData();

            },


            btnAddClick: function (e) {
                //moduleContext.notify($ct.en.getAddEditPatientRefresh(), null);
                this.setFetchSelectedDataParams();
                Boiler.UrlController.goTo(this.sheltereeEditUrl(true));
            },




            btnBulkUpdateClick: function () {


                this.setFetchSelectedDataParams();

                //if (this.dsSheltereeDischargeList.data().length == 0) {

                if (
                      !(
                            (vm.get("sheltereeRequestData.SelectedSheltereeIds").length > 0) ||
                            (vm.hasCachedData && !vm.isLastPageCachedData)
                      )
                   ) {


                    var errorObject = {};
                    errorObject.messageType = $ct.mt.getError();
                    errorObject.message = "Please select records to bulk update";
                    moduleContext.notify($ct.en.getShowErrorMsg(), errorObject);

                    return;
                }


                $ct.ds.sheltree.sheltree.getSheltereeDischargeBulkUpdateLookup(this, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        // Boiler.UrlController.goTo($ct.rn.getPatients());
                    } else {
                        //moduleContext.notify($ct.en.getBulkUpdatePatients(), null);
                        Boiler.UrlController.goTo($ct.rn.getBulkUpdateSheltereeDischarge());
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
                Boiler.UrlController.goTo(this.sheltereeEditUrl(false));
            },


            btnExportExcelClick: function () {


                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();


                $ct.ds.sheltree.sheltree.exportSheltereeDischargeesListToExcel(this, function (result) {

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


            sheltereeEditUrl: function (isNew) {

                if (!isNew) {
                    return $ct.rn.getShelteree() + "/" + this.selectedId + "/" + this.selectedShelterId;

                }
                else {
                    return $ct.rn.getShelteree() + "/" + $ct.constants.getemptyGUID() + "/" + moduleContext.parentContext.sheltereeHeaderData.shelter.Id;
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


