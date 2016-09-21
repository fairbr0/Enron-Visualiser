System.register(['angular2/core', 'angular2/router', '../services/group.service', './group-chart.component', './group-detail.component', './mydatepicker'], function(exports_1) {
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
    var core_1, router_1, group_service_1, group_chart_component_1, group_detail_component_1, mydatepicker_1;
    var GroupMessageRateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (group_chart_component_1_1) {
                group_chart_component_1 = group_chart_component_1_1;
            },
            function (group_detail_component_1_1) {
                group_detail_component_1 = group_detail_component_1_1;
            },
            function (mydatepicker_1_1) {
                mydatepicker_1 = mydatepicker_1_1;
            }],
        execute: function() {
            GroupMessageRateComponent = (function () {
                function GroupMessageRateComponent(_groupService, params) {
                    this._groupService = _groupService;
                    this.params = params;
                    this.title = "Group Message Rates";
                    this.employees = [];
                    this.startDate = new Date(1, 8, 1999);
                    this.endDate = new Date(31, 7, 2002);
                    this.fromDateString = '01.08.1999';
                    this.toDateString = '31.07.2002';
                    this.fromDate = new Date(1999, 7, 1, 0, 0, 0, 0);
                    this.toDate = new Date(2002, 6, 31, 0, 0, 0, 0);
                    this.maxDate = new Date(2002, 6, 31, 0, 0, 0, 0);
                    this.minDate = new Date(1999, 7, 1, 0, 0, 0, 0);
                    this.graphSpinner = new Spinner();
                    this.myDatePickerOptions = {
                        todayBtnTxt: 'Start',
                        dateFormat: 'dd.mm.yyyy',
                        firstDayOfWeek: 'mo',
                        sunHighlight: true,
                        height: '34px',
                        width: '180px'
                    };
                }
                GroupMessageRateComponent.prototype.onDateChanged = function (event, id) {
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
                                console.log('here');
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
                            this.flashElement("toDatePicker", "#000", "#F00", 0);
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
                            this.flashElement("fromDatePicker", "#000", "#F00", 0);
                        }
                    }
                    if (this.toDateString === "" || this.fromDateString === "") {
                        $('#selectGroup').prop("disabled", true);
                    }
                    else {
                        $('#selectGroup').prop("disabled", false);
                    }
                    if (this.toDate != null && this.fromDate != null) {
                        this.setPeriods();
                    }
                };
                GroupMessageRateComponent.prototype.setPeriods = function () {
                    this.periods = this.getTimePeriods();
                    this.selectedPeriod = this.periods[0].period + ":" + this.periods[0].amount;
                };
                GroupMessageRateComponent.prototype.changeValue = function (value) {
                    this.selectedPeriod = value;
                };
                GroupMessageRateComponent.prototype.getTimePeriods = function () {
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
                GroupMessageRateComponent.prototype.refreshTime = function () {
                    this.getGroup();
                };
                GroupMessageRateComponent.prototype.onResize = function (event) {
                    $('.box_b').css('max-height', $(window).height());
                };
                GroupMessageRateComponent.prototype.displayEmployee = function (results) {
                    this.employeeToDisplay = results;
                };
                GroupMessageRateComponent.prototype.assignGroup = function (group, id) {
                    this.selectedGroupMessages = group;
                    $('#groupDropdown').val(id);
                    var target = document.getElementById("graph-spin");
                    this.graphSpinner.stop(target);
                    $('#graph-spin').hide();
                };
                GroupMessageRateComponent.prototype.getGroup = function () {
                    var id = $('#groupDropdown').val();
                    this.getGroupById(id);
                };
                GroupMessageRateComponent.prototype.getGroupById = function (id) {
                    var _this = this;
                    $('#refreshButton').prop("disabled", false);
                    var selectedPeriodParts = this.selectedPeriod.split(":");
                    var period = selectedPeriodParts[0];
                    var amount = parseInt(selectedPeriodParts[1]);
                    var target = document.getElementById("graph-spin");
                    this.graphSpinner.spin(target);
                    $('#graph-spin').show();
                    this.setGroup(id);
                    this._groupService.getGroupRates(id, this.toDate.getTime(), this.fromDate.getTime(), period, amount).subscribe(function (group) { return _this.assignGroup(group, id); });
                    this.getEmployees(id);
                };
                GroupMessageRateComponent.prototype.getGroups = function () {
                    var _this = this;
                    this._groupService.getGroups().subscribe(function (groups) { return _this.setGroups(groups); });
                };
                GroupMessageRateComponent.prototype.setGroup = function (id) {
                    for (var i = 0; i < this.groups.length; i++) {
                        if (this.groups[i].id == id) {
                            this.selectedGroup = this.groups[i];
                            break;
                        }
                    }
                };
                GroupMessageRateComponent.prototype.setGroups = function (groups) {
                    this.groups = groups;
                    var id = this.params.get('id');
                    if (id != null) {
                        this.getGroupById(id);
                    }
                };
                GroupMessageRateComponent.prototype.flashElement = function (element, tocolor, fromcolor, fromsize) {
                    var jelement = $('#' + element);
                    console.log(jelement);
                    jelement.css("border", "3px solid " + fromcolor);
                    setTimeout(function () { jelement.css('border', fromsize + "px solid " + tocolor); }, 2000);
                };
                GroupMessageRateComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getGroups();
                    this._groupService.getTimes().subscribe(function (time) { return _this.setTimes(time); });
                    $('.box_b').css('max-height', $(window).height());
                    this.setPeriods();
                };
                GroupMessageRateComponent.prototype.setTimes = function (times) {
                    var min = times.minDate.split('/');
                    var max = times.maxDate.split('/');
                    this.minDate = new Date(min[2], min[1] - 1, min[0], 0, 0, 0, 0);
                    this.maxDate = new Date(max[2], max[1] - 1, max[0], 0, 0, 0, 0);
                };
                GroupMessageRateComponent.prototype.getEmployees = function (id) {
                    var _this = this;
                    var selectedPeriodParts = this.selectedPeriod.split(":");
                    var period = selectedPeriodParts[0];
                    var amount = parseInt(selectedPeriodParts[1]);
                    var group;
                    for (var i = 0; i < this.groups.length; i++) {
                        if (this.groups[i].id == id)
                            group = this.groups[i];
                    }
                    this.employees = [];
                    for (var i = 0; i < group.members.length; i++) {
                        this._groupService.getEmployeeRates(group.members[i].id, this.toDate.getTime(), this.fromDate.getTime(), period, amount).subscribe(function (response) { return _this.addEmployee(response); });
                    }
                };
                GroupMessageRateComponent.prototype.addEmployee = function (response) {
                    this.employees.push(response);
                };
                GroupMessageRateComponent = __decorate([
                    core_1.Component({
                        directives: [group_chart_component_1.ChartComponent, mydatepicker_1.MyDatePicker, group_detail_component_1.GroupDetailComponent],
                        templateUrl: 'app/template/group_message_rates.html',
                        styles: ["\n    .box_a {\n      background-color:#EEE\n    }\n    .box_b {\n      overflow-y: auto;\n    }\n    .spinText{\n      position:relative;\n      left:43%;\n      top:60%;\n    }\n  "],
                        providers: [group_service_1.GroupService]
                    }), 
                    __metadata('design:paramtypes', [group_service_1.GroupService, router_1.RouteParams])
                ], GroupMessageRateComponent);
                return GroupMessageRateComponent;
            }());
            exports_1("GroupMessageRateComponent", GroupMessageRateComponent);
        }
    }
});
//# sourceMappingURL=group-message-rates.component.js.map