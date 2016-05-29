
$(function () {
    $.ajaxSetup({ cache: false });
});

$ct.ajax = function () {

    var wrapRequest = function (requestData) {

        var isValidRequest = true;

        //extend is used to use different instance of service request in every ajax call
        var svcReq = $.extend(true, {}, $ct.constants.getServiceRequest()); ;

        if (svcReq !== undefined) {
            if (svcReq.ClientTag === undefined || svcReq.ClientTag.length <= 0) {
                isValidRequest = false;
            } else {
                svcReq.RequestId = Math.uuidCompact();
                svcReq.Data = requestData;
                svcReq.SessionToken = $ct.constants.getSessionToken();
            }
        } else {
            isValidRequest = false;
        }

        if (!isValidRequest) {
            $ct.helpers.displayAlertWindow($ct.msg.getInvalidServiceRequestObject());
        } else {
            return svcReq;
        }
    };

    //error and success messages in response object needs be handled by client(caller of ajax function) 
    var unwrapResponse = function (response, requestData) {
        var isValidRequest = true;
        var errorMsg = $ct.msg.getGenericErrorMsg();
        var request = $.parseJSON(requestData);

        if (request !== undefined) {
            if (response !== undefined) {
                if (response.ResponseId === undefined || response.ResponseId.length <= 0 || response.ResponseId !== request.RequestId) {
                    isValidRequest = false;
                    errorMsg = $ct.msg.getInvalidResponseForRequestMsg();

                } else if ($ct.mt.getAcknowledgeTypeSuccess() !== $ct.helpers.toLower(response.AcknowledgeType)) {
                    var errorObj = $ct.mt.getErrorObject(response);
                    if (errorObj != null) {

                        var event = jQuery.Event($ct.en.getShowErrorMsgJS());
                        event.errorObj = errorObj;
                        $(document).trigger(event);
                        $ct.helpers.hideWorkAreaBusyCursor();
                        $ct.helpers.hidePageBusyCursor();
                    }
                }
                else {

                    $ct.constants.SessionToken = response.SessionToken;

                }
            } else {

                isValidRequest = false;
                errorMsg = $ct.msg.getInvalidResponseMsg();

            }
        } else {
            isValidRequest = false;
        }

        if (!isValidRequest) {
            $ct.helpers.displayAlertWindow(errorMsg);
        } else {
            return response.Data;
        }
    };

    var ajaxRequest = function (url, requestData, httpVerb, callBack, errorCallBack, isSaveRequest, attempt, isWrapped) {
        $.ajax(url, {
            data: requestData,
            type: httpVerb,
            dataType: $ct.constants.getDataType(),
            contentType: $ct.constants.getContentType(),
            success: function (data) {
                if (callBack != undefined) {
                    var resp = null;

                    var resp = unwrapResponse(data, requestData);

                    if (isWrapped) {
                        resp = data;
                    }

                    if (resp !== undefined)
                    //Success callback
                        callBack(resp);
                    else {
                        if ((errorCallBack !== undefined) && (errorCallBack !== null)) {

                            errorCallBack();
                        }
                    }
                }
            },

            error: function (xhr, status, err) {

                if ((errorCallBack !== undefined) && (errorCallBack !== null)) {
                    errorCallBack(xhr, status, err);
                }

                /*if (!isSaveRequest && attempt <= maxRequestAttempt) {
                ajaxRequest(url, requestData, httpVerb, callBack, errorCallBack, isSaveRequest, attempt + 1);
                } else {
                if (errorCallBack !== undefined)
                errorCallBack();
                }*/
            }
        });
    };

    var ajaxGet = function (url, request, callback, errorCallBack) {
        return ajaxRequest(url, request, $ct.constants.getGetHttpVerb(), callBack, errorCallBack, false, 1);
    };

    var ajaxPost = function (url, request, callBack, errorCallBack, isWrapped) {
        var svcReq = wrapRequest(request);

        if (svcReq !== undefined)
            return ajaxRequest(url, JSON.stringify(svcReq), $ct.constants.getPostHttpVerb(), callBack, errorCallBack, false, 1, isWrapped);
        //return ajaxRequest(url, kendo.stringify(svcReq), $cm.postHttpVerb, callBack, errorCallBack, false, 1);
    };

    var ajaxSave = function (url, request, callBack, errorCallBack) {
        var svcReq = wrapRequest(request);

        if (svcReq !== undefined)
            return ajaxRequest(url, JSON.stringify(svcReq), $ct.constants.getPostHttpVerb(), callBack, errorCallBack, true, 1);
        //return ajaxRequest(url, kendo.stringify(svcReq), $cm.postHttpVerb, callBack, errorCallBack, true, 1);
    };

    // Exposed objects and parameters
    return {

        ajaxGet: ajaxGet,
        ajaxPost: ajaxPost,
        ajaxSave: ajaxSave

    };
} ();
