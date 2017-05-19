import {
  Component,
  OnInit
} from '@angular/core';
import {AppState} from './app.service';
import {ContainersStatsService} from './services/containers-stats/container-stats.service';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  containers: Subject<any>;

  constructor(private appState: AppState,
              private containersStatsService: ContainersStatsService) {

  }

  ngOnInit() {
    this.containers = this.containersStatsService.getHosts();
  }

}
