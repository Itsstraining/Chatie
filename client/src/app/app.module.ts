import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

//ANGULAR MATERIAL import
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogSettingfriendComponent } from './components/dialog-settingfriend/dialog-settingfriend.component';
import { DialogSettingComponent } from './components/dialog-setting/dialog-setting.component';
import { DialogNotificationComponent } from './components/dialog-notification/dialog-notification.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogUnfriendComponent } from './components/dialog-unfriend/dialog-unfriend.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
<<<<<<< HEAD
import { ReceivedMsgComponent } from './components/received-msg/received-msg.component';
=======
>>>>>>> 6834d63e9d210cadca1659746620d4fcb363389d

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DialogSettingfriendComponent,
    DialogSettingComponent,
    DialogNotificationComponent,
    DialogUnfriendComponent,
<<<<<<< HEAD
    ReceivedMsgComponent,
=======
>>>>>>> 6834d63e9d210cadca1659746620d4fcb363389d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatDialogModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
