import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSocketRoutingModule } from './chat-socket-routing.module';
import { ChatSocketComponent } from './chat-socket.component';
import { FormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';

import { from } from 'rxjs';
import { ChatRecentComponent } from '../../components/chat-recent/chat-recent.component';
import { SendermessageComponent } from '../../components/sendermessage/sendermessage.component';
import { ReceivermessageComponent } from '../../components/receivermessage/receivermessage.component';
import { OptionComponent } from '../../components/option/option.component';
import { HttpClientModule }  from '@angular/common/http'

// import { UploadfireRoutingModule } from './uploadfire-routing.module';
// import { UploadfireComponent } from './uploadfire.component';
import { environment } from "../../../environments/environment";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from "@angular/fire/storage";


import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ChatContentComponent } from './components/chat-content/chat-content.component';




@NgModule({
    declarations: [ChatSocketComponent ,ChatRecentComponent, SendermessageComponent, ReceivermessageComponent, ChatContentComponent],
  imports: [
    CommonModule,
    ChatSocketRoutingModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    PickerModule,
    HttpClientModule,
    CommonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class ChatSocketModule { }
