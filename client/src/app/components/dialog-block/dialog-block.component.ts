import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-block',
  templateUrl: './dialog-block.component.html',
  styleUrls: ['./dialog-block.component.scss']
})
export class DialogBlockComponent implements OnInit {
  public recentFriendChat: any;
  constructor(
    public dialogRef: MatDialogRef<DialogBlockComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.recentFriendChat = data;
  }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
