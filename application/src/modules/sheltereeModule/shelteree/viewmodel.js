define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({


            demographicsTabIndex: 0,
            medicalTabIndex: 1,
            careRequirementsTabIndex: 2,
            equipmentSuppliesTabIndex: 3,
            vitalsTabIndex: 4,
            medicationTabIndex: 5,
            shelterIdentificationTabIndex: 6,

            currentTabIndex: 0,


            sheltreeTabs: [
                { id: 0,  name: "Demographics", tabClass: $ct.styles.getActiveTabClass() },
                { id: 1,  name: "Medical", tabClass: $ct.styles.getTabDisabledClass() },
                { id: 2,  name: "Care Requirements", tabClass: $ct.styles.getTabDisabledClass() },
                { id: 3,  name: "Equipment Supplies", tabClass: $ct.styles.getTabDisabledClass() },
                { id: 4,  name: "Vitals", tabClass: $ct.styles.getTabDisabledClass() },
                { id: 5,  name: "Medication", tabClass: $ct.styles.getTabDisabledClass() },
                { id: 6,  name: "Shelter Identification", tabClass: $ct.styles.getTabDisabledClass() }
            ],

            tabNumberCalculation: function () {

                if (this.get("tabClass") == $ct.styles.getCompleteDataPresentClass()) {
                    return "";
                }
                else {
                    var currentTabNumber = this.id + 1;
                    return currentTabNumber;
                }

            },

            setTabNumberCalculationFunctionToSheltreeTabs : function () {

                $.each(vm.sheltreeTabs, function (index, shelterTab) {
                    shelterTab.tabNumber = vm.tabNumberCalculation;
                });

            },



            initialLoad: false,

            isDemographicsActive: function () {

                id = vm.get("currentTabIndex");

                if (id == vm.demographicsTabIndex) {

                    return true;
                }
                else {
                    return false;
                }


            },


            isMedicalOrCareRequirementsOrVitalsActive: function () {

                id = vm.get("currentTabIndex");


                if ((id == vm.medicalTabIndex) || (id == vm.careRequirementsTabIndex) || (id == vm.vitalsTabIndex)) {
                    return true;
                }
                else {
                    return false;
                    
                }



            },
            
            

            isMedicationActive: function () {

                id = vm.get("currentTabIndex");

                if (id == vm.medicationTabIndex) {
                    return true;
                }
                else {
                    return false;

        }

            },

            isShelterIdentificationActive: function () {

              

                id = vm.get("currentTabIndex");


                if (id == vm.shelterIdentificationTabIndex) {
                    return true;
                }
                else {
                    return false;

                }

            },
            

            isMedicalActive: function () {

                id = vm.get("currentTabIndex");


                if (id == vm.medicalTabIndex) {
                    return true;
                }
                else {
                    return false;
                }



            },


            isEquipmentSuppliesActive: function () {


                id = vm.get("currentTabIndex");


                if (id == vm.equipmentSuppliesTabIndex) {
                    return true;
                }
                else {
                    return false;
                }

            },

            isPreviousButtonVisible: function () {

                id = vm.get("currentTabIndex");

                if (id == 0) {

                    return false;
                }
                else {
                    return true;
                }

            },

            isNextButtonVisible: function () {

                id = vm.get("currentTabIndex");

                if (id == vm.sheltreeTabs.length - 1) {

                    return false;
                }
                else {
                    return true;
                }


            },

            nextClick: function () {

                currentId = kendo.parseInt(vm.currentTabIndex);
                currentId = currentId + 1;

                vm.validateSaveCurrentTabAndMoveToNewTab(currentId);

            },

            previousClick: function () {

                currentId = kendo.parseInt(vm.currentTabIndex);
                currentId = currentId - 1;

                vm.validateSaveCurrentTabAndMoveToNewTab(currentId);


            },


            //demographicsTabClass: $ct.styles.getActiveTabClass(),
            //medicalTabClass: $ct.styles.getTabDisabledClass(),
            //careRequirementsTabClass: $ct.styles.getTabDisabledClass(),
            //equipmentSuppliesTabClass: $ct.styles.getTabDisabledClass(),


            setTabClasses: function (sheltereeInputFlags, newTabIndex) {

                if (!sheltereeInputFlags.IsDemographicsExist) {

                    vm.set("sheltreeTabs[" + vm.demographicsTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                    vm.set("sheltreeTabs[" + vm.medicalTabIndex + "].tabClass", $ct.styles.getTabDisabledClass());
                    vm.set("sheltreeTabs[" + vm.careRequirementsTabIndex + "].tabClass", $ct.styles.getTabDisabledClass());
                    vm.set("sheltreeTabs[" + vm.equipmentSuppliesTabIndex + "].tabClass", $ct.styles.getTabDisabledClass());
                    vm.set("sheltreeTabs[" + vm.vitalsTabIndex + "].tabClass", $ct.styles.getTabDisabledClass());
                    vm.set("sheltreeTabs[" + vm.medicationTabIndex + "].tabClass", $ct.styles.getTabDisabledClass());
                    vm.set("sheltreeTabs[" + vm.shelterIdentificationTabIndex + "].tabClass", $ct.styles.getTabDisabledClass());

                    return;

                }


                if (newTabIndex == vm.demographicsTabIndex) {


                    vm.set("sheltreeTabs[" + vm.demographicsTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsDemographicsExist) {
                    vm.set("sheltreeTabs[" + vm.demographicsTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.demographicsTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }



                if (newTabIndex == vm.medicalTabIndex) {

                    vm.set("sheltreeTabs[" + vm.medicalTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsMedicalConditionExist) {
                    vm.set("sheltreeTabs[" + vm.medicalTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.medicalTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }


                if (newTabIndex == vm.careRequirementsTabIndex) {

                    vm.set("sheltreeTabs[" + vm.careRequirementsTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsCareRequirementExist) {
                    vm.set("sheltreeTabs[" + vm.careRequirementsTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.careRequirementsTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }

                

                if (newTabIndex == vm.shelterIdentificationTabIndex) {

                    vm.set("sheltreeTabs[" + vm.shelterIdentificationTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsShelterIdentificationExist) {
                    vm.set("sheltreeTabs[" + vm.shelterIdentificationTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.shelterIdentificationTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }

                if (newTabIndex == vm.vitalsTabIndex) {

                    vm.set("sheltreeTabs[" + vm.vitalsTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsVitalsExist) {
                    vm.set("sheltreeTabs[" + vm.vitalsTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.vitalsTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }

                if (newTabIndex == vm.medicationTabIndex) {

                    vm.set("sheltreeTabs[" + vm.medicationTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsMedicationAllergyExist) {
                    vm.set("sheltreeTabs[" + vm.medicationTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.medicationTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }


                if (newTabIndex == vm.equipmentSuppliesTabIndex) {

                    vm.set("sheltreeTabs[" + vm.equipmentSuppliesTabIndex + "].tabClass", $ct.styles.getActiveTabClass());
                }
                else if (sheltereeInputFlags.IsEquipmentSupplyExist) {
                    vm.set("sheltreeTabs[" + vm.equipmentSuppliesTabIndex + "].tabClass", $ct.styles.getCompleteDataPresentClass());
                } else {
                    vm.set("sheltreeTabs[" + vm.equipmentSuppliesTabIndex + "].tabClass", $ct.styles.getNoDataClass());
                }

            },



            sheltreeTabClick: function (event) {


               // alert(event.currentTarget.id);

                vm.validateSaveCurrentTabAndMoveToNewTab(event.currentTarget.id);


            },

            validateSaveCurrentTabAndMoveToNewTab: function (newTabIndex) {


                if (vm.isTabDataValid(vm.currentTabIndex)) {
                    vm.saveTabDataAndGotoNewTab(vm.currentTabIndex, newTabIndex);
                }
                else {

                    if (vm.sheltereeId == $ct.constants.getemptyGUID())
                    {
                        moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                        return;
                    }


                    if ($ct.helpers.displayConfirmWindow(" Current tab has incomplete data, do you want to proceed?")) {

                        vm.gotoNewTab(newTabIndex);

                    }
                    else {
                        return;
                    }


                }

            },

            isTabDataValid: function (tabIndex) {

                if (tabIndex == vm.demographicsTabIndex) {

                    return vm.isDemographicsDataValid();
                }
                else if (tabIndex == vm.medicalTabIndex) {
                    return vm.isMedicalDataValid();
                }
                else if (tabIndex == vm.careRequirementsTabIndex) {
                    return vm.isCareRequirementsDataValid();
                }
                else if (tabIndex == vm.shelterIdentificationTabIndex) {
                    return vm.isShelterIdentyDischargeAndDispositionDataValid();
                }
                else if (tabIndex == vm.equipmentSuppliesTabIndex) {
                    return vm.isEquipmentSuppliesDataValid();
                } 
                else if (tabIndex == vm.vitalsTabIndex) {
                    return vm.isVitalsDataValid();
                }
                else if (tabIndex == vm.medicationTabIndex) {
                    return vm.isMedicationDataValid();
                    
                }
                else {
                    alert("Invalid tab index");
                }

            },

            saveTabDataAndGotoNewTab: function (currentTabIndex, newTabIndex) {

                if (currentTabIndex == vm.demographicsTabIndex) {

                    return vm.saveDemographics(false, newTabIndex);
                }
                else if (currentTabIndex == vm.medicalTabIndex) {
                    return vm.saveMedical(false, newTabIndex);
                }
                else if (currentTabIndex == vm.careRequirementsTabIndex) {
                    return vm.saveCareRequirements(false, newTabIndex);
                }
                else if (currentTabIndex == vm.shelterIdentificationTabIndex) {
                    return vm.saveShelterIdentyDischargeAndDisposition(false, newTabIndex);
                }
                else if (currentTabIndex == vm.equipmentSuppliesTabIndex) {
                    return vm.saveEquipmentSupplies(false, newTabIndex);
                }
                else if (currentTabIndex == vm.vitalsTabIndex) {
                    return vm.saveVitals(false, newTabIndex);
                }
                else if (currentTabIndex == vm.medicationTabIndex) {
                    return vm.saveMedication(false, newTabIndex);
                }
                else {
                    alert("Invalid tab index");
                }

                //sheltereeInputFlags = {};
                //sheltereeInputFlags.IsDemographicsExist = true;
                //sheltereeInputFlags.IsMedicalExist = true;
                //sheltereeInputFlags.IsCareRequirementsExist = true;
                //sheltereeInputFlags.IsEquipmentSuppliesExist = false;


                
            },

            saveClick: function () {

                var currentTabIndex = vm.currentTabIndex;

                if (currentTabIndex == vm.demographicsTabIndex) {

                    return vm.saveDemographics(true, -1);
                }
                else if (currentTabIndex == vm.medicalTabIndex) {
                    return vm.saveMedical(true, -1);
                }
                else if (currentTabIndex == vm.careRequirementsTabIndex) {
                    return vm.saveCareRequirements(true, -1);
                }
                else if (currentTabIndex == vm.shelterIdentificationTabIndex) {
                    return vm.saveShelterIdentyDischargeAndDisposition(true, -1);
                }
                else if (currentTabIndex == vm.equipmentSuppliesTabIndex) {
                    return vm.saveEquipmentSupplies(true, -1);
                }
                else if (currentTabIndex == vm.vitalsTabIndex) {
                    return vm.saveVitals(true, -1);
                }
                else if (currentTabIndex == vm.medicationTabIndex) {
                    return vm.saveMedication(true, -1);
                }

                
                else {
                    alert("Invalid tab index");
                }

            },

            backClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (moduleContext.parentContext.activeForm == "sheltereelist") {
                    moduleContext.notify($ct.en.getSheltereeCreatedOrUpdated(), null);
                }
                if (moduleContext.parentContext.activeForm == "sheltereemedicalupdatelist") {
                    moduleContext.notify($ct.en.getSheltereeMedicalUpdateCreatedOrUpdated(), null);
                }
                if (moduleContext.parentContext.activeForm == "sheltereedischargelist") {
                    moduleContext.notify($ct.en.getSheltereeDischargeCreatedOrUpdated(), null);
                }
                Boiler.UrlController.goTo(moduleContext.parentContext.activeForm);

            },

            gotoNewTab: function (newTabIndex) {

                if (newTabIndex == vm.demographicsTabIndex) {

                    return vm.getDemographicsById(newTabIndex);
                }
                else if (newTabIndex == vm.medicalTabIndex) {
                    return vm.getMedicalById(newTabIndex);
                }
                else if (newTabIndex == vm.careRequirementsTabIndex) {

                    return vm.getCareRequirementsById(newTabIndex);

                }
                else if (newTabIndex == vm.shelterIdentificationTabIndex) {

                    return vm.getShelterIdentyDischargeAndDispositionById(newTabIndex);

                }
                else if (newTabIndex == vm.equipmentSuppliesTabIndex) {
                    return vm.getEquipmentSuppliesById(newTabIndex);
                }
                else if (newTabIndex == vm.vitalsTabIndex) {

                    return vm.getVitalsById(newTabIndex);

                }
                else if (newTabIndex == vm.medicationTabIndex) {

                    return vm.getMedicationById(newTabIndex);

                }   
                else {
                    alert("Invalid tab index");
                }


            },

            refreshTabData: function () {

                vm.gotoNewTab(vm.currentTabIndex);

            },

//start of tab view code

            sheltereeId: $ct.constants.getemptyGUID(),
            shelterId: -1,

            //Fill Query string parameters
            fillQueryParam: function (param) {

                vm.set("sheltereeId", param.id);

                //TODO: Remove following line after disscussing with ravi
                if (param.shelterId == -1)
                {
                    vm.set("shelterId", 1);
                }
                else
                {
                    vm.set("shelterId", param.shelterId);

                }

               
                
            },



            //start of medical condition
            // questionRespData will be initialized from service
            questionRespData: {},
            questionGroupData: [],


            //To initialize questionDefData
            getMedicalById: function (newTabIndex) {

                $ct.helpers.clearValidations("vwQuestionResponse");
                vm.set("initialLoad", false);
                //moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();


                $ct.ds.sheltree.sheltreeinput.getMedicalConditionsMiscellenousAndMedicalEquipment(this.sheltereeId, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }
                    

                    var resultData = result.Data;
                    var questionGroupResponse = resultData.QuestionGroupResponse;

                    var questionGroups = [];

                    var medicalConditionQuestionGroup = questionGroupResponse.MedicalConditionQuestionGroup;
                    if (medicalConditionQuestionGroup!=null) {
                    questionGroups.push(medicalConditionQuestionGroup);
                    }
                    var miscellaneousQuestionGroup = questionGroupResponse.MiscellaneousQuestionGroup;
                    if (miscellaneousQuestionGroup != null) {
                        questionGroups.push(miscellaneousQuestionGroup);
                    }
                    var equipmentDependancyQuestionGroup = questionGroupResponse.MedicalEquipmentQuestionGroup;
                    if (equipmentDependancyQuestionGroup != null) {
                        questionGroups.push(equipmentDependancyQuestionGroup);
                    }

                    //var vitalsQuestionGroup = questionGroupResponse.VitalsQuestionGroup;
                    //if (vitalsQuestionGroup != null) {
                    //    questionGroups.push(vitalsQuestionGroup);
                    //}

                    vm.setAnswersToQuestionDefinition(questionGroups);
                    vm.addValidationsToQuestionDefinition(questionGroups);

                    vm.set("questionRespData", resultData);
                    vm.set("questionGroupData", questionGroups);


                    vm.setTabClasses(questionGroupResponse.SheltereeDependentFlagData, newTabIndex);
                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },



            //Adding validations to question definition
            addValidationsToQuestionDefinition: function (questionGroups) {

                $.each(questionGroups, function (index, questionGroup) {

                    vm.addValidationToQuestionsDefinition(questionGroup.Questions);

                });

            },

            addValidationToQuestionsDefinition: function (questions) {

                $.each(questions, function (index, question) {

                    question.hideValidation = function () {

                        return true;

                    };

                    if (question.IsRequired) {

                        question.triggerValidations = false;

                        if (
                            (question.AnswerTypeId == $ct.ds.admin.question.getStringTextBoxId())
                            || (question.AnswerTypeId == $ct.ds.admin.question.getNumericTextBoxId())
                            || (question.AnswerTypeId == $ct.ds.admin.question.getDecimalTextBoxId())
                            || (question.AnswerTypeId == $ct.ds.admin.question.getTextAreaId())
                           ) {

                            question.hideValidation = function () {

                                if (!this.get("triggerValidations")) {
                                    return true;
                                }

                                if ((this.get("Answer") == null) || (this.get("Answer") == "")) {
                                    return false;
                                }
                                else {
                                    return true;
                                }

                            };

                        }

                        else if (question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceOnlyOneAnswerId()) {

                            question.hideValidation = function () {

                                if (!this.get("triggerValidations")) {
                                    return true;
                                }

                                if ((this.get("Answer") == null) || (this.get("Answer") == "")) {
                                    return false;
                                }
                                else {
                                    return true;
                                }

                            };

                        }
                        else if (question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceMultipleAnswerId()) {

                            question.hideValidation = function () {

                                if (!this.get("triggerValidations")) {
                                    return true;
                                }


                                var isCheckboxSelected = false;
                                var answerOptions = this.get("AnswerOptions");

                                $.each(answerOptions, function (index, record) {

                                    if (record.Answer) {
                                        isCheckboxSelected = true;
                                    }

                                })

                                return isCheckboxSelected;

                            };

                        }
                        else if (question.AnswerTypeId == $ct.ds.admin.question.getDropdownListId()) {

                            question.hideValidation = function () {

                                return true;

                            };

                        }
                        else {
                            alert("Question type not found....");
                        }

                    }


                });
            },

            //Setting asnwers into question definition from question response
            setAnswersToQuestionDefinition: function (questionGroups) {

                $.each(questionGroups, function (index, questionGroup) {

                    vm.setAnswersToQuestionsDefinition(questionGroup.Questions);

                });

            },

            setAnswersToQuestionsDefinition: function (questions) {

                $.each(questions, function (index, question) {


                    if (
                        (question.AnswerTypeId == $ct.ds.admin.question.getStringTextBoxId()) || (question.AnswerTypeId == $ct.ds.admin.question.getNumericTextBoxId())
                        || (question.AnswerTypeId == $ct.ds.admin.question.getDecimalTextBoxId()) || (question.AnswerTypeId == $ct.ds.admin.question.getTextAreaId())
                        ) {

                        question.Answer = question.AnswerOptions[0].QuestionResponse.Answer;

                    }
                    else if (question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceOnlyOneAnswerId()) {

                        question.Answer = question.AnswerOptions[0].QuestionResponse.Answer;

                    }
                    else if (question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceMultipleAnswerId()) {

                        $.each(question.AnswerOptions, function (index, answerOption) {

                            if (answerOption.QuestionResponse.Answer == "") {
                                answerOption.Answer = false;
                            }
                            else {

                                if ("true" == answerOption.QuestionResponse.Answer) {
                                    answerOption.Answer = true;
                                }
                                else if ("false" == answerOption.QuestionResponse.Answer) {
                                    answerOption.Answer = false;
                                }
                                else {
                                    alert("Invalid value for check box answer");
                                }
                            }

                        })

                    }
                    else if (question.AnswerTypeId == $ct.ds.admin.question.getDropdownListId()) {

                        if (question.AnswerOptions[0].QuestionResponse.Answer == "") {
                            question.Answer = { Id: question.AnswerOptions[0].Id };
                        }
                        else {
                            question.Answer = { Id: question.AnswerOptions[0].QuestionResponse.Answer };
                        }

                    }
                    else {
                        alert("Question type not found....");
                    }

                });

            },

            //Trigrering validations
            triggerValidationsForQuestionResponse: function (questionGroups) {

                $.each(questionGroups, function (index, questionGroup) {

                    vm.triggerValidationsForQuestion(questionGroup.Questions);

                });

            },

            triggerValidationsForQuestion: function (questions) {

                $.each(questions, function (index, question) {

                    question.set("triggerValidations", true);

                })

            },

            isMedicalDataValid: function () {

                vm.triggerValidationsForQuestionResponse(vm.questionGroupData);
                return vm.isValidDataPresentForQuestion(vm.questionGroupData);

            },

            isValidDataPresentForQuestion: function (questionGroups) {

                var isDataValid = true;

                $.each(questionGroups, function (index, questionGroup) {

                    $.each(questionGroup.Questions, function (index, question) {

                        if (!question.hideValidation()) {

                            isDataValid = false;

                        }

                    })

                });


                return isDataValid;

            },

            //Setting asnwers into question response from question definition 
            setQuestionDefinitionToAnswers: function (questionGroups) {

                $.each(questionGroups, function (index, questionGroup) {

                    vm.setQuestionsDefinitionToAnswers(questionGroup.Questions);

                });

            },

            setQuestionsDefinitionToAnswers: function (questions) {

                $.each(questions, function (index, question) {


                    if (
                        (question.AnswerTypeId == $ct.ds.admin.question.getStringTextBoxId()) || (question.AnswerTypeId == $ct.ds.admin.question.getNumericTextBoxId())
                        || (question.AnswerTypeId == $ct.ds.admin.question.getDecimalTextBoxId()) || (question.AnswerTypeId == $ct.ds.admin.question.getTextAreaId())

                    ) {

                        question.AnswerOptions[0].QuestionResponse.Answer = question.Answer;

                    }
                    else if (question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceOnlyOneAnswerId()) {

                        $.each(question.AnswerOptions, function (index, answerOption) {

                            answerOption.QuestionResponse.Answer = question.Answer;

                        })

                    }
                    else if (question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceMultipleAnswerId()) {

                        $.each(question.AnswerOptions, function (index, answerOption) {
                            answerOption.QuestionResponse.Answer = answerOption.Answer;
                        })

                    }
                    else if (question.AnswerTypeId == $ct.ds.admin.question.getDropdownListId()) {

                        $.each(question.AnswerOptions, function (index, answerOption) {

                            answerOption.QuestionResponse.Answer = question.Answer.Id;

                        })

                    }
                    else {
                        alert("Question type not found....");
                    }

                });

            },

            // need to call isMedicalDataValid, before calling saveMedical
            saveMedical: function (isSaveOnly, newTabIndex) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!vm.isMedicalDataValid())
                {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                //var validator = $("#vwQuestionResponse").kendoValidator().data("kendoValidator");

                //if ((!vm.isValidData(vm.questionGroupData)) || !validator.validate()) {
                //    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                //    return;
                //}
                


                var questionGroups = vm.questionGroupData.toJSON();
                vm.setQuestionDefinitionToAnswers(questionGroups);

                var saveQuestionResponseData = vm.questionRespData.toJSON();
                saveQuestionResponseData.QuestionGroupResponse.QuestionGroups = questionGroups;

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.saveQuestionResponse(saveQuestionResponseData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getMedicalById(vm.currentTabIndex);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }
                    if (isSaveOnly) {
                        vm.getMedicalById(vm.currentTabIndex);
                       
                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successfully.");


                    //moduleContext.notify($ct.en.getAgencyCreatedOrUpdated(), null);
                   // Boiler.UrlController.goTo($ct.rn.getSheltereeList());

                })

            },

            //end of medical condition


            //start of care reuirements

            //To initialize questionDefData

            // JavaScript source code
            getCareRequirementsById: function (newTabIndex) {

                $ct.helpers.clearValidations("vwQuestionResponse");
                vm.set("initialLoad", false);
                //moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();


                $ct.ds.sheltree.sheltreeinput.getCareRequirements(this.sheltereeId, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }


                    var resultData = result.Data;
                    var questionGroupResponse = resultData.QuestionGroupResponse;

                    var questionGroups = [];

                    var careRequirementsQuestionGroup = questionGroupResponse.CareRequirementsQuestionGroup;
                    if (careRequirementsQuestionGroup != null) {
                        questionGroups.push(careRequirementsQuestionGroup);
                    }

                    vm.setAnswersToQuestionDefinition(questionGroups);
                    vm.addValidationsToQuestionDefinition(questionGroups);

                    vm.set("questionRespData", resultData);
                    vm.set("questionGroupData", questionGroups);


                    vm.setTabClasses(questionGroupResponse.SheltereeDependentFlagData, newTabIndex);
                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },

            isCareRequirementsDataValid: function () {

                vm.triggerValidationsForQuestionResponse(vm.questionGroupData);
                return vm.isValidDataPresentForQuestion(vm.questionGroupData);

            },

            // need to call isCareRequirementsDataValid, before calling saveCareRequirements
            saveCareRequirements: function (isSaveOnly, newTabIndex) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!vm.isCareRequirementsDataValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                //var validator = $("#vwQuestionResponse").kendoValidator().data("kendoValidator");

                //if ((!vm.isValidData(vm.questionGroupData)) || !validator.validate()) {
                //    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                //    return;
                //}



                var questionGroups = vm.questionGroupData.toJSON();
                vm.setQuestionDefinitionToAnswers(questionGroups);

                var saveQuestionResponseData = vm.questionRespData.toJSON();
                saveQuestionResponseData.QuestionGroupResponse.QuestionGroups = questionGroups;

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.saveQuestionResponse(saveQuestionResponseData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getCareRequirementsById(vm.currentTabIndex);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }
                    if (isSaveOnly) {
                        vm.getCareRequirementsById(vm.currentTabIndex);

                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successfully.");


                    //moduleContext.notify($ct.en.getAgencyCreatedOrUpdated(), null);
                    // Boiler.UrlController.goTo($ct.rn.getSheltereeList());

                })

            },


            //end of care reuirements

            //start of equipment supplies

            dsEquipmentSupplies: [],


            getEquipmentSuppliesById: function (newTabIndex) {

                vm.set("initialLoad", false);
                //moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.getEquipmentSuppliesById(this.sheltereeId, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }

                    var resultData = result.Data;

                    if (resultData.SheltereeEquipmentSupplyData == null) {
                        resultData.SheltereeEquipmentSupplyData = [];
                    }


                    $.each(resultData.SheltereeEquipmentSupplyData, function (esIndex, esRecord) {

                        esRecord.DateNeededForDisplay = null;

                        if (esRecord.DateNeededValue != null) {
                            esRecord.DateNeededForDisplay = kendo.parseDate(esRecord.DateNeededValue);
                        }

                    });

                    vm.addValidationToEquipmentSupplies(resultData.SheltereeEquipmentSupplyData);

                    vm.set("dsEquipmentSupplies", resultData.SheltereeEquipmentSupplyData);

                    vm.setTabClasses(resultData.SheltereeDependentFlagData, newTabIndex);
                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();

                });
            },

            addValidationToEquipmentSupplies: function (equipmentSupplies) {

                $.each(equipmentSupplies, function (esIndex, esRecord) {

                    esRecord.triggerValidations = false;

                    esRecord.hideValidation = function () {

                        if (!this.get("triggerValidations")) {
                            return true;
                        }
                        //TODO: Need to implement validation for date control
                        return true;

                    };

                });

            },

            triggerValidationsForEquipmentSupplies: function (equipmentSupplies) {

                $.each(equipmentSupplies, function (esIndex, esRecord) {

                    esRecord.set("triggerValidations", true);

                })

            },

            isValidDataPresentForEquipmentSupplies: function (equipmentSupplies) {

                var isDataValid = true;

                $.each(equipmentSupplies, function (esIndex, esRecord) {

                    if (!esRecord.hideValidation()) {

                        isDataValid = false;

                    }
                });


                return isDataValid;

            },

            isEquipmentSuppliesDataValid: function () {

                vm.triggerValidationsForEquipmentSupplies(vm.dsEquipmentSupplies);
                return vm.isValidDataPresentForEquipmentSupplies(vm.dsEquipmentSupplies);

            },


            // need to call isEquipmentSuppliesDataValid, before calling saveEquipmentSupplies
            saveEquipmentSupplies: function (isSaveOnly, newTabIndex) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!vm.isEquipmentSuppliesDataValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveEquipmentSupplies = vm.dsEquipmentSupplies.toJSON();

                $.each(saveEquipmentSupplies, function (esIndex, esRecord) {

                    if (esRecord.DateNeededForDisplay == null) {
                        esRecord.DateNeededValue = null;
                    }
                    else {
                        esRecord.DateNeededValue = (esRecord.DateNeededForDisplay.getMonth() + 1) + "/" + esRecord.DateNeededForDisplay.getDate() + "/" + esRecord.DateNeededForDisplay.getFullYear();
                    }

                });

                var saveObjSheltereeEquipmentSupplyData = {};
                saveObjSheltereeEquipmentSupplyData.SheltereeId = this.sheltereeId;
                saveObjSheltereeEquipmentSupplyData.SheltereeEquipmentSupplyData = saveEquipmentSupplies;

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.saveEquipmentSupplies(saveObjSheltereeEquipmentSupplyData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getEquipmentSuppliesById(vm.currentTabIndex);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }

                    if (isSaveOnly) {
                        vm.getEquipmentSuppliesById(vm.currentTabIndex);

                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successsfully");

                });

            },

            //end of equipment supplies

            //start of vitals

            getVitalsById: function (newTabIndex) {

                $ct.helpers.clearValidations("vwQuestionResponse");
                vm.set("initialLoad", false);
                //moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();


                $ct.ds.sheltree.sheltreeinput.getVitals(this.sheltereeId, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }


                    var resultData = result.Data;
                    var questionGroupResponse = resultData.QuestionGroupResponse;

                    var questionGroups = [];

                    var vitalsQuestionGroup = questionGroupResponse.VitalsQuestionGroup;
                    if (vitalsQuestionGroup != null) {
                        questionGroups.push(vitalsQuestionGroup);
                    }

                    vm.setAnswersToQuestionDefinition(questionGroups);
                    vm.addValidationsToQuestionDefinition(questionGroups);

                    vm.set("questionRespData", resultData);
                    vm.set("questionGroupData", questionGroups);


                    vm.setTabClasses(questionGroupResponse.SheltereeDependentFlagData, newTabIndex);
                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();
                })

            },

            isVitalsDataValid: function () {

                vm.triggerValidationsForQuestionResponse(vm.questionGroupData);
                return vm.isValidDataPresentForQuestion(vm.questionGroupData);

            },

            // need to call isVitalsDataValid, before calling saveVitals
            saveVitals: function (isSaveOnly, newTabIndex) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!vm.isVitalsDataValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                //var validator = $("#vwQuestionResponse").kendoValidator().data("kendoValidator");

                //if ((!vm.isValidData(vm.questionGroupData)) || !validator.validate()) {
                //    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                //    return;
                //}



                var questionGroups = vm.questionGroupData.toJSON();
                vm.setQuestionDefinitionToAnswers(questionGroups);

                var saveQuestionResponseData = vm.questionRespData.toJSON();
                saveQuestionResponseData.QuestionGroupResponse.QuestionGroups = questionGroups;

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.saveQuestionResponse(saveQuestionResponseData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getVitalsById(vm.currentTabIndex);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }
                    if (isSaveOnly) {
                        vm.getVitalsById(vm.currentTabIndex);

                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successfully.");


                    //moduleContext.notify($ct.en.getAgencyCreatedOrUpdated(), null);
                    // Boiler.UrlController.goTo($ct.rn.getSheltereeList());

                })

            },



            //end of vitals


            //Start of shelter identification, disposition and discharge


            // dispositionData will be initialized from service
            dispositionData: {},
            // dischargeData will be initialized from service
            dischargeData: {},

            shelterIdentificationList: [],
            shelterIdentificationDispAndDischargeRes: {},

            dispositionLookUp: [],
            selectedDisposition: {},

            referredShelterLookUp: [],

            acceptedToMSNS: false,
            selectedReferredShelterId: null,

            contactDate: null,
            dischargeDate: null,
            arrivalDate: null,
            contactTime: null,
            dischargeTime: null,
            arrivalTime: null,


            //To initialize dispositionData , dischargeData and shelter identification data 

            getShelterIdentyDischargeAndDispositionById: function (newTabIndex) {


                vm.set("initialLoad", true);
                //  $ct.helpers.clearValidations("vwAgency");

                // moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.getSheltereeIdentificationDischargeAndDispositionById(this.sheltereeId, function (result) {


                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }



                    var resultData = result.Data;



                    //To set data for new disposition object
                    if (resultData.SheltereeDisposition === null) {

                        resultData.SheltereeDisposition = {};
                        resultData.SheltereeDisposition.IsNew = true;
                        resultData.SheltereeDisposition.SheltereeId = vm.sheltereeId;
                        resultData.SheltereeDisposition.DispositionId = null;
                        resultData.SheltereeDisposition.ReferredShelterId = null;
                        resultData.SheltereeDisposition.AcceptedToMSNS = true;
                        resultData.SheltereeDisposition.Reason = "";
                        resultData.SheltereeDisposition.DispositionContactPerson = "";
                        resultData.SheltereeDisposition.DispositionDateValue = null;
                        resultData.SheltereeDisposition.DispositionTimeValue = null;
                        resultData.SheltereeDisposition.Deleted = false;

                    }


                    //To set data for new discharge object
                    if (resultData.SheltereeDischarge === null) {

                        resultData.SheltereeDischarge = {};
                        resultData.SheltereeDischarge.IsNew = true;
                        resultData.SheltereeDischarge.SheltereeId = vm.sheltereeId;
                        resultData.SheltereeDischarge.DischargeDateValue = null;
                        resultData.SheltereeDischarge.DischargeTimeValue = null;
                        resultData.SheltereeDischarge.ArrivalDateValue = null;
                        resultData.SheltereeDischarge.ArrivalTimeValue = null;
                        resultData.SheltereeDischarge.Destination = "";
                        resultData.SheltereeDischarge.Deleted = false;

                    }



                    vm.set("dispositionData", resultData.SheltereeDisposition);
                    vm.set("dischargeData", resultData.SheltereeDischarge);
                    vm.set("shelterIdentificationList", resultData.SheltereeShelterIdentificationData);
                    vm.set("dispositionLookUp", resultData.DispositionLookUpData);
                    vm.set("referredShelterLookUp", resultData.ReferredShelterData);


                    vm.set("shelterIdentificationDispAndDischargeRes", resultData);


                    if (resultData.SheltereeDisposition.DispositionId == null) {

                        vm.set("selectedDisposition", resultData.DispositionLookUpData[0]);
                    }
                    else {

                        var selectedObject = {};
                        selectedObject.Key = resultData.SheltereeDisposition.DispositionId;
                        vm.set("selectedDisposition", selectedObject);
                    }


                    if ((resultData.SheltereeDisposition.IsNew) || (resultData.SheltereeDisposition.ReferredShelterId == null)) {
                        vm.set("selectedReferredShelterId", resultData.ReferredShelterData[0].Key);
                    }
                    else {
                        vm.set("selectedReferredShelterId", resultData.SheltereeDisposition.ReferredShelterId);
                    }

                    vm.set("acceptedToMSNS", resultData.SheltereeDisposition.AcceptedToMSNS);



                    //date parsing

                    vm.set("dischargeDate", null);
                    if (vm.dischargeData.DischargeDateValue != null) {
                        vm.set("dischargeDate", kendo.parseDate(vm.dischargeData.DischargeDateValue));
                    }

                    vm.set("arrivalDate", null);
                    if (vm.dischargeData.ArrivalDateValue != null) {
                        vm.set("arrivalDate", kendo.parseDate(vm.dischargeData.ArrivalDateValue));
                    }

                    vm.set("contactDate", null);
                    if (vm.dispositionData.DispositionDateValue != null) {
                        vm.set("contactDate", kendo.parseDate(vm.dispositionData.DispositionDateValue));
                    }

                    vm.set("dischargeTime", null);
                    if (vm.dischargeData.DischargeTimeValue != null) {
                        vm.set("dischargeTime", kendo.parseDate(vm.dischargeData.DischargeTimeValue, "HH:mm"));
                    }

                    vm.set("arrivalTime", null);
                    if (vm.dischargeData.ArrivalTimeValue != null) {
                        vm.set("arrivalTime", kendo.parseDate(vm.dischargeData.ArrivalTimeValue, "HH:mm"));
                    }

                    vm.set("contactTime", null);
                    if (vm.dispositionData.DispositionTimeValue != null) {
                        vm.set("contactTime", kendo.parseDate(vm.dispositionData.DispositionTimeValue, "HH:mm"));
                    }

                    vm.setTabClasses(resultData.SheltereeDependentFlagData, newTabIndex);
                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();


                });
            },





            isShelterIdentyDischargeAndDispositionDataValid: function () {

                vm.set("initialLoad", false);

                if (!vm.isDispositionDateValid()) {
                    return false;
                }

                if (!vm.isDispositionTimeValid()) {
                    return false;
                }

                if (!vm.isDischargeDateValid()) {
                    return false;
                }

                if (!vm.isDischargeTimeValid()) {
                    return false;
                }

                if (!vm.isArrivalDateValid()) {
                    return false;
                }

                if (!vm.isArrivalTimeValid()) {
                    return false;
                }

                if (!vm.isAtLeastOneShelterIdentificationSelected()) {
                    return false;
                }

                //if (!vm.isMSNSChildHasValidData())
                //{
                //    return false;
                //}

                return true;

            },


            isDispositionDateValid: function () {

                return true;

            },

            isDispositionTimeValid: function () {

                return true;

            },

            isDischargeDateValid: function () {

                return true;

            },

            isDischargeTimeValid: function () {

                return true;

            },

            isArrivalDateValid: function () {

                return true;

            },

            isArrivalTimeValid: function () {

                return true;

            },

            isAtLeastOneShelterIdentificationSelected: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }

                var atLeastOneSelected = false;
                $.each(vm.get("shelterIdentificationList"), function (mainIndex, mainRec) {

                    if (mainRec.IsSelected) {
                        atLeastOneSelected = true;
                    }
                });

                return atLeastOneSelected;

            },


            showMSNSChildArea: function () {

                if (vm.get("acceptedToMSNS") == "false")
                {
                    return true;
                }
                else
                {
                    return false;
                }

            },



            // need to call isShelterIdentyDischargeAndDispositionDataValid, before calling saveShelterIdentyDischargeAndDisposition
            saveShelterIdentyDischargeAndDisposition: function (isSaveOnly, newTabIndex) {


                moduleContext.notify($ct.en.getHideErrorMsg());


                if (!vm.isShelterIdentyDischargeAndDispositionDataValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }


                var saveData = vm.shelterIdentificationDispAndDischargeRes.toJSON();


                var saveDispositionData = vm.dispositionData.toJSON();

                saveDispositionData.DispositionId = vm.selectedDisposition.Key;
                saveDispositionData.AcceptedToMSNS = vm.acceptedToMSNS;

                if (vm.acceptedToMSNS) {
                    saveDispositionData.ReferredShelterId = null;
                } else {
                    saveDispositionData.ReferredShelterId = vm.selectedReferredShelterId;
                }

                if (vm.contactDate != null) {
                    var contactDate = (vm.contactDate.getMonth() + 1) + "/" + vm.contactDate.getDate() + "/" + vm.contactDate.getFullYear();
                }
                if (vm.contactTime != null) {
                    var contactTime = (vm.contactTime.getHours()) + ":" + vm.contactTime.getMinutes();
                }
                saveDispositionData.DispositionDateValue = contactDate;
                saveDispositionData.DispositionTimeValue = contactTime;


                var saveDischargeData = vm.dischargeData.toJSON();
                if (vm.dischargeDate != null) {
                    var dischargeDate = (vm.dischargeDate.getMonth() + 1) + "/" + vm.dischargeDate.getDate() + "/" + vm.dischargeDate.getFullYear();
                }
                if (vm.dischargeTime != null) {
                    var dischargeTime = (vm.dischargeTime.getHours()) + ":" + vm.dischargeTime.getMinutes();
                }
                if (vm.arrivalDate != null) {
                    var arrivalDate = (vm.arrivalDate.getMonth() + 1) + "/" + vm.arrivalDate.getDate() + "/" + vm.arrivalDate.getFullYear();
                }
                if (vm.arrivalTime != null) {
                    var arrivalTime = (vm.arrivalTime.getHours()) + ":" + vm.arrivalTime.getMinutes();
                }
                saveDischargeData.DischargeDateValue = dischargeDate;
                saveDischargeData.DischargeTimeValue = dischargeTime;
                saveDischargeData.ArrivalDateValue = arrivalDate;
                saveDischargeData.ArrivalTimeValue = arrivalTime;

                saveData.SheltereeDisposition = saveDispositionData;
                saveData.SheltereeDischarge = saveDischargeData;
                saveData.SheltereeShelterIdentificationData = vm.shelterIdentificationList.toJSON();


                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.sheltree.sheltreeinput.saveSheltereeIdentificationDischargeAndDisposition(saveData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getShelterIdentyDischargeAndDispositionById(vm.currentTabIndex);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }


                    if (isSaveOnly) {
                        vm.getShelterIdentyDischargeAndDispositionById(vm.currentTabIndex);

                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successfully");


                })

            },

            //End of shelter identification, disposition and discharge



            //start of shelteree demographics

            sheltereeData: [],
            dsTransportationType: [],
            selectedTransportationTypeItem: {},

            dsParish: [],
            selectedParishItem: {},

            dsHospice: [],
            dsGender: [],
            dsCareSettings: [],
            hospiceIndex: 1,
            setValidationMsgForAge: true,
            DOB: null,
            isHospiceDisabled: true,


            getDemographicsById: function (newTabIndex) {

                vm.set("initialLoad", true)

                $ct.helpers.clearValidations("vwsDemographics");

                //moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();


                vm.set("sheltereeData", []);
                vm.set("dsTransportationType", []);
                vm.set("selectedTransportationTypeItem", {});
                vm.set("dsParish", []);
                vm.set("selectedParishItem", {});
                vm.set("dsHospice", []);
                vm.set("dsGender", []);
                vm.set("dsCareSettings", []);
                vm.set("hospiceIndex", 1);


                $ct.ds.sheltree.sheltreeinput.getDemographicsById(vm.sheltereeId, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }

                    var resultData = result.Data;

                    if (resultData.Shelteree === null) {

                        resultData.Shelteree = {};
                        resultData.Shelteree.FacilityId = vm.shelterId;
                        resultData.Shelteree.FirstName = "";
                        resultData.Shelteree.LastName = "";
                        resultData.Shelteree.MiddleName = "";
                        resultData.Shelteree.AddressLane1 = "";
                        resultData.Shelteree.AddressLane2 = "";
                        resultData.Shelteree.City = "";
                        resultData.Shelteree.Zip = "";
                        resultData.Shelteree.State = "";
                        resultData.Shelteree.SexId = null;
                        resultData.Shelteree.DateOfBirth = null;
                        resultData.Shelteree.DateOfBirthValue = null;
                        resultData.Shelteree.Age = 0;
                        resultData.Shelteree.HomePhone = null;
                        resultData.Shelteree.CellPhone = null;
                        resultData.Shelteree.SheltereePhysicianName = "";
                        resultData.Shelteree.ClinicName = "";
                        resultData.Shelteree.ClinicPhone = null;
                        resultData.Shelteree.CareSettingsId = null;
                        resultData.Shelteree.HospiceStabilityId = null;
                        resultData.Shelteree.SheltereeFacilityName = "";
                        resultData.Shelteree.HasSignedDNR = null;
                        resultData.Shelteree.ContactName = "";
                        resultData.Shelteree.ContactAddressLane1 = "";
                        resultData.Shelteree.ContactAddressLane2 = "";
                        resultData.Shelteree.ContactCity = "";
                        resultData.Shelteree.ContactState = "";
                        resultData.Shelteree.ContactCity = "";
                        resultData.Shelteree.ContactHomePhone = null;
                        resultData.Shelteree.SectionBed = "";
                        resultData.Shelteree.TransportationTypeId = -1;
                        resultData.Shelteree.HomeParishId = -1;

                    }

                    vm.set("sheltereeData", resultData);

                    if (resultData.SheltereeFacilityLookUpData != null) {
                        vm.set("dsTransportationType", resultData.SheltereeFacilityLookUpData.TransportationTypeData);
                        $.each(vm.dsTransportationType, function (index, record) {


                            if (record.Key == resultData.Shelteree.TransportationTypeId) {
                                vm.set("selectedTransportationTypeItem", record);
                            }

                        });


                        vm.set("dsParish", resultData.SheltereeFacilityLookUpData.ParishData);
                        $.each(vm.dsParish, function (index, record) {

                            if (record.Key == resultData.Shelteree.HomeParishId) {

                                vm.set("selectedParishItem", record);
                            }

                        });
                        vm.set("dsHospice", resultData.SheltereeFacilityLookUpData.HospiceData);

                        vm.set("dsGender", resultData.SheltereeFacilityLookUpData.GenderData);
                        vm.set("dsCareSettings", resultData.SheltereeFacilityLookUpData.CareSettingsData);

                        $.each(vm.dsCareSettings, function (index, record) {

                            if (record.Value == "Hospice") {
                                vm.set("hospiceIndex", record.Key);
                            }

                        });



                    }

                    var start = $("#vwsdDateOfBirth").data("kendoDatePicker");
                    start.max(new Date());

                    if (vm.sheltereeData.Shelteree.DateOfBirthValue != null) {
                        vm.set("DOB", kendo.parseDate(vm.sheltereeData.Shelteree.DateOfBirthValue));
                    }
                    else {

                        vm.set("DOB", new Date());
                        vm.set("DOB", null);

                    }


                    if (vm.sheltereeData.Shelteree.CareSettingsId == vm.hospiceIndex) {
                        vm.set("isHospiceDisabled", false);
                    }



                    vm.setTabClasses(resultData.SheltereeDependentFlagData, newTabIndex);

                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },




            enableHospiceOnChange: function () {

                vm.set("sheltereeData.Shelteree.HospiceStabilityId", -1);
                if (vm.get("sheltereeData.Shelteree.CareSettingsId") == vm.hospiceIndex) {
                    vm.set("isHospiceDisabled", false);
                }
                else {
                    vm.set("isHospiceDisabled", true);

                }


            },

            caliculateAge: function () {


                dob = vm.get("DOB");
                var today = new Date();
                var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                vm.set("sheltereeData.Shelteree.Age", age);
                if (age == 0) {
                    //    vm.set("setValidationMsgForAge", false);
                    vm.set("sheltereeData.Shelteree.Age", "0");
                }
                else {
                    //  vm.set("setValidationMsgForAge", true);
                }

            },


            trimWhiteSpaces: function () {

                this.sheltereeData.Shelteree.set("FirstName", $.trim(this.sheltereeData.Shelteree.FirstName));
                this.sheltereeData.Shelteree.set("LastName", $.trim(this.sheltereeData.Shelteree.LastName));
                this.sheltereeData.Shelteree.set("MiddleName", $.trim(this.sheltereeData.Shelteree.MiddleName));
                this.sheltereeData.Shelteree.set("AddressLane1", $.trim(this.sheltereeData.Shelteree.AddressLane1));
                this.sheltereeData.Shelteree.set("AddressLane2", $.trim(this.sheltereeData.Shelteree.AddressLane2));
                this.sheltereeData.Shelteree.set("City", $.trim(this.sheltereeData.Shelteree.City));
                this.sheltereeData.Shelteree.set("Zip", $.trim(this.sheltereeData.Shelteree.Zip));
                this.sheltereeData.Shelteree.set("State", $.trim(this.sheltereeData.Shelteree.State));
                this.sheltereeData.Shelteree.set("SheltereePhysicianName", $.trim(this.sheltereeData.Shelteree.SheltereePhysicianName));
                this.sheltereeData.Shelteree.set("ClinicName", $.trim(this.sheltereeData.Shelteree.ClinicName));
                this.sheltereeData.Shelteree.set("ContactAddressLane1", $.trim(this.sheltereeData.Shelteree.ContactAddressLane1));
                this.sheltereeData.Shelteree.set("ContactAddressLane2", $.trim(this.sheltereeData.Shelteree.ContactAddressLane2));
                this.sheltereeData.Shelteree.set("ContactCity", $.trim(this.sheltereeData.Shelteree.ContactCity));
                this.sheltereeData.Shelteree.set("ContactState", $.trim(this.sheltereeData.Shelteree.ContactState));
                this.sheltereeData.Shelteree.set("ContactCity", $.trim(this.sheltereeData.Shelteree.ContactCity));
                this.sheltereeData.Shelteree.set("FacilityName", $.trim(this.sheltereeData.Shelteree.FacilityName));



            },

            setClassForSex: function () {
                if ((vm.get("sheltereeData.Shelteree.SexId") == null) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else {

                    return "emptycolor";
                }


            },

            setValidationMsgForSex: function () {
                if ((vm.get("sheltereeData.Shelteree.SexId") == null) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;
            },


            setClassForCareSettings: function () {
                if ((vm.get("sheltereeData.Shelteree.CareSettingsId") == null) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else {

                    return "emptycolor";
                }


            },

            setValidationMsgForCareSettings: function () {
                if ((vm.get("sheltereeData.Shelteree.CareSettingsId") == null) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;
            },


            setValidationMsgForHospice: function () {


                if (((vm.get("sheltereeData.Shelteree.HospiceStabilityId") == null) || (vm.get("sheltereeData.Shelteree.HospiceStabilityId") == -1))
                    && (vm.get("initialLoad") == false)
                     && (vm.get("isHospiceDisabled") == false)
                    ) {
                    return false;
                }
                else {
                    return true;
                }



            },


            setValidationMsgForHasSigned: function () {
                if ((vm.get("sheltereeData.Shelteree.HasSignedDNR") == null) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;
            },


            setClassForTransportationType: function () {

                if ((vm.get("selectedTransportationTypeItem.Key") == -1) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else
                    return $ct.styles.getRemoveInvalidDataBorder();

            },

            setValidationMsgForTransportationType: function () {

                if ((vm.get("selectedTransportationTypeItem.Key") == -1) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;

            },

            setClassForHomeParish: function () {

                if ((vm.get("selectedParishItem.Key") == -1) && (vm.get("initialLoad") == false))
                    return $ct.styles.getDataInvalidClass();
                else
                    return $ct.styles.getRemoveInvalidDataBorder();

            },

            setValidationMsgForHomeParish: function () {

                if ((vm.get("selectedParishItem.Key") == -1) && (vm.get("initialLoad") == false))
                    return false;
                else
                    return true;

            },

            isDateOfBirthValid: function () {

                if (vm.get("initialLoad")) {
                    return true;
                }


                var Dt = vm.get("DOB");

                if ((Dt == "") || (Dt == null)) {
                    return false;
                }


                return true;

            },



            isDemographicsDataValid: function () {

                vm.trimWhiteSpaces();
                vm.set("initialLoad", false);

                var validator = $("#vwsDemographics").kendoValidator().data("kendoValidator");

                if ((!validator.validate())) {
                    return false;
                }

                //if (
                //    (vm.get("sheltereeData.Shelteree.SexId") == null) ||
                // (vm.get("sheltereeData.Shelteree.CareSettingsId") == null) ||
                // (vm.get("sheltereeData.Shelteree.HasSignedDNR") == null) ||
                // (vm.get("selectedTransportationTypeItem.Key") == -1) ||
                // (vm.get("selectedParishItem.Key") == -1) ||
                //(vm.get("sheltereeData.Shelteree.HospiceStabilityId") == null)) {

                //    return false;
                //}

                if (
                    (vm.get("sheltereeData.Shelteree.SexId") == null) ||
                 (vm.get("sheltereeData.Shelteree.CareSettingsId") == null) ||
                 (vm.get("sheltereeData.Shelteree.HasSignedDNR") == null) ||
                 (vm.get("selectedTransportationTypeItem.Key") == -1) ||
                 (vm.get("selectedParishItem.Key") == -1)  ||
                 (vm.get("DOB") == null)) {

                    return false;
                }

                return true;
            },




            // need to call isDemographicsDataValid, before calling saveDemographics
            saveDemographics: function (isSaveOnly, newTabIndex) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!vm.isDemographicsDataValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveDemographicsData = {};
                vm.set("sheltereeData.Shelteree.TransportationTypeId", vm.get("selectedTransportationTypeItem.Key"));
                vm.set("sheltereeData.Shelteree.HomeParishId", vm.get("selectedParishItem.Key"));

                saveDemographicsData.Shelteree = vm.sheltereeData.Shelteree.toJSON();
                saveDemographicsData.SheltereeId = vm.sheltereeId;
                // saveDemographicsData.SheltereeId = $ct.constants.getemptyGUID();

                if (vm.hospiceIndex != saveDemographicsData.Shelteree.CareSettingsId) {
                    saveDemographicsData.Shelteree.HospiceStabilityId = null;
                }

                if (vm.DOB != null) {
                    var DOB = (vm.DOB.getMonth() + 1) + "/" + vm.DOB.getDate() + "/" + vm.DOB.getFullYear();
                }
                saveDemographicsData.Shelteree.DateOfBirthValue = DOB;


                $ct.ds.sheltree.sheltreeinput.saveDemographics(saveDemographicsData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getDemographicsById(vm.currentTabIndex);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }


                    vm.set("sheltereeId", data.Data.SheltereeId);
                    
                    

                    if (isSaveOnly) {
                        vm.getDemographicsById(vm.currentTabIndex);

                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successfully.");


                });

            },


            //end of shelteree demographics

            //Start of medication tab code

            allergyDescriptionLength: 4000,

            sheltereeMedication: {},

            sheltereeMedications: [],
            originalSheltereeMedications: [],
            sheltereeMedicationAllergy: {},


            getMedicationById: function (newTabIndex) {

                $ct.helpers.clearValidations("vwsMedication");
                vm.set("initialLoad", false);

                // moduleContext.notify($ct.en.getHideErrorMsg());
                $ct.helpers.displayWorkAreaBusyCursor();

                //TODO: Initilization uncomment latter
                //vm.set("sheltereeMedications", []);
                //vm.set("originalSheltereeMedications", []);
                //vm.set("sheltereeMedicationAllergy", {});

                $ct.ds.sheltree.sheltreeinput.getMedicationById(vm.sheltereeId, function (result) {

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        vm.set("currentTabIndex", newTabIndex);
                        return;
                    }

                    var resultData = result.Data;
                    var sheltereeMedicationObj = {};

                    sheltereeMedicationObj.SheltereeId = vm.sheltereeId;
                    sheltereeMedicationObj.Id = -1;
                    sheltereeMedicationObj.DrugName = "";
                    sheltereeMedicationObj.Dosage = "";
                    sheltereeMedicationObj.Frequency = "";
                    sheltereeMedicationObj.LastTimeUsed = null;
                    sheltereeMedicationObj.LastTimeUsedValue = "";
                    sheltereeMedicationObj.DisplayOrder = -1;
                    sheltereeMedicationObj.Deleted = false;
                    sheltereeMedicationObj.Version = 1;
                    sheltereeMedicationObj.triggerValidations = false;

                    //sheltereeMedicationObj.isMedicationRecordValid = isMedicationRecordValid;
                    //sheltereeMedicationObj.isMedicationNameValid = isMedicationNameValid;
                    //sheltereeMedicationObj.isLastTimeUsedValid = isLastTimeUsedValid;

                    vm.set("sheltereeMedication", sheltereeMedicationObj);


                    if (resultData.SheltereeMedications == null) {

                        vm.set("sheltereeMedications", []);
                        vm.set("originalSheltereeMedications", []);

                    }

                    else {

                        $.each(resultData.SheltereeMedications, function (index, currentMedication) {

                            if (currentMedication.LastTimeUsedValue == null) {
                                currentMedication.LastTimeUsedValue = "";
                            }

                        })


                        vm.set("sheltereeMedications", resultData.SheltereeMedications);
                        vm.set("originalSheltereeMedications", resultData.SheltereeMedications);

                    }

                    if (resultData.SheltereeMedicationAllergy == null) {

                        var sheltereeMedicationAllergyObj = {};
                        sheltereeMedicationAllergyObj.IsNew = true;
                        sheltereeMedicationAllergyObj.SheltereeId = vm.sheltereeId;
                        sheltereeMedicationAllergyObj.Allergies = "";
                        sheltereeMedicationAllergyObj.Deleted = false;
                        sheltereeMedicationAllergyObj.Version = 1;

                        vm.set("sheltereeMedicationAllergy", sheltereeMedicationAllergyObj);

                    } else {
                        vm.set("sheltereeMedicationAllergy", resultData.SheltereeMedicationAllergy);

                    }

                    vm.addMedication();

                    vm.setTabClasses(resultData.SheltereeDependentFlagData, newTabIndex);
                    vm.set("currentTabIndex", newTabIndex);

                    $ct.helpers.hideWorkAreaBusyCursor();


                });
            },


            addMedication: function () {

                var isMedicationNameValid = function () {

                    if (!this.get("triggerValidations")) {
                        return true;
                    }

                    if ($.trim(this.get("DrugName")) == "") {
                        return false;
                    }
                    else {
                        return true;
                    }

                };

                var isLastTimeUsedValid = function () {

                    if (!this.get("triggerValidations")) {
                        return true;
                    }

                    return true;

                    //TODO : NEED TO IMPLEMENT DATE VALIDATION

                    //if ($.trim(this.get("QuestionText")) == "") {
                    //    return false;
                    //}
                    //else {
                    //    return true;
                    //}

                };

                var isMedicationRecordValid = function () {

                    this.set("triggerValidations", true);

                    if (!this.isMedicationNameValid()) {
                        return false;
                    }

                    if (!this.isLastTimeUsedValid()) {
                        return false;
                    }

                    return true;

                };

                var newMedicationObject = vm.sheltereeMedication.toJSON();
                // newAnsObject.hideCTextValidation = vm.questionData[0].AnswerOption.hideCTextValidation;


                newMedicationObject.isMedicationNameValid = isMedicationNameValid;
                newMedicationObject.isLastTimeUsedValid = isLastTimeUsedValid;
                newMedicationObject.isMedicationRecordValid = isMedicationRecordValid;

                var maxDispOrder = 0;
                //find the maximun value of display order
                $.each(vm.sheltereeMedications, function (index, currentMedication) {

                    if (maxDispOrder < currentMedication.DisplayOrder)
                    { maxDispOrder = currentMedication.DisplayOrder }

                });

                newMedicationObject.DisplayOrder = maxDispOrder + 1;

                vm.get("sheltereeMedications").unshift(newMedicationObject);

            },

            btnAddMedicationClick: function () {

                //TODO : use getter check for length
                var newMedication = vm.get("sheltereeMedications")[0];


                if (newMedication.isMedicationRecordValid()) {

                    if (newMedication.LastTimeUsed != null) {
                        newMedication.set("LastTimeUsedValue", (newMedication.LastTimeUsed.getMonth() + 1) + "/" + newMedication.LastTimeUsed.getDate() + "/" + newMedication.LastTimeUsed.getFullYear());
                    }

                    newMedication.set("Id", 0);


                    //Setting data in the array element is not reflect in UI, so removed and readded                    
                    vm.get("sheltereeMedications").splice(0, 1);
                    vm.get("sheltereeMedications").unshift(newMedication.toJSON());

                    vm.addMedication();

                } else {

                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

            },

            btnMedicationDeleteClick: function (e) {

                var objIndex = -1;

                $.each(vm.sheltereeMedications, function (index, currentMedication) {

                    if (currentMedication.DisplayOrder == e.data.DisplayOrder) {
                        objIndex = index;
                    }

                });


                if (objIndex != -1) {
                    vm.get("sheltereeMedications").splice(objIndex, 1);
                }
                else {
                    //should never occur
                    alert("Object not found ");
                }

            },


            isMedicationDataValid: function () {

                vm.set("initialLoad", false);


                //validate text area

                var validator = $("#vwsMedication").kendoValidator().data("kendoValidator");

                if ((!validator.validate())) {
                    return false;
                }

                //TODO: check for zero index
                if (vm.sheltereeMedications[0].triggerValidations) {
                    if (!vm.sheltereeMedications[0].isMedicationRecordValid()) {
                        return false;
                    }
                }

                return true;

            },


            // need to call isMedicationDataValid, before calling saveMedication
            saveMedication: function (isSaveOnly, newTabIndex) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!vm.isMedicationDataValid()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                //handling deleted medications
                var saveMedications = vm.sheltereeMedications.toJSON();
                saveMedications.splice(0, 1);

                $.each(vm.originalSheltereeMedications, function (index, orgMedication) {

                    var isRecordFound = false;

                    $.each(vm.sheltereeMedications, function (index, updMedication) {

                        if (orgMedication.Id == updMedication.Id) {
                            isRecordFound = true;
                        }

                    })

                    if (!isRecordFound) {
                        orgMedication.Deleted = true;
                        saveMedications.push(orgMedication.toJSON());
                    }

                })


                var saveMedicalConditionData = {};
                saveMedicalConditionData.SheltereeId = vm.sheltereeId;
                saveMedicalConditionData.SheltereeMedications = saveMedications;
                saveMedicalConditionData.SheltereeMedicationAllergy = vm.sheltereeMedicationAllergy.toJSON();

                moduleContext.notify($ct.en.getHideErrorMsg());



                $ct.ds.sheltree.sheltreeinput.saveMedication(saveMedicalConditionData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();


                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.getMedicationById(vm.currentTabIndex);
                        }
                        return;
                    }


                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }


                    if (isSaveOnly) {
                        vm.getMedicationById(vm.currentTabIndex);

                    }
                    else {

                        vm.gotoNewTab(newTabIndex);

                    }

                    moduleContext.notify($ct.en.getShowSuccMsg(), "Data saved successfully");


                });


            }


            //End of medication tab code


        });



        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
