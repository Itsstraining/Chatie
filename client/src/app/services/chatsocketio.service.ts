import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';

@Injectable({
  providedIn: 'root',
})
export class ChatsocketioService {
  public socket: any;
  public send_msg: any;
  public received_msg: any;
  public tempMessList = [];
  readonly url: string = 'http://192.168.31.245:8080';

  constructor(private httpClient: HttpClient) {
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  public setupSocketConnection() {
    try{
      this.socket.on('message-broadcast', (data) => {
          if (data) {
            // const element = document.createElement('li');
            // element.innerHTML = data;
            // element.style.background = 'white';
            // element.style.padding = '15px 30px';
            // element.style.margin = '10px';
            // document.getElementById('message-list').appendChild(element);
            this.received_msg = data;
          }
        });
    }catch(er){
      console.log("can not get receive mess")
    }
  }

  public sendMessage(message, senderId, conversationId, receiverId) {
    this.socket.emit('message', {message: message, userId: senderId, conversationId: conversationId, receiverId: receiverId});
    this.send_msg = message;
    message = ''
    // message = '';
    // const element = document.createElement('li');
    // document.getElementById('message-list').appendChild(element);
    // element.innerHTML = this.send_msg;
    // element.style.background = 'pink';
    // element.style.padding = '15px 30px';
    // element.style.margin = '10px';
    // element.style.textAlign = 'right';
    // element.style.float = 'right';
    // element.style.width = 'fit-content';
  }
}
