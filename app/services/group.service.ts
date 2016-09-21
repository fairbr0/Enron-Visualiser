import {Injectable} from 'angular2/core';
import {Employee} from '../models/employee';
import {Http} from 'angular2/http';

@Injectable()

export class GroupService {

  http: Http;
  url: string;
  constructor(http:Http){
    this.http = http;
    this.url = window.location.host;
  }

  getGroups() {
    return this.http.get('http://'+this.url+'/communities')
      .map(response => response.json());
  }

  getGroupRates(id, end:number, start:number, period:string, amount:number){
    return this.http.get('http://'+this.url+'/community-rates?id='+id+'&start='+start+'&end='+end+'&time-period='+period+'&period-amount='+amount)
      .map(response => response.json());
  }

  getEmployeeRates(id, end:number, start:number, period:string, amount:number){
    return this.http.get('http://'+this.url+'/employee-rates?id='+id+'&community=true'+'&start='+start+'&end='+end+'&time-period='+period+'&period-amount='+amount)
      .map(response => response.json());
  }

  getTimes(){
    return this.http.get('http://'+this.url+'/date-range')
      .map(response => response.json());
  }
}
