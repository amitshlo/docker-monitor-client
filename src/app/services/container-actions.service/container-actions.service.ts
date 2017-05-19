import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ContainersStatsService} from '../containers-stats/container-stats.service';

@Injectable()
export class ContainersActionsService {

  private serverUrl = 'http://localhost:1111/actions/';

  constructor (private http: Http,
               private containersStatsService:ContainersStatsService) {}

  doAction(action:string, host:string, id:string) {
    this.http.post(this.serverUrl + action, {id: id, host: host}).subscribe((data) => {
      this.containersStatsService.fetchData();
    });
  }

}
