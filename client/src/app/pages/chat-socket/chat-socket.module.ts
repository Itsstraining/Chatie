import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSocketRoutingModule } from './chat-socket-routing.module';
import { ChatSocketComponent } from './chat-socket.component';
import { ConversationComponent } from '../../components/conversation/conversation.component'

import { FormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
<<<<<<< HEAD
=======
import {MatMenuModule} from '@angular/material/menu';

import { from } from 'rxjs';
>>>>>>> da0092eaa8344297ba76355511f812e976a71d9b
import { ChatRecentComponent } from '../../components/chat-recent/chat-recent.component';



@NgModule({
  declarations: [ChatSocketComponent ,ChatRecentComponent, ConversationComponent],
  imports: [
    CommonModule,
    ChatSocketRoutingModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule
  ]
})
export class ChatSocketModule { }
