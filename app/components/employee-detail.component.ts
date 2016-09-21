import {Component} from 'angular2/core';
import {Employee} from '../models/employee';

@Component({
  selector: 'employee-detail',
  template:`
    <h3>Displayed Employee</h3>
    <div *ngIf='employee' class='panel'>
      <div>
          <span class="subtitle">Email: </span>{{employee.email}}<br>
          <span class="subtitle">Emails Sent: </span>{{sentMessageTotal}}<br>
          <span class="subtitle">Emails Recieved: </span>{{recievedMessageTotal}} <br>
          <span class="subtitle">Total Emails: </span>{{messageTotal}} <br>

          <span class="subtitle">Group: </span><a href="http://{{url}}/#/group-message-rates/{{employee.groupId}}">{{employee.community}} </a><br>


      </div>

    </div>
  `,
  styles: [`
    .subtitle {font-size:0.9em; color:#444;}
  `],
  inputs: ['employee']
})

export class EmployeeDetailComponent {
  employee: Employee;
  sentMessageTotal: number;
  recievedMessageTotal: number;
  messageTotal: number;
  url:string;

  ngOnInit(){
      this.url = window.location.host;
  }
  ngOnChanges(changes) {
    function sum(values: number[]){
      var sum = 0;
      for (var i=0;i<values.length;i++){
        sum += values[i];
      }
      return sum;
    }
    if (typeof this.employee !== 'undefined') {
      this.employee.groupId = this.employee.community;
      console.log(this.employee.groupId);
      if (this.employee.community == null) {
        this.employee.community = "No Group";
      }


      this.sentMessageTotal = sum(this.employee.sentPoints);
      this.recievedMessageTotal = sum(this.employee.recievedPoints);
      this.messageTotal = this.sentMessageTotal + this.recievedMessageTotal;
    }
  }
}
