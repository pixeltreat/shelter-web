$ct.ds.emp.empattendance = function () {


    var getEmployeeAttendenceEvent = function (successCallBack) {
        var Data = {};
        Data.ShelterId = 1;
        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetActiveEvent', Data, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };
    var getEmployeeAttendenceInitialLoad = function (successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getEmployeeAttendanceUrl() + 'GetEmployeeShiftTime', "", function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };
    var getEmployeeAttendenceFacilities = function (successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getShelterUrl() + 'GetSheltersWithSecurity', "", function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getEmployeeAttendence = function (ViewModel, successCallBack) {

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
                    requestParam.Criteria = { PageSize: options.data.pageSize, PageIndex: options.data.page, SearchToken: "", Filter: filter, Sort: sort };


                    //previousAttendenceDatestring
                    
                    
                    
                    
                    requestParam.FacilityId = ViewModel.previousSelectedFacility;
                   
                   
                    requestParam.PrevShiftDate = ViewModel.previousAttendenceDatestring;
                    requestParam.CurrShiftDate = ViewModel.attendenceDatestring;
                    requestParam.ShiftId = ViewModel.previousSelectedShift;
                    requestParam.SelectedEmployeeIds = ViewModel.dcRequestData.selectedEmployeeIds;
                    requestParam.UnSelectedEmployeeIds = ViewModel.dcRequestData.unSelectedEmployeeIds;
                    requestParam.ViewAll = ViewModel.dcRequestData.viewAll;
                    requestParam.FetchSelectedOnly = ViewModel.dcRequestData.fetchSelectedOnly;


                    $ct.ajax.ajaxPost($ct.cn.getEmployeeAttendanceUrl() + 'GetEmployeeAttendance', requestParam, function (result) {

                        ViewModel.set("dcRequestData.viewAll", false);
                        ViewModel.set("dcRequestData.fetchSelectedOnly", false);

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

                    $.each(response.Data.EmployeeAttendanceRawData, function (index, record) {

                        record.hideValidation = true;
                        record.saveClicked = false;
                        record.StatusLookUpData = response.Data.StatusLookUpData;


                    });

                    return response.Data.EmployeeAttendanceRawData;
                },
                total: function (response) {

                    if (response != null && response != undefined && response != "")
                        return response.TotalRecords;
                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                       
                    }
                }
            }
        });

        
        return datasource;


    };

    var saveEmployeeAttendence = function (saveEmployeeAttendenceData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getEmployeeAttendanceUrl() + 'SaveEmployeeAttendance', saveEmployeeAttendenceData, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var bulkUpdateEmployeeAttendence = function (bulkUpdateEmployeeAttendenceData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getEmployeeAttendanceUrl() + 'BulkUpdateSelectedEmployeeAttendance', bulkUpdateEmployeeAttendenceData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var exportEmployeeAttendenceToExcel = function (ViewModel, successCallBack) {


        var filter = null;
        if (ViewModel.dsEmployeeAttendance.filter() !== undefined) {
            filter = ViewModel.dsEmployeeAttendance.filter();
        }

        var sort = null;
        if (ViewModel.dsEmployeeAttendance.sort() !== undefined) {
            sort = ViewModel.dsEmployeeAttendance.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsEmployeeAttendance.page() !== undefined) {
            pageIndex = ViewModel.dsEmployeeAttendance.page();
        }

        var pageSize = 10;
        if (ViewModel.dsEmployeeAttendance.pageSize() !== undefined) {
            pageSize = ViewModel.dsEmployeeAttendance.pageSize();
        }

        var requestParam = {};

        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, Filter: filter, Sort: sort };
       
       
      
        requestParam.FacilityId = ViewModel.previousSelectedFacility;
        requestParam.PrevShiftDate = ViewModel.previousAttendenceDatestring;
        requestParam.CurrShiftDate = ViewModel.attendenceDatestring;
        requestParam.ShiftId = ViewModel.previousSelectedShift;
        requestParam.SelectedEmployeeIds = ViewModel.get("dcRequestData.selectedEmployeeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("dcRequestData.unSelectedEmployeeIds");
        requestParam.ViewAll = ViewModel.dcRequestData.viewAll;
        requestParam.FetchSelectedOnly = ViewModel.dcRequestData.fetchSelectedOnly;

        $ct.ajax.ajaxPost($ct.cn.getEmployeeAttendanceUrl() + 'ExportEmployeeAttendanceToExcel', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };
    return {
        getEmployeeAttendenceEvent: getEmployeeAttendenceEvent,
        getEmployeeAttendenceInitialLoad: getEmployeeAttendenceInitialLoad,
        getEmployeeAttendenceFacilities: getEmployeeAttendenceFacilities,
        getEmployeeAttendence: getEmployeeAttendence,
        saveEmployeeAttendence: saveEmployeeAttendence,
        bulkUpdateEmployeeAttendence: bulkUpdateEmployeeAttendence,
        exportEmployeeAttendenceToExcel: exportEmployeeAttendenceToExcel

    };



}();