import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MessageRatesComponent} from './components/message-rates.component';
import {SummaryComponent} from './components/summary.component';
import {GroupMessageRateComponent} from './components/group-message-rates.component';
import {WelcomeComponent} from './components/welcome.component';
import {GraphMainComponent} from './components/graph-main.component';
import {EmployeeService} from './services/employee.service';
import {SummaryService} from './services/summary.service';
import {GroupService} from './services/group.service';
import {GraphService} from './services/graph.service';


//rework top bar into drop down menu
@Component({
  selector: 'enron',
  template: `
  <div class='top-bar'>
    <div class='top-bar-left'>
      <img src='./img/Logo.png' class="logo">
    </div>
    <div class='top-bar-left'>
      <ul class='menu'>
        <li><a [routerLink]="['Home']">Home</a></li>
        <li><a [routerLink]="['MessageRates', {id:null}]" id='messageRateLink'>Employee Message Rates</a></li>
        <li><a [routerLink]="['GroupMessageRates', {id:null}]" id='groupRateLink'>Group Message Rates</a></li>
        <li><a [routerLink]="['Groups']" id='groupsLink'>Groups</a></li>
        <li><a [routerLink]="['Summary']" id='summaryLink'>Summary</a></li>
      </ul>
    </div>
  </div>

  <router-outlet></router-outlet>

  `,
  styles: [`
    .logo {
      height: 2.1em;
      width: auto;
    }
  `],
  directives: [ROUTER_DIRECTIVES],
  providers: [EmployeeService, GroupService, SummaryService]
})

@RouteConfig([
  {path: '/message-rates/', name: 'MessageRates', component: MessageRatesComponent},
  {path: '/message-rates/:id', name: 'MessageRates', component: MessageRatesComponent},
  {path: '/graph', name: 'Groups', component: GraphMainComponent},
  {path: '/', name: 'Home', component: WelcomeComponent},
  {path: '/group-message-rates', name: "GroupMessageRates", component: GroupMessageRateComponent},
  {path: '/group-message-rates/:id', name: "GroupMessageRates", component: GroupMessageRateComponent},
  {path: '/summary', name: 'Summary', component: SummaryComponent}
])

export class AppComponent {

  ngAfterViewInit(){
    $(document).foundation();
  }
}
