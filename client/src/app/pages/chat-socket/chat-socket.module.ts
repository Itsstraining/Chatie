import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSocketRoutingModule } from './chat-socket-routing.module';
import { ChatSocketComponent } from './chat-socket.component';
import { FormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { from } from 'rxjs';
import { ChatRecentComponent } from '../../components/chat-recent/chat-recent.component';



@NgModule({
  declarations: [ChatSocketComponent ,ChatRecentComponent],
  imports: [
    CommonModule,
    ChatSocketRoutingModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,

  ]
})
export class ChatSocketModule { }
