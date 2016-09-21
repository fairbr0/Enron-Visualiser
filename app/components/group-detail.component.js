System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var GroupDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GroupDetailComponent = (function () {
                function GroupDetailComponent() {
                    this.employees = [];
                    this.employeeToDisplayIndex = 0;
                    this.numberOfEmployees = 0;
                    this.averageCentrality = 0;
                    this.employeeToDisplay = new core_1.EventEmitter();
                    this.url = window.location.host;
                }
                GroupDetailComponent.prototype.showChart = function (i, j) {
                    $('#employeeInfo' + this.employeeToDisplayIndex).css("border", "0px");
                    for (var k = 0; k < this.employees.length; k++) {
                        var employee = this.employees[k];
                        if (employee.email == i) {
                            console.log(employee);
                            if (this.employeeToDisplayC === this.employees[k]) {
                                this.employeeToDisplay.next({ results: 'undefined' });
                                this.employeeToDisplayC = 'undefined';
                            }
                            else {
                                this.employeeToDisplayC = this.employees[k];
                                this.employeeToDisplay.next({ results: this.employees[k] });
                                this.employeeToDisplayIndex = j;
                                $('#employeeInfo' + j).css("border", "3px solid #0F0");
                            }
                            ;
                            break;
                        }
                    }
                };
                GroupDetailComponent.prototype.compareEmployee = function (empA, empB) {
                    var empATotal = empA.sent + empA.recieved;
                    var empBTotal = empB.sent + empB.recieved;
                    console.log(empATotal, empBTotal);
                    if (empATotal < empBTotal) {
                        return 1;
                    }
                    if (empATotal > empBTotal) {
                        return -1;
                    }
                    return 0;
                };
                GroupDetailComponent.prototype.ngOnChanges = function () {
                    function sum(values) {
                        var sum = 0;
                        for (var i = 0; i < values.length; i++) {
                            sum += values[i];
                        }
                        return sum;
                    }
                    function aggregate(employees, groupCopy) {
                        var employeeAggregates = [];
                        for (var i = 0; i < employees.length; i++) {
                            var employee = employees[i];
                            var sentSum = sum(employee.sentPoints);
                            var recievedSum = sum(employee.recievedPoints);
                            var id = getEmployeeId(employee.email, groupCopy);
                            employeeAggregates.push({ "id": id, "email": employee.email, "sent": sentSum, "recieved": recievedSum });
                        }
                        return employeeAggregates;
                    }
                    function getEmployeeId(email, groupCopy) {
                        for (var i = 0; i < groupCopy.members.length; i++) {
                            if (groupCopy.members[i].email == email) {
                                return groupCopy.members[i].id;
                            }
                        }
                    }
                    function getEmployeesArray() {
                        var employees = [];
                        for (var i = 0; i < this.employeeList.length; i++) {
                            employees.push(this._groupService);
                        }
                        this.employees = employees;
                    }
                    this.employeeToDisplay.next({ "results": 'undefined' });
                    var groupCopy = this.group;
                    if (typeof this.groupMessages !== 'undefined') {
                        this.messages = sum(this.groupMessages.messages);
                        this.numberOfEmployees = this.employees.length;
                        this.employeeAggregates = aggregate(this.employees, groupCopy).sort(this.compareEmployee);
                    }
                };
                GroupDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'group-detail',
                        template: "\n  <div *ngIf='groupMessages' class='panel'>\n    <span class=\"subtitle\">Total Group Emails: </span>{{messages}}<br>\n    <span class=\"subtitle\">Number of Employees: </span>{{numberOfEmployees}}<br>\n\n    <h5>Employees:</h5>\n    <div *ngFor=\"#employee of employeeAggregates;#i=index\">\n      <div class='row small-12 employeeBlock' id='employeeInfo{{i}}'>\n        <span class=\"subtitle\">Email: </span>{{employee.email}}<br>\n        <span class=\"subtitle\">Sent Messages: </span>{{employee.sent}}<br>\n        <span class=\"subtitle\">Recieved Messages: </span>{{employee.recieved}}<br>\n        <button (click)=\"showChart(employee.email, i)\" class='button button-margin'>Show On Chart</button>\n        <a href='http://{{url}}/#/message-rates/{{employee.id}}' style='margin-top:6px;' class='button'>Message Rates</a>\n      </div>\n      <br>\n    </div>\n\n\n  </div>\n\n  ",
                        styles: ["\n    .employeeBlock {\n      background-color:#EEE;\n      padding:15px;\n    }\n    .subtitle {\n      font-size:1.2em;\n    }\n    .button-margin {\n      margin-top:6px;\n    }\n    .panel {\n     overflow-y: scroll;\n    },\n    .highlighted {\n      border: 10px solid #0F0;\n    }\n  "],
                        inputs: ['employees', 'groupMessages', 'group'],
                        outputs: ['employeeToDisplay']
                    }), 
                    __metadata('design:paramtypes', [])
                ], GroupDetailComponent);
                return GroupDetailComponent;
            }());
            exports_1("GroupDetailComponent", GroupDetailComponent);
        }
    }
});
//# sourceMappingURL=group-detail.component.js.map