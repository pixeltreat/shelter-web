define(["Boiler", 'text!./help/help.html'], function (Boiler, helpTmpl) {

    var ViewModel = function (moduleContext) {

        var vm = kendo.observable({

            pageName: "Question List page",

            helpClick: function (e) {

                var panel = new Boiler.ViewTemplate(null, helpTmpl, null);
                $ct.helpers.displayWindow(panel);
            },


            searchToken: "",
            initialSearchToken: "",

            selectedId: -1,
            selectedRecordVersion: -1,

            initialLoad: true,

            dsQuestion: function () {


                if (this.initialLoad) {
                    $ct.helpers.displayWorkAreaBusyCursor();
                }

                this.fillGrid();

                if (this.initialLoad) {
                    this.initialLoad = false;
                    $ct.helpers.hideWorkAreaBusyCursor();
                }

            },

            fillGrid: function () {
                this.set("dsQuestion", $ct.ds.admin.question.getQuestions(this));

            },

            searchQuestions: function (e) {
                if (this.initialSearchToken !== this.searchToken) {
                    this.fillGrid();
                    this.initialSearchToken = this.searchToken;
                }
            },

            refreshdsQuestionGrid: function (e) {
                vm.dsQuestion.read();
            },


            rowSelectionChange: function (e) {
                this.set("selectedId", e.sender.dataItem(e.sender.select()).QuestionId);
                this.set("selectedRecordVersion", e.sender.dataItem(e.sender.select()).Version);
            },



            questionEditUrl: function (isNew) {
                if (!isNew) {
                    return $ct.rn.getQuestion() + "/" + this.selectedId;
                }
                else {
                    return $ct.rn.getQuestion() + "/" + $ct.constants.getemptyGUID();
                }
            },

            btnAddClick: function (e) {
                Boiler.UrlController.goTo(this.questionEditUrl(true));
            },

            btnEditClick: function (e) {

                this.set("selectedId", e.data.QuestionId);
                this.set("selectedRecordVersion", e.data.Version);

                Boiler.UrlController.goTo(this.questionEditUrl(false));
            },

            btnDeleteClick: function (e) {

                moduleContext.notify($ct.en.getHideErrorMsg());

                if (!$ct.helpers.displayConfirmWindow($ct.msg.getDeleteConfirmationMsg())) {
                    return;
                }

                $ct.helpers.displayWorkAreaBusyCursor();

                this.set("selectedId", e.data.QuestionId);
                this.set("selectedRecordVersion", e.data.Version);

                $ct.ds.admin.question.deleteQuestionById(this, function (data) {

                    $ct.helpers.hideWorkAreaBusyCursor();

                    if ($ct.mt.isVersionConflict(data)) {
                        if ($ct.helpers.displayConfirmWindow($ct.msg.getVersionConflictReloadMsg())) {
                            vm.dsQuestion.read();
                        }
                        return;
                    }

                    var errorObj = $ct.mt.getErrorObject(data);
                    if (errorObj != null) {
                        moduleContext.notify($ct.en.getShowErrorMsg(), errorObj);
                    }
                    else {
                        moduleContext.notify($ct.en.getShowSuccMsg(), $ct.msg.getQuestionDeleteSuccessMsg());
                    }

                    vm.dsQuestion.read();

                });

            }

        });

        //end of observable

        return {
            data: vm
        };

    };

    return ViewModel;
});
