import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DialogSettingprofileComponent } from '../dialog-settingprofile/dialog-settingprofile.component';
import {MatDialog} from '@angular/material/dialog';
import { DialogUnfriendComponent } from '../dialog-unfriend/dialog-unfriend.component';
import { DialogNotificationComponent } from '../dialog-notification/dialog-notification.component';
import { FindComponent } from '../find/find.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: any;
  constructor(public auth: LoginService, private router: Router, public dialog: MatDialog) { 
    console.log(this.auth.user)
  }

  ngOnInit(): void {
    this.user=this.auth.user;
    console.log(this.auth.user)
  }

  public openDialog() {
    
    const dialogRef = this.dialog.open(DialogSettingprofileComponent, {
      data: {
        type: 'Add',
      },
    });
  }

  public openDialogFriend() {
    
    const dialogRef = this.dialog.open(FindComponent, {
      width: '30%',
      height: '55%'
    });
  }
  
  async LogOut() {
    await this.auth.LogOut();
    this.router.navigate(['']);
  }
}
