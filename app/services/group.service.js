System.register(['angular2/core', 'angular2/http'], function(exports_1) {
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
    var core_1, http_1;
    var GroupService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            GroupService = (function () {
                function GroupService(http) {
                    this.http = http;
                    this.url = window.location.host;
                }
                GroupService.prototype.getGroups = function () {
                    return this.http.get('http://' + this.url + '/communities')
                        .map(function (response) { return response.json(); });
                };
                GroupService.prototype.getGroupRates = function (id, end, start, period, amount) {
                    return this.http.get('http://' + this.url + '/community-rates?id=' + id + '&start=' + start + '&end=' + end + '&time-period=' + period + '&period-amount=' + amount)
                        .map(function (response) { return response.json(); });
                };
                GroupService.prototype.getEmployeeRates = function (id, end, start, period, amount) {
                    return this.http.get('http://' + this.url + '/employee-rates?id=' + id + '&community=true' + '&start=' + start + '&end=' + end + '&time-period=' + period + '&period-amount=' + amount)
                        .map(function (response) { return response.json(); });
                };
                GroupService.prototype.getTimes = function () {
                    return this.http.get('http://' + this.url + '/date-range')
                        .map(function (response) { return response.json(); });
                };
                GroupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], GroupService);
                return GroupService;
            }());
            exports_1("GroupService", GroupService);
        }
    }
});
//# sourceMappingURL=group.service.js.map