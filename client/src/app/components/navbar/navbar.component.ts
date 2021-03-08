import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DialogSettingprofileComponent } from '../dialog-settingprofile/dialog-settingprofile.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
    // if(this.auth.user){
    //   this.user = this.auth.userAccount
    // console.log(this.user)
    // }; 
    this.user = this.auth.userAccount
  }

  ngOnInit(): void {
    if(this.auth.user){
     this.checkUser()
    }; 
  }

  public async checkUser() {
    await this.getUserInfos();
  }

  //get all user information
  public async getUserInfos() {
    await this.userService.getUserInfo(this.auth.user.email);
    this.user = this.userService.user;
    console.log(this.user)
  }

  public openDialog() {
    console.log(this.auth.userAccount)

    const dialogRef = this.dialog.open(DialogSettingprofileComponent);
  }

  public openDialogFriend() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.userAccount;
    dialogConfig.height = '55%';
    dialogConfig.width = '30%';
    const dialogRef = this.dialog.open(FindComponent, dialogConfig);
  }

  public openDialogNoti() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.auth.userAccount;
    const dialogRef = this.dialog.open(NotiComponent, dialogConfig);
  }

  async LogOut() {
    await this.auth.LogOut();
    this.router.navigate(['']);
  }
  
}
