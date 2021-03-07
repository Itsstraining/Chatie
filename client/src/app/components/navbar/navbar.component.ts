import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DialogSettingprofileComponent } from '../dialog-settingprofile/dialog-settingprofile.component';
import {MatDialog} from '@angular/material/dialog';
import { DialogUnfriendComponent } from '../dialog-unfriend/dialog-unfriend.component';
import { FindComponent } from '../find/find.component';
import { NotiComponent } from '../noti/noti.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  public user: any;
  constructor(public auth: LoginService, private router: Router, public dialog: MatDialog , public userService: UserService,) {
    console.log(this.auth.user)
    if(this.auth.user){
      this.getUserInfos()
      
    console.log(this.user)
    }; 
  }

  ngOnInit(): void {
    
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

  public openDialogNoti() {
    
    const dialogRef = this.dialog.open(NotiComponent, {
      // width: '60%',
      // height: '75%'
    });
  }

  //get all user information
  public async getUserInfos() {
    await this.userService.getUserInfo(this.auth.user.email);
    this.user = this.userService.user;
  }

  
  async LogOut() {
    await this.auth.LogOut();
    this.router.navigate(['']);
  }
  
}
