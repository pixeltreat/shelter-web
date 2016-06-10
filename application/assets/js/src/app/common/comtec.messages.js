
//Messages
$ct.msg = function () {

    //Common messages

    var genericErrorMsg = 'An unknown error occured while processing your request. Please contact administrator.';
    var getGenericErrorMsg = function () {
        return genericErrorMsg;
    };

    var invalidServiceRequestObject = "Please configure ServiceRequest object properly."
    var getInvalidServiceRequestObject = function () {
        return invalidServiceRequestObject;
    };

    var invalidRequestMsg = "Invalid Request";
    var getinvalidRequestMsg = function () {
        return invalidRequestMsg;
    };

    var invalidResponseForRequestMsg = "Invalid response for request";
    var getInvalidResponseForRequestMsg = function () {
        return invalidResponseForRequestMsg;
    };

    var invalidResponseMsg = " Invalid Response ";
    var getInvalidResponseMsg = function () {
        return invalidResponseMsg;
    };

    var versionConflictReloadMsg = "Version conflict occured do you want to refresh data ?";
    var getVersionConflictReloadMsg = function () {
        return versionConflictReloadMsg;
    };

    var deleteConfirmationMsg = "Are you sure you want to delete? ";
    var getDeleteConfirmationMsg = function () {
        return deleteConfirmationMsg;
    };

    var validationMsg = "Please fill required data ";
    var getValidationMsg = function () {
        return validationMsg;
    };

    var successMsg = " saved successfully";
    var getSuccessMsg = function () {
        return successMsg;
    };

    var deleteSuccessMsg = " deleted successfully";
    var getDeleteSuccessMsg = function () {
        return deleteSuccessMsg;
    };


    var employeeUploadError = "Invalid Data";
    var getEmployeeUploadError = function () {
        return employeeUploadError;
    };

    var sheltereeUploadError = "Invalid Data";
    var getSheltereeUploadError = function () {
        return sheltereeUploadError;
    };



    //Form specific messages




    var agencySuccessMsg = "Agency " + successMsg;
    var getAgencySuccessMsg = function () {
        return agencySuccessMsg;
    };

    var shelterTypeSuccessMsg = "ShelterType " + successMsg;
    var getShelterTypeSuccessMsg = function () {
        return shelterTypeSuccessMsg;
    };

    var medicalConditionTierSuccessMsg = "MedicalConditionTier" + successMsg;
    var getMedicalConditionTierSuccessMsg = function () {
        return medicalConditionTierSuccessMsg
    };

    var staffSpecialtySuccessMsg = "StaffSpecialty " + successMsg;
    var getStaffSpecialtySuccessMsg = function () {
        return staffSpecialtySuccessMsg;
    };
    var departmentSuccessMsg = "Department " + successMsg;
    var getDepartmentSuccessMsg = function () {
        return departmentSuccessMsg;
    };
    var medicalConditionSuccessMsg = "Medical Condition " + successMsg;
    var getMedicalConditionSuccessMsg = function () {
        return medicalConditionSuccessMsg;
    };
    var sheltereeEmployeeSuccessMsg = "shelteree Employee " + successMsg;
    var getSheltereeEmployeeSuccessMsg = function () {
        return sheltereeEmployeeSuccessMsg;
    };
    var staffTypeSuccessMsg = "Staff Type " + successMsg;
    var getStaffTypeSuccessMsg = function () {
        return staffTypeSuccessMsg;
    };
    var transportTypeSuccessMsg = "Transportation Type" + successMsg;
    var getTransportTypeSuccessMsg = function () {
        return transportTypeSuccessMsg;
    };

    var equipmentSupplySuccessMsg = "Equipment Supply" + successMsg;
    var getEquipmentSupplySuccessMsg = function () {
        return equipmentSupplySuccessMsg;
    };




    var agencyDeleteSuccessMsg = "Agency " + deleteSuccessMsg;
    var getAgencyDeleteSuccessMsg = function () {
        return agencyDeleteSuccessMsg;
    };

    var medicalConditionTierDeleteSuccessMsg = "MedicalConditionTier" + deleteSuccessMsg;
    var getMedicalConditionTierDeleteSuccessMsg  = function () {
        return medicalConditionTierDeleteSuccessMsg 
    };

    var shelterTypeDeleteSuccessMsg = "ShelterType " + deleteSuccessMsg;
    var getShelterTypeDeleteSuccessMsg = function () {
        return shelterTypeDeleteSuccessMsg;
    };

    var staffSpecialtyDeleteSuccessMsg = "StaffSpecialty " + deleteSuccessMsg;
    var getStaffSpecialtyDeleteSuccessMsg = function () {
        return staffSpecialtyDeleteSuccessMsg;
    };

    var departmentDeleteSuccessMsg = "Department " + deleteSuccessMsg;
    var getDepartmentDeleteSuccessMsg = function () {
        return departmentDeleteSuccessMsg;
    };
    var medicalConditionDeleteSuccessMsg = "Medical Condition " + deleteSuccessMsg;
    var getMedicalConditionDeleteSuccessMsg = function () {
        return medicalConditionDeleteSuccessMsg;
    };
    var sheltereeEmployeeDeleteSuccessMsg = "shelteree Employee " + deleteSuccessMsg;
    var getSheltereeEmployeeDeleteSuccessMsg = function () {
        return sheltereeEmployeeDeleteSuccessMsg;
    };
    var staffTypeDeleteSuccessMsg = "Staff Type " + deleteSuccessMsg;
    var getStaffTypeDeleteSuccessMsg = function () {
        return staffTypeDeleteSuccessMsg;
    };
    var transportTypeDeleteSuccessMsg = "Transportation Type " + deleteSuccessMsg;
    var getTransportTypeDeleteSuccessMsg = function () {
        return transportTypeDeleteSuccessMsg;
    };


    var shelterIdentificationDeleteSuccessMsg = "Shelter Identification " + deleteSuccessMsg;
    var getShelterIdentificationDeleteSuccessMsg = function () {
        return shelterIdentificationDeleteSuccessMsg;
    };
   

    var shelterIdentificationSuccessMsg = "Shelter Identification " + successMsg;
    var getShelterIdentificationSuccessMsg = function () {
        return shelterIdentificationSuccessMsg;
    };

    var uploadValidFile = "Please select excel file(.xls,.xslx)";
    var getUploadValidFile = function () {
        return uploadValidFile;
    };
    

    var validateUploadEmployees = "Please select Import Action";
    var getEmployeesUploadImportOption = function () {
        return validateUploadEmployees;
    };


    // employee related messages

    var EmployeeSuccessMsg = "Employee" + successMsg;
    var getEmployeeSuccessMsg = function () {
        return EmployeeSuccessMsg;
    };


    var employeeDeleteSuccessMsg = "Employee " + deleteSuccessMsg;
    var getEmployeeDeleteSuccessMsg = function () {
        return employeeDeleteSuccessMsg;
    };

    var employeeUploadSuccessMsg = "Data " + successMsg;
    var getEmployeeUploadSuccessMsg = function () {
        return employeeUploadSuccessMsg;
    };


    var employeeAttendenceUpdatedSuccessMsg = "Employee Attendence" + successMsg;
    var getEmployeeAttendenceUpdatedSuccessMsg = function () {
        return employeeAttendenceUpdatedSuccessMsg;
    };

    var dispositionDeleteSuccessMsg = "Disposition " + deleteSuccessMsg;
    var getDispositionDeleteSuccessMsg = function () {
        return dispositionDeleteSuccessMsg;
    };

    var dispositionSuccessMsg = "Disposition " + successMsg;
    var getDispositionSuccessMsg = function () {
        return dispositionSuccessMsg;
    };


    var equipmentSupplyDeleteSuccessMsg = "EquipmentSupply " + deleteSuccessMsg;
    var getequipmentSupplyDeleteSuccessMsg = function () {
        return equipmentSupplyDeleteSuccessMsg;
    };

    // shelterstatus related messages

    var ShelterStatusSuccessMsg = "ShelterStatus" + successMsg;
    var getShelterStatusSuccessMsg = function () {
        return ShelterStatusSuccessMsg;
    };

    // shelteree related messages

    var sheltereeSuccessMsg = "Shelteree" + successMsg;
    var getSheltereeSuccessMsg = function () {
        return sheltereeSuccessMsg;
    };


    var sheltereeDeleteSuccessMsg = "Shelteree " + deleteSuccessMsg;
    var getSheltereeDeleteSuccessMsg = function () {
        return sheltereeDeleteSuccessMsg;
    };


    var sheltereeUploadSuccessMsg = "Data " + successMsg;
    var getSheltereeUploadSuccessMsg = function () {
        return sheltereeUploadSuccessMsg;
    };

    return {

        //Common messages
        getGenericErrorMsg: getGenericErrorMsg,
        getInvalidServiceRequestObject: getInvalidServiceRequestObject,
        getinvalidRequestMsg: getinvalidRequestMsg,
        getInvalidResponseForRequestMsg: getInvalidResponseForRequestMsg,
        getInvalidResponseMsg: getInvalidResponseMsg,
        getVersionConflictReloadMsg: getVersionConflictReloadMsg,
        getDeleteConfirmationMsg: getDeleteConfirmationMsg,
        getValidationMsg: getValidationMsg,
        getEmployeeUploadError:getEmployeeUploadError,
    

        //Form specific messages
        
        

        //Admin related messages
        getSuccessMsg: getSuccessMsg,
        getAgencySuccessMsg: getAgencySuccessMsg,
        getShelterTypeSuccessMsg: getShelterTypeSuccessMsg,
        getMedicalConditionTierSuccessMsg: getMedicalConditionTierSuccessMsg,
        getStaffSpecialtySuccessMsg: getStaffSpecialtySuccessMsg,
        getDepartmentSuccessMsg: getDepartmentSuccessMsg,
        getMedicalConditionSuccessMsg: getMedicalConditionSuccessMsg,
        getSheltereeEmployeeSuccessMsg: getSheltereeEmployeeSuccessMsg,
        getStaffTypeSuccessMsg:getStaffTypeSuccessMsg,
        getTransportTypeSuccessMsg: getTransportTypeSuccessMsg,
        getDispositionDeleteSuccessMsg: getDispositionDeleteSuccessMsg,
        getDispositionSuccessMsg:getDispositionSuccessMsg,
        getShelterIdentificationSuccessMsg:getShelterIdentificationSuccessMsg,
        getShelterIdentificationDeleteSuccessMsg:getShelterIdentificationDeleteSuccessMsg,
        getEquipmentSupplySuccessMsg:getEquipmentSupplySuccessMsg,



        getDeleteSuccessMsg: getDeleteSuccessMsg,
        getAgencyDeleteSuccessMsg: getAgencyDeleteSuccessMsg,
        getShelterTypeDeleteSuccessMsg: getShelterTypeDeleteSuccessMsg,
        getMedicalConditionTierDeleteSuccessMsg: getMedicalConditionTierDeleteSuccessMsg,
        getStaffSpecialtyDeleteSuccessMsg: getStaffSpecialtyDeleteSuccessMsg,
        getDepartmentDeleteSuccessMsg: getDepartmentDeleteSuccessMsg,
        getMedicalConditionDeleteSuccessMsg: getMedicalConditionDeleteSuccessMsg,
        getSheltereeEmployeeDeleteSuccessMsg: getSheltereeEmployeeDeleteSuccessMsg,
        getStaffTypeDeleteSuccessMsg:getStaffTypeDeleteSuccessMsg,
        getTransportTypeDeleteSuccessMsg: getTransportTypeDeleteSuccessMsg,
        getequipmentSupplyDeleteSuccessMsg: getequipmentSupplyDeleteSuccessMsg,


        getUploadValidFile: getUploadValidFile,
        getEmployeesUploadImportOption: getEmployeesUploadImportOption,

        // employee related messages

        getEmployeeSuccessMsg: getEmployeeSuccessMsg,
        getEmployeeDeleteSuccessMsg: getEmployeeDeleteSuccessMsg,
        getEmployeeUploadSuccessMsg: getEmployeeUploadSuccessMsg,

        // shelterstatus related messages

        getShelterStatusSuccessMsg: getShelterStatusSuccessMsg,
        getEmployeeAttendenceUpdatedSuccessMsg: getEmployeeAttendenceUpdatedSuccessMsg,

        // shelteree related messages
        getSheltereeSuccessMsg: getSheltereeSuccessMsg,
        getSheltereeDeleteSuccessMsg:getSheltereeDeleteSuccessMsg,
        getSheltereeUploadSuccessMsg: getSheltereeUploadSuccessMsg,
        getSheltereeUploadError: getSheltereeUploadError

    };
} ();


//Help Titles
$ct.ht = function () {

    var help = "Help";

    var getHelp = function () {
        return help;
    };

    var operatingStatus = "Operating Status";

    var getOperatingStatus = function () {
        return operatingStatus;
    };

    return {

        getHelp: getHelp
       // getOperatingStatus: getOperatingStatus,

    };

} ();


