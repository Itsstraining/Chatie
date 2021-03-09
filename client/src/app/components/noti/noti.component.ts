import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import { FindService } from 'src/app/services/find.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.scss']
})
export class NotiComponent implements OnInit {
  public listRequest = [];
  public mess: any;
  public userInfo: any;
  public messRequest: any;
  // public fromId: any
  @Output() public fromId: EventEmitter<any> = new EventEmitter<any>();
  // @Output() public countChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<NotiComponent>, private userService: UserService, public socketIo: ChatsocketioService, private findService: FindService, @Inject(MAT_DIALOG_DATA) data) { 
    this.userInfo = data;
}

  ngOnInit(): void {
    this.getListRequest()
  }

  public async getListRequest(){
    let temp = await this.findService.getAllFriendRequest(this.userInfo._id);
    let templist = temp['listRequest'];
    for(let i = 0; i < templist.length; i++){
      let info = await this.userService.getUserById(templist[i].from);
      this.listRequest.push(info);
    }
    this.mess = temp['message'];
  }

  public async clickAddFriend(from, status, index){
    let temp = await this.findService.addFriend(from, this.userInfo._id, status);
    this.messRequest =  {
      mess: temp['addmess'],
      index: index
    }
    this.socketIo.socket.emit('friend-accept', {newConversation: temp['newConversation'], message: temp['message'], to: this.userInfo._id, from: from});
    this.fromId.emit(from);
  }

  save() {
    this.dialogRef.close(this.fromId);
  }

  close() {
    this.dialogRef.close();
  }
}
