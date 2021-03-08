import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DialogSettingprofileComponent } from '../dialog-settingprofile/dialog-settingprofile.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogUnfriendComponent } from '../dialog-unfriend/dialog-unfriend.component';
import { FindComponent } from '../find/find.component';
import { NotiComponent } from '../noti/noti.component';
import { UserService } from 'src/app/services/user.service';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  public user: any;
  public numRequest: number;
  public count = 0;

  public reload

  constructor(
    public auth: LoginService,
    public socketIo: ChatsocketioService,
    private router: Router,
    public dialog: MatDialog,
    public userService: UserService
  ) {
    // if(this.auth.user){
    //   this.user = this.auth.userAccount
    // console.log(this.user)
    // };
    this.user = this.auth.user;
  }

  // ngOnChanges(){
  //   if (window.performance) {
  //     console.log(this.auth.user)
  //   }
  //   // console.log(this.auth.user)
  //   // this.socketIo.listen('friend-request').subscribe((data) => {
  //   //   console.log(data);
  //   // });
  //   // this.newRequest();
  // }

  ngOnInit(): void {
    this.socketIo.listen('friend-request').subscribe((data) => {
      console.log(data);
    });
    this.newRequest();
    if (this.auth.user) {
      
      this.checkUser();
    }
  }

  public async checkUser() {
    await this.getUserInfos();
  }

  //get all user information
  public async getUserInfos() {
    await this.userService.getUserInfo(this.auth.user.email);
    this.user = this.userService.user;
    console.log(this.user);
  }

  public openDialog() {
    console.log(this.auth.userAccount);

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
    this.count = 0;
    const dialogRef = this.dialog.open(NotiComponent, dialogConfig);
  }

  async LogOut() {
    await this.auth.LogOut();
    this.router.navigate(['']);
  }

  //get number of request
  public getNumRequest(num) {
    this.numRequest = num;
  }

  public newRequest() {
    this.socketIo.socket.on('friend-request', (data) => {
      
      console.log(data)
      if (data) {
        console.log(data)
        console.log(this.auth.userAccount)
        if (data == this.auth.userAccount._id) {
          console.log(this.count);
          this.count++;
          console.log(this.count);
        }
      }
    });
  }
}
