import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { FindComponent } from '../find/find.component';

@Component({
  selector: 'app-dialog-noti',
  templateUrl: './dialog-noti.component.html',
  styleUrls: ['./dialog-noti.component.scss']
})
export class DialogNotiComponent implements OnInit {

  constructor(public auth: LoginService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogNotiComponent>) { }

  ngOnInit(): void {
  }

  public openDialogFriend() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.userAccount;
    dialogConfig.height = '55%';
    dialogConfig.width = '30%';
    const dialogRef = this.dialog.open(FindComponent, dialogConfig);

    this.onNoClick();
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
