import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

const hostsDataPath = 'http://localhost:1111/stats/getDataFromAllHosts';

@Injectable()
export class ContainersStatsService {

  private $hosts: Subject<any>;

  constructor(private http: Http) {
    this.$hosts = new BehaviorSubject<any>([]);
    this.fetchData().subscribe((hostsData) => {
      this.$hosts.next(hostsData);
      Observable.interval(3000).switchMap(() => {
        return this.fetchData();
      }).subscribe((hostsData) => {
        this.$hosts.next(hostsData);
      });
    })
  }

  fetchData(): Observable<any> {
    return this.http.get(hostsDataPath).map((res) => res.json());
  }

  getHosts() {
    return this.$hosts;
  }
}
