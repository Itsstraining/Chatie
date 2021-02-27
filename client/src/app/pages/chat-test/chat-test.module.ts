import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatTestRoutingModule } from './chat-test-routing.module';
import { ChatTestComponent } from './chat-test.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ChatTestComponent],
  imports: [
    CommonModule,
    ChatTestRoutingModule,
    MatButtonModule ,
    MatIconModule
  ]
})
export class ChatTestModule { }
