import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSocketRoutingModule } from './chat-socket-routing.module';
import { ChatSocketComponent } from './chat-socket.component';
import { FormsModule } from '@angular/forms'
import {MatDividerModule} from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';


import { ChatRecentComponent } from '../../components/chat-recent/chat-recent.component';
import { SendermessageComponent } from '../../components/sendermessage/sendermessage.component';
import { ReceivermessageComponent } from '../../components/receivermessage/receivermessage.component';


import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';



@NgModule({
    declarations: [ChatSocketComponent ,ChatRecentComponent, NavbarComponent, SendermessageComponent, ReceivermessageComponent, ChatContentComponent],
  imports: [
    CommonModule,
    ChatSocketRoutingModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    PickerModule,
    MatTabsModule,
    MatButtonModule,

    MatToolbarModule,
    MatSlideToggleModule,
  ]
})
export class ChatSocketModule { }
