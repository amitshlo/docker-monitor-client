import {
  Component,
  OnInit
} from '@angular/core';
import { AppState } from './app.service';
import {ContainersStatsService} from './services/containers-stats/container-stats.service';

@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  containers:any;

  constructor(private appState: AppState,
              private containersStatsService:ContainersStatsService) {
    this.containers = [];
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.containersStatsService.registerToContainersChange(this.updateContainers.bind(this));
    this.containersStatsService.fetchData();
  }

  updateContainers(data:any) {
    this.containers = data.sort((a, b) => a.host > b.host);
  }

}
