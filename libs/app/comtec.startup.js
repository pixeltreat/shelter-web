// Files Order
//1.  comtec.startup.js file
//2. constants and utility functions, these files are independent, does not depend on any other files except comtec.startup.js.
//3. helpers
//4. errors
//5. ajax util
//6. data source files, currently each data source file is independent and does not depend on any other data source files.


/// <reference path="comtec.startup.js" />


// constants and util functions

/// <reference path="common/comtec.model.js" />
/// <reference path="common/comtec.controler.names.js" />
/// <reference path="common/comtec.event.names.js" />
/// <reference path="common/comtec.route.names.js" />
/// <reference path="common/comtec.message.types.js" />
/// <reference path="common/comtec.styles.js" />
/// <reference path="common/comtec.messages.js" />


/// <reference path="comtec.helpers.js" />
/// <reference path="comtec.error.js" />
/// <reference path="comtec.ajax.util.js" />


// Data sorce files
/// <reference path="datasources/comtec.ds.admin.status.js" />
/// <reference path="datasources/comtec.ds.admin.bedtype.js" />
/// <reference path="datasources/comtec.ds.admin.hssbedtype.js" />
/// <reference path="datasources/comtec.ds.admin.genservice.js" />
/// <reference path="datasources/comtec.ds.admin.outcome.js" />
/// <reference path="datasources/comtec.ds.admin.reasons.js" />
/// <reference path="datasources/comtec.ds.admin.promptins.js" />
/// <reference path="datasources/comtec.ds.admin.scripts.js" />
/// <reference path="datasources/comtec.ds.admin.medicalequip.js" />
/// <reference path="datasources/comtec.ds.admin.evacdestination.js" />
/// <reference path="datasources/comtec.ds.admin.utilityprovider.js" />
/// <reference path="datasources/comtec.ds.admin.enum.js" />
/// <reference path="datasources/comtec.ds.admin.transportation.js" />
/// <reference path="datasources/comtec.ds.admin.disposition.js" />
/// <reference path="datasources/comtec.ds.admin.transporttype.js" />
/// <reference path="datasources/comtec.ds.admin.evacueetype.js" />


/// <reference path="datasources/comtec.ds.su.facilitycensus.js" />
/// <reference path="datasources/comtec.ds.su.generatorfacility.js" />
/// <reference path="datasources/comtec.ds.su.facilitycensus.js" />



var $ct = $ct || {};
$ct.ds = $ct.ds || {};
$ct.ds.admin = $ct.ds.admin || {};
$ct.ds.shlt = $ct.ds.shlt || {};
$ct.ds.emp = $ct.ds.emp || {};
$ct.ds.sheltree = $ct.ds.sheltree || {};

