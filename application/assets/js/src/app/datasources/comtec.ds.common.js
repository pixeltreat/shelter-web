$ct.ds.common = function () {


    var getUserIdentityData = function (successCallBack) {

        var requestParam = {};


        $ct.ajax.ajaxPost($ct.cn.getcommonServicesUrl() + 'GetUserIdentityData', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, function () {

            $ct.security.authenticationFailedAction();

        }, true)


        return "";
    };

    var getAlertsData = function (successCallBack) {

        var requestParam = "";

        $ct.ajax.ajaxPost($ct.cn.getShelterUrl() + 'GetShelterAlerts', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    return {

        getUserIdentityData: getUserIdentityData,
        getAlertsData: getAlertsData

    };

} ();