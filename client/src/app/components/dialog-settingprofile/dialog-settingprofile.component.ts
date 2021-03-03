import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-settingprofile',
  templateUrl: './dialog-settingprofile.component.html',
  styleUrls: ['./dialog-settingprofile.component.scss']
})
export class DialogSettingprofileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSettingprofileComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
