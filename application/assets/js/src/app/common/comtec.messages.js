
//Messages
$ct.msg = function () {

    //Common messages

    var genericErrorMsg = 'An Unknown Error Occured While Processing Your Request. Please Contact Administrator.';
    var getGenericErrorMsg = function () {
        return genericErrorMsg;
    };

    var invalidServiceRequestObject = "Please Configure ServiceRequest Object Properly."
    var getInvalidServiceRequestObject = function () {
        return invalidServiceRequestObject;
    };

    var invalidRequestMsg = "Invalid Request";
    var getinvalidRequestMsg = function () {
        return invalidRequestMsg;
    };

    var invalidResponseForRequestMsg = "Invalid Response For Request";
    var getInvalidResponseForRequestMsg = function () {
        return invalidResponseForRequestMsg;
    };

    var invalidResponseMsg = " Invalid Response ";
    var getInvalidResponseMsg = function () {
        return invalidResponseMsg;
    };

    var versionConflictReloadMsg = "Version Conflict Occured Do You Want To Refresh Data ?";
    var getVersionConflictReloadMsg = function () {
        return versionConflictReloadMsg;
    };

    var deleteConfirmationMsg = "Are You Sure You Want To Delete? ";
    var getDeleteConfirmationMsg = function () {
        return deleteConfirmationMsg;
    };

    var validationMsg = "Please Fill Required Data ";
    var getValidationMsg = function () {
        return validationMsg;
    };

    var successMsg = " Saved Successfully";
    var getSuccessMsg = function () {
        return successMsg;
    };

    var deleteSuccessMsg = " Deleted Successfully";
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

    var medicalConditionTierSuccessMsg = "Medical Condition Tier" + successMsg;
    var getMedicalConditionTierSuccessMsg = function () {
        return medicalConditionTierSuccessMsg
    };

    var staffSpecialtySuccessMsg = "Staff Specialty " + successMsg;
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
    var sheltereeEmployeeSuccessMsg = "Shelteree Staff Ratio" + successMsg;
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

    var questionSuccessMsg = "Question" + successMsg;
    var getQuestionSuccessMsg = function () {
        return questionSuccessMsg;
    };

    var questionResponseSuccessMsg = "Question Response" + successMsg;
    var getQuestionResponseSuccessMsg = function () {
        return questionResponseSuccessMsg;
    };


    var eventSuccessMsg = "Event" + successMsg;
    var getEventSuccessMsg = function () {
        return eventSuccessMsg;
    };



    var questionDeleteSuccessMsg = "Question" + deleteSuccessMsg;
    var getQuestionDeleteSuccessMsg = function () {
        return questionDeleteSuccessMsg;
    };
    var agencyDeleteSuccessMsg = "Agency " + deleteSuccessMsg;
    var getAgencyDeleteSuccessMsg = function () {
        return agencyDeleteSuccessMsg;
    };

    var medicalConditionTierDeleteSuccessMsg = "Medical Condition Tier" + deleteSuccessMsg;
    var getMedicalConditionTierDeleteSuccessMsg  = function () {
        return medicalConditionTierDeleteSuccessMsg 
    };

    var shelterTypeDeleteSuccessMsg = "Shelter Type " + deleteSuccessMsg;
    var getShelterTypeDeleteSuccessMsg = function () {
        return shelterTypeDeleteSuccessMsg;
    };

    var staffSpecialtyDeleteSuccessMsg = "Staff Specialty " + deleteSuccessMsg;
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
    var sheltereeEmployeeDeleteSuccessMsg = "Shelteree Staff Ratio" + deleteSuccessMsg;
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

    var eventDeleteSuccessMsg = "Event " + deleteSuccessMsg;
    var getEventDeleteSuccessMsg = function () {
        return eventDeleteSuccessMsg;
    };
    
    var uploadValidFile = "Please Select Excel File(.xls,.xslx)";
    var getUploadValidFile = function () {
        return uploadValidFile;
    };
    

    var validateUploadEmployees = "Please Select Import Action";
    var getEmployeesUploadImportOption = function () {
        return validateUploadEmployees;
    };


    // employee related messages

    var EmployeeSuccessMsg = "Staff" + successMsg;
    var getEmployeeSuccessMsg = function () {
        return EmployeeSuccessMsg;
    };


    var employeeDeleteSuccessMsg = "Staff " + deleteSuccessMsg;
    var getEmployeeDeleteSuccessMsg = function () {
        return employeeDeleteSuccessMsg;
    };

    var employeeUploadSuccessMsg = "Data " + successMsg;
    var getEmployeeUploadSuccessMsg = function () {
        return employeeUploadSuccessMsg;
    };


    var employeeAttendenceUpdatedSuccessMsg = "Staff Attendence" + successMsg;
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


    var equipmentSupplyDeleteSuccessMsg = "Equipment Supply " + deleteSuccessMsg;
    var getequipmentSupplyDeleteSuccessMsg = function () {
        return equipmentSupplyDeleteSuccessMsg;
    };

    // shelterstatus related messages

    var ShelterStatusSuccessMsg = "Shelter Status" + successMsg;
    var getShelterStatusSuccessMsg = function () {
        return ShelterStatusSuccessMsg;
    };

    // shelteree related messages

    var sheltereeSuccessMsg = "Shelteree" + successMsg;
    var getSheltereeSuccessMsg = function () {
        return sheltereeSuccessMsg;
    };


    var sheltereeUploadSuccessMsg = "Data " + successMsg;
    var getSheltereeUploadSuccessMsg = function () {
        return sheltereeUploadSuccessMsg;
    };

    var sheltereeMedicalConditionUpdateListSuccessMsg = "Medical Condition Update  Comment " + successMsg;
    var getSheltereeMedicalConditionUpdateListCommentSuccessMsg = function () {
        return sheltereeMedicalConditionUpdateListSuccessMsg;
    };

    var demographicsSuccessMsg = "Demographics " + successMsg;
    var getDemographicsSuccessMsg = function () {
        return demographicsSuccessMsg;
    };

    var medicalSuccessMsg = "Medical " + successMsg;
    var getMedicalSuccessMsg = function () {
        return medicalSuccessMsg;
    };

    var treatmentsSuccessMsg = "Treatments " + successMsg;
    var getTreatmentsSuccessMsg = function () {
        return treatmentsSuccessMsg;
    };

    var equipmentSuccessMsg = "Equipment " + successMsg;
    var getEquipmentSuccessMsg = function () {
        return equipmentSuccessMsg;
    };

    var medicationSuccessMsg = "Medication" + successMsg;
    var getMedicationSuccessMsg = function () {
        return medicationSuccessMsg;
    };
    
    var sheltereeDispositionSuccessMsg = "Disposition " + successMsg;
    var getSheltereeDispostionSuccessMsg = function () {
        return sheltereeDispositionSuccessMsg;
    };

    var incompletesheltereetabdatawarningMsg = " Current tab has incomplete data, do you want to proceed?";
    var getIncompletesheltereetabdatawarningMsg = function () {
        return incompletesheltereetabdatawarningMsg;
    };
    


    var sheltereeDeleteSuccessMsg = "Shelteree " + deleteSuccessMsg;
    var getSheltereeDeleteSuccessMsg = function () {
        return sheltereeDeleteSuccessMsg;
    };

   
    

    //specific validation messages

    var staffTypeValidationMsg = "Please Select Atleast One Staff Type";
    var getStaffTypeValidationMsg = function () {
        return staffTypeValidationMsg;
    };

    var staffSpecialtyValidationMsg = "Please Select Atleast One Medical Condition";
    var getStaffSpecialtyValidationMsg = function () {
        return staffSpecialtyValidationMsg;
    };

    var bulkUpdateEmployeeValidationMsg = "Please Select Records To Bulk Update";
    var getBulkUpdateEmployeeValidationMsg = function () {
        return bulkUpdateEmployeeValidationMsg;
    };

    var bulkUpdateEmployeeAttendanceValidationMsg = "Please Select Atleast One Staff";
    var getBulkUpdateEmployeeAttendanceValidationMsg = function () {
        return bulkUpdateEmployeeAttendanceValidationMsg;
    };
    

    var bulkUpdateEmployeeExtendedValidationMsg = "Please Select Records To Bulk Update";
    var getBulkUpdateEmployeeExtendedValidationMsg = function () {
        return bulkUpdateEmployeeExtendedValidationMsg;
    };

    var bulkUpdateSheltereeValidationMsg = "Please Select Records To Bulk Update";
    var getBulkUpdateSheltereeValidationMsg = function () {
        return bulkUpdateSheltereeValidationMsg;
    };

    var bulkUpdateSheltreeDischargeValidationMsg = "Please Select Records To Bulk Update";
    var getBulkUpdateSheltreeDischargeValidationMsg = function () {
        return bulkUpdateSheltreeDischargeValidationMsg;
    };

    var bulkUpdateSheltreeMedicalUpdateValidationMsg = "Please Select Records To Bulk Update";
    var getBulkUpdateSheltreeMedicalUpdateValidationMsg = function () {
        return bulkUpdateSheltreeMedicalUpdateValidationMsg;
    };
    
    var reportSheltersValidationMsg = "Please Fill Required Data";
    var getReportSheltersValidationMsg = function () {
        return reportSheltersValidationMsg;
    };

    var reportEventsValidationMsg = "Please Fill Required Data";
    var getReportEventsValidationMsg = function () {
        return reportEventsValidationMsg;
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
        getEquipmentSupplySuccessMsg: getEquipmentSupplySuccessMsg,
        getQuestionSuccessMsg:getQuestionSuccessMsg,
        getQuestionResponseSuccessMsg:getQuestionResponseSuccessMsg,
        getEventSuccessMsg: getEventSuccessMsg,


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
        getQuestionDeleteSuccessMsg:getQuestionDeleteSuccessMsg,
        getEventDeleteSuccessMsg: getEventDeleteSuccessMsg,

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
        getSheltereeUploadError: getSheltereeUploadError,
        getSheltereeMedicalConditionUpdateListCommentSuccessMsg: getSheltereeMedicalConditionUpdateListCommentSuccessMsg,
        getDemographicsSuccessMsg: getDemographicsSuccessMsg,
        getMedicalSuccessMsg: getMedicalSuccessMsg,
        getTreatmentsSuccessMsg:getTreatmentsSuccessMsg,
        getEquipmentSuccessMsg: getEquipmentSuccessMsg,
        getMedicationSuccessMsg: getMedicationSuccessMsg,
        getSheltereeDispostionSuccessMsg: getSheltereeDispostionSuccessMsg,
        getIncompletesheltereetabdatawarningMsg:getIncompletesheltereetabdatawarningMsg,


        //specific validation messages
        getStaffTypeValidationMsg: getStaffTypeValidationMsg,
        getStaffSpecialtyValidationMsg: getStaffSpecialtyValidationMsg,
        getBulkUpdateEmployeeValidationMsg: getBulkUpdateEmployeeValidationMsg,
        getBulkUpdateEmployeeAttendanceValidationMsg: getBulkUpdateEmployeeAttendanceValidationMsg,
        getBulkUpdateEmployeeExtendedValidationMsg: getBulkUpdateEmployeeExtendedValidationMsg,
        getBulkUpdateSheltereeValidationMsg: getBulkUpdateSheltereeValidationMsg,
        getBulkUpdateSheltreeDischargeValidationMsg: getBulkUpdateSheltreeDischargeValidationMsg,
        getBulkUpdateSheltreeMedicalUpdateValidationMsg: getBulkUpdateSheltreeMedicalUpdateValidationMsg,
        getReportSheltersValidationMsg: getReportSheltersValidationMsg,
        getReportEventsValidationMsg: getReportEventsValidationMsg

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


