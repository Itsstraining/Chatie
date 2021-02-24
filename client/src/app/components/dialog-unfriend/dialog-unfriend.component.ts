import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-unfriend',
  templateUrl: './dialog-unfriend.component.html',
  styleUrls: ['./dialog-unfriend.component.scss']
})
export class DialogUnfriendComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUnfriendComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
