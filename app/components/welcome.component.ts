import {Component, EventEmitter} from 'angular2/core';
import {EmployeeService} from '../services/employee.service';
import {GroupService} from '../services/group.service';
import {GraphService} from '../services/graph.service';

@Component({
  selector: 'welcome',
  template: `
      <div class='small-12 main small-central'>
        <div class='row columns'>
          <div class='small-12 medium-4 column' >
            <img src='./img/Logo.png' class='logo-large'>
          </div>
          <div class='small-12 medium-8 column' style='padding-top:18px'>
            <h1>Email Corpus Analysis</h1>
          </div>

        </div>
        <br>
        <hr width='100%'>
        <br>
        <div class='row columns'>
          <div class='small-12 column'>
            <h2>Welcome</h2>
            <h5>Use the tabs to select an analysis feature for an email corpus. These features include:</h5>
            <ul>
              <li>View the message rates of a select Employee for a certain time frame</li>
              <li>View the message rates of groups of Employees and their message rates withing a group</li>
              <li>View the groups of users, computed based of an employees importance</li>
            </ul>

          </div>
        </div>
        <div class='row columns'>
          <h5>System Status</h5>
          <table class='small-12 small-central hover'>
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Employee Message Rates:</b></td>
                <td><i><span id='employeeRateReady'>Processing</span></i></td>
              </tr>
              <tr>
                <td><b>Group Message Rates:</b></td>
                <td><i><span id='groupRateReady'>Processing</span></i></td>
              </tr>
              <tr>
                <td><b>Group Connectivity Graph:</b></td>
                <td><i><span id='graphReady'>Processing</span></i></td>
              </tr>
              <tr>
                <td><b>Summary Page:</b></td>
                <td><i><span id='summaryReady'>Processing</span></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  `,
  styles: [`
    .main {
      margin-top:40px;
    }
    .logo-large {
      height:100px;
    }
  `],
  providers: [EmployeeService, GroupService, GraphService]
})

export class WelcomeComponent {
  employeeRateReady:boolean = false;
  messageRateReady:boolean;
  graphReady:boolean;
  employeeService:EmployeeService;
  graphService:GraphService;
  groupService:GroupService;

  constructor(employeeService: EmployeeService, graphService:GraphService, groupService:GroupService){
    this.employeeService = employeeService;
    this.graphService = graphService;
    this.groupService = groupService;
  }
  ngOnInit(){
    $('#messageRateLink').prop('disabled', true);
    this.createPoll();
  }

  createPoll(){
    var employeeService = this.employeeService;
    var graphService = this.graphService;
    var groupService = this.groupService;

    pollEmployee(employeeService, 'employee');
    pollGroup(groupService, 'group');
    pollGraph(graphService, 'graph');

    setInterval(function(){
      pollEmployee(employeeService, 'employee');
      pollGroup(groupService, 'group');
      pollGraph(graphService, 'graph');
    }, 5000);

    function pollEmployee(service: EmployeeService, serviceType:string){
      service.getEmployees().subscribe(response => checkResponse(response, serviceType));
    }
    function pollGroup(service: GroupService, serviceType:string){
      service.getGroups().subscribe(response => checkResponse(response, serviceType));
    }
    function pollGraph(service: GraphService, serviceType:string){
      service.getGraph().subscribe(response => checkResponse(response, serviceType));
    }

    function checkResponse(response, serviceType:string){
      console.log(response);
      if (serviceType == "employee"){

        if (response.length >0){
          $('#employeeRateReady').text('Ready').css('color', 'green');
        } else {
          $('#employeeRateReady').text('Processing').css('color', 'red');
        }
      } else if (serviceType === 'group'){
        if (response.length > 0){
          $('#groupRateReady').text('Ready').css('color', 'green');
          $('#summaryReady').text('Ready').css('color', 'green');
        } else {
          $('#groupRateReady').text('Processing').css('color', 'red');
          $('#summaryReady').text('Processing').css('color', 'red');
        }
      } else if (serviceType === 'graph'){
        if (response.nodes != null){
          $('#graphReady').text('Ready').css('color', 'green');
        } else {
          $('#graphReady').text('Processing').css('color', 'red');
        }
      }

    }
  }

}
