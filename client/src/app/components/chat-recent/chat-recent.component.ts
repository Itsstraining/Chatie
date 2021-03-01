import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-recent',
  templateUrl: './chat-recent.component.html',
  styleUrls: ['./chat-recent.component.scss']
})
export class ChatRecentComponent implements OnInit {

  @Input() public conversation: any;
  public receiverInfo:any;
  constructor(private userService: UserService, public auth: LoginService) { }
  
  ngOnInit(): void {
    console.log(this.conversation)
    this.getUserConverInfo();
  }

  public async getUserConverInfo(){
    console.log("bug")
   await this.userService.getUserById(this.conversation.receiver[0]);
   this.receiverInfo = this.userService.user;
   console.log(this.receiverInfo)
  }
}
