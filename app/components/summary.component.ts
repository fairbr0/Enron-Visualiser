import {Component} from 'angular2/core';
import {SummaryService} from '../services/summary.service';
import {Http, Headers} from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {MessageRatesComponent} from './message-rates.component';

@Component({
  selector: 'summary',
  templateUrl: 'app/template/summary.html',
  styles: [`
    .main {
      margin-top:40px;
    }
  `],
  providers: [SummaryService]
})

export class SummaryComponent{
  topSent: TopSent;
  topRecieved: TopRecieved;
  topCentral: TopCentral;
  url:string
  constructor(private _summaryService: SummaryService){
    this.url = window.location.host;
  }

  ngOnInit(){
    //this.handleResponse(this._summaryService.getSummary());
    this._summaryService.getTopEmployees('CENTRALITY').subscribe(response => this.handleResponse(response, 'central'));
    this._summaryService.getTopEmployees('SENT').subscribe(response => this.handleResponse(response, 'sent'));
    this._summaryService.getTopEmployees('RECEIVED').subscribe(response => this.handleResponse(response, 'recieved'));
  }

  handleResponse(response: Object, request:string){
    console.log(response);
    if (request=='central') {console.log('here');this.topCentral = response;}
    if (request=='sent') {console.log('here');this.topSent = response;}
    if (request=='recieved') this.topRecieved = response;
  }

}
interface TopSent {
    email:string
    id:number
    sent:number;
}

interface TopRecieved {
    email:string
    id:number
    received:number;
}

interface TopCentral{
    email:string
    id:number
    centrality:number;
}
