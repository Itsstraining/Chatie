import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FindService } from 'src/app/services/find.service';

@Component({
  selector: 'app-dialog-unfriend',
  templateUrl: './dialog-unfriend.component.html',
  styleUrls: ['./dialog-unfriend.component.scss']
})
export class DialogUnfriendComponent implements OnInit {
  public data: any;

  constructor(
    private find: FindService,
    public dialogRef: MatDialogRef<DialogUnfriendComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.data = data
  }

  ngOnInit(): void {
    
  }

  public async deleteFriend(){
    let mess = await this.find.deleteFriend(this.data.me, this.data.friend._id);
    alert(mess);
    this.dialogRef.close('Not friend');
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
