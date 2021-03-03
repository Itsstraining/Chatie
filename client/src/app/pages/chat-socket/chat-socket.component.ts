import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatsocketioService } from 'src/app/services/chatsocketio.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as io from 'socket.io-client/dist/socket.io';
import { DialogUnfriendComponent } from 'src/app/components/dialog-unfriend/dialog-unfriend.component';
import { DialogBlockComponent } from 'src/app/components/dialog-block/dialog-block.component';


@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.scss']
})
export class ChatSocketComponent implements OnInit {
  socket: any;
  message: any;
  readonly uri: string = "http://localhost:8080";

  constructor(private sock: ChatsocketioService, public dialog: MatDialog) {
    console.log("bug")
    this.socket = io(this.uri); 
  }

  public openDialogUnfriend(): void {
    const dialogRef = this.dialog.open(DialogUnfriendComponent, {
      // data : {name : this.name, avatar: this.avatar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  public openDialogBlock(): void {
    const dialogRef = this.dialog.open(DialogBlockComponent, {
      // data : {name : this.name, avatar: this.avatar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  ngOnInit(): void {
    this.listen('message-broadcast').subscribe((data) => {
      console.log(data);
    });
    this.setupSocketConnection();
  }

  listen(eventName: string) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);

      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }



  setupSocketConnection() {
    // this.socket = io(this.uri);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '10px 20px';
        element.style.margin = '10px';
        element.style.float = 'left';
        element.style.marginRight = '45%';
        element.style.marginLeft = '3%';
        element.style.borderRadius = '20px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }



  SendMessage() {
    this.socket.emit('message', this.message);
    if(this.message == '' || this.message == null) {
      return;
    }
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = '#4290E4';
    element.style.padding = '10px 20px';
    element.style.margin = '10px';
    element.style.textAlign = 'left';
    element.style.color = 'white';
    element.style.float = 'right';
    element.style.width = 'fit-content';
    element.style.marginLeft = '45%';
    element.style.marginRight = '3%'
    element.style.borderRadius = '25px';
    const messList = document.getElementById('message-list');
    messList.appendChild(element);
    this.message = '';
  }


}