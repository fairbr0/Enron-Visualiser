import {Component, OnInit} from 'angular2/core';
import {Employee} from '../models/employee';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {RouteParams} from 'angular2/router';

import {EmployeeMin} from '../models/employee-min';
import {EmployeeService} from '../services/employee.service';
import {ChartComponent} from './employee-chart.component';
import {EmployeeDetailComponent} from './employee-detail.component';
import {MyDatePicker} from './mydatepicker';

//create search modal for employee

@Component({
  directives: [ChartComponent, EmployeeDetailComponent, MyDatePicker],
  templateUrl: 'app/template/employee_message_rates.html',
  styles: [`
    .box_a {
      background-color:#EEE
    }
    .spinText{
      position:relative;
      left:42%;
      top:60%;
    }
  `],
  providers: [EmployeeService]
})

export class MessageRatesComponent {

  public title = "Employee Message Rates";
  selectedEmployee : Employee;
  selectedEmployeeId: number;
  employees : EmployeeMin[];
  emailString: string;
  searchedEmployee : EmployeeMin;
  fromDateString: string = "01.08.1999";
  toDateString: string = "31.07.2002";
  fromDate: Date = new Date(1999, 7, 1, 0, 0, 0, 0);
  toDate: Date = new Date(2002, 6, 31, 0, 0, 0, 0);
  maxDate: Date = new Date(2002, 6, 31, 0, 0, 0, 0);
  minDate: Date = new Date(1999, 7, 1, 0, 0, 0, 0);
  periods: Object[];
  selectedPeriod:string;
  graphSpinner = new Spinner();

  //checkboxes: boolean[] = [true, true, true];
  checkboxes = [true, true, true];

  private myDatePickerOptions = {
      todayBtnTxt: 'Start',
      dateFormat: 'dd.mm.yyyy',
      firstDayOfWeek: 'mo',
      sunHighlight: true,
      height: '34px',
      width: '180px'
  };

  constructor(private _employeeService: EmployeeService, private params: RouteParams) {
  }

  onChange(event) {
    var id = event.target.id;
    if (id === 'checkboxSent') {this.checkboxes[0] = !this.checkboxes[0];}
    if (id === 'checkboxRecieved') {this.checkboxes[1] = !this.checkboxes[1];}
    if (id === 'checkboxAverage') {this.checkboxes[2] = !this.checkboxes[2];}
    this.checkboxes = [this.checkboxes[0], this.checkboxes[1], this.checkboxes[2]];
  }

  changeValue(value){
    this.selectedPeriod = value;
    console.log(this.selectedPeriod);
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
          this.toDateString = dateString;
          this.toDate = date;
        } else {
          this.toDate = null;
          this.toDateString = "";
          this.flashElement("toDatePicker", "#000", "#F00", 0);
        }
      } else {
        this.toDate = null;
        this.toDateString = "";
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
        this.fromDateString = "";
      }
    }

    if (this.toDateString === "" || this.fromDateString === "") {
      $('#selectEmployee').prop("disabled", true);
      $('#refreshButton').prop("disabled", true);
    } else {
      $('#selectEmployee').prop("disabled", false);
      if (this.selectedEmployee != 'undefined'){
        $('#refreshButton').prop("disabled", false);
      }
    }

    if (this.toDate != null && this.fromDate != null){
      this.setPeriods();
    }
  }

  setPeriods(){
    this.periods = this.getTimePeriods();
    this.selectedPeriod = this.periods[0].period+":"+this.periods[0].amount;
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
    this.getEmployeeById(this.selectedEmployeeId);
  }

  ngAfterViewInit(){
    var id = this.params.get('id');
    if(id != null){
      this.getEmployeeById(id);
    }
  }

  setTimes(times) {
    var min = times.minDate.split('/');
    var max = times.maxDate.split('/');
    this.minDate = new Date(min[2], min[1]-1, min[0], 0, 0, 0, 0);
    this.maxDate = new Date(max[2], max[1]-1, max[0], 0, 0, 0, 0);
  }

  getEmployeeById(id){
    $('#refreshButton').prop("disabled", false);
    var start = this.fromDate.getTime();
    var end = this.toDate.getTime();
    var selectedPeriodParts = this.selectedPeriod.split(":");
    var period = selectedPeriodParts[0];
    var amount = parseInt(selectedPeriodParts[1]);

    var target = document.getElementById("graph-spin");
    this.graphSpinner.spin(target);
    $('#graph-spin').show();
    this._employeeService.getEmployee(id, start, end, period, amount).subscribe(employee => this.assignEmployee(employee, id));
  }

  getEmployee() {
    var id = $('#employeeDropdown').val();
    this.getEmployeeById(id);
  }

  assignEmployee(employee: Employee, id:number) {
    this.selectedEmployee = employee;
    this.selectedEmployeeId = id;
    $('#employeeDropdown').val(id);
    var target = document.getElementById("graph-spin");
    this.graphSpinner.stop(target);
    $('#graph-spin').hide();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  searchEmployees(){
    this.flashElement("employeeDropdown", '#bbb', '#0f0', 1);
    var searchString = this.emailString.toLowerCase();
    this._employeeService.searchEmployees(searchString).subscribe(employees => this.handleSearch(employees));
  }

  handleSearch(employees: EmployeeMin[]) {
    var returnEmployees: EmployeeMin[] = [];
    for (var i = 0; i < employees.length; i++) {
      var employee = employees[i];
      if (employee.email.indexOf(this.emailString.toLowerCase()) > -1) {
        returnEmployees.push(employee);
      }
    }
    this.employees = returnEmployees;
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
    this.getEmployees();
    this._employeeService.getTimes().subscribe(time => this.setTimes(time));
    this.setPeriods();
  }

  ngOnChange(){
    console.log(this.selectedPeriod);
  }

}

interface Checkbox {
  id: string;
  value: boolean;
}
