define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

        
            Id: "",
            comment: "",
            history: [],
            isCommentHistoryPresent: false,
            DescriptionLength: 5000,
            initialLoad:true,

            //To initialize utilityData

            fillQueryParams: function (data) {
                vm.set("Id", data);

            },
            initialize: function (data) {
               
                $ct.ds.sheltree.sheltree.commentMedicalUpdateList(vm.Id, function (data) {
                    
                    if(data.Data.length!=0)
                    {
                       
                        vm.set("history", data.Data);
                        vm.set("isCommentHistoryPresent", true);
                        
                    }
                    else {
 
                        vm.history = {};
                        vm.history.Comment ="";
                        vm.history.CommentDate = "";
                        vm.history.UserName = "";
                            
                    }
                });

            },

         
            saveCommentClick: function () {


                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwSheltereeMedicalUpdateListComment").kendoValidator().data("kendoValidator");
                if (!validator.validate()) {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }
               
                var saveCommentData = {};

                saveCommentData.SheltereeComment = {};
                saveCommentData.SheltereeComment.SheltereeId = vm.Id;
                saveCommentData.SheltereeComment.Comment = vm.comment;
              
              

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltree.commentSaveMedicalUpdateList(saveCommentData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {

                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                           
                                commentsViewModel.btnCancelClick();
                                moduleContext.notify($ct.en.getSheltereeMedicalUpdateList());
                          

                        }

                        return;

                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {

                       

                        moduleContext.notify($ct.en.getSheltereeMedicalUpdateCreatedOrUpdated(), null);
                        var mywin = $("#commonWindow").data("kendoWindow");
                        mywin.close();
                       
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getSheltereeMedicalConditionUpdateListCommentSuccessMsg());
                     
                       
                    }

                })

            },

            trimWhiteSpaces: function () {

               
                vm.set("comment", $.trim(this.comment));
            },
            btnCancelClick: function (e) {

                var mywin = $("#commonWindow").data("kendoWindow");
                mywin.close(); 
         
            }



        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});


