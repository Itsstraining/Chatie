import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  constructor(public dialogRef: MatDialogRef<NotiComponent>, private userService: UserService, private findService: FindService, @Inject(MAT_DIALOG_DATA) data) { 
    this.userInfo = data
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
    console.log(this.listRequest)
    this.mess = temp['message'];
  }

  public async clickAddFriend(from, status){
    this.messRequest = await this.findService.addFriend(from, this.userInfo._id, status);
  }

  onNoClick(): void{
    this.dialogRef.close();
  }
}
