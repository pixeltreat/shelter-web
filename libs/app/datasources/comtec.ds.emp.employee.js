$ct.ds.emp.employee = function () {

    var getImportActionOptions = function (successCallBack) {

        var requestParam = "";
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetImportActionOptions', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var getExportFailedImportedEmployeeDataToExcel = function (viewModel, successCallBack) {
        var requestParam = { "FileContentId": viewModel.FileContentId, "FacilityId": viewModel.FacilityId };
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'ExportFailedImportedEmployeeToExcel', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);
        }, null, true)

        return '';
    }

   

    var getEmployees = function (ViewModel, successCallBack) {

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
                    requestParam.ShelterId = ViewModel.empHeaderData.shelter.Id;
                  
                    requestParam.SelectedEmployeeIds = ViewModel.get("empRequestData.SelectedEmployeeIds");
                    requestParam.UnSelectedEmployeeIds = ViewModel.get("empRequestData.UnSelectedEmployeeIds");
                    requestParam.ViewAll = ViewModel.empRequestData.ViewAll;
                    requestParam.FetchSelectedOnly = ViewModel.empRequestData.FetchSelectedOnly;
                   
                    ViewModel.set("selectedId", "-1");
                    
                    $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployees', requestParam, function (result) {

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
                    return response.Data.Employees;
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

    var getEmployeeExpandedList = function (ViewModel, successCallBack) {

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

                    requestParam.ShelterId = ViewModel.empHeaderData.shelter.Id;
                    
                    requestParam.SelectedEmployeeIds = ViewModel.get("empRequestData.SelectedEmployeeIds");
                    requestParam.UnSelectedEmployeeIds = ViewModel.get("empRequestData.UnSelectedEmployeeIds");
                    requestParam.ViewAll = ViewModel.empRequestData.ViewAll;
                    requestParam.FetchSelectedOnly = ViewModel.empRequestData.FetchSelectedOnly;

                    ViewModel.set("selectedId", $ct.constants.getemptyGUID());

                    $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetExpandedEmployees', requestParam, function (result) {

                        if (result.Data.ExpandedEmployees.length === 0) {
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
                    //ViewModel.set("SelectedEmployeeIds", response.Data.SelectedEmployeeIds);
                    return response.Data.ExpandedEmployees;
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

    var getEmployeeBulkUpdateLookup = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.SelectedEmployeeIds = ViewModel.get("empRequestData.SelectedEmployeeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("empRequestData.UnSelectedEmployeeIds");
        requestParam.ViewAll = ViewModel.empRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.empRequestData.FetchSelectedOnly;

        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployeeBulKUpdateLookupData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);
        }, null, true)

        return "";
    };


    var bulkUpdateEmployeeData = function (ViewModel, successCallBack) {

        var requestParam = {};
        var reqObj = ViewModel.saveRequest;

        requestParam.ShelterId = ViewModel.shelterId;
        // requestParam.SelectedPatientIds = ViewModel.SelectedPatientIds;

        requestParam.SelectedStaffTypeId = reqObj.valStaffType;
        requestParam.SelectedDepartmentId = reqObj.valDepartment;
        requestParam.SelectedShiftId = reqObj.valShiftTime;
        requestParam.SelectedStaffSpecialityId = reqObj.valStaffSpeciality;

        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'BulkUpdateEmployeeData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };






    var deleteEmployeeById = function (selEmployeeId, selEmployeeVersion, successCallBack) {

        var requestParam = {};

        requestParam.Id = selEmployeeId;
        requestParam.EmployeeVersion = selEmployeeVersion;
        
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'DeleteEmployee', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";

    };



    var getEmployeeById = function (employeeId, successCallBack) {

        var requestParam = {};

        requestParam.EmployeeId = employeeId;

        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployeeById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var saveEmployee = function (saveEmployeeData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'SaveEmployee', saveEmployeeData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var exportEmployeesListToExcel = function (ViewModel, successCallBack) {

        var filter = null;
        if (ViewModel.dsEmployeeList.filter() !== undefined) {
            filter = ViewModel.dsEmployeeList.filter();
        }
        var sort = null;
        if (ViewModel.dsEmployeeList.sort() !== undefined) {
            sort = ViewModel.dsEmployeeList.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsEmployeeList.page() !== undefined) {
            pageIndex = ViewModel.dsEmployeeList.page();
        }

        var pageSize = 10;
        if (ViewModel.dsEmployeeList.pageSize() !== undefined) {
            pageSize = ViewModel.dsEmployeeList.pageSize();
        }


        var requestParam = {};
        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };

        requestParam.ShelterId = ViewModel.empHeaderData.shelter.Id;
      

        //+Note Request Data Added
        requestParam.SelectedEmployeeIds = ViewModel.get("empRequestData.SelectedEmployeeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("empRequestData.UnSelectedEmployeeIds");
        requestParam.ViewAll = ViewModel.empRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.empRequestData.FetchSelectedOnly;

        
        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'ExportEmployeeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";

    };


    var exportEmplyeesExpandedListToExcel = function (ViewModel, successCallBack) {


        var filter = null;
        if (ViewModel.dsEmployeeExpandedList.filter() !== undefined) {
            filter = ViewModel.dsEmployeeExpandedList.filter();
        }
        var sort = null;
        if (ViewModel.dsEmployeeExpandedList.sort() !== undefined) {
            sort = ViewModel.dsEmployeeExpandedList.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsEmployeeExpandedList.page() !== undefined) {
            pageIndex = ViewModel.dsEmployeeExpandedList.page();
        }

        var pageSize = 10;
        if (ViewModel.dsEmployeeExpandedList.pageSize() !== undefined) {
            pageSize = ViewModel.dsEmployeeExpandedList.pageSize();
        }


        var requestParam = {};
        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };
        requestParam.ShelterId = ViewModel.empHeaderData.shelter.Id;
     

        //+Note Request Data Added
        requestParam.SelectedEmployeeIds = ViewModel.get("empRequestData.SelectedEmployeeIds");
        requestParam.UnSelectedEmployeeIds = ViewModel.get("empRequestData.UnSelectedEmployeeIds");
        requestParam.ViewAll = ViewModel.empRequestData.ViewAll;
        requestParam.FetchSelectedOnly = ViewModel.empRequestData.FetchSelectedOnly;



        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'ExportExpandedEmployeeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";


    };


    var getActiveEvents = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.ShelterId = ViewModel.empHeaderData.shelter.Id;
        
        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetActiveEvent', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var downloadEmployeeToExcel = function (ViewModel, successCallBack) {

        var requestParam = {};

        requestParam.ShelterId = ViewModel.selectedShelterItem.Id;


        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'DownloadEmployeeToExcel', requestParam, function (result) {


            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";


    };

    var getEmployeeColumnLookup = function (successCallBack) {
      
        var requestParam = "";

        $ct.ajax.ajaxPost($ct.cn.getEmployeeUrl() + 'GetEmployeeFilterLookupData', requestParam, function (result) {
           
            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };



    return {

            getImportActionOptions: getImportActionOptions,
            getExportFailedImportedEmployeeDataToExcel: getExportFailedImportedEmployeeDataToExcel,
            getEmployeeBulkUpdateLookup  : getEmployeeBulkUpdateLookup ,
            bulkUpdateEmployeeData: bulkUpdateEmployeeData,
            getEmployees: getEmployees,
            getEmployeeExpandedList:getEmployeeExpandedList,
            deleteEmployeeById: deleteEmployeeById,
            getEmployeeById: getEmployeeById,
            saveEmployee: saveEmployee,
            exportEmployeesListToExcel: exportEmployeesListToExcel,
            exportEmplyeesExpandedListToExcel:exportEmplyeesExpandedListToExcel,
            downloadEmployeeToExcel: downloadEmployeeToExcel,
            getActiveEvents: getActiveEvents,
            getEmployeeColumnLookup: getEmployeeColumnLookup

    };

}();