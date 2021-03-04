import { Component, OnInit, Output } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as io from 'socket.io-client/dist/socket.io';
import { DialogUnfriendComponent } from 'src/app/components/dialog-unfriend/dialog-unfriend.component';
import { DialogBlockComponent } from 'src/app/components/dialog-block/dialog-block.component';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss'],
})
export class ChatSocketComponent implements OnInit{
  socket: any;
  message: any;
  userInfo: any;
  public listConver: Array<any>;
  readonly uri: string = 'http://localhost:8080';
  user;

  @Output() public converIndex: Number;

  constructor(
    private sock: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    public dialog: MatDialog
  ) {
    this.userInfo = this.userService.user;
    
    this.socket = io(this.uri);
  }

  ngOnInit(): void {
    if (this.auth.user) {
      // this.setupSocketConnection();
      this.checkUser();
      console.log(this.listConver);
    }
  }

  public openDialogUnfriend(): void {
    const dialogRef = this.dialog.open(DialogUnfriendComponent, {
      // data : {name : this.name, avatar: this.avatar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  public openDialogBlock(): void {
    const dialogRef = this.dialog.open(DialogBlockComponent, {
      // data : {name : this.name, avatar: this.avatar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  
  }
  // //get all user information
  public async getUserInfos() {
      await this.userService.getUserInfo(this.auth.user.email);
      this.userInfo = this.userService.user;
  }

  // get all user's recent conversation
  public async getAllUserConver(userId) {
    console.log('bug 1');
      await this.userService.getUserAllConver(
        userId
      );
      this.listConver = this.userService.getAllConver();
      console.log("heello" + this.listConver);

  }

  //all function about the content of the chat page
  public async checkUser() {
    this.user = this.auth.user;
    console.log("user ne" + this.userInfo);
    if (this.user ) {
      console.log('hello');
      await this.getUserInfos();
      this.getAllUserConver(this.userInfo._id);
      
    }
  }

  public getConnverIndex(index){
    // this.converIndex = index;
    console.log(index)
    this.listen('message-broadcast').subscribe((data) => {
      console.log(data);
    });
    // this.setupSocketConnection();

    this.updateScrollbar();
  }

  listen(eventName: string) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  updateScrollbar() {
    const element = document.getElementById("chat-messages-show-container");
    element.scrollTop = element.scrollHeight;

    document.getElementById('message-list').appendChild(element);

  }

}
