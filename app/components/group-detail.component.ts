import {Component, EventEmitter} from 'angular2/core';
import {Employee} from '../models/employee';
import {EmployeeMin} from '../models/employee-min';
import {EmployeeDetailComponent} from './employee-detail.component';
import {Group} from '../models/group';
import {GroupMessage} from '../models/group-message';

@Component({
  selector: 'group-detail',
  template: `
  <div *ngIf='groupMessages' class='panel'>
    <span class="subtitle">Total Group Emails: </span>{{messages}}<br>
    <span class="subtitle">Number of Employees: </span>{{numberOfEmployees}}<br>

    <h5>Employees:</h5>
    <div *ngFor="#employee of employeeAggregates;#i=index">
      <div class='row small-12 employeeBlock' id='employeeInfo{{i}}'>
        <span class="subtitle">Email: </span>{{employee.email}}<br>
        <span class="subtitle">Sent Messages: </span>{{employee.sent}}<br>
        <span class="subtitle">Recieved Messages: </span>{{employee.recieved}}<br>
        <button (click)="showChart(employee.email, i)" class='button button-margin'>Show On Chart</button>
        <a href='http://{{url}}/#/message-rates/{{employee.id}}' style='margin-top:6px;' class='button'>Message Rates</a>
      </div>
      <br>
    </div>


  </div>

  `,
  styles: [`
    .employeeBlock {
      background-color:#EEE;
      padding:15px;
    }
    .subtitle {
      font-size:1.2em;
    }
    .button-margin {
      margin-top:6px;
    }
    .panel {
     overflow-y: scroll;
    },
    .highlighted {
      border: 10px solid #0F0;
    }
  `],
  inputs: ['employees','groupMessages', 'group'],
  outputs: ['employeeToDisplay']
})

export class GroupDetailComponent {
  groupMessages: GroupMessage;
  group:Object;
  messages: number;
  employees: Employee[] = [];
  employeeAggregates: EmployeeAggregate[];
  employeeToDisplay: EventEmitter<{results: Employee}>;
  employeeToDisplayC: Employee;
  employeeToDisplayIndex: number = 0;
  numberOfEmployees = 0;
  averageCentrality = 0;
  url:string;

  constructor(){
    this.employeeToDisplay = new EventEmitter();
    this.url = window.location.host;
  }

  showChart(i:string, j:number){
    $('#employeeInfo'+this.employeeToDisplayIndex).css("border", "0px");
    for (var k = 0; k < this.employees.length;k++){
      var employee = this.employees[k];
      if (employee.email == i){
        console.log(employee);
        if (this.employeeToDisplayC === this.employees[k]){
          this.employeeToDisplay.next({results: 'undefined'});
          this.employeeToDisplayC = 'undefined';
        }
        else {
          this.employeeToDisplayC = this.employees[k];
          this.employeeToDisplay.next({results:this.employees[k]});
          this.employeeToDisplayIndex = j;
          $('#employeeInfo'+j).css("border", "3px solid #0F0");
        };
        break;
      }
    }
  }

  compareEmployee(empA:EmployeeAggregate, empB:EmployeeAggregate){
    var empATotal = empA.sent + empA.recieved;
    var empBTotal = empB.sent + empB.recieved;
    console.log(empATotal, empBTotal);
    if (empATotal < empBTotal) {
      return 1;
    }
    if (empATotal > empBTotal) {
      return -1;
    }
    return 0;
  }

  ngOnChanges() {
    function sum(values: number[]) {
      var sum = 0;
      for (var i = 0; i < values.length; i++) {
        sum += values[i];
      }
      return sum;
    }

    function aggregate(employees: Employee[], groupCopy:Object){
      var employeeAggregates: Object[] = [];
      for (var i = 0; i < employees.length; i++) {
        var employee: Employee = employees[i];
        var sentSum = sum(employee.sentPoints);
        var recievedSum = sum(employee.recievedPoints);
        var id = getEmployeeId(employee.email, groupCopy);
        employeeAggregates.push({"id":id, "email":employee.email,"sent":sentSum, "recieved":recievedSum});
      }
      return employeeAggregates;
    }

    function getEmployeeId(email:string, groupCopy:Object){
      for (var i = 0;i < groupCopy.members.length; i++){
        if (groupCopy.members[i].email == email){
          return groupCopy.members[i].id;
        }
      }
    }

    function getEmployeesArray() {
      var employees = [];
      for (var i = 0; i < this.employeeList.length; i++) {
        employees.push(this._groupService)
      }
      this.employees = employees;
    }

    this.employeeToDisplay.next({"results": 'undefined'});
    var groupCopy = this.group;
    if (typeof this.groupMessages !== 'undefined'){
      this.messages = sum(this.groupMessages.messages);
      this.numberOfEmployees = this.employees.length;
      this.employeeAggregates = aggregate(this.employees, groupCopy).sort(this.compareEmployee);
    }
  }
}

interface EmployeeAggregate {
  id:number;
  email:string;
  sent:number;
  recieved:number;
}
