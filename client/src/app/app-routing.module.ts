import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD
const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) },
  
  // { path: 'dialog-settingfriend', loadChildren: () => import('./components/dialog-settingfriend/dialog-sett').then(m => m.DialogSettingfriendModule) }
];
=======
const routes: Routes = [{ path: '', loadChildren: () => import('../../src/app/components/home-page/home-page.module').then(m => m.HomePageModule) }];
>>>>>>> d8d5073cf0ea1580963558342c2bc91efed5647d

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
