import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatsocketioService {
  public socket: any;
  public send_msg: any;
  public received_msg: any;
  public tempMessList = [];
  readonly url: string = environment.endpoint;

  mediaType = [
    '.png',
    '.jpeg'
  ]
  iconType = [
    '.txt',
    '.csv'
  ]
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
            this.received_msg = data;
          }
        });
    }catch(er){
      console.log("can not get receive mess")
    }
  }

  public sendMessage(message, senderId, conversationId, receiverId) {
    let fileType = this.setFileType(message)
    this.socket.emit('message', {message: message, userId: senderId, conversationId: conversationId, receiverId: receiverId,type:fileType});
    this.send_msg = message;
    message = ''
  }

  setFileType(fileName:string){
    if (fileName.includes("http")) {
      for (let index = 0; index < this.mediaType.length; index++) {
          if (fileName.includes(this.mediaType[index])) {
            return "media";
          }        
      }
    }
    return "text"
  }
}
