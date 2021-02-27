import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSignupComponent } from './chat-signup.component';

const routes: Routes = [{ path: '', component: ChatSignupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatSignupRoutingModule { }
