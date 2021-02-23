import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavbarComponent } from './components/navbar/navbar.component';
<<<<<<< HEAD
=======
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
>>>>>>> d8d5073cf0ea1580963558342c2bc91efed5647d
import { FooterComponent } from './components/footer/footer.component';
import { DialogSettingfriendComponent } from './components/dialog-settingfriend/dialog-settingfriend.component';
import { DialogSettingComponent } from './components/dialog-setting/dialog-setting.component';
import { DialogNotificationComponent } from './components/dialog-notification/dialog-notification.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogUnfriendComponent } from './components/dialog-unfriend/dialog-unfriend.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DialogSettingfriendComponent,
    DialogSettingComponent,
    DialogNotificationComponent,
    DialogUnfriendComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
