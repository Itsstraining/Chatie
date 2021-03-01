import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import * as io from 'socket.io-client/dist/socket.io';
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
  constructor(
    private sock: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService
  ) {
    this.userInfo = this.userService.user;
    
    this.socket = io(this.uri);
  }

  ngOnInit(): void {
    if (this.auth.user) {
      this.setupSocketConnection();
      this.checkUser();
      console.log(this.listConver);
    }
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

  setupSocketConnection() {
    this.socket = io(this.uri);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '10px 20px';
        element.style.margin = '10px';
        element.style.float = 'left';
        element.style.marginRight = '45%';
        element.style.marginLeft = '3%';
        element.style.borderRadius = '20px';
        document.getElementById('message-list').appendChild(element);
      }
    });
    this.listen('message-broadcast').subscribe((data) => {
      console.log(data);
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    if (this.message == '' || this.message == null) {
      return;
    }
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = '#4290E4';
    element.style.padding = '10px 20px';
    element.style.margin = '10px';
    element.style.textAlign = 'left';
    element.style.color = 'white';
    element.style.float = 'right';
    element.style.width = 'fit-content';
    element.style.marginLeft = '45%';
    element.style.marginRight = '3%';
    element.style.borderRadius = '25px';
    const messList = document.getElementById('message-list');
    messList.appendChild(element);
    this.message = '';
  }
}
