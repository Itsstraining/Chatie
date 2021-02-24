import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'chat-page', loadChildren: () => import('./pages/chat-page/chat-page.module').then(m => m.ChatPageModule) },
  
  // { path: 'dialog-settingfriend', loadChildren: () => import('./components/dialog-settingfriend/dialog-sett').then(m => m.DialogSettingfriendModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
