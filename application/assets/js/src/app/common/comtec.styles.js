//styles
$ct.styles = function () {

    var validDataBorder = "1px solid #00ff00";

    var getValidDataBorder = function () {
        return validDataBorder;
    };


    var invalidDataBorder = "1px solid #ff0000";

    var getInvalidDataBorder = function () {
        return invalidDataBorder;
    };


    var noneStyle = "none";

    var getNoneStyle = function () {
        return noneStyle;
    };


    var blockStyle = "block";

    var getBlockStyle = function () {
        return blockStyle;
    };

    var inlineBlockStyle = "inline-block";

    var getInlineBlockStyle = function () {
        return inlineBlockStyle;
    };

    var removeInvalidDataBorder = "";

    var getRemoveInvalidDataBorder = function () {
        return removeInvalidDataBorder;
    };


    var displayInlineBlockClass = "displayInlineBlock";

    var getDisplayInlineBlockClass = function () {
        return displayInlineBlockClass;
    };

    var displayNoneImportantClass = "displayNoneImportant";

    var getDisplayNoneImportantClass = function () {
        return displayNoneImportantClass;
    };



    var dataInvalidClass = "datainvalidcolor";

    var getDataInvalidClass = function () {
        return dataInvalidClass;
    };


    var noClass = "";

    var getNoClass = function () {
        return noClass;
    };


    //staus update classes

    var redBorderStatusUpdate = "redBrdr";

    var getRedBorderStatusUpdate = function () {
        return redBorderStatusUpdate;
    };

    var greyBorderStatusUpdate = "greyBrdr";

    var getGreyBorderStatusUpdate = function () {
        return greyBorderStatusUpdate;
    };

    var redBorderClass = "redBorder";

    var getRedBorderClass = function () {
        return redBorderClass;
    };

    var greenBorderClass = "greenBorder";

    var getGreenBorderClass = function () {
        return greenBorderClass;
    };

    var grayBorderClass = "greyBorder";

    var getGrayBorderClass = function () {
        return grayBorderClass;
    };

    var okCircleClass = "icon-ok-circle";

    var getOkCircleClass = function () {
        return okCircleClass;
    };


    var attentionClass = "icon-attention";

    var getAttentionClass = function () {
        return attentionClass;
    };

    var emptyIconClass = "icon-right-dir";

    var getEmptyIconClass = function () {
        return emptyIconClass;
    };

    //staus update classes end

    //message header classes

    var redBackgroundClass = "imp-message_red";

    var getRedBackgroundClass = function () {
        return redBackgroundClass;
    };

    var grayBackgroundClass = "imp-message_grey";

    var getGrayBackgroundClass = function () {
        return grayBackgroundClass;
    };

    var greenBackgroundClass = "imp-message_green";

    var getGreenBackgroundClass = function () {
        return greenBackgroundClass;
    };


    var redMessageIconClass = "imp-message-icon_red";

    var getRedMessageIconClass = function () {
        return redMessageIconClass;
    };


    var grayMessageIconClass = "imp-message-icon_grey";

    var getGrayMessageIconClass = function () {
        return grayMessageIconClass;
    };


    var greenMessageIconClass = "imp-message-icon_green";

    var getGreenMessageIconClass = function () {
        return greenMessageIconClass;
    };

    //message header classes end


    return {

        getValidDataBorder: getValidDataBorder,
        getInvalidDataBorder: getInvalidDataBorder,

        getNoneStyle: getNoneStyle,
        getBlockStyle: getBlockStyle,
        getInlineBlockStyle: getInlineBlockStyle,

        getDisplayInlineBlockClass: getDisplayInlineBlockClass, 
        getDisplayNoneImportantClass : getDisplayNoneImportantClass,

        getRemoveInvalidDataBorder: getRemoveInvalidDataBorder,
        getDataInvalidClass: getDataInvalidClass,
        getNoClass: getNoClass,

        //staus update classes
        getRedBorderStatusUpdate: getRedBorderStatusUpdate,
        getGreyBorderStatusUpdate: getGreyBorderStatusUpdate,
        getRedBorderClass: getRedBorderClass,
        getGreenBorderClass: getGreenBorderClass,
        getGrayBorderClass: getGrayBorderClass,
        getOkCircleClass: getOkCircleClass,
        getAttentionClass: getAttentionClass,
        getEmptyIconClass: getEmptyIconClass,


        //message header classes
        getRedBackgroundClass: getRedBackgroundClass,
        getGrayBackgroundClass: getGrayBackgroundClass,
        getGreenBackgroundClass: getGreenBackgroundClass,
        getRedMessageIconClass: getRedMessageIconClass,
        getGrayMessageIconClass: getGrayMessageIconClass,
        getGreenMessageIconClass: getGreenMessageIconClass

    };
} ();