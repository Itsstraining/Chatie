import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receivermessage',
  templateUrl: './receivermessage.component.html',
  styleUrls: ['./receivermessage.component.scss']
})
export class ReceivermessageComponent implements OnInit {

  @Input() public receive_msg: any;
  constructor() { }

  ngOnInit(): void {
  }

}
