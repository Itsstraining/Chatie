import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendermessage',
  templateUrl: './sendermessage.component.html',
  styleUrls: ['./sendermessage.component.scss']
})
export class SendermessageComponent implements OnInit {

  @Input() public send_msg: any;
  constructor() { }

  ngOnInit(): void {
  }

}
