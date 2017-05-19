import {
  Component, Input
} from '@angular/core';
import {ContainersActionsService} from '../../services/container-actions.service/container-actions.service';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'container',
  styleUrls: [
    'container.component.css'
  ],
  templateUrl: 'container.component.html'
})
export class ContainerComponent {
  @Input() host: string;
  @Input() container: any;
  waitingForAction: boolean;

  constructor(private mdDialog: MdDialog,
              private containersActionsService: ContainersActionsService) {
  }

  getPercentBackground(percent: number) {
    if (percent < 20) {
      return 'percent-1';
    } else if (percent < 45) {
      return 'percent-2';
    } else if (percent < 70) {
      return 'percent-3';
    } else if (percent < 80) {
      return 'percent-4';
    }
  }

  dispatchAction(action: string): void {
    this.waitingForAction = true;
    this.containersActionsService.doAction(action, this.host, this.container.id);
  }

}
