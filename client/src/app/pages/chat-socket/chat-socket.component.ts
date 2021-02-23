import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';

// const config: SocketIoConfig = {url: ''}
@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss']
})
export class ChatSocketComponent implements OnInit {

  constructor(private sock: ChatsocketioService) { }

  ngOnInit(): void {
    this.sock.listen('test event').subscribe((data) => {
      console.log(data);
    })
  }


}
