define(
    ['Boiler',
        './pageHeader/component',
        './mainMenu/component',
        './footer/component',
        './common/component',
        './employeeHeader/component',
        './alerts/component'
    ], function (Boiler, PageHeaderComponent, MainMenuComponent, FooterComponent, CommonComponent, EmployeeHeader, Alerts) {

        var Module = function (globalContext) {
            var context = new Boiler.Context(globalContext);

            //scoped DomController that will be effective only on $('#page-content')
            var controller = new Boiler.DomController($('#page-content'));
            //add routes with DOM node selector queries and relevant components
            controller.addRoutes({
                ".common-module": new CommonComponent(context),
                ".page-header": new PageHeaderComponent(context),
                ".main-menu": new MainMenuComponent(context),
                ".footer": new FooterComponent(context),
                ".employee-header": new EmployeeHeader(context),
                ".alerts": new Alerts(context)
            });

            controller.start();
        };

        return Module;

    });
