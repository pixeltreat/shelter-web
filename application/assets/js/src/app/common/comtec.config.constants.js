
//Most of the configuration constants for the application




$ct.other = function () {
   
    var hospiceId = gloabalHospiceId;

    var getHospiceId = function () {
        return hospiceId;
    };

    var hospitalId = gloabalHospitalId;

    var getHospitalId = function () {
        return hospitalId;
    };

    var destinationTypeInDisposition = gloabalDestinationTypeInShelterId;

    var getDestinationTypeInDisposition = function () {
        return destinationTypeInDisposition;
        };

    var miscellaneousSectionId = gloabalMiscellaneousSectionId;

    var getMiscellaneousSectionId = function () {
        return miscellaneousSectionId;
    };

    var vitalSignsSectionId = gloabalVitalSignsSectionId;

    var getVitalSignsSectionId = function () {
        return vitalSignsSectionId;
    };


    var employeeTemplateURL = globalBaseServiceUrl + "uploadtemplate/" + "EmployeeUploadTemplate.xlsx";

    var getEmployeeTemplateURL = function () {
        return employeeTemplateURL;
    };


    var sheltereeTemplateURL = globalBaseServiceUrl + "uploadtemplate/" + "SheltereeUploadTemplate.xlsx";

    var getSheltereeTemplateURL = function () {
        return sheltereeTemplateURL;
    };



    var answerTypes = globalAnswerTypes;

    var getAnswerTypes = function () {
        return answerTypes;
    };


    var defaultAnswerType = globalDefaultAnswerType;



    var getDefaultAnswerType = function () {
        return defaultAnswerType;
    };



    //start of question type id's
    var stringTextBoxId = globalQtStringTextBoxId;
    var getStringTextBoxId = function () {
        return stringTextBoxId;
    };

    var numericTextBoxId = globalQtNumericTextBoxId;
    var getNumericTextBoxId = function () {
        return numericTextBoxId;
    };

    var decimalTextBoxId = globalQtDecimalTextBoxId;
    var getDecimalTextBoxId = function () {
        return decimalTextBoxId;
    };

    var textAreaId = globalQtTextAreaId;
    var getTextAreaId = function () {
        return textAreaId;
    };

    var multipleChoiceOnlyOneAnswerId = globalQtMultipleChoiceOnlyOneAnswerId;
    var getMultipleChoiceOnlyOneAnswerId = function () {
        return multipleChoiceOnlyOneAnswerId;
    };

    var multipleChoiceMultipleAnswerId = globalQtMultipleChoiceMultipleAnswerId;
    var getMultipleChoiceMultipleAnswerId = function () {
        return multipleChoiceMultipleAnswerId;
    };

    var dropdownListId = globalQtDropdownListId;
    var getDropdownListId = function () {
        return dropdownListId;
    };



    return {
        getHospiceId: getHospiceId,
        getHospitalId: getHospitalId,
        getDestinationTypeInDisposition:getDestinationTypeInDisposition,
        getMiscellaneousSectionId: getMiscellaneousSectionId,
        getVitalSignsSectionId : getVitalSignsSectionId,
        getEmployeeTemplateURL: getEmployeeTemplateURL,
        getSheltereeTemplateURL: getSheltereeTemplateURL,
        getAnswerTypes: getAnswerTypes,
        getDefaultAnswerType: getDefaultAnswerType,

        getStringTextBoxId: getStringTextBoxId,
        getNumericTextBoxId: getNumericTextBoxId,
        getDecimalTextBoxId: getDecimalTextBoxId,
        getTextAreaId: getTextAreaId,
        getMultipleChoiceOnlyOneAnswerId: getMultipleChoiceOnlyOneAnswerId,
        getMultipleChoiceMultipleAnswerId: getMultipleChoiceMultipleAnswerId,
        getDropdownListId: getDropdownListId

    };

} ();



// role id's for security
$ct.roles = function () {

    var superAdminId = globalSuperAdminId;

    var getSuperAdminId = function () {
        return superAdminId;
    };

    var administratorId = globalAdministratorId;

    var getAdministratorId = function () {
        return administratorId;
    };

    var facilityUpdateId = globalFacilityUpdateId;

    var getFacilityUpdateId = function () {
        return facilityUpdateId;
    };

    var facilityReadOnlyId = globalFacilityReadOnlyId;

    var getFacilityReadOnlyId = function () {
        return facilityReadOnlyId;
    };




    return {

        getSuperAdminId: getSuperAdminId,
        getAdministratorId: getAdministratorId,
        getFacilityUpdateId: getFacilityUpdateId,
        getFacilityReadOnlyId: getFacilityReadOnlyId

    };

} ();


