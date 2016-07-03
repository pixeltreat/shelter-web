define(["Boiler"],
function (Boiler) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Question",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },

            // questionData will be initialized from service

            questionData: [],

            questionId: $ct.constants.getemptyGUID(),

            dsQuestionTypes: [],
            dsQuestionTypeOptions: [],
            dsQuestionGroups: [],
            dsEquipmentDependencies:[],

            selectedQuestionType: {},
            selectedQuestionTypeOption: {},
            selectedQuestionGroup: {},

            //initialLoad: false,

            dsAnswerTypes: $ct.ds.admin.question.getAnswerTypes(),

            selectedAnswerType: $ct.ds.admin.question.getDefaultAnswerType(),

            originalAnswerOptions: [],

            //Fill Query string parameters
            fillQueryParam: function (param) {

                vm.set("questionId", param.id);


            },

            answerTypeChange: function () {

                vm.initialize(true);

            },

            //to enable or disable question type drop down list
            isNewAnswer: function () {

                if (vm.get("questionId") == $ct.constants.getemptyGUID()) {
                    return true;
                }
                else {
                    return false;
                }
            },



            //To initialize questionData
            initialize: function (isAnswerTypeChange) {

                //vm.set("initialLoad", true);
                $ct.helpers.clearValidations("vwQuestion");
                moduleContext.notify($ct.en.getHideErrorMsg());
               
                if (vm.questionId == $ct.constants.getemptyGUID()) {
                   
                    var question = {};

                    question.Id = $ct.constants.getemptyGUID();

                    question.AnswerTypeId = vm.selectedAnswerType.Key;

                    //following does not need initialization
                    question.QuestionText = "";
                    question.QuestionGroupId = -1;
                    question.IsRequired = false;
                    question.AnswerWidth = 50;
                    question.DisplayOrder = 1;
                    question.PageNumber = vm.pageNo;
                    question.IsOptionsHorizontal = false;


                    question.AnswerOptions = [];


                    var answerOption = {};

                    answerOption.Id = $ct.constants.getemptyGUID();

                    answerOption.QuestionId = $ct.constants.getemptyGUID();

                    //following does not need initialization
                    answerOption.AnswerTypeId = null; //Will use it for matrix element question type
                    answerOption.ChoiceText = "";
                    answerOption.IsRequired = false;
                    answerOption.AnswerWidth = null;
                    answerOption.IsOptionsHorizontal = false;
                    answerOption.DisplayOrder = 1;


                    //following columns not used till we implement matrix questions 
                    answerOption.ColumnNumber = null;
                    answerOption.RowNumber = null;
                    answerOption.ColumnName = null;
                    answerOption.RowName = null;
                    answerOption.Deleted = false;


                    var newResultData = {};
                    newResultData.Question = question;


                    newResultData.AnswerOption = answerOption;

                    vm.addValidations(newResultData);

                    //coverting to array
                    var convertToObjArray = [];
                    convertToObjArray.push(newResultData);

                    vm.set("questionData", convertToObjArray);
                    //retuning for new question and initialize call is from answer type dropdown change
                    // if the initilize call is not from dropdown change, we nee to set look up data for 
                    //questio type, question type options, question group and equipment dependancy, need call to server 
                    if ((vm.questionId == $ct.constants.getemptyGUID()) && (isAnswerTypeChange)) {
                        return;
                    }

                }

                $ct.helpers.displayWorkAreaBusyCursor();

                //need to modify from hear
                $ct.ds.admin.question.getQuestionById(this.questionId, function (result) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    var errorObj = $ct.mt.getErrorObject(result);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                        return;
                    }

                    var resultData = result.Data;

                    vm.set("dsQuestionTypes", resultData.QuestionLookupData.QuestionTypeData);
                    vm.set("dsQuestionTypeOptions", resultData.QuestionLookupData.MedicalConditionsData);
                    vm.set("dsQuestionGroups", resultData.QuestionLookupData.QuestionGroupData);
                    vm.set("dsEquipmentDependencies", resultData.QuestionEquipmentDependenciesData);
                    if (vm.questionId == $ct.constants.getemptyGUID()) {

                        vm.set("selectedQuestionType", resultData.QuestionLookupData.QuestionTypeData[0]);
                        vm.set("selectedQuestionTypeOption", resultData.QuestionLookupData.MedicalConditionsData[0]);
                        vm.set("selectedQuestionGroup", resultData.QuestionLookupData.QuestionGroupData[0]);

                        return;
                    }

                    var tmpObj = {};
                    tmpObj.Key = resultData.Question.AnswerTypeId;

                     var tmpQuestionTypeObj = { };
                    tmpQuestionTypeObj.Key = resultData.Question.QuestionTypeId;

                    var tmpQuestionTypeOptionObj = { };
                    tmpQuestionTypeOptionObj.Key = resultData.Question.QuestionTypeOptionId;

                    var tmpQuestionGroupObj = { };
                    tmpQuestionGroupObj.Key = resultData.Question.QuestionGroupId;

                    vm.set("selectedAnswerType", tmpObj);
                    vm.set("selectedQuestionType", tmpQuestionTypeObj);
                    vm.set("selectedQuestionTypeOption", tmpQuestionTypeOptionObj);
                    vm.set("selectedQuestionGroup", tmpQuestionGroupObj);


                    vm.addValidations(resultData);

                    //taking a backup of original answer options
                    vm.set("originalAnswerOptions", resultData.Question.AnswerOptions);

                    //coverting to array
                    var convertToObjArray =[];
                    convertToObjArray.push(resultData);
                    vm.set("questionData", convertToObjArray);


                })
            },

            questionTypeChange: function () {

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.question.getQuestionTypeById(this.selectedQuestionType.Key, function (result) {

                    var resultData = result.Data;

                    vm.set("dsQuestionTypeOptions", resultData);
                    vm.set("selectedQuestionTypeOption", resultData[0]);
                    $ct.helpers.hideWorkAreaBusyCursor();
                });
            },



            triggerValidation : false,

            //Adds validation functions to question level, ans option level and to total question definition
            addValidations: function (quesDef) {

                var equipmentDependencyValidation = function () {

                    if (!vm.get("triggerValidation")) {
                        return true;
                    }

                    var atLeastOneSelected = false;
                    $.each(vm.get("dsEquipmentDependencies"), function (mainIndex, mainRec) {

                        if (mainRec.IsSelected) {
                            atLeastOneSelected = true;
                        }
                    });

                    return atLeastOneSelected;

                };


                vm.set("isAtLeastOneEquipmentDependencySelected", equipmentDependencyValidation);


                //Pending:  Validate question id

                //To validate question text
                var hideQuestionTextValidation = function () {

                    if (!this.get("triggerValidations")) {
                        return true;
                    }

                    if ($.trim(this.get("QuestionText")) == "") {
                        return false;
                    }
                    else {
                        return true;
                    }

                };



                var hideAnswerWidthValidation = function () {

                    if (!this.get("triggerValidations")) {
                        return true;
                    }

                    if ((this.get("AnswerWidth") == null) || (this.get("AnswerWidth") == "")) {
                        return false;
                    }
                    else {
                        return true;
                    }

                };

                //To validate choice text validation
                var hideChoiceTextValidation = function () {



                    if (!this.get("triggerValidations")) {
                        return true;
                    }

                    if ($.trim(this.get("ChoiceText")) == "") {
                        return false;
                    }
                    else {
                        return true;
                    }

                };

                quesDef.AnswerOption.triggerValidations = false;
                quesDef.AnswerOption.hideCTextValidation = hideChoiceTextValidation;

                //To check whether question definition is valid or not.
                quesDef.triggerValidations = false;
                quesDef.hideQDefValidation = function () { return true };

                if (
                    (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceOnlyOneAnswerId()) ||
                    (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceMultipleAnswerId()) ||
                    (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getDropdownListId())
                    ) {

                    //Validation function to validate at least two options should present
                    quesDef.hideQDefValidation = function () {

                        if (!this.get("triggerValidations")) {
                            return true;
                        }

                        var tmpAnsOptions = this.get("Question.AnswerOptions")
                        if (tmpAnsOptions.length < 2) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    };

                }


                //Question level validation
                quesDef.Question.triggerValidations = false;
                quesDef.Question.hideQTextValidation = hideQuestionTextValidation;

                if ((quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getStringTextBoxId())
                || (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getTextAreaId())) {

                    quesDef.Question.hideAnswerWidthValidation = hideAnswerWidthValidation;

                }



                //Answer option level validation
                $.each(quesDef.Question.AnswerOptions, function (index, answerOption) {

                    answerOption.triggerValidations = false;

                    if (
                    (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceOnlyOneAnswerId()) ||
                    (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceMultipleAnswerId()) ||
                    (quesDef.Question.AnswerTypeId == $ct.ds.admin.question.getDropdownListId())
                    ) {

                        answerOption.hideCTextValidation = hideChoiceTextValidation;

                    }

                })


            },


            //Fire the validations
            triggerValidations: function () {

                vm.set("triggerValidation", true);
                vm.questionData[0].set("triggerValidations", true);
                vm.questionData[0].Question.set("triggerValidations", true);

                $.each(vm.questionData[0].Question.AnswerOptions, function (index, answerOption) {

                    answerOption.set("triggerValidations", true);

                });

            },
            //To check is question definition data is valid
            isValidData: function () {

                var isDataValid = true;

                if (!vm.isAtLeastOneEquipmentDependencySelected())
                {
                    isDataValid = false;
                }

                //check to see is question definition is valid
                if (!vm.questionData[0].hideQDefValidation()) {
                    isDataValid = false;
                }

                //check to see is question attributes are valid
                if (!vm.questionData[0].Question.hideQTextValidation()) {
                    isDataValid = false;
                }

                if ((vm.questionData[0].Question.AnswerTypeId == $ct.ds.admin.question.getStringTextBoxId()) ||
                (vm.questionData[0].Question.AnswerTypeId == $ct.ds.admin.question.getTextAreaId())) {

                    if (!vm.questionData[0].Question.hideAnswerWidthValidation()) {
                        isDataValid = false;
                    }

                }


                //check to see is answer option attributes are valid
                $.each(vm.questionData[0].Question.AnswerOptions, function (index, answerOption) {

                    if (
                                    (vm.questionData[0].Question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceOnlyOneAnswerId()) ||
                                    (vm.questionData[0].Question.AnswerTypeId == $ct.ds.admin.question.getMultipleChoiceMultipleAnswerId()) ||
                                    (vm.questionData[0].Question.AnswerTypeId == $ct.ds.admin.question.getDropdownListId())
                                    ) {

                        if (!answerOption.hideCTextValidation()) {

                            isDataValid = false;

                        }
                    }

                });

                return isDataValid;

            },

            btnSaveClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());
                this.triggerValidations();
       
                if (!this.isValidData()) {
                    moduleContext.notify($ct.en.getShowValidationMsg(), $ct.msg.getValidationMsg());
                    return;
                }

                var saveQuestionData = vm.questionData[0].toJSON();

                saveQuestionData.Question.QuestionTypeId = vm.selectedQuestionType.Key;
                saveQuestionData.Question.QuestionTypeOptionId = vm.selectedQuestionTypeOption.Key;
                saveQuestionData.Question.QuestionGroupId = vm.selectedQuestionGroup.Key;

                saveQuestionData.Question.QuestionEquipmentDependencies = vm.dsEquipmentDependencies.toJSON();

                //var atLeastOneSelected = false;

                //$.each(saveQuestionData.Question.QuestionEquipmentDependencies, function (mainIndex, mainRec) {

                //    if (mainRec.IsSelected) {
                //        atLeastOneSelected = true;
                //    }

                //});

                //if (!atLeastOneSelected) {
                //    moduleContext.notify($ct.en.getShowValidationMsg(), "Please select atleast one equipment dependency");
                //    return;
                //}



                //handling deleted answer options
                $.each(vm.originalAnswerOptions, function (index, orgAnsOption) {

                    var isRecordFound = false;

                    $.each(vm.questionData[0].Question.AnswerOptions, function (index, updAnsOption) {

                        if (orgAnsOption.Id == updAnsOption.Id) {
                            isRecordFound = true;
                        }

                    })

                    if (!isRecordFound) {
                        orgAnsOption.Deleted = true;
                        saveQuestionData.Question.AnswerOptions.push(orgAnsOption.toJSON());
                    }

                })

                var quest = vm.questionData[0].Question;
                if (
                        (quest.Id == $ct.constants.getemptyGUID())
                        &&
                        (
                            (quest.AnswerTypeId == $ct.ds.admin.question.getStringTextBoxId()) ||
                            (quest.AnswerTypeId == $ct.ds.admin.question.getNumericTextBoxId()) ||
                            (quest.AnswerTypeId == $ct.ds.admin.question.getDecimalTextBoxId()) ||
                            (quest.AnswerTypeId == $ct.ds.admin.question.getTextAreaId())
                        )
                    ) {

                    //Adding answer option id for new scalar question type
                    var tmpAnsOption = vm.questionData[0].AnswerOption.toJSON();
                    tmpAnsOption.ChoiceText = null;
                    saveQuestionData.Question.AnswerOptions.push(tmpAnsOption);


                }

                $ct.helpers.displayWorkAreaBusyCursor();

                $ct.ds.admin.question.saveQuestion(saveQuestionData, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.initialize(false);
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getQuestionSuccessMsg());
                        moduleContext.notify($ct.en.getQuestionCreatedOrUpdated(), null);
                        Boiler.UrlController.goTo($ct.rn.getQuestionList());
                    }


                })



            },


            btnBackClick: function () {

                moduleContext.notify($ct.en.getHideErrorMsg());
                moduleContext.notify($ct.en.getQuestionCreatedOrUpdated(), null);
                Boiler.UrlController.goTo($ct.rn.getQuestionList());

            },

            btnAddOptionClick: function () {

                var newAnsObject = vm.questionData[0].AnswerOption.toJSON();
                newAnsObject.hideCTextValidation = vm.questionData[0].AnswerOption.hideCTextValidation;

                var maxDispOrder = 0;
                //find the maximun value of display order
                $.each(vm.questionData[0].Question.AnswerOptions, function (index, answerOption) {

                    if (maxDispOrder < answerOption.DisplayOrder)
                    { maxDispOrder = answerOption.DisplayOrder }

                });

                newAnsObject.DisplayOrder = maxDispOrder + 1;

                vm.get("questionData[0].Question.AnswerOptions").push(newAnsObject);

            },

            btnOptionDeleteClick: function (e) {

                var objIndex = -1;

                $.each(vm.questionData[0].Question.AnswerOptions, function (index, answerOption) {

                    if (answerOption.DisplayOrder == e.data.DisplayOrder) {
                        objIndex = index;
                    }

                });


                if (objIndex != -1) {
                    vm.get("questionData[0].Question.AnswerOptions").splice(objIndex, 1);
                }
                else {
                    //should never occur
                    alert("Object not found ");
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


