import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatTestRoutingModule } from './chat-test-routing.module';
import { ChatTestComponent } from './chat-test.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [ChatTestComponent],
  imports: [
    CommonModule,
    ChatTestRoutingModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class ChatTestModule { }
