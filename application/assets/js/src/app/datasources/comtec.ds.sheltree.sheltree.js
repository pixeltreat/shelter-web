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

    var deleteSheltereeById = function (selSheltereeId, selSheltereeVersion, successCallBack) {

        var requestParam = {};

        requestParam.Id = selSheltereeId;
        requestParam.SheltereeVersion = selSheltereeVersion;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'DeleteShelteree', requestParam, function (result) {

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

        requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'ExportSheltereeDataToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };

    var getSheltereeBulkUpdateLookup = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeBulKUpdateLookupData', requestParam, function (result) {

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

        requestParam.SelectedTransportationTypeId = reqObj.valTransportationType;
        requestParam.SelectedDispositionId = reqObj.valDisposition;

        if (reqObj.valDischargeDate == null) {
            requestParam.SelectedDischargeDate = reqObj.valDischargeDate;
        }
        else {
            var DischargeDate = (reqObj.valDischargeDate.getMonth() + 1) + "/" + reqObj.valDischargeDate.getDate() + "/" + reqObj.valDischargeDate.getFullYear();
            requestParam.SelectedDischargeDate = DischargeDate;
        }
       
        if (reqObj.valArrivalDate == null) {
            
            requestParam.SelectedArrivalDate = reqObj.valArrivalDate;
        }
        else {

            var ArrivalDate = (reqObj.valArrivalDate.getMonth() + 1) + "/" + reqObj.valArrivalDate.getDate() + "/" + reqObj.valArrivalDate.getFullYear();
            requestParam.SelectedArrivalDate = ArrivalDate;
        }

        if (reqObj.valDischargeTime == null) {
            requestParam.SelectedDischargeTime = reqObj.valDischargeTime;
        }
        else {

            var DischargeTime = (reqObj.valDischargeTime.getHours()) + ":" + reqObj.valDischargeTime.getMinutes();
            requestParam.SelectedDischargeTime = DischargeTime;
        }

        if (reqObj.valArrivalTime == null) {
            requestParam.SelectedArrivalTime = reqObj.valArrivalTime;
        }
        else {

            var ArrivalTime = (reqObj.valArrivalTime.getHours()) + ":" + reqObj.valArrivalTime.getMinutes();
            requestParam.SelectedArrivalTime = ArrivalTime;
        }

        requestParam.Destination = reqObj.valDestination;

        requestParam.SelectedDepartureTransportationTypeId = reqObj.valDepartureModeOfTransportationType;
       
        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'BulkUpdateSheltereeData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    //var getActiveEvents = function (ViewModel, successCallBack) {

    //    var requestParam = {};


    //    requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

    //    $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetActiveEvent', requestParam, function (result) {

    //        if (successCallBack != null)
    //            successCallBack(result);

    //    }, null, true)


    //    return "";
    //};

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

        requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'ExportSheltereeDischargeDataToExcel', requestParam, function (result) {


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

        requestParam.SelectedSheltereeIds = ViewModel.get("sheltereeRequestData.SelectedSheltereeIds");
        requestParam.UnSelectedSheltereeIds = ViewModel.get("sheltereeRequestData.UnSelectedSheltereeIds");
        requestParam.ViewAll = ViewModel.sheltereeRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.sheltereeRequestData.FetchSelectedOnly;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'ExportSheltereeMedicalUpdateDataToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };

    var generatereportsforDischargeesList = function (ViewModel, successCallBack) {

        var requestParam = {};
       
        requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeDischargeReportData', requestParam, function (result) {


                if (successCallBack != null)
                    successCallBack(result);

        }, null, true)

        return "";

    };

    var generatereportsforMedicalUpdateesList = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.ShelterId = ViewModel.sheltereeHeaderData.shelter.Id;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeMedicalSummaryReportData', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };

    var commentMedicalUpdateList = function (MedicalUpdateListId, successCallBack) {

        var requestParam = {};

        requestParam.Id = MedicalUpdateListId;

        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeComments', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var commentSaveMedicalUpdateList = function (MedicalUpdateListData, successCallBack) {



        //getSheltereeFacilityUrl
        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'SaveSheltereeComment', MedicalUpdateListData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };
    var downloadSheltereeTemplate = function (successCallBack) {

        var Data = "";

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'DownloadSheltereeTemplate', Data, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };

    var generateSheltereeReportClick = function (ReportData, successCallBack) {

        var requestParam = {};
        requestParam.SheltereeId = ReportData.sheltereeId;
        requestParam.EventId = ReportData.eventId;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereePDFReport', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };
    

    return {

        getShelterees: getShelterees,
        deleteSheltereeById: deleteSheltereeById,
        exportSheltereesListToExcel: exportSheltereesListToExcel,
        getSheltereeBulkUpdateLookup: getSheltereeBulkUpdateLookup,
        bulkUpdateSheltereeData: bulkUpdateSheltereeData,
       // getActiveEvents: getActiveEvents,
        getImportActionOptions: getImportActionOptions,
        getExportFailedImportedSheltereeDataToExcel: getExportFailedImportedSheltereeDataToExcel,
        downloadSheltereeToExcel: downloadSheltereeToExcel,
        getSheltereeDischargees: getSheltereeDischargees,
        exportSheltereeDischargeesListToExcel: exportSheltereeDischargeesListToExcel,
        getSheltereeMedicalUpdatees: getSheltereeMedicalUpdatees,
        exportSheltereeMedicalUpdateesListToExcel: exportSheltereeMedicalUpdateesListToExcel,
        generatereportsforMedicalUpdateesList:generatereportsforMedicalUpdateesList,
        generatereportsforDischargeesList:generatereportsforDischargeesList,
        commentMedicalUpdateList: commentMedicalUpdateList,
        commentSaveMedicalUpdateList: commentSaveMedicalUpdateList,
        downloadSheltereeTemplate: downloadSheltereeTemplate,
        generateSheltereeReportClick: generateSheltereeReportClick

    };

}();