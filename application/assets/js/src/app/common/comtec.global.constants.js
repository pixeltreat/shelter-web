/// <reference path="C:\Dev\tfs\ComTecCollection\Test-TFVC\Apps\Dev\Shelter\Ver1.0\Src\Shelter.Web\01 PL\Shelter.Web\src/modules/modules.js" />

//when adding a variable to this file make sure, there are no name collisions

//global varibales in total application

//Service layer deployed location (Without security)
//var globalBaseServiceUrl = 'https://beta.comtecinfo.com/IMServiceDemo/';

//Servicelayer on local machine.
//var globalBaseServiceUrl = 'http://localhost:7222/';
//var globalBaseServiceUrl = 'https://beta.comtecinfo.com/sheltersl/';
//QA Service URL
//var globalBaseServiceUrl = 'https://qa.comtecinfo.com:452/msns/msnsservice/';

//var globalBaseServiceUrl = 'http://localhost:52848/';
var globalBaseServiceUrl = 'https://beta.comtecinfo.com/msnssldemo/';

var gloabalHospitalId = 640502;

var gloabalHospiceId = 640306;
var gloabalDestinationTypeInShelterId = 1;

var gloabalMiscellaneousSectionId = 2;
var gloabalVitalSignsSectionId = 4;



//Roles
var globalSuperAdminId = 9;
var globalAdministratorId = 4;
var globalFacilityUpdateId = 3;
var globalFacilityReadOnlyId = 2;


//Question types
//we can get rid of this
var globalAnswerTypes = [
{ "Key": 1, "Value": "String Text Box" },
{ "Key": 2, "Value": "Numeric Text Box" },
{ "Key": 3, "Value": "Decimal Text Box" },
{ "Key": 4, "Value": "Text Area" },
{ "Key": 5, "Value": "Multiple Choice Only One Answer" },
{ "Key": 6, "Value": "MultipleChoice Multiple Answer" },
{ "Key": 7, "Value": "Dropdown List" }
];

var globalDefaultAnswerType = { "Key": 1, "Value": "String Text Box" };


var globalQtStringTextBoxId = 1;
var globalQtNumericTextBoxId = 2;
var globalQtDecimalTextBoxId = 3;
var globalQtTextAreaId = 4;
var globalQtMultipleChoiceOnlyOneAnswerId = 5;
var globalQtMultipleChoiceMultipleAnswerId = 6;
var globalQtDropdownListId = 7;


