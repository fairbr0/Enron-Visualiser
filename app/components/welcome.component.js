System.register(['angular2/core', '../services/employee.service', '../services/group.service', '../services/graph.service'], function(exports_1) {
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
    var core_1, employee_service_1, group_service_1, graph_service_1;
    var WelcomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (employee_service_1_1) {
                employee_service_1 = employee_service_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (graph_service_1_1) {
                graph_service_1 = graph_service_1_1;
            }],
        execute: function() {
            WelcomeComponent = (function () {
                function WelcomeComponent(employeeService, graphService, groupService) {
                    this.employeeRateReady = false;
                    this.employeeService = employeeService;
                    this.graphService = graphService;
                    this.groupService = groupService;
                }
                WelcomeComponent.prototype.ngOnInit = function () {
                    $('#messageRateLink').prop('disabled', true);
                    this.createPoll();
                };
                WelcomeComponent.prototype.createPoll = function () {
                    var employeeService = this.employeeService;
                    var graphService = this.graphService;
                    var groupService = this.groupService;
                    pollEmployee(employeeService, 'employee');
                    pollGroup(groupService, 'group');
                    pollGraph(graphService, 'graph');
                    setInterval(function () {
                        pollEmployee(employeeService, 'employee');
                        pollGroup(groupService, 'group');
                        pollGraph(graphService, 'graph');
                    }, 5000);
                    function pollEmployee(service, serviceType) {
                        service.getEmployees().subscribe(function (response) { return checkResponse(response, serviceType); });
                    }
                    function pollGroup(service, serviceType) {
                        service.getGroups().subscribe(function (response) { return checkResponse(response, serviceType); });
                    }
                    function pollGraph(service, serviceType) {
                        service.getGraph().subscribe(function (response) { return checkResponse(response, serviceType); });
                    }
                    function checkResponse(response, serviceType) {
                        console.log(response);
                        if (serviceType == "employee") {
                            if (response.length > 0) {
                                $('#employeeRateReady').text('Ready').css('color', 'green');
                            }
                            else {
                                $('#employeeRateReady').text('Processing').css('color', 'red');
                            }
                        }
                        else if (serviceType === 'group') {
                            if (response.length > 0) {
                                $('#groupRateReady').text('Ready').css('color', 'green');
                                $('#summaryReady').text('Ready').css('color', 'green');
                            }
                            else {
                                $('#groupRateReady').text('Processing').css('color', 'red');
                                $('#summaryReady').text('Processing').css('color', 'red');
                            }
                        }
                        else if (serviceType === 'graph') {
                            if (response.nodes != null) {
                                $('#graphReady').text('Ready').css('color', 'green');
                            }
                            else {
                                $('#graphReady').text('Processing').css('color', 'red');
                            }
                        }
                    }
                };
                WelcomeComponent = __decorate([
                    core_1.Component({
                        selector: 'welcome',
                        template: "\n      <div class='small-12 main small-central'>\n        <div class='row columns'>\n          <div class='small-12 medium-4 column' >\n            <img src='./img/Logo.png' class='logo-large'>\n          </div>\n          <div class='small-12 medium-8 column' style='padding-top:18px'>\n            <h1>Email Corpus Analysis</h1>\n          </div>\n\n        </div>\n        <br>\n        <hr width='100%'>\n        <br>\n        <div class='row columns'>\n          <div class='small-12 column'>\n            <h2>Welcome</h2>\n            <h5>Use the tabs to select an analysis feature for an email corpus. These features include:</h5>\n            <ul>\n              <li>View the message rates of a select Employee for a certain time frame</li>\n              <li>View the message rates of groups of Employees and their message rates withing a group</li>\n              <li>View the groups of users, computed based of an employees importance</li>\n            </ul>\n\n          </div>\n        </div>\n        <div class='row columns'>\n          <h5>System Status</h5>\n          <table class='small-12 small-central hover'>\n            <thead>\n              <tr>\n                <th>Service</th>\n                <th>Status</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><b>Employee Message Rates:</b></td>\n                <td><i><span id='employeeRateReady'>Processing</span></i></td>\n              </tr>\n              <tr>\n                <td><b>Group Message Rates:</b></td>\n                <td><i><span id='groupRateReady'>Processing</span></i></td>\n              </tr>\n              <tr>\n                <td><b>Group Connectivity Graph:</b></td>\n                <td><i><span id='graphReady'>Processing</span></i></td>\n              </tr>\n              <tr>\n                <td><b>Summary Page:</b></td>\n                <td><i><span id='summaryReady'>Processing</span></i></td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n  ",
                        styles: ["\n    .main {\n      margin-top:40px;\n    }\n    .logo-large {\n      height:100px;\n    }\n  "],
                        providers: [employee_service_1.EmployeeService, group_service_1.GroupService, graph_service_1.GraphService]
                    }), 
                    __metadata('design:paramtypes', [employee_service_1.EmployeeService, graph_service_1.GraphService, group_service_1.GroupService])
                ], WelcomeComponent);
                return WelcomeComponent;
            }());
            exports_1("WelcomeComponent", WelcomeComponent);
        }
    }
});
//# sourceMappingURL=welcome.component.js.map