import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSocketRoutingModule } from './chat-socket-routing.module';
import { ChatSocketComponent } from './chat-socket.component';
import { FormsModule } from '@angular/forms'
import { from } from 'rxjs';


@NgModule({
  declarations: [ChatSocketComponent],
  imports: [
    CommonModule,
    ChatSocketRoutingModule,
    FormsModule
  ]
})
export class ChatSocketModule { }
