import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()

export class EmployeeService{

  http: Http;
  url: string;
  constructor(http: Http){
    this.http = http;
    this.url = window.location.host;
  }
  getEmployees() {
    return this.http.get('http://'+this.url+'/employees')
      .map(response => response.json());
  }

  searchEmployees(emailString: string){
    return this.http.get('http://'+this.url+'/employees?search='+emailString+'&number=20')
      .map(response => response.json());
  }

  logError(err) {
  console.error('There was an error: ' + err);
  }
  getEmployee(id: number, start:number, end:number, period:string, amount:number){

    return this.http.get('http://'+this.url+'/employee-rates?id='+id+'&start='+start+'&end='+end+'&time-period='+period+'&period-amount='+amount)
      .map(response => response.json());
  }

  getTimes(){
    return this.http.get('http://'+this.url+'/date-range')
      .map(response => response.json());
  }
}
