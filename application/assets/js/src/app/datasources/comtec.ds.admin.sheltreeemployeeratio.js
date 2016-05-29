$ct.ds.admin.sheltreeEmployeeRatio = function () {

    var getSheltreeEmployeeRatio = function (ViewModel, successCallBack) {
        
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

                    $ct.ajax.ajaxPost($ct.cn.getSheltreeEmployeeRatioUrl() + 'GetSheltreeEmployeeRatios', requestParam, function (result) {
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
                        SheltreeCount: { type: "number" },
                        EmployeeCount: { type: "number" },

                    }
                }
            }
        });

        return datasource;


    };

    var deletesheltreeEmployeeRatioById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.SheltreeEmployeeRatioId = ViewModel.selectedId;
        requestParam.SheltreeEmployeeRatioVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getSheltreeEmployeeRatioUrl() + 'DeleteSheltreeEmployeeRatio', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getsheltreeEmployeeRatioById = function (sheltreeEmployeeRatioId, successCallBack) {

        var requestParam = {};

        requestParam.SheltreeEmployeeRatioId = sheltreeEmployeeRatioId;

        $ct.ajax.ajaxPost($ct.cn.getSheltreeEmployeeRatioUrl() + 'GetSheltreeEmployeeRatioById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var savesheltreeEmployeeRatio = function (saveAgencyData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getSheltreeEmployeeRatioUrl() + 'SaveSheltreeEmployeeRatio', saveAgencyData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {
        getSheltreeEmployeeRatio: getSheltreeEmployeeRatio,
        deletesheltreeEmployeeRatioById: deletesheltreeEmployeeRatioById,
        getsheltreeEmployeeRatioById: getsheltreeEmployeeRatioById,
        savesheltreeEmployeeRatio: savesheltreeEmployeeRatio
    };

}();