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
import {MatTooltipModule} from '@angular/material/tooltip';

import { ChatRecentComponent } from '../../components/chat-recent/chat-recent.component';
import { SendermessageComponent } from '../../components/sendermessage/sendermessage.component';
import { ReceivermessageComponent } from '../../components/receivermessage/receivermessage.component';
<<<<<<< HEAD
=======
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
>>>>>>> 5c9b9b1943d8c5afc0f5f49f30789bb8e666e09b


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
<<<<<<< HEAD
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,

    MatToolbarModule,
    MatSlideToggleModule,
=======
    HttpClientModule,
    CommonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
>>>>>>> 5c9b9b1943d8c5afc0f5f49f30789bb8e666e09b
  ]
})
export class ChatSocketModule { }
