import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-del-conver-dialog',
  templateUrl: './del-conver-dialog.component.html',
  styleUrls: ['./del-conver-dialog.component.scss']
})
export class DelConverDialogComponent implements OnInit {
  public data: any;
  public isFriends: boolean = true;

  constructor(
    private conversationService: ConversationService,
    public dialogRef: MatDialogRef<DelConverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.data = data
  }

  ngOnInit(): void {
    
  }

  public async delConver(){
    let mess = await this.conversationService.deleteConver(this.data.recent, this.data.me, this.data.friend._id);
    alert(mess);
    this.isFriends =false;
    this.dialogRef.close(this.data.recent);
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
