import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.scss']
})
export class NotiComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotiComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
