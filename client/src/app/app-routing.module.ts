import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
<<<<<<< HEAD
=======
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
>>>>>>> 98943724cf92f84a18103a530603120ac88a6eca
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
const routes: Routes = [{ path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) },
<<<<<<< HEAD
{
  path: 'chat-socket', loadChildren: () => import('./pages/chat-socket/chat-socket.module').then(m => m.ChatSocketModule),
  canActivate: [AuthGuard]
},
{
  path: 'chat-page', component: ChatPageComponent, loadChildren: () => import('./pages/chat-page/chat-page.module').then(m => m.ChatPageModule),
  canActivate: [AuthGuard]
},
{
  path: 'chat-test', loadChildren: () => import('./pages/chat-test/chat-test.module').then(m => m.ChatTestModule),
  canActivate: [AuthGuard]
},
{ path: 'chat-signup', loadChildren: () => import('./pages/chat-signup/chat-signup.module').then(m => m.ChatSignupModule)}];
=======
{ path: 'chat-socket', loadChildren: () => import('./pages/chat-socket/chat-socket.module').then(m => m.ChatSocketModule) },
<<<<<<< HEAD
{ path: 'chat-page',  loadChildren: () => import('./pages/chat-page/chat-page.module').then(m => m.ChatPageModule) },
=======
{ path: 'chat-page', loadChildren: () => import('./pages/chat-page/chat-page.module').then(m => m.ChatPageModule) },
>>>>>>> 98943724cf92f84a18103a530603120ac88a6eca
{ path: 'chat-test', loadChildren: () => import('./pages/chat-test/chat-test.module').then(m => m.ChatTestModule) },
{ path: 'chat-signup', loadChildren: () => import('./pages/chat-signup/chat-signup.module').then(m => m.ChatSignupModule) }];
>>>>>>> d1afa90385d98bd76feff9b19d493a82dc0f7614

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
