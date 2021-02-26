import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatPageRoutingModule } from './chat-page-routing.module';
import { ChatPageComponent } from './chat-page.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar'
import { from } from 'rxjs';
@NgModule({
  declarations: [ChatPageComponent],
  imports: [
    CommonModule,
    ChatPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule
  ]
})
export class ChatPageModule { }
