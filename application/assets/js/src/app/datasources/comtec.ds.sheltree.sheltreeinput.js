$ct.ds.sheltree.sheltreeinput = function () {

    var getMedicalTabQuestionGroupResponse = function (sheltereeId, successCallBack) {

        var requestParam = {};
        requestParam.SheltereeId = sheltereeId;

        $ct.ajax.ajaxPost($ct.cn.getQuestionResponseUrl() + 'GetMedicalTabQuestionGroupResponse', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };


    var getCareRequirements = function (sheltereeId, successCallBack) {

        var requestParam = {};
        requestParam.SheltereeId = sheltereeId;

        $ct.ajax.ajaxPost($ct.cn.getQuestionResponseUrl() + 'GetCareRequirementsQuestionGroupResponse', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };

    var getVitals = function (sheltereeId, successCallBack) {

        var requestParam = {};
        requestParam.SheltereeId = sheltereeId;

        $ct.ajax.ajaxPost($ct.cn.getQuestionResponseUrl() + 'GetVitalQuestionGroupResponse', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)

        return "";
    };



   
    var saveQuestionResponse = function (questionResponse, successCallBack) {

        //url pending
        $ct.ajax.ajaxPost($ct.cn.getQuestionResponseUrl() + 'SaveQuestionResponse', questionResponse, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };



    var getEquipmentSuppliesById = function (sheltereeId, successCallBack) {
     
        var requestParam = {};
        requestParam.SheltereeId = sheltereeId;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeEquipmentSupplyById', requestParam, function (result) {

            if (successCallBack != null)
            {
                successCallBack(result);
            }

        }, null, true)
        return "";
    };

    var saveEquipmentSupplies = function (saveEquipmentSuppliesData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'SaveSheltereeEquipmentSupply', saveEquipmentSuppliesData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var getSheltereeIdentificationDischargeAndDispositionById = function (sheltereeId, successCallBack) {

        var requestParam = {};

        requestParam.SheltereeId = sheltereeId;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeIdentificationDispositionDischargeById', requestParam, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var saveSheltereeIdentificationDischargeAndDisposition = function (saveData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'SaveSheltereeIdentificationDispositionDischarge', saveData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    var getDemographicsById = function (sheltreeId,shelterId, successCallBack) {
        var requestParam = {};

        requestParam.SheltereeId = sheltreeId;
        requestParam.FacilityId = shelterId;

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeById', requestParam, function (result) {
            if (successCallBack != null)

                successCallBack(result);
        }, null, true)
        return "";

    };

    var saveDemographics = function (saveEquipmentSuppliesByIdData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'SaveShelteree', saveEquipmentSuppliesByIdData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };


    var getMedicationById = function (sheltreeId, successCallBack) {
        var requestParam = {};

        requestParam.SheltereeId = sheltreeId;
        //   requestParam.SheltereeId = $ct.constants.getemptyGUID();

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'GetSheltereeMedications', requestParam, function (result) {
            if (successCallBack != null)

                successCallBack(result);
        }, null, true)
        return "";
    };

    var saveMedication = function (saveEquipmentSuppliesByIdData, successCallBack) {

        $ct.ajax.ajaxPost($ct.cn.getSheltereeFacilityUrl() + 'SaveSheltereeMedicationWithAllergies', saveEquipmentSuppliesByIdData, function (result) {

            if (successCallBack != null)
                successCallBack(result);

        }, null, true)


        return "";
    };

    return {

        getMedicalTabQuestionGroupResponse: getMedicalTabQuestionGroupResponse,
        getCareRequirements: getCareRequirements,
        getVitals: getVitals,
        saveQuestionResponse: saveQuestionResponse,
        getEquipmentSuppliesById: getEquipmentSuppliesById,
        saveEquipmentSupplies: saveEquipmentSupplies,
        getSheltereeIdentificationDischargeAndDispositionById: getSheltereeIdentificationDischargeAndDispositionById,
        saveSheltereeIdentificationDischargeAndDisposition: saveSheltereeIdentificationDischargeAndDisposition,
        getDemographicsById: getDemographicsById,
        saveDemographics: saveDemographics,
        getMedicationById: getMedicationById,
        saveMedication: saveMedication

    };

}();

