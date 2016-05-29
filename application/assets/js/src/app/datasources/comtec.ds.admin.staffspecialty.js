$ct.ds.admin.staffspecialty= function () {

    var getStaffSpecialities = function (ViewModel, successCallBack) {
        
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

                    $ct.ajax.ajaxPost($ct.cn.getStaffSpecialtyUrl() + 'GetStaffSpecialities', requestParam, function (result) {
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

    var deleteStaffSpecialtyById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.StaffSpecialityId = ViewModel.selectedId;
        requestParam.StaffSpecialityVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getStaffSpecialtyUrl() + 'DeleteStaffSpeciality', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getStaffSpecialtyById = function (staffSpecialtyId, successCallBack) {

        var requestParam = {};

        requestParam.StaffSpecialityId = staffSpecialtyId;

        $ct.ajax.ajaxPost($ct.cn.getStaffSpecialtyUrl() + 'GetStaffSpecialityById', requestParam, function (result) {
            
            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveStaffSpecialty = function (saveStaffSpecialtyData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getStaffSpecialtyUrl() + 'SaveStaffSpeciality', saveStaffSpecialtyData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {
        getStaffSpecialities: getStaffSpecialities,
        deleteStaffSpecialtyById: deleteStaffSpecialtyById,
        getStaffSpecialtyById: getStaffSpecialtyById,
        saveStaffSpecialty: saveStaffSpecialty
    };

}();

