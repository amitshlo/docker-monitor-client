import {
  Component, Input
} from '@angular/core';

@Component({
  selector: 'server',
  styleUrls: [
    './server.component.css'
  ],
  templateUrl: './server.component.html'
})
export class ServerComponent {

  @Input() server :any;

  constructor() {}

}
