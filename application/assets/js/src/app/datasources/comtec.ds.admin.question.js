$ct.ds.admin.question = function () {

    var getQuestions = function (ViewModel, successCallBack) {

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

                    $ct.ajax.ajaxPost($ct.cn.getQuestionUrl() + 'GetQuestions', requestParam, function (result) {
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

    var deleteQuestionById = function (ViewModel, successCallBack) {
        var requestParam = {};

        requestParam.QuestionId = ViewModel.selectedId;
        requestParam.QuestionVersion = ViewModel.selectedRecordVersion;

        $ct.ajax.ajaxPost($ct.cn.getQuestionUrl() + 'DeleteQuestion', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

    var getQuestionById = function (questionId, successCallBack) {

        var requestParam = {};
        requestParam.QuestionId = questionId;

        $ct.ajax.ajaxPost($ct.cn.getQuestionUrl() + 'GetQuestionById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };

    var saveQuestion = function (question, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getQuestionUrl() + 'SaveQuestion', question, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };

    var getQuestionTypeById = function (questiontypeId, successCallBack) {

        var requestParam = {};
        requestParam.QuestionTypeId = questiontypeId;

        $ct.ajax.ajaxPost($ct.cn.getmedicalConditionServiceUrl() + 'GetMedicalConditionsByQuestionTypeId', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };




   

    return {
        getQuestions: getQuestions,
        deleteQuestionById: deleteQuestionById,
        getQuestionById: getQuestionById,
        saveQuestion: saveQuestion,
        getQuestionTypeById: getQuestionTypeById

    };

}();

