$ct.ds.admin.event = function () {
    var getEvents = function (ViewModel, successCallBack) {

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



                    $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetAllEvents', requestParam, function (result) {
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

    var deleteEventById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.EventId = ViewModel.selectedId;
        requestParam.EventVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'DeleteEvent', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getEventById = function (eventId, successCallBack) {

        var requestParam = {};

        requestParam.EventId = eventId;

        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetEventById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveEvent = function (saveEventData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'SaveEvent', saveEventData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };
   

    return {
        getEvents: getEvents,
        deleteEventById: deleteEventById,
        getEventById: getEventById,
        saveEvent: saveEvent
    };

}();

