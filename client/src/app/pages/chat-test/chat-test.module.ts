import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatTestRoutingModule } from './chat-test-routing.module';
import { ChatTestComponent } from './chat-test.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ChatPageComponent } from '../chat-page/chat-page.component';
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [ChatTestComponent],
  imports: [
    CommonModule,
    ChatTestRoutingModule,
    MatToolbarModule,
    MatIconModule,
    PickerModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [ChatPageComponent]
})
export class ChatTestModule { 
  
}

