import {
  Component,
  OnInit,
  Output,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { from, Observable } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as io from 'socket.io-client/dist/socket.io';
import { DialogUnfriendComponent } from 'src/app/components/dialog-unfriend/dialog-unfriend.component';
import { DialogBlockComponent } from 'src/app/components/dialog-block/dialog-block.component';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ConversationService } from 'src/app/services/conversation.service';


@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss'],
})
export class ChatSocketComponent implements OnInit, AfterViewChecked {
  public textArea: string = '';
  public emojiArray = [];
   public isEmojiPickerVisible: boolean;
   public addEmoji(event) {
      this.message = this.emojiArray.push(`${this.textArea}${event.emoji.native}`);
      this.isEmojiPickerVisible = true;
      
   }
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  socket: any;
  message: any;
  userInfo: any;
  public listConver = [];
  public listChat = [];
  public isClicked: boolean = false;
  public recentFriendChat: any;
  public conversation = [];
  public recentConver: any;
  public recentConverIndex: any;

  @Output() public converIndexInfo: any;
  @Output() public receive_msg: any;
  @Output() public send_msg: any;

  constructor(
    public socketIo: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    private conversationService: ConversationService,
    public dialog: MatDialog
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
      this.scrollToBottom();
    }
    this.scrollToBottom();

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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
  
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  //all function about the content of the chat page
  public async checkUser() {
    await this.getUserInfos();
    await this.getListConver(this.userInfo.conversations);
    await this.getAllConverInfo(this.listConver);
    if (this.isClicked == false) {
      if (this.userInfo.conversations.length != 0) {
        let temp = this.listConver[0];
        for (let i = 0; i < temp.participants.length; i++) {
          if (this.userInfo._id != temp.participants[i]) {
            let tempUser = await this.userService.getUserById(
              temp.participants[i]
            );
            this.recentFriendChat = tempUser;
          }
        }
        await this.getConverIndexContent(temp._id);
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
      await this.getAllMessage(listConver[i]._id);
      this.listChat.push({
        converId: listConver[i]._id,
        conversation: this.conversation,
      });
    }
  }

  //get conversation information(list mess and receiver info) at index (when click on the list conversations)
  public async getConverIndex(index) {
    let temp = this.listConver[index];
    for (let i = 0; i < temp.participants.length; i++) {
      if (this.userInfo._id != temp.participants[i]) {
        let tempUser = await this.userService.getUserById(temp.participants[i]);
        this.recentFriendChat = tempUser;
      }
    }
    this.getConverIndexContent(temp._id);
    this.isClicked = true;
  }

  //get the conversation message between people
  public async getConverIndexContent(conversationId) {
    for (let i = 0; i < this.listChat.length; i++) {
      if (conversationId == this.listChat[i].converId) {
        this.recentConver = this.listChat[i];
        return;
      }
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

  async getReceiveMsg() {
    this.socketIo.socket.on('message-broadcast', (data) => {
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
      }
    });
  }

  SendMessage() {
    if (this.message == '' || this.message == null) {
      return;
    }
    this.socketIo.sendMessage(
      this.message,
      this.userInfo._id,
      this.recentConver.converId
    );
    for (let i = 0; i < this.listChat.length; i++) {
      if (this.recentConver.converId == this.listChat[i].converId) {
        this.listChat[i].conversation.push({
          senderId: this.userInfo._id,
          content: this.message,
          date: Date.now(),
        });
      }
    }
    this.message = '';
  }

  // updateScrollbar() {
  //   const element = document.getElementById("chat-messages-show-container");
  //   element.scrollTop = element.scrollHeight;
  //   document.getElementById('message-list').appendChild(element);

  // }
}