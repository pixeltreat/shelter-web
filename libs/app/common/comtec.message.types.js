//Message types, Acknowledge Types and response message validation
$ct.mt = function () {


    // This object corresponds to AcknowledgeTypeEnum enum in service layer
    var acknowledgeType = {
        success: "success",
        failure: "failure"
    }


    var getAcknowledgeTypeSuccess = function () {
        return acknowledgeType.success;
    };

    var getAcknowledgeTypeFailure = function () {
        return acknowledgeType.failure;
    };

    var isError = function (response) {

        var error = false;

        if (getAcknowledgeTypeSuccess() !== $ct.helpers.toLower(response.AcknowledgeType)) {

            if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
                if (messageTypes.error == $ct.helpers.toLower(response.MessageType) || messageTypes.warning == $ct.helpers.toLower(response.MessageType) || messageTypes.information == $ct.helpers.toLower(response.MessageType) || messageTypes.info == $ct.helpers.toLower(response.MessageType) || messageTypes.message == $ct.helpers.toLower(response.MessageType) || messageTypes.exportToExcel == $ct.helpers.toLower(response.MessageType) || messageTypes.businessRuleValidation == $ct.helpers.toLower(response.MessageType)) {
                    error = true;
                }
            }
            else {
                error = true;
            }
        }

        return error;

    };

    var getErrorObject = function (response) {

        if (isError(response)) {

            var errorObject = {};

            if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
                errorObject.messageType = response.MessageType;
            }
            else {
                errorObject.messageType = messageTypes.error;
            }

            if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
                errorObject.message = response.Message;
            }
            else {
                errorObject.message = "Error please contact administrator";
            }

            return errorObject;
        }

        return null;

    };



    // This object corresponds to MessageTypeEnum enum in service layer
    var messageTypes = {

        //Download is removed
        success: "success",
        error: "error",
        warning: "warning",
        information: "information",
        info: "info",
        message: "message",
        versionConflict: "versionconflict",
        noDataFound: "nodatafound",
        noActiveEvent: "noactiveevent",
        exportToExcel: "exporttoexcel" ,
        businessRuleValidation: "businessrulevalidation"
    };

    var getSuccess = function () {
        return messageTypes.success;
    };

    var getError = function () {
        return messageTypes.error;
    };

    var getWarning = function () {
        return messageTypes.warning;
    };

    var getInformation = function () {
        return messageTypes.information;
    };

    var getInfo = function () {
        return messageTypes.info;
    };

    var getMessage = function () {
        return messageTypes.message;
    };

    var getVersionConflict = function () {
        return messageTypes.versionConflict;
    };

    var getNoDataFound = function () {
        return messageTypes.noDataFound;
    };

    var isVersionConflict = function (response) {

        if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
            if (messageTypes.versionConflict === $ct.helpers.toLower(response.MessageType)) {
                return true;
            }
        }
        return false;

    };

    var isNoDataFound = function (response) {

        if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
            if (messageTypes.noDataFound === $ct.helpers.toLower(response.MessageType)) {
                return true;
            }
        }
        return false;

    };


    var isBusinessRule = function (response) {

        if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
            if (messageTypes.businessRuleValidation === $ct.helpers.toLower(response.MessageType)) {
                return true;
            }
        }
        return false;

    };


    var isNoActiveEvent = function (response) {

        if ((response.MessageType !== undefined) && (response.MessageType !== null)) {
            if (messageTypes.noActiveEvent === $ct.helpers.toLower(response.MessageType)) {
                return true;
            }
        }
        return false;

    };


    return {

        //Acknowledge types
        getAcknowledgeTypeSuccess: getAcknowledgeTypeSuccess,
        getAcknowledgeTypeFailure: getAcknowledgeTypeFailure,

        //Message types
        getSuccess: getSuccess,
        getError: getError,
        getWarning: getWarning,
        getInformation: getInformation,
        getInfo: getInfo,
        getMessage: getMessage,
        getVersionConflict: getVersionConflict,
        getNoDataFound: getNoDataFound,

        //Message type validations
        isVersionConflict: isVersionConflict,
        isNoDataFound: isNoDataFound,
        isBusinessRule : isBusinessRule,
        isNoActiveEvent: isNoActiveEvent,

        isError : isError,
        getErrorObject: getErrorObject

    };
} ();