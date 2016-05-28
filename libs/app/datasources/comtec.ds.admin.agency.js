$ct.ds.admin.agency = function () {

    var getAgencies = function (ViewModel, successCallBack) {

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

                    $ct.ajax.ajaxPost($ct.cn.getAgencyUrl() + 'GetAgencies', requestParam, function (result) {
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

    var deleteAgencyById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.AgencyId = ViewModel.selectedId;
        requestParam.AgencyVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getAgencyUrl() + 'DeleteAgency', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getAgencyById = function (agencyId, successCallBack) {

        var requestParam = {};

        requestParam.AgencyId = agencyId;

        $ct.ajax.ajaxPost($ct.cn.getAgencyUrl() + 'GetAgencyById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveAgency = function (saveAgencyData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getAgencyUrl() + 'SaveAgency', saveAgencyData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {
        getAgencies: getAgencies,
        deleteAgencyById: deleteAgencyById,
        getAgencyById: getAgencyById,
        saveAgency: saveAgency
    };

}();

