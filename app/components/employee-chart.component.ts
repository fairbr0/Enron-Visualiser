///<reference path="../../typings/chart.d.ts" />
///<reference path="../../typings/jquery/jquery.d.ts" />

import {Component, Renderer, Input} from 'angular2/core';
import {Employee} from '../models/employee';

@Component({
    selector: 'chart',
    template: `
    <div class='small-12' id='canvas-container' (window:resize)="onResize($event)">

      <canvas id="canvas"></canvas>
      <h3 id='indicator-text'>Select an Employee to display</h3>
    </div>
    <div id="legend"></div>

    `,
    styles: [`
      #canvas-container {
        min-height:550px;
      }
      #indicator-text {
        position: absolute;
        color: #999;
      }
    `],
    inputs: ['employee', 'checkboxes']
})
export class ChartComponent {
  employee: Employee;
  checkboxes: boolean[];
  private data;
  private lineChart;

  private colors = {"red":"170, 57, 57", "dred":"85, 0, 0", "lred":"212, 106, 106", "green":"128, 204, 51", "lgreen":"214, 245, 214", "dgreen":"40, 164, 40"};

  constructor(renderer:Renderer) {

  }

  ngOnInit() {
    this.setHeights();
  }
  onResize(event) {
    this.setHeights();
  }

  setHeights() {
    if ($(window).width() <= 1024) $('#canvas-container').height($(window).height() / 2);
    else { $('#canvas-container').height($(window).height() - 80);}
    var width = $('#canvas-container').width();
    var height = $('#canvas-container').height();
    $('#indicator-text').css("left", (width/2)-190);
    $('#indicator-text').css("top", (height/2) + 40);
  }

  ngOnChanges(changes) {
    if (typeof this.employee !== 'undefined') {
      this.createGraph();
    }
  }

  createGraph() {
      $('#indicator-text').hide();
      this.resetCanvas();
      var canvas = document.getElementById('canvas');
      var ctx: any = canvas.getContext("2d");
      this.lineChart = new Chart(ctx);
      this.data = {
        labels: this.getLabels(),
        datasets: this.getDataset()
      }
      legend(document.getElementById('legend'), this.data);
      var options = {
        responsive: true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(60,60,60,0.1)",
        maintainAspectRatio: false
      }

      this.lineChart.Line(this.data,options);
    //var legend = this.lineChart.generateLegend();
    //jQuery($('#chart').append(legend));

  }


  resetCanvas() {
    $('#canvas').remove(); // this is my <canvas> element
    $('#canvas-container').append('<canvas id="canvas" width="400" height="400"><canvas>');
  };

  getDataset(){
    var average = [];
    for (var i = 0; i < this.employee.sentPoints.length; i++) {
      average.push((this.employee.sentPoints[i] + this.employee.recievedPoints[i]) / 2);
    }
    var dataset = [];
    if (this.checkboxes[0]){
      dataset.push(
      {
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
    if (this.checkboxes[2]){
      dataset.push(
      {
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
    if (this.checkboxes[1]){
      dataset.push(
      {
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
  }

  getTimeWindow() {
    return {
      'numberofintervals': this.employee.sentPoints.length
    }
  }

  getLabels() {
    var windowData = this.getTimeWindow();
    var lbs = [];
    console.log(this.employee.timePeriods)
    for (var i = 0; i < windowData.numberofintervals - 1; i += 1) {
      lbs.push(this.employee.timePeriods[i]);
    }
    return lbs;
  }
}
