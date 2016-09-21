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
    var EmployeeDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EmployeeDetailComponent = (function () {
                function EmployeeDetailComponent() {
                }
                EmployeeDetailComponent.prototype.ngOnInit = function () {
                    this.url = window.location.host;
                };
                EmployeeDetailComponent.prototype.ngOnChanges = function (changes) {
                    function sum(values) {
                        var sum = 0;
                        for (var i = 0; i < values.length; i++) {
                            sum += values[i];
                        }
                        return sum;
                    }
                    if (typeof this.employee !== 'undefined') {
                        this.employee.groupId = this.employee.community;
                        console.log(this.employee.groupId);
                        if (this.employee.community == null) {
                            this.employee.community = "No Group";
                        }
                        this.sentMessageTotal = sum(this.employee.sentPoints);
                        this.recievedMessageTotal = sum(this.employee.recievedPoints);
                        this.messageTotal = this.sentMessageTotal + this.recievedMessageTotal;
                    }
                };
                EmployeeDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'employee-detail',
                        template: "\n    <h3>Displayed Employee</h3>\n    <div *ngIf='employee' class='panel'>\n      <div>\n          <span class=\"subtitle\">Email: </span>{{employee.email}}<br>\n          <span class=\"subtitle\">Emails Sent: </span>{{sentMessageTotal}}<br>\n          <span class=\"subtitle\">Emails Recieved: </span>{{recievedMessageTotal}} <br>\n          <span class=\"subtitle\">Total Emails: </span>{{messageTotal}} <br>\n\n          <span class=\"subtitle\">Group: </span><a href=\"http://{{url}}/#/group-message-rates/{{employee.groupId}}\">{{employee.community}} </a><br>\n\n\n      </div>\n\n    </div>\n  ",
                        styles: ["\n    .subtitle {font-size:0.9em; color:#444;}\n  "],
                        inputs: ['employee']
                    }), 
                    __metadata('design:paramtypes', [])
                ], EmployeeDetailComponent);
                return EmployeeDetailComponent;
            }());
            exports_1("EmployeeDetailComponent", EmployeeDetailComponent);
        }
    }
});
//# sourceMappingURL=employee-detail.component.js.map