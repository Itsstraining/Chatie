import {
  Component,
  OnChanges,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogUnfriendComponent } from 'src/app/components/dialog-unfriend/dialog-unfriend.component';
import { DialogBlockComponent } from 'src/app/components/dialog-block/dialog-block.component';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit, OnChanges {
  @Input() public recentConver: any;

  public isEmojiPickerVisible: boolean;
  message: string = '';
  userInfo: any;
  public textArea: string = '';
  public emojiArray = [];
  public recentFriendChat: any;

  @Output() public newMess: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
    public socketIo: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    private conversationService: ConversationService,
    public dialog: MatDialog
  ) {
    this.userInfo = this.userService.user;
  }
  ngOnChanges(): void {
    if (this.recentConver) {
      this.recentFriendChat = this.recentConver.participants;
    }
  }

  ngOnInit(): void {
    if (this.auth.user) {
      
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  public addEmoji(event) {
    this.message += `${this.textArea}${event.emoji.native}`
    this.isEmojiPickerVisible = true;
  }

  public openDialogUnfriend(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = this.recentFriendChat
    const dialogRef = this.dialog.open(DialogUnfriendComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public openDialogBlock(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = this.recentFriendChat
    const dialogRef = this.dialog.open(DialogBlockComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  // async getReceiveMsg() {
  //   this.socketIo.socket.on('message-broadcast', async (data) => {
  //     if (data) {
  //       this.recentConver.conversation.push({
  //         senderId: data.userId,
  //         content: data.message,
  //         date: Date.now(),
  //       });
  //       this.newMess.emit(this.recentConver.converId);
  //     }
  //   });
  // }

  SendMessage() {
    if (this.message == '' || this.message == null) {
      return;
    }
    this.socketIo.sendMessage(
      this.message,
      this.userInfo._id,
      this.recentConver.converId,
      this.recentFriendChat._id
    );
    this.recentConver.conversation.push({
      senderId: this.userInfo._id,
      content: this.message,
      date: Date.now(),
    });
    this.newMess.emit(this.recentConver.converId);
    this.message = '';
  }
}
