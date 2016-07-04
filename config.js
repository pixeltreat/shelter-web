'use strict';
/* jshint node: true */
var root        = 'application';
var assets      = 'application/assets';
var scss        = assets + '/scss';
var css         = assets + '/css';
var js          = assets + '/js';
var modulesSrc  = root + '/src';
var requireLibs = '../assets/js/src/libs/require';

var dist       = 'application/build';
var distAssets = dist + '/assets';
var distCss    = distAssets + '/css';
var distJs     = distAssets + '/js';

exports.base = {
    root      : root,
    assets    : assets,
    js        : js,
    scss      : scss,
    css       : css,
    dist      : dist,
    distAssets: distAssets,
    distCss   : distCss,
    distJs    : distJs
};

exports.filepath = {
    copyfiles : [
        root + '/index.html',
        assets + '/css/**/*',
        assets + '/fonts/**/*',
        assets + '/img/**/*',
        assets + '/js/vendor/**/*',
        root + '/style-guide/**/*'
    ],

    styles : {
        stylesEntry : [scss + '/app-styles.scss', scss + '/kendo.scss'],
        allScss     : root + '/**/*.scss'
    },
    vendorLibs : [
        js + '/src/plugins/jquery.maskedinput.min.js',
        js + '/src/plugins/jquery.maxlength.js'
    ],
    appLibs : [
        js + '/src/app/common/comtec.global.constants.js',
        js + '/src/app/comtec.startup.js',
        js + '/src/app/common/comtec.model.js',
        js + '/src/app/common/comtec.controler.names.js',
        js + '/src/app/common/comtec.event.names.js',
        js + '/src/app/common/comtec.route.names.js',
        js + '/src/app/common/comtec.message.types.js',
        js + '/src/app/common/comtec.styles.js',
        js + '/src/app/common/comtec.messages.js',
        js + '/src/app/common/comtec.config.constants.js',
        js + '/src/app/comtec.helpers.js',
        js + '/src/app/common/comtec.security.js',
        js + '/src/app/common/comtec.employeeColumnLookup.js',
        js + '/src/app/comtec.ajax.util.js',
        js + '/src/app/datasources/comtec.ds.common.js',
        js + '/src/app/datasources/comtec.ds.admin.agency.js',
        js + '/src/app/datasources/comtec.ds.admin.department.js',
        js + '/src/app/datasources/comtec.ds.admin.medicalconditiontier.js',
        js + '/src/app/datasources/comtec.ds.admin.sheltertype.js',
        js + '/src/app/datasources/comtec.ds.admin.staffspecialty.js',
        js + '/src/app/datasources/comtec.ds.admin.transporttype.js',
        js + '/src/app/datasources/comtec.ds.admin.medicalcondition.js',
        js + '/src/app/datasources/comtec.ds.admin.stafftype.js',
        js + '/src/app/datasources/comtec.ds.admin.sheltreeemployeeratio.js',
        js + '/src/app/datasources/comtec.ds.admin.disposition.js',
        js + '/src/app/datasources/comtec.ds.admin.shelterIdentification.js',
        js + '/src/app/datasources/comtec.ds.admin.equipmentSupply.js',
        js + '/src/app/datasources/comtec.ds.shlt.shelter.js',
        js + '/src/app/datasources/comtec.ds.emp.employee.js',
        js + '/src/app/datasources/comtec.ds.emp.empattendance.js',
        js + '/src/app/datasources/comtec.ds.sheltree.sheltree.js',
        js + '/src/app/datasources/comtec.ds.admin.question.js',
        js + '/src/app/datasources/comtec.ds.sheltree.sheltreeinput.js',
        js + '/src/app/app-ui-scripts.js'

    ],
    appScripts : [
        js + '/src/vendor-libs/require.js',
    ],
    requireMain: modulesSrc + '/main.js'
};

exports.requirejsOptimizeOptions = {
    paths: {
        domReady : requireLibs + '/domReady',
        Boiler   : './core/_boiler_',
        text     : requireLibs + '/text',
        i18n     : requireLibs + '/i18n',
        path     : requireLibs + '/path'
    }
};
