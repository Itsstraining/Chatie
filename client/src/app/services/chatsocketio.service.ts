import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';

@Injectable({
  providedIn: 'root'
})
export class ChatsocketioService {

  socket: any;
  readonly uri: string = "http://localhost:9999"

  constructor() {
    this.socket = io(this.uri);
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
}
