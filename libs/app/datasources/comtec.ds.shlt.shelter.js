$ct.ds.shlt.shelter = function () {

    var getShelters = function (successCallBack) {

        var requestParam = "";
        $ct.ajax.ajaxPost($ct.cn.getShelterUrl() + 'GetSheltersWithSecurity', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var getSheltersWithDs = function (successCallBack) {

        var datasource = new kendo.data.DataSource({
            transport: {
                read: function (options) {

                    var requestParam = "";

                    $ct.ajax.ajaxPost($ct.cn.getShelterUrl() + 'GetSheltersWithSecurity', requestParam, function (result) {
                        
                        var resultData = result.Data;
                        if ((resultData !== undefined && resultData !== null && resultData.length > 0) && ($ct.security.isMultiFacilityUser())) {

                            var selectItem = {};

                            selectItem.Id = -1;
                            selectItem.Name = "--All--";

                            resultData.splice(0, 0, selectItem);

                        }

                        options.success(resultData);
                        if (successCallBack != null)
                            successCallBack(resultData);
                    }, null, true)
                }
            }
        });

        return datasource;

    };


    var getShelterStatus = function (ViewModel, successCallBack) {

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

                    requestParam.Criteria = { PageSize: options.data.pageSize, PageIndex: options.data.page, Filter: filter, Sort: sort };

                    $ct.ajax.ajaxPost($ct.cn.getShelterStatusUrl() + 'GetShelterStatusList', requestParam, function (result) {

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

                    //Adding or formatting  open and closed date to data 
                    $.each(response.Data, function (index, record) {


                        record.onchangeopencloseddate = function () {

                            var opendate = kendo.parseDate(this.get("OpenDate"), "yyyy-MM-ddTHH:mm:s");

                            var closeddate = kendo.parseDate(this.get("ClosedDate"), "yyyy-MM-ddTHH:mm:s");

                            var currentdate = new Date();



                            if ((opendate == "") || (opendate == null) || (opendate > currentdate)) {

                                this.set("Status", "Not Assigned");


                            }

                            else if ((opendate < currentdate) && (closeddate == null)) {
                                this.set("Status", "Open");

                            }
                            else if ((opendate < closeddate) && (closeddate < currentdate)) {
                                this.set("Status", "Closed");

                            }
                            else if (closeddate > currentdate) {
                                this.set("Status", "Open");

                            }

                            return true;
                        };




                        if (record.OpenDate === undefined) {
                            record.OpenDate = null;
                        }
                        else {
                            record.OpenDate = kendo.parseDate(record.OpenDate, "yyyy-MM-ddTHH:mm:s");
                        }

                        if (record.ClosedDate === undefined) {
                            record.ClosedDate = null;
                        }
                        else {
                            record.ClosedDate = kendo.parseDate(record.ClosedDate, "yyyy-MM-ddTHH:mm:s");
                        }


                        record.saveClicked = false;


                        record.hideOpenDateValidation = function () {


                            if (this.get("saveClicked")) {
                                var openDt = this.get("OpenDate");

                                if ((openDt == "") || (openDt == null)) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                            else {
                                return true;
                            }

                        };

                        record.hideClosedDateValidation = function () {

                            if (this.get("saveClicked")) {
                                var closedDt = this.get("ClosedDate");

                                if ((closedDt == "") || (closedDt == null)) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                            else {
                                return true;
                            }

                        };



                        record.hideOpenClosedDateValidation = function () {

                            if (this.get("saveClicked")) {


                                var openDt = this.get("OpenDate");

                                if ((openDt == "") || (openDt == null)) {
                                    return true;
                                }

                                var closedDt = this.get("ClosedDate");

                                if ((closedDt == "") || (closedDt == null)) {
                                    return true;
                                }

                                if (openDt < closedDt) {
                                    return true;
                                }
                                else {
                                    return false;
                                }

                            }
                            else {
                                return true;
                            }

                        }





                    });

                    return response.Data;
                },
                total: function (response) {

                    if (response != null && response != undefined && response != "")
                        return response.TotalRecords;
                }
            }
        });

        //  datasource.fetch();
        return datasource;


    };


    var getEvents = function (successCallBack) {

        var requestParam = "";
        $ct.ajax.ajaxPost($ct.cn.getEventUrl() + 'GetEvents', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var saveShelterStatus = function (saveShelterStatusData, successCallBack) {

        var requestParam = {};
        requestParam.ShelterStatus = {}
        requestParam.ShelterStatus.FacilityId = saveShelterStatusData.ShelterId;
        requestParam.ShelterStatus.OpenDate = saveShelterStatusData.OpenDate;
        requestParam.ShelterStatus.ClosedDate = saveShelterStatusData.ClosedDate;
        requestParam.ShelterStatus.IsNew = saveShelterStatusData.IsNew;
        requestParam.ShelterStatus.Version = saveShelterStatusData.Version;

        $ct.ajax.ajaxPost($ct.cn.getShelterStatusUrl() + 'SaveShelterStatus', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var exportShelterStatusToExcel = function (ViewModel, successCallBack) {


        var filter = null;
        if (ViewModel.dsShelterStatus.filter() !== undefined) {
            filter = ViewModel.dsShelterStatus.filter();
        }
        var sort = null;
        if (ViewModel.dsShelterStatus.sort() !== undefined) {
            sort = ViewModel.dsShelterStatus.sort();
        }

        var pageIndex = 1;
        if (ViewModel.dsShelterStatus.page() !== undefined) {
            pageIndex = ViewModel.dsShelterStatus.page();
        }

        var pageSize = 10;
        if (ViewModel.dsShelterStatus.pageSize() !== undefined) {
            pageSize = ViewModel.dsShelterStatus.pageSize();
        }


        var requestParam = {};
        requestParam.Criteria = { PageSize: pageSize, PageIndex: pageIndex, SearchToken: ViewModel.searchToken, Filter: filter, Sort: sort };



        $ct.ajax.ajaxPost($ct.cn.getShelterStatusUrl() + 'ExportShelterStatusToExcel', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    }



    return {

        getShelters: getShelters,
        getSheltersWithDs: getSheltersWithDs,
        getShelterStatus: getShelterStatus,
        getEvents: getEvents,
        saveShelterStatus: saveShelterStatus,
        exportShelterStatusToExcel: exportShelterStatusToExcel
    };

}();