import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) }, { path: 'chat-socket', loadChildren: () => import('./pages/chat-socket/chat-socket.module').then(m => m.ChatSocketModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
