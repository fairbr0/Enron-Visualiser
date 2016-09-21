System.register(['angular2/core', 'angular2/router', '../services/employee.service', './employee-chart.component', './employee-detail.component', './mydatepicker'], function(exports_1) {
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
    var core_1, router_1, employee_service_1, employee_chart_component_1, employee_detail_component_1, mydatepicker_1;
    var MessageRatesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (employee_service_1_1) {
                employee_service_1 = employee_service_1_1;
            },
            function (employee_chart_component_1_1) {
                employee_chart_component_1 = employee_chart_component_1_1;
            },
            function (employee_detail_component_1_1) {
                employee_detail_component_1 = employee_detail_component_1_1;
            },
            function (mydatepicker_1_1) {
                mydatepicker_1 = mydatepicker_1_1;
            }],
        execute: function() {
            //create search modal for employee
            MessageRatesComponent = (function () {
                function MessageRatesComponent(_employeeService, params) {
                    this._employeeService = _employeeService;
                    this.params = params;
                    this.title = "Employee Message Rates";
                    this.fromDateString = "01.08.1999";
                    this.toDateString = "31.07.2002";
                    this.fromDate = new Date(1999, 7, 1, 0, 0, 0, 0);
                    this.toDate = new Date(2002, 6, 31, 0, 0, 0, 0);
                    this.maxDate = new Date(2002, 6, 31, 0, 0, 0, 0);
                    this.minDate = new Date(1999, 7, 1, 0, 0, 0, 0);
                    this.graphSpinner = new Spinner();
                    //checkboxes: boolean[] = [true, true, true];
                    this.checkboxes = [true, true, true];
                    this.myDatePickerOptions = {
                        todayBtnTxt: 'Start',
                        dateFormat: 'dd.mm.yyyy',
                        firstDayOfWeek: 'mo',
                        sunHighlight: true,
                        height: '34px',
                        width: '180px'
                    };
                }
                MessageRatesComponent.prototype.onChange = function (event) {
                    var id = event.target.id;
                    if (id === 'checkboxSent') {
                        this.checkboxes[0] = !this.checkboxes[0];
                    }
                    if (id === 'checkboxRecieved') {
                        this.checkboxes[1] = !this.checkboxes[1];
                    }
                    if (id === 'checkboxAverage') {
                        this.checkboxes[2] = !this.checkboxes[2];
                    }
                    this.checkboxes = [this.checkboxes[0], this.checkboxes[1], this.checkboxes[2]];
                };
                MessageRatesComponent.prototype.changeValue = function (value) {
                    this.selectedPeriod = value;
                    console.log(this.selectedPeriod);
                };
                MessageRatesComponent.prototype.onDateChanged = function (event, id) {
                    var date = null;
                    var dateString = "";
                    if (event.date.day != undefined) {
                        dateString = event.formatted;
                        date = new Date(event.date.year, event.date.month - 1, event.date.day, 0, 0, 0, 0);
                    }
                    if (id == 'toPicker') {
                        if (date != null) {
                            if (this.fromDate != null && date.getTime() >= this.fromDate.getTime() && date.getTime() <= this.maxDate.getTime()) {
                                this.toDateString = dateString;
                                this.toDate = date;
                            }
                            else if (this.fromDate == null && date.getTime() >= this.minDate.getTime() && date.getTime() <= this.maxDate.getTime()) {
                                this.toDateString = dateString;
                                this.toDate = date;
                            }
                            else {
                                this.toDate = null;
                                this.toDateString = "";
                                this.flashElement("toDatePicker", "#000", "#F00", 0);
                            }
                        }
                        else {
                            this.toDate = null;
                            this.toDateString = "";
                        }
                    }
                    else {
                        if (date != null) {
                            if (this.toDate != null && date.getTime() <= this.toDate.getTime() && date.getTime() >= this.minDate.getTime()) {
                                this.fromDateString = dateString;
                                this.fromDate = date;
                            }
                            else if (this.toDate == null && date.getTime() <= this.maxDate.getTime() && date.getTime() >= this.minDate.getTime()) {
                                this.fromDateString = dateString;
                                this.fromDate = date;
                            }
                            else {
                                this.fromDate = null;
                                this.fromDateString = "";
                                this.flashElement("fromDatePicker", "#000", "#F00", 0);
                            }
                        }
                        else {
                            this.fromDate = null;
                            this.fromDateString = "";
                        }
                    }
                    if (this.toDateString === "" || this.fromDateString === "") {
                        $('#selectEmployee').prop("disabled", true);
                        $('#refreshButton').prop("disabled", true);
                    }
                    else {
                        $('#selectEmployee').prop("disabled", false);
                        if (this.selectedEmployee != 'undefined') {
                            $('#refreshButton').prop("disabled", false);
                        }
                    }
                    if (this.toDate != null && this.fromDate != null) {
                        this.setPeriods();
                    }
                };
                MessageRatesComponent.prototype.setPeriods = function () {
                    this.periods = this.getTimePeriods();
                    this.selectedPeriod = this.periods[0].period + ":" + this.periods[0].amount;
                };
                MessageRatesComponent.prototype.getTimePeriods = function () {
                    var start = this.fromDate;
                    var end = this.toDate;
                    var day = 86400000;
                    var difference = end.getTime() - start.getTime();
                    var periods = [];
                    if (difference <= day * 2) {
                        periods.push({ "period": "HOUR", "amount": 1, "string": "Hour" });
                    }
                    if (difference <= day * 6 && difference >= day * 2) {
                        periods.push({ "period": "HOUR", "amount": 3, "string": "3 Hours" });
                    }
                    if (difference <= day * 14 && difference >= day * 3) {
                        periods.push({ "period": "HOUR", "amount": 6, "string": "6 Hours" });
                    }
                    if (difference <= day * 31 && difference >= day * 7) {
                        periods.push({ "period": "DAY", "amount": 1, "string": "Day" });
                    }
                    if (difference >= day * 15 && difference <= day * 45) {
                        periods.push({ "period": "DAY", "amount": 3, "string": "3 Days" });
                    }
                    if (difference >= day * 28 && difference < day * 365) {
                        periods.push({ "period": "WEEK", "amount": 1, "string": "Week" });
                    }
                    if (difference >= day * 52) {
                        periods.push({ "period": "WEEK", "amount": 2, "string": "2 Weeks" });
                    }
                    if (difference >= day * 92) {
                        periods.push({ "period": "MONTH", "amount": 1, "string": "Month" });
                    }
                    return periods;
                };
                MessageRatesComponent.prototype.refreshTime = function () {
                    this.getEmployeeById(this.selectedEmployeeId);
                };
                MessageRatesComponent.prototype.ngAfterViewInit = function () {
                    var id = this.params.get('id');
                    if (id != null) {
                        this.getEmployeeById(id);
                    }
                };
                MessageRatesComponent.prototype.setTimes = function (times) {
                    var min = times.minDate.split('/');
                    var max = times.maxDate.split('/');
                    this.minDate = new Date(min[2], min[1] - 1, min[0], 0, 0, 0, 0);
                    this.maxDate = new Date(max[2], max[1] - 1, max[0], 0, 0, 0, 0);
                };
                MessageRatesComponent.prototype.getEmployeeById = function (id) {
                    var _this = this;
                    $('#refreshButton').prop("disabled", false);
                    var start = this.fromDate.getTime();
                    var end = this.toDate.getTime();
                    var selectedPeriodParts = this.selectedPeriod.split(":");
                    var period = selectedPeriodParts[0];
                    var amount = parseInt(selectedPeriodParts[1]);
                    var target = document.getElementById("graph-spin");
                    this.graphSpinner.spin(target);
                    $('#graph-spin').show();
                    this._employeeService.getEmployee(id, start, end, period, amount).subscribe(function (employee) { return _this.assignEmployee(employee, id); });
                };
                MessageRatesComponent.prototype.getEmployee = function () {
                    var id = $('#employeeDropdown').val();
                    this.getEmployeeById(id);
                };
                MessageRatesComponent.prototype.assignEmployee = function (employee, id) {
                    this.selectedEmployee = employee;
                    this.selectedEmployeeId = id;
                    $('#employeeDropdown').val(id);
                    var target = document.getElementById("graph-spin");
                    this.graphSpinner.stop(target);
                    $('#graph-spin').hide();
                };
                MessageRatesComponent.prototype.getEmployees = function () {
                    var _this = this;
                    this._employeeService.getEmployees().subscribe(function (employees) { return _this.employees = employees; });
                };
                MessageRatesComponent.prototype.searchEmployees = function () {
                    var _this = this;
                    this.flashElement("employeeDropdown", '#bbb', '#0f0', 1);
                    var searchString = this.emailString.toLowerCase();
                    this._employeeService.searchEmployees(searchString).subscribe(function (employees) { return _this.handleSearch(employees); });
                };
                MessageRatesComponent.prototype.handleSearch = function (employees) {
                    var returnEmployees = [];
                    for (var i = 0; i < employees.length; i++) {
                        var employee = employees[i];
                        if (employee.email.indexOf(this.emailString.toLowerCase()) > -1) {
                            returnEmployees.push(employee);
                        }
                    }
                    this.employees = returnEmployees;
                };
                MessageRatesComponent.prototype.flashElement = function (element, tocolor, fromcolor, fromsize) {
                    var jelement = $('#' + element);
                    console.log(jelement);
                    jelement.css("border", "3px solid " + fromcolor);
                    setTimeout(function () { jelement.css('border', fromsize + "px solid " + tocolor); }, 2000);
                };
                MessageRatesComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getEmployees();
                    this._employeeService.getTimes().subscribe(function (time) { return _this.setTimes(time); });
                    this.setPeriods();
                };
                MessageRatesComponent.prototype.ngOnChange = function () {
                    console.log(this.selectedPeriod);
                };
                MessageRatesComponent = __decorate([
                    core_1.Component({
                        directives: [employee_chart_component_1.ChartComponent, employee_detail_component_1.EmployeeDetailComponent, mydatepicker_1.MyDatePicker],
                        templateUrl: 'app/template/employee_message_rates.html',
                        styles: ["\n    .box_a {\n      background-color:#EEE\n    }\n    .spinText{\n      position:relative;\n      left:42%;\n      top:60%;\n    }\n  "],
                        providers: [employee_service_1.EmployeeService]
                    }), 
                    __metadata('design:paramtypes', [employee_service_1.EmployeeService, router_1.RouteParams])
                ], MessageRatesComponent);
                return MessageRatesComponent;
            }());
            exports_1("MessageRatesComponent", MessageRatesComponent);
        }
    }
});
//# sourceMappingURL=message-rates.component.js.map