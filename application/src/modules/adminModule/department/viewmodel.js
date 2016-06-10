define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({
            departmentData: {},
            departmentData: {},
            agencyDepartments: [],

            departmentId: -1,
            initialLoad: false,
            NameLength: 250,
            DescriptionLength: 4000,

            agencyDepartmentId: -1,
            oldAgencyDepartmentId: -1,

            //Fill Query string parameters
            fillQueryParam: function (param) {
                vm.set("departmentId", param.id);


            },

            //To initialize eventData
            initialize: function () {

                vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwDepartment");
                vm.set("agencyDepartmentId", -1);
                moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();
                

                $ct.ds.admin.department.getDepartmentById(this.departmentId, function (result) {

                    var resultData = result.Data;

                    //For new event
                    if (resultData.Department === null) {
                        resultData.Department = {};
                        resultData.Department.Id = $ct.constants.getNewRecordId();
                        resultData.Department.Name = "";
                        resultData.Department.Description = "";
                        resultData.Department.DisplayOrder = 1;
                        resultData.Department.AgencyDepartments = [];

                        vm.set("agencyDepartmentId", -1);
                        vm.set("oldAgencyDepartmentId", -1);

                    }

                    var agencyDepartments = [];


                    $.each(resultData.AgencyLookupWithDepartmentData, function (index, agencyRecord) {
                        
                        if (agencyRecord.IsSelected == true) {
                         
                            vm.set("agencyDepartmentId", agencyRecord.AgencyId);
                            vm.set("oldAgencyDepartmentId", agencyRecord.AgencyId);

                        }

                    });




                    vm.set("departmentData", resultData);
                    vm.set("agencyDepartments", resultData.AgencyLookupWithDepartmentData);

                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },



            btnSaveClick: function () {

                this.trimWhiteSpaces();
                vm.set("initialLoad", false);

                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwDepartment").kendoValidator().data("kendoValidator");
                if (!validator.validate()) {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                if (vm.agencyDepartmentId == -1) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveDepartmentData = vm.departmentData.toJSON();
                saveDepartmentData.Department.AgencyDepartments = [];


                $.each(vm.agencyDepartments, function (index, agencyRecord) {
                  
                   

                    if (vm.agencyDepartmentId == vm.oldAgencyDepartmentId) {

                        if (vm.agencyDepartmentId == agencyRecord.AgencyId) {

                            var agencyMapping1 = {};
                            agencyMapping1.AgencyId = vm.agencyDepartmentId;
                            agencyMapping1.DepartmentId = vm.departmentId;
                            agencyMapping1.IsSelected = true;
                            agencyMapping1.IsNew = false;
                            agencyMapping1.Deleted = false;
                            agencyMapping1.Version = agencyRecord.Version;
                            saveDepartmentData.Department.AgencyDepartments.push(agencyMapping1);


                        }

                    }
                    else
                    {

                        if (vm.oldAgencyDepartmentId == agencyRecord.AgencyId) {

                            var agencyMapping = {};
                            agencyMapping.AgencyId = vm.oldAgencyDepartmentId;
                            agencyMapping.DepartmentId = vm.departmentId;
                            agencyMapping.IsSelected = false;
                            agencyMapping.IsNew = false;
                            agencyMapping.Deleted = true;
                            agencyMapping.Version = agencyRecord.Version;
                            saveDepartmentData.Department.AgencyDepartments.push(agencyMapping);

                        }

                        if (vm.agencyDepartmentId == agencyRecord.AgencyId) {

                            var agencyMapping2 = {};
                            agencyMapping2.AgencyId = vm.agencyDepartmentId;
                            agencyMapping2.DepartmentId = vm.departmentId;
                            agencyMapping2.IsSelected = true;
                            agencyMapping2.IsNew = true;
                            agencyMapping2.Deleted = false;
                            agencyMapping2.Version = agencyRecord.Version;
                            saveDepartmentData.Department.AgencyDepartments.push(agencyMapping2);

                        }

                    }




                });
            
              
               
                $ct.ds.admin.department.saveDepartment(saveDepartmentData, function (data) {

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
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getDepartmentSuccessMsg());
                    }


                    moduleContext.notify($ct.en.getDepartmentCreatedOrUpdated(), null);
                    Boiler.UrlController.goTo($ct.rn.getDepartmentList());

                })

            },

            trimWhiteSpaces: function () {

                this.departmentData.Department.set("Name", $.trim(this.departmentData.Department.Name));
                this.departmentData.Department.set("Description", $.trim(this.departmentData.Department.Description));
            },
            btnCancelClick: function () {
                moduleContext.notify($ct.en.getHideErrorMsg());
                moduleContext.notify($ct.en.getDepartmentCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getDepartmentList());
            },


            setValidClassForDisplayOrder: function () {
                if ((vm.get("departmentData.Department.DisplayOrder") == null || vm.get("departmentData.Department.DisplayOrder") == undefined) && vm.get("initialLoad") == false) {
                    return $ct.styles.getDataInvalidClass();
                }
                else {
                    return $ct.styles.getRemoveInvalidDataBorder();
                }
            },

            setClassForAgency: function () {
                if ((vm.get("selectedAgencyId") == -1) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else {
                    //   return $ct.styles.getRemoveInvalidDataBorder();
                    return "emptycolor";
                }


            },
            setValidationMsgForAgency: function () {
                if ((vm.get("agencyDepartmentId") == -1) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;
            }


        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});


