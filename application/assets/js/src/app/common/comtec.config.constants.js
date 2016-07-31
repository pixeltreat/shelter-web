
//Most of the configuration constants for the application




$ct.other = function () {

    var hospiceId = gloabalHospiceId;

    var getHospiceId = function () {
        return hospiceId;
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



    return {
        getHospiceId: getHospiceId,
        getMiscellaneousSectionId: getMiscellaneousSectionId,
        getVitalSignsSectionId : getVitalSignsSectionId,
        getEmployeeTemplateURL: getEmployeeTemplateURL,
        getSheltereeTemplateURL: getSheltereeTemplateURL

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


