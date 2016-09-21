///<reference path="../../typings/chart.d.ts" />
///<reference path="../../typings/jquery/jquery.d.ts" />
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
    var ChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ChartComponent = (function () {
                function ChartComponent(renderer) {
                    this.colors = { "red": "170, 57, 57", "dred": "85, 0, 0", "blue": "15, 27, 255", "purple": "227, 15, 255",
                        "orange": "255, 167, 15", "lblue": "35, 159, 255", "white": "255, 255, 255", "lred": "212, 106, 106" };
                }
                ChartComponent.prototype.ngOnInit = function () {
                    this.setHeights();
                };
                ChartComponent.prototype.onResize = function (event) {
                    this.setHeights();
                };
                ChartComponent.prototype.setHeights = function () {
                    if ($(window).width() <= 1024)
                        $('#canvas-container').height($(window).height() / 2);
                    else {
                        $('#canvas-container').height($(window).height() - 80);
                    }
                    var width = $('#canvas-container').width();
                    var height = $('#canvas-container').height();
                    $('#indicator-text').css("left", (width / 2) - 190);
                    $('#indicator-text').css("top", (height / 2) + 40);
                };
                ChartComponent.prototype.ngOnChanges = function (changes) {
                    if (typeof this.group !== 'undefined') {
                        this.createGraph();
                    }
                };
                ChartComponent.prototype.resetCanvas = function () {
                    var width = $('#canvas').width();
                    var height = $('#canvas').height();
                    $('canvas').remove(); // this is my <canvas> element
                    $('#canvas-container').append('<canvas id="canvas"><canvas>');
                };
                ;
                ChartComponent.prototype.createGraph = function () {
                    $('#indicator-text').hide();
                    this.resetCanvas();
                    var canvas = document.getElementById('canvas');
                    var ctx = canvas.getContext("2d");
                    this.lineChart = new Chart(ctx);
                    this.data = {
                        labels: this.getLabels(),
                        datasets: this.getDataset()
                    };
                    legend(document.getElementById('legend'), this.data);
                    var options = {
                        responsive: true,
                        scaleShowGridLines: true,
                        scaleGridLineColor: "rgba(60,60,60,0.1)",
                        maintainAspectRatio: false
                    };
                    this.lineChart.Line(this.data, options);
                    //var legend = this.lineChart.generateLegend();
                    //jQuery($('#chart').append(legend));
                };
                ChartComponent.prototype.getDataset = function () {
                    var dataset = [
                        {
                            label: "Total Group Messages",
                            fillColor: "rgba(" + this.colors["purple"] + ", 0.4)",
                            strokeColor: "rgba(" + this.colors["purple"] + ", 1)",
                            pointColor: "rgba(" + this.colors["purple"] + ", 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(" + this.colors["purple"] + ", 1)",
                            data: this.group.messages
                        }
                    ];
                    if (typeof this.employee !== 'undefined') {
                        dataset.push({
                            label: "Employee Sent",
                            fillColor: "rgba(" + this.colors["blue"] + ", 0.4)",
                            strokeColor: "rgba(" + this.colors["blue"] + ", 1)",
                            pointColor: "rgba(" + this.colors["blue"] + ", 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(" + this.colors["blue"] + ", 1)",
                            data: this.employee.sentPoints
                        }, {
                            label: "Employee Recieved",
                            fillColor: "rgba(" + this.colors["lblue"] + ", 0.4)",
                            strokeColor: "rgba(" + this.colors["lblue"] + ", 1)",
                            pointColor: "rgba(" + this.colors["lblue"] + ", 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(" + this.colors["lblue"] + ", 1)",
                            data: this.employee.recievedPoints
                        });
                    }
                    return dataset;
                };
                ChartComponent.prototype.getTimeWindow = function () {
                    return {
                        'numberofintervals': this.group.messages.length
                    };
                };
                ChartComponent.prototype.getLabels = function () {
                    var windowData = this.getTimeWindow();
                    var lbs = [];
                    for (var i = 0; i < windowData.numberofintervals - 1; i += 1) {
                        lbs.push(this.group.timePeriods[i]);
                    }
                    return lbs;
                };
                ChartComponent = __decorate([
                    core_1.Component({
                        selector: 'chart',
                        template: "\n    <div class='small-12' id='canvas-container' (window:resize)=\"onResize($event)\">\n      <canvas id=\"canvas\"></canvas>\n      <h3 id='indicator-text'>Select a Group to display</h3>\n    </div>\n    <div id=\"legend\"></div>\n\n    ",
                        styles: ["\n        #canvas-container {\n          min-height:550px;\n        }\n        #indicator-text {\n          position: absolute;\n          color: #999;\n        }\n    "],
                        inputs: ['group', 'employee']
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer])
                ], ChartComponent);
                return ChartComponent;
            }());
            exports_1("ChartComponent", ChartComponent);
        }
    }
});
//# sourceMappingURL=group-chart.component.js.map