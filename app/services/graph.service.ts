import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()

export class GraphService{

  http: Http;
  url: string;

  constructor(http: Http){
    this.http = http;
    this.url = window.location.host;
  }

  getGraph(){
    return this.http.get("http://"+this.url+"/community-graph").map(response => response.json());
  }

}
