$ct.ds.event= function () {


    var getActiveEvent = function (successCallBack) {
        var Data = {};

        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetActiveEvent', Data, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";


    };

   
    return {


        getActiveEvent: getActiveEvent
    }

}();