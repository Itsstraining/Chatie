import {
  Component,
  OnInit,
  Output,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  OnChanges,
} from '@angular/core';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { DialogNotiComponent } from 'src/app/components/dialog-noti/dialog-noti.component';
import { FindService } from 'src/app/services/find.service';

export interface User{
  name: string,
  avatar: string,
  id: string
}

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
  public arrlength: number;
  @Output() public recentConver: any;
  @Output() public converIndexInfo: any;
  public recentConverIndex: any;
  public fromId: any;
  userTemp:User[] = [];
  user:User[]=[];
  friendName:String;

  // @ViewChild ('newMess') newMessInConver;
  constructor(
    public socketIo: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    private conversationService: ConversationService,
    public dialog: MatDialog,
    private find:FindService
  ) {
    this.userInfo = this.auth.user;
  }
  ngOnChanges(): void {
    if (this.arrlength != this.listChat.length) {
      this.arrlength = this.listChat.length;

    }
  }

  // ngAfterContentInit(){
  //   this.getFriendListInfo();
  // }

  ngOnInit(): void {
    if (this.auth.user) {
      this.socketIo.listen('message-broadcast').subscribe((data) => {
        console.log(data);
      });
      this.getReceiveMsg();
      this.socketIo.listen('new-friend-accept').subscribe((data) => {
        console.log(data);
      });
      this.getNewFriend();
      this.checkUser();
    }
  }

  //all function about the content of the chat page
  public async checkUser() {
    await this.getUserInfos();
    await this.getListConver(this.userInfo.conversations);
    await this.getAllConverInfo(this.listConver);
    this.arrlength = this.listChat.length;
    if (this.isClicked == false) {
      if (this.userInfo.conversations.length != 0) {
        this.listChat[0].isClickedIndex = true;
        this.recentConver = this.listChat[0];
      }
    }
    await this.getFriendListInfo();
  }

  public openDialogNoti(): void {
    const dialogConfig = new MatDialogConfig();

    (dialogConfig.width = '20%'), (dialogConfig.height = '23%');
    const dialogRef = this.dialog.open(DialogNotiComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }

  //get all user information
  public async getUserInfos() {
    await this.userService.getUserInfo(this.auth.user.email);
    this.userInfo = this.userService.user;
  }

  //get all user list conversations
  public async getListConver(listOfConver) {
    if (listOfConver.length == 0) {
      this.openDialogNoti();
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
    for (let i = 0; i < this.listChat.length; i++) {
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
        type: temp[i].type,
      });
    }
  }

  public newMess(event) {
    if (event) {
      this.sortRecentConver(this.listChat, event);
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

  public DelChat(event) {
    for (let i = 0; i < this.listChat.length; i++) {
      if (event == this.listChat[i].converId) {
        this.listChat.splice(i, 1);
      }
    }
    this.recentConver = this.listChat[0];
  }

  //search in friend list and chat
  public async getFriendListInfo(){
    // await this.find.getUser();
    // this.listTemp = this.find.listRep;
    let temp = await this.find.getFriendList(this.userInfo._id) as Array<User>;
    for(let i = 0; i < temp.length; i++){
      let tempUser = await this.userService.getUserById(temp[i]);
      this.userTemp.push({
        name: tempUser.userName,
        avatar: tempUser.avatar,
        id: tempUser._id
      })
    }
    
  }
  Search() {
    this.user = this.userTemp.filter((res) => {
      console.log(res.name
        .toLocaleLowerCase()
        .match(this.friendName.toLocaleLowerCase()));
      return res.name
        .toLocaleLowerCase()
        .match(this.friendName.toLocaleLowerCase());
    });
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
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
              type: data.type,
            });
          }
        }
        // this.receive_msg = data.mesage;
        this.sortRecentConver(this.listChat, data.conversationId);
      }
    });
  }

  getFromId(fromId) {
    this.fromId = fromId;
  }

  public async getNewFriend() {
    this.socketIo.socket.on('new-friend-accept', async (data) => {
      if (data) {
        if (data.to == this.userInfo._id || data.from == this.userInfo._id) {
          let tempUser;
          this.conversation = [];
          this.conversation.unshift({
            senderId: '',
            content: data.message,
            date: Date.now(),
            type: 'text',
          });
          for (let j = 0; j < data.newConversation.participants.length; j++) {
            if (this.userInfo._id != data.newConversation.participants[j]) {
              tempUser = await this.userService.getUserById(
                data.newConversation.participants[j]
              );
            }
          }
          this.listChat.push({
            converId: data.newConversation._id,
            participants: tempUser,
            listFile: data.newConversation.listFile,
            conversation: this.conversation,
            isClickedIndex: false,
          });
          this.sortRecentConver(this.listChat, data.newConversation._id);

        }
      }
    });
  }
}
