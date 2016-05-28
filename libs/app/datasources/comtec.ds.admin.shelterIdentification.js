$ct.ds.admin.shelterIdentification = function () {

    var getShelterIdentifications = function (ViewModel, successCallBack) {

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

                    $ct.ajax.ajaxPost($ct.cn.getShelterIdentificationUrl() + 'GetShelterIdentifications', requestParam, function (result) {
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

    var deleteShelterIdentificationById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.ShelterIdentificationId = ViewModel.selectedId;
        requestParam.ShelterIdentificationVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getShelterIdentificationUrl() + 'DeleteShelterIdentification', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getShelterIdentificationById = function (shelterIdentificationId, successCallBack) {

        var requestParam = {};

        requestParam.ShelterIdentificationId = shelterIdentificationId;

        $ct.ajax.ajaxPost($ct.cn.getShelterIdentificationUrl() + 'GetShelterIdentificationById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveShelterIdentification = function (saveShelterIdentificationData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getShelterIdentificationUrl() + 'SaveShelterIdentification', saveShelterIdentificationData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {
        getShelterIdentifications: getShelterIdentifications,
        deleteShelterIdentificationById: deleteShelterIdentificationById,
        getShelterIdentificationById: getShelterIdentificationById,
        saveShelterIdentification: saveShelterIdentification
    };

}();

