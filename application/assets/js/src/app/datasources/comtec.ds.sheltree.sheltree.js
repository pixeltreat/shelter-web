$ct.ds.sheltree.sheltree = function () {

    var getShelterees = function (ViewModel, successCallBack) {

        var datasource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    var filter = null;
                    if (options.data.filter !== undefined) {
                        filter = options.data.filter;
                    }
                    var sort = null;
                    if (options.data.sort !== undefined) {
                        sort = options.data.sort;
                    }
                    var requestParam = {};
                    requestParam.Criteria = { PageSize: options.data.pageSize, PageIndex: options.data.page, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };
                    //TODO:

                    requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;
                    //requestParam.ShelterId = 1;
                   
                    requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
                    requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
                    requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
                    requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;


                    ViewModel.set("selectedId", "-1");
                  
                    $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetShelterees', requestParam, function (result) {

                        if ($ct.mt.isNoDataFound(result)) {
                            var currPageIndex = datasource.page();
                            if (currPageIndex > 1)
                                datasource.page(currPageIndex - 1);
                        }

                        options.success(result);

                        if (successCallBack != null)
                            successCallBack(result);
                    }, null, true)
                }
            },
            serverSorting: true,
            serverPaging: true,
            serverFiltering: true,
            pageSize: 10,
            schema: {
                data: function (response) {
                    return response.Data.SheltereeRawData;
                },
                total: function (response) {

                    if (response != null && response != undefined && response != "")
                        return response.TotalRecords;
                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                        //IsMedical: { type: "boolean" }
                    }
                }
            }
        });

        return datasource;


    };

    var deleteSheltereeById = function (selEmployeeId, selEmployeeVersion, successCallBack) {

        var requestParam = {};

        requestParam.Id = selEmployeeId;
        requestParam.EmployeeVersion = selEmployeeVersion;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'DeleteEmployee', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";

    };

    var exportSheltereesListToExcel = function (ViewModel, successCallBack) {

        var filter = null;
        if (ViewModel.dsSheltereeList.filter() !== undefined) {
            filter = ViewModel.dsSheltereeList.filter();
        }
        var sort = null;
        if (ViewModel.dsSheltereeList.sort() !== undefined) {
            sort = ViewModel.dsSheltereeList.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsSheltereeList.page() !== undefined) {
            pageIndex = ViewModel.dsSheltereeList.page();
        }

        var pageSize = 10;
        if (ViewModel.dsSheltereeList.pageSize() !== undefined) {
            pageSize = ViewModel.dsSheltereeList.pageSize();
        }


        var requestParam = {};
        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };

        requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

        requestParam.SelectedEmployeeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'ExportEmployeeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };
    var getSheltereeBulkUpdateLookup = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.SelectedEmployeeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployeeBulKUpdateLookupData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);
        }, null, true)

        return "";
    };
    var bulkUpdateSheltereeData = function (ViewModel, successCallBack) {

        var requestParam = {};
        var reqObj = ViewModel.saveRequest;

        requestParam.ShelterId = ViewModel.shelterId;
        // requestParam.SelectedPatientIds = ViewModel.SelectedPatientIds;

        requestParam.SelectedStaffTypeId = reqObj.valStaffType;
        requestParam.SelectedDepartmentId = reqObj.valDepartment;
        requestParam.SelectedShiftId = reqObj.valShiftTime;
        requestParam.SelectedStaffSpecialityId = reqObj.valStaffSpeciality;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'BulkUpdateEmployeeData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };
    var getActiveEvents = function (ViewModel, successCallBack) {

        var requestParam = {};


        requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetActiveEvent', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var getImportActionOptions = function (successCallBack) {

        var requestParam = "";
        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeImportActionOptions', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var getExportFailedImportedSheltereeDataToExcel = function (viewModel, successCallBack) {
        var requestParam = { "FileContentId": viewModel.FileContentId, "FacilityId": viewModel.FacilityId };
        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'ExportFailedImportedSheltreeToExcel', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);
        }, null, true)

        return '';
    };

    var downloadSheltereeToExcel = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.ShelterId = ViewModel.selectedShelterItem.Id;


        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'DownloadSheltereeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";


    };

    var getSheltereeDischargees = function (ViewModel, successCallBack) {

        var datasource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    var filter = null;
                    if (options.data.filter !== undefined) {
                        filter = options.data.filter;
                    }
                    var sort = null;
                    if (options.data.sort !== undefined) {
                        sort = options.data.sort;
                    }
                    var requestParam = {};
                    requestParam.Criteria = { PageSize: options.data.pageSize, PageIndex: options.data.page, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };
                    //TODO:

                    requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;
                    //requestParam.ShelterId = 1;

                    requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
                    requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
                    requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
                    requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

                    ViewModel.set("selectedId", "-1");
                    
                    $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeDischargeView', requestParam, function (result) {

                        if ($ct.mt.isNoDataFound(result)) {
                            var currPageIndex = datasource.page();
                            if (currPageIndex > 1)
                                datasource.page(currPageIndex - 1);
                        }

                        options.success(result);

                        if (successCallBack != null)
                            successCallBack(result);
                    }, null, true)
                }
            },
            serverSorting: true,
            serverPaging: true,
            serverFiltering: true,
            pageSize: 10,
            schema: {
                data: function (response) {
                    return response.Data.DischargeRawData;
                },
                total: function (response) {

                    if (response != null && response != undefined && response != "")
                        return response.TotalRecords;
                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                       // IsMedical: { type: "boolean" }
                    }
                }
            }
        });

        return datasource;


    };
    var deleteSheltereeDischargeById = function (selEmployeeId, selEmployeeVersion, successCallBack) {

        var requestParam = { };

        requestParam.Id = selEmployeeId;
        requestParam.EmployeeVersion = selEmployeeVersion;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'DeleteEmployee', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

}, null, true)


        return "";

        };
    var exportSheltereeDischargeesListToExcel = function (ViewModel, successCallBack) {

        var filter = null;
        if (ViewModel.dsSheltereeDischargeList.filter() !== undefined) {
            filter = ViewModel.dsSheltereeDischargeList.filter();
        }
        var sort = null;
        if (ViewModel.dsSheltereeDischargeList.sort() !== undefined) {
            sort = ViewModel.dsSheltereeDischargeList.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsSheltereeDischargeList.page() !== undefined) {
            pageIndex = ViewModel.dsSheltereeDischargeList.page();
        }

        var pageSize = 10;
        if (ViewModel.dsSheltereeDischargeList.pageSize() !== undefined) {
            pageSize = ViewModel.dsSheltereeDischargeList.pageSize();
        }


        var requestParam = {};
        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };

        requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

        requestParam.SelectedEmployeeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;


        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'ExportEmployeeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };
    var getSheltereeDischargeBulkUpdateLookup = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.SelectedEmployeeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployeeBulKUpdateLookupData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);
        }, null, true)

        return "";
    };
    var bulkUpdateSheltereeDischargeData = function (ViewModel, successCallBack) {

        var requestParam = {};
        var reqObj = ViewModel.saveRequest;

        requestParam.ShelterId = ViewModel.shelterId;
        // requestParam.SelectedPatientIds = ViewModel.SelectedPatientIds;

        requestParam.SelectedStaffTypeId = reqObj.valStaffType;
        requestParam.SelectedDepartmentId = reqObj.valDepartment;
        requestParam.SelectedShiftId = reqObj.valShiftTime;
        requestParam.SelectedStaffSpecialityId = reqObj.valStaffSpeciality;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'BulkUpdateEmployeeData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var getSheltereeMedicalUpdatees = function (ViewModel, successCallBack) {

        var datasource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    var filter = null;
                    if (options.data.filter !== undefined) {
                        filter = options.data.filter;
                    }
                    var sort = null;
                    if (options.data.sort !== undefined) {
                        sort = options.data.sort;
                    }
                    var requestParam = {};
                    requestParam.Criteria = { PageSize: options.data.pageSize, PageIndex: options.data.page, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };
                    //TODO:
                    requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;
                    //requestParam.ShelterId = 1;

                    requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
                    requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
                    requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
                    requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

                    ViewModel.set("selectedId", "-1");
                    
                    $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeMedicalUpdateView', requestParam, function (result) {

                        if ($ct.mt.isNoDataFound(result)) {
                            var currPageIndex = datasource.page();
                            if (currPageIndex > 1)
                                datasource.page(currPageIndex - 1);
                        }

                        options.success(result);

                        if (successCallBack != null)
                            successCallBack(result);
                    }, null, true)
                }
            },
            serverSorting: true,
            serverPaging: true,
            serverFiltering: true,
            pageSize: 10,
            schema: {
                data: function (response) {
                    return response.Data.MedicalUpdateRawData;
                },
                total: function (response) {

                    if (response != null && response != undefined && response != "")
                        return response.TotalRecords;
                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                        IsMedical: { type: "boolean" }
                    }
                }
            }
        });

        return datasource;


    };
    var deleteSheltereeMedicalUpdateById = function (selEmployeeId, selEmployeeVersion, successCallBack) {

        var requestParam = {};

        requestParam.Id = selEmployeeId;
        requestParam.EmployeeVersion = selEmployeeVersion;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'DeleteEmployee', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";

    };
    var exportSheltereeMedicalUpdateesListToExcel = function (ViewModel, successCallBack) {

        var filter = null;
        if (ViewModel.dsSheltereeMedicalUpdateList.filter() !== undefined) {
            filter = ViewModel.dsSheltereeMedicalUpdateList.filter();
        }
        var sort = null;
        if (ViewModel.dsSheltereeMedicalUpdateList.sort() !== undefined) {
            sort = ViewModel.dsSheltereeMedicalUpdateList.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsSheltereeMedicalUpdateList.page() !== undefined) {
            pageIndex = ViewModel.dsSheltereeMedicalUpdateList.page();
        }

        var pageSize = 10;
        if (ViewModel.dsSheltereeMedicalUpdateList.pageSize() !== undefined) {
            pageSize = ViewModel.dsSheltereeMedicalUpdateList.pageSize();
        }


        var requestParam = {};
        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };

        requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

        requestParam.SelectedEmployeeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'ExportEmployeeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };
    var getSheltereeMedicalUpdateBulkUpdateLookup = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.SelectedEmployeeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployeeBulKUpdateLookupData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);
        }, null, true)

        return "";
    };
    var bulkUpdateSheltereeMedicalUpdateData = function (ViewModel, successCallBack) {

        var requestParam = {};
        var reqObj = ViewModel.saveRequest;

        requestParam.ShelterId = ViewModel.shelterId;
        // requestParam.SelectedPatientIds = ViewModel.SelectedPatientIds;

        requestParam.SelectedStaffTypeId = reqObj.valStaffType;
        requestParam.SelectedDepartmentId = reqObj.valDepartment;
        requestParam.SelectedShiftId = reqObj.valShiftTime;
        requestParam.SelectedStaffSpecialityId = reqObj.valStaffSpeciality;
        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'BulkUpdateEmployeeData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {

        getShelterees:getShelterees,
        deleteSheltereeById: deleteSheltereeById,
        exportSheltereesListToExcel: exportSheltereesListToExcel,
        getSheltereeBulkUpdateLookup:getSheltereeBulkUpdateLookup,
        bulkUpdateSheltereeData:bulkUpdateSheltereeData,
        getActiveEvents: getActiveEvents,
        getImportActionOptions:getImportActionOptions,
        getExportFailedImportedSheltereeDataToExcel: getExportFailedImportedSheltereeDataToExcel,
        downloadSheltereeToExcel: downloadSheltereeToExcel,
        getSheltereeDischargees: getSheltereeDischargees,
        deleteSheltereeDischargeById: deleteSheltereeDischargeById,
        exportSheltereeDischargeesListToExcel: exportSheltereeDischargeesListToExcel,
        getSheltereeDischargeBulkUpdateLookup: getSheltereeDischargeBulkUpdateLookup,
        bulkUpdateSheltereeDischargeData: bulkUpdateSheltereeDischargeData,

        getSheltereeMedicalUpdatees: getSheltereeMedicalUpdatees,
        deleteSheltereeMedicalUpdateById: deleteSheltereeMedicalUpdateById,
        exportSheltereeMedicalUpdateesListToExcel: exportSheltereeMedicalUpdateesListToExcel,
        getSheltereeMedicalUpdateBulkUpdateLookup: getSheltereeMedicalUpdateBulkUpdateLookup,
        bulkUpdateSheltereeMedicalUpdateData:bulkUpdateSheltereeMedicalUpdateData


    };

}();