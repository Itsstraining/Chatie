import {
  Component,
  DoCheck,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-recent',
  templateUrl: './chat-recent.component.html',
  styleUrls: ['./chat-recent.component.scss'],
})
export class ChatRecentComponent implements OnInit, DoCheck {
  @Input() public conversation: any;
  // @Input() public newestContent: any;
  public newestContent: any;
  public length: any;
  public receiverInfo: any;
  public count = 0;
  public lastTime: any;

  constructor(private userService: UserService, public auth: LoginService) {}
  ngDoCheck(): void {
    if (this.conversation.conversation.length != this.length) {
      this.length = this.conversation.conversation.length;
      this.newestContent = this.getLastestMess(
        this.conversation.conversation[
          this.conversation.conversation.length - 1
        ]
      );
    }
    if (this.conversation.isClicked == true) {
      this.count = 0;
      this.conversation.isClicked = false;
    }
  }

  ngOnInit(): void {
    this.getUserConverInfo();
    // if(this.conversation.conversation.length != this.conversation.conversation.length + 1){
    //   this.newestContent = this.getLastestMess(this.conversation.conversation[this.conversation.conversation.length]);
    // }else{
    this.newestContent = this.getLastestMess(
      this.conversation.conversation[this.conversation.conversation.length - 1]
    );
    // }
    if (this.conversation.isClicked == true) {
      this.count = 0;
    }
    this.length = this.conversation.conversation.length;
    console.log(this.newestContent);
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
  }

  public getLastestMess(newChat) {
    newChat.date = new Date(newChat.date);
    let hour = newChat.date.getHours();
    let minute = newChat.date.getMinutes();
    this.lastTime = hour + ' : ' + minute;
    if (newChat.senderId == this.userService.user._id) {
      return 'You: ' + newChat.content;
    }
    this.count++;
    return newChat.content;
  }
}
