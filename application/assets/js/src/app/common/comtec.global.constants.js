/// <reference path="C:\Dev\tfs\ComTecCollection\Test-TFVC\Apps\Dev\Shelter\Ver1.0\Src\Shelter.Web\01 PL\Shelter.Web\src/modules/modules.js" />

//when adding a variable to this file make sure, there are no name collisions

//global varibales in total application

//Service layer deployed location (Without security)
//var globalBaseServiceUrl = 'https://beta.comtecinfo.com/IMServiceDemo/api/';

//Servicelayer on local machine.
//var globalBaseServiceUrl = 'http://localhost:7222/api/';
var globalBaseServiceUrl = 'https://beta.comtecinfo.com/sheltersl/api/';
//var globalBaseServiceUrl = 'http://localhost:52848/api/';


var gloabalHospiceId = 540003;

//Roles

var globalAdministratorId = 4;
var globalAssociationId = 34;
var globalCallCenterId = 7;
var globalDrcId = 5;
var globalDataCellId = 35;
var globalFacilityUpdateId = 3;
var globalFacilityReadOnlyId = 2;
var globalSuperAdminId = 20;

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


//Employee template URL
var globalEmployeeTemplateURL = "https://beta.comtecinfo.com/FileRepository/ShelterTemplates/Employee_Upload-Template.xlsx";

//Shelteree templat

var globalSheltereeTemplateURL = "https://beta.comtecinfo.com/FileRepository/ShelterTemplates/Shelteree_Upload-Template.xlsx";


