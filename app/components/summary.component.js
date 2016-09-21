System.register(['angular2/core', '../services/summary.service'], function(exports_1) {
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
    var core_1, summary_service_1;
    var SummaryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (summary_service_1_1) {
                summary_service_1 = summary_service_1_1;
            }],
        execute: function() {
            SummaryComponent = (function () {
                function SummaryComponent(_summaryService) {
                    this._summaryService = _summaryService;
                    this.url = window.location.host;
                }
                SummaryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //this.handleResponse(this._summaryService.getSummary());
                    this._summaryService.getTopEmployees('CENTRALITY').subscribe(function (response) { return _this.handleResponse(response, 'central'); });
                    this._summaryService.getTopEmployees('SENT').subscribe(function (response) { return _this.handleResponse(response, 'sent'); });
                    this._summaryService.getTopEmployees('RECEIVED').subscribe(function (response) { return _this.handleResponse(response, 'recieved'); });
                };
                SummaryComponent.prototype.handleResponse = function (response, request) {
                    console.log(response);
                    if (request == 'central') {
                        console.log('here');
                        this.topCentral = response;
                    }
                    if (request == 'sent') {
                        console.log('here');
                        this.topSent = response;
                    }
                    if (request == 'recieved')
                        this.topRecieved = response;
                };
                SummaryComponent = __decorate([
                    core_1.Component({
                        selector: 'summary',
                        templateUrl: 'app/template/summary.html',
                        styles: ["\n    .main {\n      margin-top:40px;\n    }\n  "],
                        providers: [summary_service_1.SummaryService]
                    }), 
                    __metadata('design:paramtypes', [summary_service_1.SummaryService])
                ], SummaryComponent);
                return SummaryComponent;
            }());
            exports_1("SummaryComponent", SummaryComponent);
        }
    }
});
//# sourceMappingURL=summary.component.js.map