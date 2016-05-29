$ct.ds.admin.disposition = function () {

    var getDispositions = function (ViewModel, successCallBack) {

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

                    $ct.ajax.ajaxPost($ct.cn.getDispositionUrl() + 'GetDispositions', requestParam, function (result) {
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
                        DisplayOrder: { type: "number" }
                    }
                }
            }
        });

        return datasource;


    };

    var deleteDispositionById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.DispositionId = ViewModel.selectedId;
        requestParam.DispositionVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getDispositionUrl() + 'DeleteDisposition', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getDispositionById = function (dispositionId, successCallBack) {

        var requestParam = {};

        requestParam.DispositionId = dispositionId;

        $ct.ajax.ajaxPost($ct.cn.getDispositionUrl() + 'GetDispositionById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveDisposition = function (saveDispositionData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getDispositionUrl() + 'SaveDisposition', saveDispositionData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {
        getDispositions: getDispositions,
        deleteDispositionById: deleteDispositionById,
        getDispositionById: getDispositionById,
        saveDisposition: saveDisposition
    };

}();

