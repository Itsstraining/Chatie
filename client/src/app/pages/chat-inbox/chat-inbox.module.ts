import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatInboxRoutingModule } from './chat-inbox-routing.module';
import { ChatInboxComponent } from './chat-inbox.component';


@NgModule({
  declarations: [ChatInboxComponent],
  imports: [
    CommonModule,
    ChatInboxRoutingModule
  ]
})
export class ChatInboxModule { }
