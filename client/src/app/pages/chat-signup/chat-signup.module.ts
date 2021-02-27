import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatSignupRoutingModule } from './chat-signup-routing.module';
import { ChatSignupComponent } from './chat-signup.component';


@NgModule({
  declarations: [ChatSignupComponent],
  imports: [
    CommonModule,
    ChatSignupRoutingModule
  ]
})
export class ChatSignupModule { }
