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
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { DelConverDialogComponent } from 'src/app/components/del-conver-dialog/del-conver-dialog.component';
import { FindService } from 'src/app/services/find.service';
// import { url } from 'node:inspector';
// import { catchError, map } from 'rxjs/operators';
// import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit, OnChanges {
  // @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  title = 'cloudsSorage';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  //

  @Input() public recentConver: any;

  public isEmojiPickerVisible: boolean;
  message: string = '';
  userInfo: any;
  isMedia: boolean = false;
  public textArea: string = '';
  public emojiArray = [];
  public recentFriendChat: any;
  public isFriends: boolean = true;
  public isRequested: number;

  @Output() public newMess: EventEmitter<any> = new EventEmitter<any>();
  @Output() public recentChatDel: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
    public socketIo: ChatsocketioService,
    public userService: UserService,
    public auth: LoginService,
    private conversationService: ConversationService,
    public dialog: MatDialog,
    private find: FindService,
    // private fileService: FileService,
    private storage: AngularFireStorage
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
      this.checkUser();
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public async checkUser() {
    await this.getUserInfos();
  }

  public async getUserInfos() {
    await this.userService.getUserInfo(this.auth.user.email);
    this.userInfo = this.userService.user;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  //send file
  // onFileSelect(event) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile.name);
  // }

  public addEmoji(event) {
    this.message += `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = true;
  }

  //unfriend and add friend again
  public openDialogUnfriend(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogConfig.data = {
      friend: this.recentFriendChat,
      me: this.userInfo._id,
      recent: this.recentConver.converId,
    };
    const dialogRef = this.dialog.open(DialogUnfriendComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.isFriends = false;
      this.isRequested = 0;
    });
  }

  public async addFriend(){
    let temp = await this.find.createAddRequest(this.userInfo._id, this.recentFriendChat._id);
    this.isRequested = temp;
  }

  //delete conversation
  public openDialogDelConver(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogConfig.data = {
      friend: this.recentFriendChat,
      me: this.userInfo._id,
      recent: this.recentConver.converId,
    };
    const dialogRef = this.dialog.open(DelConverDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.recentChatDel.emit(result);
    });
  }

  public openDialogBlock(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      friend: this.recentFriendChat,
      me: this.userInfo._id,
      recent: this.recentConver._id,
    };
    const dialogRef = this.dialog.open(DialogBlockComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }

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
    // this.isMedia = false
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    var n = file.name;
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            this.message = this.fb;
            // this.isMedia=true
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          // console.log(url);
        }
      });
  }
}
