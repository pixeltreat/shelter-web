$ct.ds.admin.department = function () {


    var getDepartments = function (ViewModel, successCallBack) {

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

                    ViewModel.set("selectedId", -1);

                    $ct.ajax.ajaxPost($ct.cn.getDepartmentServiceUrl() + 'GetDepartments', requestParam, function (result) {
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
                    return response.Data;
                },
                total: function (response) {

                    if (response != null && response != undefined && response != "")
                        return response.TotalRecords;
                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                        DisplayOrder: { type: "number" },
                        HVAC: { type: "boolean" }
                    }
                }
            }
        });

        //  datasource.fetch();
        return datasource;


    };

    var deleteDepartmentById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.DepartmentId = ViewModel.selectedId;
        requestParam.DepartmentVersion = ViewModel.selectedRecordVersion;
        //change url
        $ct.ajax.ajaxPost($ct.cn.getDepartmentServiceUrl() + 'DeleteDepartment', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getDepartmentById = function (departmentId, successCallBack) {

        var requestParam = {};

        requestParam.departmentId = departmentId;

        $ct.ajax.ajaxPost($ct.cn.getDepartmentServiceUrl() + 'GetDepartmentById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveDepartment = function (departmentData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getDepartmentServiceUrl() + 'SaveDepartment', departmentData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };



    return {
        getDepartments: getDepartments,
        deleteDepartmentById: deleteDepartmentById,
        getDepartmentById: getDepartmentById,
        saveDepartment: saveDepartment
    };

}();

