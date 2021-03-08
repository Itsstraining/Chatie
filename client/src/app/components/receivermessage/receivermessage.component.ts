import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receivermessage',
  templateUrl: './receivermessage.component.html',
  styleUrls: ['./receivermessage.component.scss']
})
export class ReceivermessageComponent implements OnInit {

  isMedia:boolean = false;
  @Input() public receive_msg: String;
  constructor() { }

  ngOnInit(): void {
    this.setType()
  }

  setType(){
    if (this.receive_msg.includes("http")) {
      this.isMedia=true
    }
  }

}
