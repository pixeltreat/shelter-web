define(
    ['Boiler',
        './pageHeader/component',
        './mainMenu/component',
        './common/component',
        './employeeHeader/component',
        './alerts/component',
        './appLogo/component',
        './footer/component'

    //], function (Boiler, PageHeaderComponent, MainMenuComponent, FooterComponent, CommonComponent, EmployeeHeader, Alerts) {

    ], function (Boiler, PageHeaderComponent, MainMenuComponent, CommonComponent, EmployeeHeader, Alerts, AppLogo, FooterComponent) {

        var Module = function (globalContext) {
            var context = new Boiler.Context(globalContext);

            //scoped DomController that will be effective only on $('#page-content')
            var controller = new Boiler.DomController($('#page-content'));
            //add routes with DOM node selector queries and relevant components
            controller.addRoutes({
                ".page-header"    : new PageHeaderComponent(context),
                ".main-menu"      : new MainMenuComponent(context),
                ".common-module"  : new CommonComponent(context),
                ".employee-header": new EmployeeHeader(context),

                ".app-alerts-wrap": new Alerts(context),
                ".app-logo-wrap"  : new AppLogo(context),
                ".footer"         : new FooterComponent(context)
            });

            controller.start();
        };

        return Module;

    });
