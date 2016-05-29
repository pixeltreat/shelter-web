define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({
          
            staffTypeData: {},
            

            staffTypeId: -1,
            initialLoad: false,
            NameLength: 250,
            DescriptionLength: 4000,

           

            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("staffTypeId", param.id);


            },

            //To initialize eventData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwStaffType");
                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();
               
                $ct.ds.admin.stafftype.getStaffTypesById(this.staffTypeId, function (result) {
                    
                    var resultData = result.Data;
                   
                    //For new event
                    if (resultData.StaffType === null) {
                        resultData.StaffType = {};
                        resultData.StaffType.Id = $ct.constants.getNewRecordId();
                        resultData.StaffType.Name = "";
                        resultData.StaffType.Description = "";
                        resultData.StaffType.DisplayOrder = 1;
                       
                    }

                  



                    vm.set("staffTypeData", resultData);
                   

                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },



            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwStaffType").kendoValidator().data("kendoValidator");
                if (!validator.validate()) {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

               

                var savestaffTypeData = vm.staffTypeData;
                

                $ct.ds.admin.stafftype.saveStaffTypes(savestaffTypeData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.initialize();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getStaffTypeSuccessMsg());
                    }


                    moduleContext.notify($ct.en.getStaffTypeCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getStaffTypeList());

                })

            },

            trimWhiteSpaces: function () {

                this.staffTypeData.StaffType.set("Name", $.trim(this.staffTypeData.StaffType.Name));
                this.staffTypeData.StaffType.set("Description", $.trim(this.staffTypeData.StaffType.Description));
            },
            btnCancelClick: function () {
                moduleContext.notify($ct.en.getHideErrorMsg());
                moduleContext.notify($ct.en.getStaffTypeCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getStaffTypeList());
            },


            setValidClassForDisplayOrder: function () {
                if ((vm.get("staffTypeData.StaffType.DisplayOrder") == null || vm.get("staffTypeData.StaffType.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
                    return $ct.styles.getDataInvalidClass();
                }
                else {
                    return $ct.styles.getRemoveInvalidDataBorder();
                }
            }



        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});


