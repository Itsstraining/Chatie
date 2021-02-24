import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSocketRoutingModule } from './chat-socket-routing.module';
import { ChatSocketComponent } from './chat-socket.component';


@NgModule({
  declarations: [ChatSocketComponent],
  imports: [
    CommonModule,
    ChatSocketRoutingModule
  ]
})
export class ChatSocketModule { }
