System.register(['angular2/core', 'angular2/router', './components/message-rates.component', './components/summary.component', './components/group-message-rates.component', './components/welcome.component', './components/graph-main.component', './services/employee.service', './services/summary.service', './services/group.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, message_rates_component_1, summary_component_1, group_message_rates_component_1, welcome_component_1, graph_main_component_1, employee_service_1, summary_service_1, group_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (message_rates_component_1_1) {
                message_rates_component_1 = message_rates_component_1_1;
            },
            function (summary_component_1_1) {
                summary_component_1 = summary_component_1_1;
            },
            function (group_message_rates_component_1_1) {
                group_message_rates_component_1 = group_message_rates_component_1_1;
            },
            function (welcome_component_1_1) {
                welcome_component_1 = welcome_component_1_1;
            },
            function (graph_main_component_1_1) {
                graph_main_component_1 = graph_main_component_1_1;
            },
            function (employee_service_1_1) {
                employee_service_1 = employee_service_1_1;
            },
            function (summary_service_1_1) {
                summary_service_1 = summary_service_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            }],
        execute: function() {
            //rework top bar into drop down menu
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    $(document).foundation();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'enron',
                        template: "\n  <div class='top-bar'>\n    <div class='top-bar-left'>\n      <img src='./img/Logo.png' class=\"logo\">\n    </div>\n    <div class='top-bar-left'>\n      <ul class='menu'>\n        <li><a [routerLink]=\"['Home']\">Home</a></li>\n        <li><a [routerLink]=\"['MessageRates', {id:null}]\" id='messageRateLink'>Employee Message Rates</a></li>\n        <li><a [routerLink]=\"['GroupMessageRates', {id:null}]\" id='groupRateLink'>Group Message Rates</a></li>\n        <li><a [routerLink]=\"['Groups']\" id='groupsLink'>Groups</a></li>\n        <li><a [routerLink]=\"['Summary']\" id='summaryLink'>Summary</a></li>\n      </ul>\n    </div>\n  </div>\n\n  <router-outlet></router-outlet>\n\n  ",
                        styles: ["\n    .logo {\n      height: 2.1em;\n      width: auto;\n    }\n  "],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [employee_service_1.EmployeeService, group_service_1.GroupService, summary_service_1.SummaryService]
                    }),
                    router_1.RouteConfig([
                        { path: '/message-rates/', name: 'MessageRates', component: message_rates_component_1.MessageRatesComponent },
                        { path: '/message-rates/:id', name: 'MessageRates', component: message_rates_component_1.MessageRatesComponent },
                        { path: '/graph', name: 'Groups', component: graph_main_component_1.GraphMainComponent },
                        { path: '/', name: 'Home', component: welcome_component_1.WelcomeComponent },
                        { path: '/group-message-rates', name: "GroupMessageRates", component: group_message_rates_component_1.GroupMessageRateComponent },
                        { path: '/group-message-rates/:id', name: "GroupMessageRates", component: group_message_rates_component_1.GroupMessageRateComponent },
                        { path: '/summary', name: 'Summary', component: summary_component_1.SummaryComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map