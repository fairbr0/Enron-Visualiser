import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {RouteParams} from 'angular2/router';

import {Group} from '../models/group';
import {GroupService} from '../services/group.service';
import {ChartComponent} from './group-chart.component';
import {GroupDetailComponent} from './group-detail.component';
import {Employee} from '../models/employee';
import {MyDatePicker} from './mydatepicker';
import {GroupMessage} from '../models/group-message';

@Component({
  directives: [ChartComponent, MyDatePicker, GroupDetailComponent],
  templateUrl: 'app/template/group_message_rates.html',
  styles: [`
    .box_a {
      background-color:#EEE
    }
    .box_b {
      overflow-y: auto;
    }
    .spinText{
      position:relative;
      left:43%;
      top:60%;
    }
  `],
  providers: [GroupService]
})

export class GroupMessageRateComponent {

  public title = "Group Message Rates";
  selectedGroup: Group;// = {"id": 'A', "employees": [1, 3], "messages": [30, 43, 25, 27, 34, 25]};
  selectedGroupMessages: GroupMessage;
  groups: Group[];
  employees: Employee[] = [];
  startDate = new Date(1, 8, 1999);
  endDate = new Date(31, 7, 2002);
  employeeToDisplay: Employee;// = {"email":"test", "sentPoints":[2, 3], "recievedPoints":[3,4], "timePeriods": ['2', '3']};
  fromDateString: string = '01.08.1999';
  toDateString: string = '31.07.2002';
  fromDate: Date = new Date(1999, 7, 1, 0, 0, 0, 0);
  toDate: Date = new Date(2002, 6, 31, 0, 0, 0, 0);
  maxDate: Date = new Date(2002, 6, 31, 0, 0, 0, 0);
  minDate: Date = new Date(1999, 7, 1, 0, 0, 0, 0);

  periods: Object[];
  selectedPeriod: string;
  graphSpinner = new Spinner();

  private myDatePickerOptions = {
      todayBtnTxt: 'Start',
      dateFormat: 'dd.mm.yyyy',
      firstDayOfWeek: 'mo',
      sunHighlight: true,
      height: '34px',
      width: '180px'
  };


  constructor( private _groupService: GroupService,private params: RouteParams) {
  }

  onDateChanged(event, id){
    var date:Date = null;
    var dateString:string = "";
    if (event.date.day != undefined){
      dateString = event.formatted;
      date = new Date(event.date.year, event.date.month-1, event.date.day, 0, 0, 0, 0);
    }
    if(id == 'toPicker'){
      if (date != null) {
        if (this.fromDate != null && date.getTime() >= this.fromDate.getTime() && date.getTime() <= this.maxDate.getTime()){
          this.toDateString = dateString;
          this.toDate = date;
        } else if (this.fromDate == null && date.getTime() >= this.minDate.getTime() && date.getTime() <= this.maxDate.getTime()) {
          console.log('here');
          this.toDateString = dateString;
          this.toDate = date;
        } else {
          this.toDate = null;
          this.toDateString = ""
          this.flashElement("toDatePicker", "#000", "#F00", 0);
        }
      } else {
        this.toDate = null;
        this.toDateString = "";
        this.flashElement("toDatePicker", "#000", "#F00", 0);
      }
    } else {
      if (date != null) {
        if (this.toDate != null && date.getTime() <= this.toDate.getTime() && date.getTime() >= this.minDate.getTime()) {
          this.fromDateString = dateString;
          this.fromDate = date;
        } else if (this.toDate == null && date.getTime() <= this.maxDate.getTime() && date.getTime() >= this.minDate.getTime()){
          this.fromDateString = dateString;
          this.fromDate = date;
        } else {
          this.fromDate = null;
          this.fromDateString = "";
          this.flashElement("fromDatePicker", "#000", "#F00", 0);
        }
      } else {
        this.fromDate = null;
        this.fromDateString = ""
        this.flashElement("fromDatePicker", "#000", "#F00", 0);
      }
    }


    if (this.toDateString === "" || this.fromDateString === "") {
      $('#selectGroup').prop("disabled", true);
    } else {
      $('#selectGroup').prop("disabled", false);
    }

    if (this.toDate != null && this.fromDate != null){
      this.setPeriods();
    }
  }

  setPeriods(){
    this.periods = this.getTimePeriods();
    this.selectedPeriod = this.periods[0].period+":"+this.periods[0].amount;
  }

  changeValue(value){
    this.selectedPeriod = value;
  }


