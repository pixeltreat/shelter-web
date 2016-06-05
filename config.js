'use strict';
/* jshint node: true */
var root   = 'application';
var assets = 'application/assets';
var scss   = assets + '/scss';
var css    = assets + '/css';
var js     = assets + '/js';

exports.base = {
    root  : root,
    assets: assets,
    js    : js,
    scss  : scss,
    css   : css
};

exports.filepath = {
    styles : {
        stylesEntry : [scss + '/app-styles.scss', scss + '/kendo.scss'],
        allScss     : root + '/**/*.scss'
    },
    vendorLibs : [
        js + '/src/vendor-libs/jquery-2.2.4.js',
        js + '/src/plugins/*.js',
        js + '/src/vendor-libs/underscore.js',
        js + '/src/libs/Other/json2.js',
        js + '/src/libs/signals/signals.js',
        js + '/src/libs/crossroads/crossroads.js',
        js + '/src/libs/hasher/hasher.js',
        js + '/src/libs/pubsub/pubsub.js',

        js + '/src/libs/boilerplate/groundwork.js',
        js + '/src/libs/Other/math.uuid.js'
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

        js + '/src/app/app-ui-scripts.js'

    ],
    appScripts : [
        js + '/src/vendor-libs/require.js',
    ]
};
