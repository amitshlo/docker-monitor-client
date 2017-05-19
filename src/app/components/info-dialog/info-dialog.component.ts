import {
  Component
} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'info-dialog',
  templateUrl: 'info-dialog.component.html'
})
export class InfoDialogComponent {

  constructor(public dialogRef: MdDialogRef<InfoDialogComponent>) {}
}
