import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-block',
  templateUrl: './dialog-block.component.html',
  styleUrls: ['./dialog-block.component.scss']
})
export class DialogBlockComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBlockComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
