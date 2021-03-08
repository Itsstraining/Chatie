import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
// import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AuthGuardService } from './services/auth-guard.service'
const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'chat-socket', loadChildren: () => import('./pages/chat-socket/chat-socket.module').then(m => m.ChatSocketModule),
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'chat-page', component: ChatPageComponent, loadChildren: () => import('./pages/chat-page/chat-page.module').then(m => m.ChatPageModule),
  //   canActivate: [AuthGuardService]
  // },
  {
    path: 'chat-test', loadChildren: () => import('./pages/chat-test/chat-test.module').then(m => m.ChatTestModule),
    // canActivate: [AuthGuardService]
  },
  { path: 'chat-signup', loadChildren: () => import('./pages/chat-signup/chat-signup.module').then(m => m.ChatSignupModule) },
  { path: 'uploadfire', loadChildren: () => import('./pages/uploadfire/uploadfire.module').then(m => m.UploadfireModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
