import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSocketComponent } from './chat-socket.component';

const routes: Routes = [{ path: '', component: ChatSocketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatSocketRoutingModule { }
