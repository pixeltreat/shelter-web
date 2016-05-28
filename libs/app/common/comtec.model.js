
$ct.constants = function () {


    var emptyGUID = "00000000-0000-0000-0000-000000000000";

    var getemptyGUID = function () {
        return emptyGUID;
    };

    var newRecordId = "-1";

    var getNewRecordId = function () {
        return newRecordId;
    };

    var getHttpVerb = "GET";

    var getGetHttpVerb = function () {
        return getHttpVerb;
    };

    var postHttpVerb = "POST";

    var getPostHttpVerb = function () {
        return postHttpVerb;
    };

    var dataType = 'json';
    var getDataType = function () {
        return dataType;
    };

    var contentType = 'application/json; charset=utf-8';

    var getContentType = function () {
        return contentType;
    };

    var Key = 'Comtec@12#';
    var getKey = function () {
        return Key;
    };

    var ClientTag = 'ShelterWeb';
    var getClientTag = function () {
        return ClientTag;
    };

    var SessionToken = [];
    var getSessionToken = function () {
        return SessionToken;
    };

    var ServiceRequest = {
        ClientTag: ClientTag,
        AccessToken: 'access',
        InfSystem: 'Comtec',
        RequestId: '',
        SessionToken: [],
        Data: null
    };

    var getServiceRequest = function () {
        return ServiceRequest;
    };



    // Exposed objects and parameters
    return {
        getemptyGUID: getemptyGUID,

        //AJAX Related
        getGetHttpVerb: getGetHttpVerb,
        getPostHttpVerb: getPostHttpVerb,
        getDataType: getDataType,
        getContentType: getContentType,

        //Authentical relates  
        getKey: getKey,
        getClientTag: getClientTag,
        getSessionToken: getSessionToken,
        SessionToken: SessionToken,
        getServiceRequest: getServiceRequest,
        getNewRecordId: getNewRecordId

    };
} ();















