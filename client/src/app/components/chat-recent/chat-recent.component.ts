import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-recent',
  templateUrl: './chat-recent.component.html',
  styleUrls: ['./chat-recent.component.scss'],
})
export class ChatRecentComponent implements OnInit {
  @Input() public conversation: any;
  // @Input() public newestContent: any;
  public newestContent: any;

  public receiverInfo: any;
  constructor(private userService: UserService, public auth: LoginService) {}

  ngOnInit(): void {
    this.getUserConverInfo();
    this.newestContent = this.getLastestMess(this.conversation.conversation[this.conversation.conversation.length - 1]);
    console.log(this.newestContent)
  }

  //get receiver username, ava
  public async getUserConverInfo() {
    for (let i = 0; i < this.conversation.participants.length; i++) {
      if (this.conversation.participants[i] == this.userService.user._id) {
        continue;
      }
      let tempRecInfo = await this.userService.getUserById(
        this.conversation.participants[i]
      );
      this.receiverInfo = tempRecInfo;
    }
    console.log(this.conversation.conversation)
  }

  public getLastestMess(newChat){
    if(newChat.senderId == this.userService.user._id){
      return 'You: ' + newChat.content;
    }
    return newChat.content;
  }

}
