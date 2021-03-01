import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './dialog-notification.component.html',
  styleUrls: ['./dialog-notification.component.scss']
})
export class DialogNotificationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogNotificationComponent>) { }

  ngOnInit(): void {
  }

}