  getTimePeriods(){
    var start = this.fromDate;
    var end = this.toDate;
    var day = 86400000;
    var difference = end.getTime() - start.getTime();
    var periods = [];
    if (difference <= day*2){
      periods.push({"period":"HOUR", "amount":1,"string":"Hour"});
    }
    if (difference <= day * 6 && difference >= day*2){
      periods.push({"period":"HOUR", "amount":3, "string":"3 Hours"});
    }
    if (difference <= day * 14 && difference >= day*3){
      periods.push({"period":"HOUR", "amount":6, "string":"6 Hours"});
    }
    if (difference <= day * 31 && difference >= day*7){
      periods.push({"period":"DAY", "amount":1, "string":"Day"});
    }
    if (difference >= day * 15 && difference <= day*45){
      periods.push({"period":"DAY", "amount":3, "string":"3 Days"});
    }
    if (difference >= day * 28 && difference < day*365){
      periods.push({"period":"WEEK", "amount":1, "string":"Week"});
    }
    if (difference >= day * 52 ){
      periods.push({"period":"WEEK", "amount":2, "string":"2 Weeks"});
    }
    if (difference >= day * 92 ){
      periods.push({"period":"MONTH", "amount":1, "string":"Month"});
    }
    return periods;
  }

  refreshTime(){
    this.getGroup();
  }

  onResize(event){
    $('.box_b').css('max-height', $(window).height());
  }

  displayEmployee(results: Employee){
    this.employeeToDisplay = results;
  }

  assignGroup(group: GroupMessage, id:number) {
    this.selectedGroupMessages = group;
    $('#groupDropdown').val(id);
    var target = document.getElementById("graph-spin");
    this.graphSpinner.stop(target);
    $('#graph-spin').hide();
  }

  getGroup() {
    var id = $('#groupDropdown').val();
    this.getGroupById(id);
  }

  getGroupById(id:number){
    $('#refreshButton').prop("disabled", false);
    var selectedPeriodParts = this.selectedPeriod.split(":");
    var period = selectedPeriodParts[0];
    var amount = parseInt(selectedPeriodParts[1]);
    var target = document.getElementById("graph-spin");
    this.graphSpinner.spin(target);
    $('#graph-spin').show();
    this.setGroup(id);
    this._groupService.getGroupRates(id, this.toDate.getTime(), this.fromDate.getTime(), period, amount).subscribe(group => this.assignGroup(group, id));
    this.getEmployees(id);
  }

  getGroups() {
    this._groupService.getGroups().subscribe(groups => this.setGroups(groups));
  }

  setGroup(id:number) {
    for (var i = 0;i < this.groups.length;i++){
      if (this.groups[i].id == id){
        this.selectedGroup = this.groups[i];
        break;
      }
    }
  }

  setGroups(groups: Group[]) {
    this.groups = groups;
    var id = this.params.get('id');
    if(id != null){
      this.getGroupById(id);
    }
  }

  flashElement(element, tocolor, fromcolor, fromsize){
    var jelement = $('#'+element);
    console.log(jelement);
    jelement.css("border" , "3px solid "+ fromcolor);
    setTimeout(
      function() {jelement.css('border', fromsize+"px solid "+ tocolor);},
      2000
    );
  }

  ngOnInit() {
    this.getGroups();
    this._groupService.getTimes().subscribe(time => this.setTimes(time));
    $('.box_b').css('max-height', $(window).height());
    this.setPeriods();
  }

  setTimes(times) {
    var min = times.minDate.split('/');
    var max = times.maxDate.split('/');
    this.minDate = new Date(min[2], min[1]-1, min[0], 0, 0, 0, 0);
    this.maxDate = new Date(max[2], max[1]-1, max[0], 0, 0, 0, 0);
  }
  getEmployees(id){
    var selectedPeriodParts = this.selectedPeriod.split(":");
    var period = selectedPeriodParts[0];
    var amount = parseInt(selectedPeriodParts[1]);
    var group: Group;
    for (var i = 0; i < this.groups.length; i++){
      if (this.groups[i].id == id) group = this.groups[i];
    }
    this.employees = [];

    for (var i = 0;i<group.members.length;i++){
      this._groupService.getEmployeeRates(group.members[i].id, this.toDate.getTime(), this.fromDate.getTime(), period, amount).subscribe(response => this.addEmployee(response));
    }
  }

  addEmployee(response) {
    this.employees.push(response);
  }

}
