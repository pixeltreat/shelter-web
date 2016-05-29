$ct.ds.admin.medicalconditiontier = function () {

    var getMedicalConditionTiers = function (ViewModel, successCallBack) {

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

                    $ct.ajax.ajaxPost($ct.cn.getMedicalConditionTierUrl() + 'GetMedicalConditionTiers', requestParam, function (result) {
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

    var deleteMedicalConditionTierById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.MedicalConditionTierId = ViewModel.selectedId;
        requestParam.MedicalConditionTierVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getMedicalConditionTierUrl() + 'DeleteMedicalConditionTier', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getMedicalConditionTierById = function (medicalConditionTierId, successCallBack) {

        var requestParam = {};

        requestParam.MedicalConditionTierId = medicalConditionTierId;

        $ct.ajax.ajaxPost($ct.cn.getMedicalConditionTierUrl() + 'GetMedicalConditionTierById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveMedicalConditionTier = function (saveMedicalConditionTierData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getMedicalConditionTierUrl() + 'SaveMedicalConditionTier', saveMedicalConditionTierData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {
        getMedicalConditionTiers: getMedicalConditionTiers,
        deleteMedicalConditionTierById: deleteMedicalConditionTierById,
        getMedicalConditionTierById: getMedicalConditionTierById,
        saveMedicalConditionTier: saveMedicalConditionTier
    };

}();

