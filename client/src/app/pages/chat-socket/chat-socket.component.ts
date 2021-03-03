import { Component, OnInit, Output } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import * as io from 'socket.io-client/dist/socket.io';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss'],
})
export class ChatSocketComponent implements OnInit {
  socket: any;
  message: any;
  userInfo: any;
  public listConver = [];
  readonly url: string = 'http://localhost:8080';
  user;
  public isClicked: boolean = false;
  public recentFriendChat: any;
  public conversation = [];

  @Output() public converIndexInfo: any;
  @Output() public receive_msg: any;
  @Output() public send_msg: any;

  constructor(
    private socketIo: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    private conversationService: ConversationService
  ) {
    this.userInfo = this.userService.user;

    // this.socket = io(this.url);
  }

  ngOnInit(): void {
    if (this.auth.user) {
      this.socketIo.listen('message-broadcast').subscribe((data) => {
        console.log(data);
      });
      this.setupSocketConnection();
      // this.setupSocketConnection();
      this.checkUser();
      // this.updateScrollbar();
    }
  }

    //all function about the content of the chat page
    public async checkUser() {
      console.log("bug")
      await this.getUserInfos();
      await this.getOneConverInfo(this.userInfo.conversations);
      if (this.isClicked == false) {
        if (this.userInfo.conversations.length != 0) {
          let temp = this.listConver[0];
          for (let i = 0; i < temp.participants.length; i++) {
            if (this.userInfo._id != temp.participants[i]) {
              let tempUser = await this.userService.getUserById(temp.participants[i]);
              this.recentFriendChat = tempUser;
            }
          }
          this.getMessage(temp.messages);
        }
      }
    }

  // //get all user information
  public async getUserInfos() {
    console.log("bug 1")
    await this.userService.getUserInfo(this.auth.user.email);
    this.userInfo = this.userService.user;
    console.log(this.userService.user)
  }

  public async getOneConverInfo(listOfConver) {
    if (listOfConver == null) {
      return;
    }
    for (let i = 0; i < listOfConver.length; i++) {
      let temp = await this.conversationService.getConverInfo(listOfConver[i]);
      this.listConver.push(temp);
    }
  }


  //get conversation at index information(list mess and receiver info)
  public async getConnverIndex(index) {
    let temp = this.listConver[index];
    for (let i = 0; i < temp.participants.length; i++) {
      if (this.userInfo._id != temp.participants[i]) {
        let tempUser = await this.userService.getUserById(temp.participants[i]);
        this.recentFriendChat = tempUser;
      }
    }
    this.getMessage(temp.messages);
    this.isClicked = true;
  }

  //get the content message
  public async getMessage(conversationMessList) {
    this.conversation = [];
    for (let i = 0; i < conversationMessList.length; i++) {
      let temp = await this.conversationService.getMessContent(
        conversationMessList[i]
      );
      this.conversation.push(temp);
    }
  }

  // listen(eventName: string) {
  //   return new Observable((Subscriber) => {
  //     this.socket.on(eventName, (data) => {
  //       Subscriber.next(data);
  //     });
  //   });
  // }

  // emit(eventName: string, data: any) {
  //   this.socket.emit(eventName, data);
  // }

  setupSocketConnection() {
    this.socketIo.setupSocketConnection();
    this.receive_msg = this.socketIo.received_msg;
    console.log(this.receive_msg);
    //   // this.socket = io(this.uri);
    //   this.socket.on('message-broadcast', (data: string) => {
    //     if (data) {
    //       const element = document.createElement('li');
    //       element.innerHTML = data;
    //       element.style.background = 'rgba(112, 112, 112, 0.7)';
    //       element.style.color = 'white';
    //       element.style.padding = '10px 20px';
    //       element.style.margin = '10px';
    //       element.style.float = 'left';
    //       element.style.marginRight = '45%';
    //       element.style.marginLeft = '3%';
    //       element.style.borderRadius = '20px';

    //       document.getElementById('message-list').appendChild(element);
    //     }
    //   });
  }

  SendMessage() {
    if (this.message == '' || this.message == null) {
      return;
    }
    this.socketIo.sendMessage(this.message);
    this.send_msg = this.socketIo.send_msg;
    console.log(this.send_msg);
    this.message = '';
    //   this.socket.emit('message', this.message);
    //   if (this.message == '' || this.message == null) {
    //     return;
    //   }
    //   const element = document.createElement('li');
    //   element.innerHTML = this.message;
    //   element.style.background = '#4290E4';
    //   element.style.padding = '10px 20px';
    //   element.style.margin = '10px';
    //   element.style.textAlign = 'left';
    //   element.style.color = 'white';
    //   element.style.float = 'right';
    //   element.style.width = 'fit-content';
    //   element.style.marginLeft = '45%';
    //   element.style.marginRight = '3%'
    //   element.style.borderRadius = '25px';
    //   const messList = document.getElementById('message-list');
    //   messList.appendChild(element);
    //   this.message = '';
  }

  // updateScrollbar() {
  //   const element = document.getElementById("chat-messages-show-container");
  //   element.scrollTop = element.scrollHeight;
  //   document.getElementById('message-list').appendChild(element);

  // }
}
