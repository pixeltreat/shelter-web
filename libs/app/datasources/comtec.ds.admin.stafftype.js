$ct.ds.admin.stafftype = function () {


    var getStaffTypes = function (ViewModel, successCallBack) {
       
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

                    $ct.ajax.ajaxPost($ct.cn.getStaffTypeServiceUrl() + 'GetStaffTypes', requestParam, function (result) {
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

    var deletegetStaffTypesById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.StaffTypeId = ViewModel.selectedId;
        requestParam.StaffTypeVersion = ViewModel.selectedRecordVersion;
        //change url
        $ct.ajax.ajaxPost($ct.cn.getStaffTypeServiceUrl() + 'DeleteStaffType', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getStaffTypesById = function (staffTypeId, successCallBack) {

        var requestParam = {};

        requestParam.StaffTypeId = staffTypeId;
        //change url
        $ct.ajax.ajaxPost($ct.cn.getStaffTypeServiceUrl() + 'GetStaffTypeById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveStaffTypes = function (staffTypeData, successCallBack) {
        //change url
        $ct.ajax.ajaxPost($ct.cn.getStaffTypeServiceUrl() + 'SaveStaffType', staffTypeData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };



    return {
        getStaffTypes: getStaffTypes,
        deletegetStaffTypesById: deletegetStaffTypesById,
        getStaffTypesById: getStaffTypesById,
        saveStaffTypes: saveStaffTypes
    };

}();


