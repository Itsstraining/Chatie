import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'chat-inbox', loadChildren: () => import('./pages/chat-inbox/chat-inbox.module').then(m => m.ChatInboxModule) }, { path: 'home-page', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
