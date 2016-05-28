define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Employee edit page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            selectedStaffType: {},
            selectedShift: {},
            selectedDepartment: {},
            selectedStaffSpecialty: {},

            dsStaffTypes: [],
            dsShifts: [],
            dsDepartments: [],
            dsStaffSpecialties: [],

            initialLoad: false,

            employeeId: "",
            employeeData: {},

            ShelterName: "",
            ShelterId: "",


            fillQueryParam: function (param) {

                vm.set("employeeId", param.id);

                //TODO: Need to drive througu query parameters
                vm.set("ShelterId", param.shelterId);
                vm.set("ShelterName", moduleContext.parentContext.empHeaderData.shelter.Name);
                var obj = {};
                obj.Id=param.shelterId;
                vm.set("selectedShelterItem", obj);

                this.initialize();

            },


            initialize: function () {

                $ct.helpers.clearValidations("vwEmployee");
              

            },



            dsShelters: [],

            selectedShelterItem: {},

            initializeShelters: function () {

                $ct.helpers.displayWorkAreaBusyCursor();
                vm.set("initialLoad", true);
                moduleContext.notify($ct.en.getHideErrorMsg());
                var data = $ct.ds.shlt.shelter.getShelters(function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    var resultData = result.Data;

                    if (resultData !== undefined && resultData !== null && resultData.length > 0) {

                       
                        var selectItem = {};
                        selectItem.Id = -1;
                        selectItem.Name = "--Select--";

                        resultData.splice(0, 0, selectItem);

                        vm.set("dsShelters", resultData);

                        vm.loadEmployeeData();
                        //vm.set("selectedShelterItem", resultData[0]);
                    }

                });

            },


            isEditModeOrSingleShelterUser: function (e) {
                if ((vm.get("employeeId") !== $ct.constants.getemptyGUID()) || ! $ct.security.isMultiFacilityUser()) {
                    return true;
                }
                else {
                    return false;
                }
            },



            loadEmployeeData: function () {

                $ct.helpers.clearValidations("vwEmployee");


                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.emp.employee.getEmployeeById(this.employeeId, function (result) {

                    var resultData = result.Data;

                    //pending code
                    //if((lookup.deptllokup == null) || ())
                    //{
                    // moduleContext.notify($ct.en.getShowErrorMsg(), result.Message);
                    //    rise error with result.Message
                    //    return;
                    //}

                    var selectedStaffType = {};
                    var selectedShift = {};
                    var selectedDepartment = {};
                    var selectedStaffSpecialty = {};

                    if (resultData.Employee === null) {

                        resultData.Employee = {};
                        resultData.Employee.Id = $ct.constants.getemptyGUID();
                        resultData.Employee.EmployeeRefId = "",
                        resultData.Employee.FirstName = "";
                        resultData.Employee.LastName = "";
                        resultData.Employee.MiddleName = "";
                        resultData.Employee.IsMedical = true;


                        selectedStaffType.Key = -1;
                        selectedShift.Key = -1;
                        selectedDepartment.Key = -1;
                        selectedDepartment.AgencyName = "";
                        selectedStaffSpecialty.Key = -1;

                    }
                    else {



                        if (resultData.Employee.StaffTypeId == null) {
                            selectedStaffType.Key = -1;
                        }
                        else {
                            selectedStaffType.Key = resultData.Employee.StaffTypeId;
                        }

                        if (resultData.Employee.ShiftId == null) {
                            selectedShift.Key = -1;
                        }
                        else {
                            selectedShift.Key = resultData.Employee.ShiftId;
                        }

                        if (resultData.Employee.DeparmentId == null) {
                            selectedDepartment.Key = -1;
                        }
                        else {

                            selectedDepartment.Key = resultData.Employee.DeparmentId;
                        }


                        $.each(resultData.EmployeeLookupData.AgencyDepartmentData, function (index, record) {

                            if (record.Key == resultData.Employee.DeparmentId) {
                                selectedDepartment.AgencyName = record.AgencyName;
                            }

                        });

                        if (resultData.Employee.StaffSpecialtyId == null) {
                            selectedStaffSpecialty.Key = -1;
                        }
                        else {
                            selectedStaffSpecialty.Key = resultData.Employee.StaffSpecialtyId;
                        }
                    }


                    vm.set("employeeData", resultData);

                    vm.set("selectedStaffType", selectedStaffType);
                    vm.set("selectedShift", selectedShift);
                    vm.set("selectedDepartment", selectedDepartment);
                    vm.set("selectedStaffSpecialty", selectedStaffSpecialty);

                    vm.set("dsStaffTypes", resultData.EmployeeLookupData.StaffTypeData);
                    vm.set("dsShifts", resultData.EmployeeLookupData.ShiftTimeData);
                    vm.set("dsDepartments", resultData.EmployeeLookupData.AgencyDepartmentData);
                    vm.set("dsStaffSpecialties", resultData.EmployeeLookupData.StaffSpecialityData);



                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },

            trimWhiteSpaces: function () {

                this.employeeData.Employee.set("FirstName", $.trim(this.employeeData.Employee.FirstName));
                this.employeeData.Employee.set("LastName", $.trim(this.employeeData.Employee.LastName));

            },

            btnSaveClick: function () {

                this.trimWhiteSpaces();

                vm.set("initialLoad", false);
                moduleContext.notify($ct.en.getHideErrorMsg());

                var validator = $("#vwEmployee").kendoValidator().data("kendoValidator");


                if ((!validator.validate())) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());

                    return;
                }

                if (vm.selectedStaffType.Key == -1) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }


                if (vm.selectedDepartment.Key == -1) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                if (vm.selectedShelterItem.Id == -1) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveEmployeeData = vm.employeeData.toJSON();

                if (vm.selectedShift.Key == -1) {

                    saveEmployeeData.Employee.ShiftId = null;

                }
                else {
                    saveEmployeeData.Employee.ShiftId = vm.selectedShift.Key;
                }

                if (vm.selectedStaffSpecialty.Key == -1) {

                    saveEmployeeData.Employee.StaffSpecialtyId = null;

                }
                else {
                    saveEmployeeData.Employee.StaffSpecialtyId = vm.selectedStaffSpecialty.Key;
                }

                saveEmployeeData.Employee.StaffTypeId = vm.selectedStaffType.Key;
                saveEmployeeData.Employee.DeparmentId = vm.selectedDepartment.Key;
                saveEmployeeData.Employee.FacilityId = vm.selectedShelterItem.Id;


                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.emp.employee.saveEmployee(saveEmployeeData, function (data) {

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
                        return;
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getEmployeeSuccessMsg());
                    }

                    if (moduleContext.parentContext.activeForm == "employeeextendedlist") {
                        moduleContext.notify($ct.en.getEmployeeExpandedCreatedOrUpdated(), null);
                    }
                    if (moduleContext.parentContext.activeForm == "employeelist") {
                        moduleContext.notify($ct.en.getEmployeeCreatedOrUpdated(), null);
                    }
                    Boiler.UrlController.goTo(moduleContext.parentContext.activeForm);

                })

            },

            btnCancelClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (moduleContext.parentContext.activeForm == "employeeextendedlist") {
                    moduleContext.notify($ct.en.getEmployeeExpandedCreatedOrUpdated(), null);
                }
                if (moduleContext.parentContext.activeForm == "employeelist") {
                    moduleContext.notify($ct.en.getEmployeeCreatedOrUpdated(), null);
                }
                Boiler.UrlController.goTo(moduleContext.parentContext.activeForm);

            },

            setClassForStaffType: function () {

                if ((vm.selectedStaffType.get("Key") == -1) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else
                    return $ct.styles.getRemoveInvalidDataBorder();

            },

            setValidationMsgForStaffType: function () {

                if ((vm.selectedStaffType.get("Key") == -1) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;

            },

            setClassForDepartment: function () {

                if ((vm.selectedDepartment.get("Key") == -1) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else
                    return $ct.styles.getRemoveInvalidDataBorder();

            },

            setValidationMsgForDepartment: function () {

                if ((vm.selectedDepartment.get("Key") == -1) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;

            },

            setClassForShelterName: function () {

                if ((vm.selectedShelterItem.get("Id") == -1) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else
                    return $ct.styles.getRemoveInvalidDataBorder();

            },

            setValidationMsgForShelterName: function () {

                if ((vm.selectedShelterItem.get("Id") == -1) && (vm.get("initialLoad") == false))
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
