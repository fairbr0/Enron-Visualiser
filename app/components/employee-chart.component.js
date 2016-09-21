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
                    this.colors = { "red": "170, 57, 57", "dred": "85, 0, 0", "lred": "212, 106, 106", "green": "128, 204, 51", "lgreen": "214, 245, 214", "dgreen": "40, 164, 40" };
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
                    if (typeof this.employee !== 'undefined') {
                        this.createGraph();
                    }
                };
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
                ChartComponent.prototype.resetCanvas = function () {
                    $('#canvas').remove(); // this is my <canvas> element
                    $('#canvas-container').append('<canvas id="canvas" width="400" height="400"><canvas>');
                };
                ;
                ChartComponent.prototype.getDataset = function () {
                    var average = [];
                    for (var i = 0; i < this.employee.sentPoints.length; i++) {
                        average.push((this.employee.sentPoints[i] + this.employee.recievedPoints[i]) / 2);
                    }
                    var dataset = [];
                    if (this.checkboxes[0]) {
                        dataset.push({
                            label: "Sent",
                            fillColor: "rgba(" + this.colors["green"] + ", 0.4)",
                            strokeColor: "rgba(" + this.colors["green"] + ", 1)",
                            pointColor: "rgba(" + this.colors["green"] + ", 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(" + this.colors["green"] + ", 1)",
                            data: this.employee.sentPoints
                        });
                    }
                    if (this.checkboxes[2]) {
                        dataset.push({
                            label: "Average",
                            fillColor: "rgba(" + this.colors["lgreen"] + ", 0.5)",
                            strokeColor: "rgba(" + this.colors["green"] + ", 1)",
                            pointColor: "rgba(" + this.colors["lgreen"] + ", 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(" + this.colors["lgreen"] + ", 1)",
                            data: average
                        });
                    }
                    if (this.checkboxes[1]) {
                        dataset.push({
                            label: "Received",
                            fillColor: "rgba(" + this.colors["dgreen"] + ", 0.3)",
                            strokeColor: "rgba(" + this.colors["dgreen"] + ", 1)",
                            pointColor: "rgba(" + this.colors["dgreen"] + ", 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(" + this.colors["dgreen"] + ", 1)",
                            data: this.employee.recievedPoints
                        });
                    }
                    return dataset;
                };
                ChartComponent.prototype.getTimeWindow = function () {
                    return {
                        'numberofintervals': this.employee.sentPoints.length
                    };
                };
                ChartComponent.prototype.getLabels = function () {
                    var windowData = this.getTimeWindow();
                    var lbs = [];
                    console.log(this.employee.timePeriods);
                    for (var i = 0; i < windowData.numberofintervals - 1; i += 1) {
                        lbs.push(this.employee.timePeriods[i]);
                    }
                    return lbs;
                };
                ChartComponent = __decorate([
                    core_1.Component({
                        selector: 'chart',
                        template: "\n    <div class='small-12' id='canvas-container' (window:resize)=\"onResize($event)\">\n\n      <canvas id=\"canvas\"></canvas>\n      <h3 id='indicator-text'>Select an Employee to display</h3>\n    </div>\n    <div id=\"legend\"></div>\n\n    ",
                        styles: ["\n      #canvas-container {\n        min-height:550px;\n      }\n      #indicator-text {\n        position: absolute;\n        color: #999;\n      }\n    "],
                        inputs: ['employee', 'checkboxes']
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer])
                ], ChartComponent);
                return ChartComponent;
            }());
            exports_1("ChartComponent", ChartComponent);
        }
    }
});
//# sourceMappingURL=employee-chart.component.js.map