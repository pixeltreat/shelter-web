define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var commentsViewModel = kendo.observable({


            datafromParent: {},
            comment:"",
            DescriptionLength:5000,
            isCommentHistoryPresent: false,
            history: [],

            //To initialize utilityData
            initialize: function (data) {

                commentsViewModel.set("datafromParent", data);

            },

            getCommentsHistory: function (data) {

                $ct.ds.emp.empattendance.getEmployeeAttendanceCommentHistory(commentsViewModel, function (data) {

                    if (data.Data.length != 0) {

                        commentsViewModel.set("history", data.Data);
                        commentsViewModel.set("isCommentHistoryPresent", true);

                    }
                    else {

                        commentsViewModel.history = {};
                        commentsViewModel.history.Comment = "";
                        commentsViewModel.history.CommentDate = "";
                        commentsViewModel.history.UserName = "";

                    }
                });

            },

            savecommentClick: function (e) {
                var validator = $("#vwEmpAttendenceComment").kendoValidator().data("kendoValidator");
                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                var saveEmployeeAttendenceData = {};
                Objforsave = {};

                commentsViewModel.datafromParent.griddata.Comment = commentsViewModel.comment;
                Objforsave = commentsViewModel.datafromParent.griddata;
                Objforsave.toJSON();
                saveEmployeeAttendenceData.EmployeeAttendanceRaw = Objforsave;
                saveEmployeeAttendenceData.ShiftDate = commentsViewModel.datafromParent.date;
                saveEmployeeAttendenceData.ShiftId = commentsViewModel.datafromParent.shift;
                saveEmployeeAttendenceData.FacilityId =  commentsViewModel.datafromParent.facilityId;

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.emp.empattendance.saveEmployeeAttendenceComment(saveEmployeeAttendenceData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {

                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            commentsViewModel.btnCancelClick();
                            moduleContext.notify($ct.en.getEmployeeAttendenceList());
                        }

                        return;

                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {



                        moduleContext.notify($ct.en.getEmployeeAttendanceUpdated(), null);
                        var mywin = $("#commonWindow").data("kendoWindow");
                        mywin.close();

                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEmployeeAttendenceUpdatedSuccessMsg());


                    }

                })

            },


            btnCancelClick: function (e) {

                var mywin = $("#commonWindow").data("kendoWindow");
                mywin.close();

            }



        });

        //end of observable

        return {
            data: commentsViewModel
        };

    };

    return ViewModel;
});


