import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendermessage',
  templateUrl: './sendermessage.component.html',
  styleUrls: ['./sendermessage.component.scss']
})
export class SendermessageComponent implements OnInit {

  @Input() public send_msg: String;
  isMedia:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.setType();
  }

  setType(){
    if (this.send_msg.includes("http")) {
      this.isMedia=true
    }
  }

}
