///<reference path="../../typings/chart.d.ts" />
///<reference path="../../typings/jquery/jquery.d.ts" />

import {Component, Renderer, Input} from 'angular2/core';
import {Group} from '../models/group';
import {Employee} from '../models/employee';
import {GroupMessage} from '../models/group-message';

@Component({
    selector: 'chart',
    template: `
    <div class='small-12' id='canvas-container' (window:resize)="onResize($event)">
      <canvas id="canvas"></canvas>
      <h3 id='indicator-text'>Select a Group to display</h3>
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
    inputs: ['group', 'employee']
})
export class ChartComponent {
  group: GroupMessage;
  public data;
  public lineChart;
  employee: Employee;

  public colors = {"red":"170, 57, 57", "dred":"85, 0, 0", "blue": "15, 27, 255","purple":"227, 15, 255",
    "orange":"255, 167, 15", "lblue":"35, 159, 255", "white":"255, 255, 255", "lred":"212, 106, 106"};

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
    if (typeof this.group !== 'undefined'){
      this.createGraph();
    }
  }

  resetCanvas() {
    var width = $('#canvas').width();
    var height = $('#canvas').height();
    $('canvas').remove(); // this is my <canvas> element
    $('#canvas-container').append('<canvas id="canvas"><canvas>');
  };

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

  getDataset(){
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
    ]
    if (typeof this.employee !== 'undefined'){
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
  }

  getTimeWindow() {
    return {
      'numberofintervals': this.group.messages.length
    }
  }

  getLabels() {
    var windowData = this.getTimeWindow();
    var lbs = [];
    for (var i = 0; i < windowData.numberofintervals - 1; i += 1) {
      lbs.push(this.group.timePeriods[i]);
    }
    return lbs;
  }

}
