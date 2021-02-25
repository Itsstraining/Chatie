import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatTestComponent } from './chat-test.component';

const routes: Routes = [{ path: '', component: ChatTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatTestRoutingModule { }
