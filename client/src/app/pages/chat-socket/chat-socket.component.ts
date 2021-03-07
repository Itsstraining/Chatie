import {
  Component,
  OnInit,
  Output,
  ElementRef,
  ViewChild,
  AfterContentChecked,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import {MatDialog} from '@angular/material/dialog';
import * as io from 'socket.io-client/dist/socket.io';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss'],
})
export class ChatSocketComponent implements OnInit{

  socket: any;
  userInfo: any;
  public listConver = [];
  public listChat = [];
  public isClicked: boolean = false;
  public recentFriendChat: any;
  public conversation = [];
  @Output() public recentConver: any;  
  @Output() public converIndexInfo: any;
  public recentConverIndex: any;

  // @ViewChild ('newMess') newMessInConver;
  constructor(
    public socketIo: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    private conversationService: ConversationService,

  ) {
    this.userInfo = this.userService.user;
  }

  ngOnInit(): void {
    if (this.auth.user) {
      this.socketIo.listen('message-broadcast').subscribe((data) => {
        console.log(data);
      });
      this.getReceiveMsg();
      this.checkUser();
      // this.scrollToBottom();
    }
    // this.scrollToBottom();
  }

  // ngOnChanges() {
  //   console.log(this.recentConver._id)
  //   this.sortRecentConver(this.listChat, this.recentConver._id);
  // }


  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch (err) {}
  // }

  //all function about the content of the chat page
  public async checkUser() {
    await this.getUserInfos();
    await this.getListConver(this.userInfo.conversations);
    await this.getAllConverInfo(this.listConver);
    if (this.isClicked == false) {
      if (this.userInfo.conversations.length != 0) {
        this.listChat[0].isClickedIndex = true;
        this.recentConver = this.listChat[0];
      }
    }
  }

  //get all user information
  public async getUserInfos() {
    await this.userService.getUserInfo(this.auth.user.email);
    this.userInfo = this.userService.user;
  }

  //get all user list conversations
  public async getListConver(listOfConver) {
    if (listOfConver == null) {
      return;
    }
    for (let i = 0; i < listOfConver.length; i++) {
      let temp = await this.conversationService.getConverInfo(listOfConver[i]);
      this.listConver.push(temp);
    }
  }

  //get all conversations info
  public async getAllConverInfo(listConver) {
    for (let i = 0; i < listConver.length; i++) {
      let tempUser;
      await this.getAllMessage(listConver[i]._id);
      for (let j = 0; j < listConver[i].participants.length; j++) {
        if (this.userInfo._id != listConver[i].participants[j]) {
          tempUser = await this.userService.getUserById(
            listConver[i].participants[j]
          );
        }
      }
      this.listChat.push({
        converId: listConver[i]._id,
        participants: tempUser,
        listFile: listConver[i].listFile,
        conversation: this.conversation,
        isClickedIndex: false,
      });
    }
  }

  //get conversation information(list mess and receiver info) at index (when click on the list conversations)
  public async getConverIndex(index) {
    for (let i = 0; i < this.listChat.length ; i++) {
      if (i == index) {
        this.listChat[i].isClickedIndex = true;
        this.recentConver = this.listChat[i];
        continue;
      }
      this.listChat[i].isClickedIndex = false;
    }
  }

  //get the content message
  public async getAllMessage(conversationMessList) {
    this.conversation = [];
    let temp = await this.conversationService.getAllMessContent(
      conversationMessList
    );
    for (let i = 0; i < temp.length; i++) {
      this.conversation.unshift({
        senderId: temp[i].senderId,
        content: temp[i].content,
        date: temp[i].date,
      });
    }
  }

  public newMess(event){
    if(event){
      this.sortRecentConver(this.listChat, event)
    }
  }

  //sort again after chat
  public sortRecentConver(listChat, conversationId) {
    for (let i = 0; i < listChat.length; i++) {
      if (conversationId == listChat[i].converId) {
        let temp = listChat[0];
        listChat[0] = listChat[i];
        listChat[i] = temp;
      }
    }
  }

  async getReceiveMsg() {
    this.socketIo.socket.on('message-broadcast', async (data) => {
      if (data) {
        for (let i = 0; i < this.listChat.length; i++) {
          if (data.conversationId == this.listChat[i].converId) {
            this.listChat[i].conversation.push({
              senderId: data.userId,
              content: data.message,
              date: Date.now(),
            });
          }
        }
        // this.receive_msg = data.mesage;
        this.sortRecentConver(this.listChat, data.conversationId);
      }
    });
  }

}
