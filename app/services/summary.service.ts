import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()

export class SummaryService {
  http: Http;
  url: string;

  constructor(http:Http){
    this.http = http;
    this.url = window.location.host;
  }

  getTopEmployees(metric: string){
    return this.http.get("http://" + this.url + "/employees?number=10&ordering=" + metric).map(response => response.json());
  }

  /*getSummary() {
    return {
      "topSent": [
        {
          "email":"bob@enron",
          "id":1,
          "sent":7008
        }
      ],
      "topRecieved": [
        {
          "email":"phil@enron",
          "id":2,
          "recieved":30005
        }
      ],
      "topCentral": [
        {
          "email":"sara@enron",
          "id":3,
          "centrality":3005
        }
      ]
    }

  }*/
}
