$ct.ds.reports= function () {

    var getLookupsForStaffRawDataReport = function (successCallBack) {

        var Data = "";

        $ct.ajax.ajaxPost($ct.cn.getReportsUrl() + 'GetLookupsForEmployeeRawDataReport', Data, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var getLookupsForSheltereeRawDataReport = function (successCallBack) {

        var Data = "";

        $ct.ajax.ajaxPost($ct.cn.getReportsUrl() + 'GetLookupsForSheltereeRawDataReport', Data, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var getLookupsForStaffAttendanceRawDataReport = function (successCallBack) {

        var Data = "";

        $ct.ajax.ajaxPost($ct.cn.getReportsUrl() + 'GetLookupsForEmployeeAttendanceRawDataReport', Data, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var genarateStaffRawDataReport = function (params, successCallBack) {


        $ct.ajax.ajaxPost($ct.cn.getReportsUrl() + 'GetReportForEmployeeRawData', params, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var genarateStaffAttendanceRawDataReport = function (params, successCallBack) {


        $ct.ajax.ajaxPost($ct.cn.getReportsUrl() + 'GetReportForEmployeeAttendanceRawData', params, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var genarateSheltereeRawDataReport = function (params, successCallBack) {


        $ct.ajax.ajaxPost($ct.cn.getReportsUrl() + 'GetReportForSheltereeRawData', params, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

   
    return {

        getLookupsForStaffRawDataReport: getLookupsForStaffRawDataReport,
        getLookupsForSheltereeRawDataReport: getLookupsForSheltereeRawDataReport,
        getLookupsForStaffAttendanceRawDataReport: getLookupsForStaffAttendanceRawDataReport,
        genarateStaffRawDataReport: genarateStaffRawDataReport,
        genarateStaffAttendanceRawDataReport: genarateStaffAttendanceRawDataReport,
        genarateSheltereeRawDataReport: genarateSheltereeRawDataReport
    }
}();