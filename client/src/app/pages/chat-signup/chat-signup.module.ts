import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSignupRoutingModule } from './chat-signup-routing.module';
import { ChatSignupComponent } from './chat-signup.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ChatSignupComponent],
  imports: [
    CommonModule,
    ChatSignupRoutingModule,
    MatButtonModule
  ]
})
export class ChatSignupModule { }
