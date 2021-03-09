import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  DoCheck,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
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
import { NgxPushNotificationService } from 'ngx-push-notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user: any;
  public numRequest: number;
  public count = 0;

  public reload;
  @Output() public fromId: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public auth: LoginService,
    public socketIo: ChatsocketioService,
    private router: Router,
    public dialog: MatDialog,
    public userService: UserService,
    private ngxPushNotificationService: NgxPushNotificationService
  ) {
    this.user = this.auth.user;
  }

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
  }

  public openDialog() {
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
    dialogRef.afterClosed().subscribe((data) => this.fromId.emit(data));
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
    this.socketIo.socket.on('friend-request', async (data) => {
      if (data) {
        console.log(data)
        if (data == this.auth.userAccount._id) {
          this.count++;
        };
        let tempSender = await this.userService.getUserById(data.from)
        this.ngxPushNotificationService.showNotification({
          title: tempSender.userName,
          body: 'has sent a friend request.',
          icon: tempSender.avatar
        }).subscribe((res: any) => {
          if (res.type === 'show') {
            console.log('show');
          } else if (res.type === 'click') {
            console.log('click');
          } else {
            console.log('close');
          }
        });
      }
    });
  }
}
