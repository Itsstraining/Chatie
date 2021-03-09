import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-unfriend',
  templateUrl: './dialog-unfriend.component.html',
  styleUrls: ['./dialog-unfriend.component.scss']
})
export class DialogUnfriendComponent implements OnInit {
  public data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUnfriendComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.data = data
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
