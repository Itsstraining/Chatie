import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//ANGULAR MATERIAL import

import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogSettingfriendComponent } from './components/dialog-settingfriend/dialog-settingfriend.component';
import { DialogSettingComponent } from './components/dialog-setting/dialog-setting.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogUnfriendComponent } from './components/dialog-unfriend/dialog-unfriend.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';


import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { DialogBlockComponent } from './components/dialog-block/dialog-block.component';
import { DialogSettingprofileComponent } from './components/dialog-settingprofile/dialog-settingprofile.component';
import { FindComponent } from './components/find/find.component';
import { LoginService } from './services/login.service';
import { PushnotifyingComponent } from './components/pushnotifying/pushnotifying.component';

import { NotiComponent } from './components/noti/noti.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OptionComponent } from './components/option/option.component';
import { NgAudioRecorderModule } from 'ng-audio-recorder';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DialogSettingfriendComponent,
    DialogSettingComponent,
    DialogUnfriendComponent,
    DialogBlockComponent,
    DialogSettingprofileComponent,
    FindComponent,
    PushnotifyingComponent,
    NotiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    
    NgAudioRecorderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LoginService],
  bootstrap: [AppComponent]


})
export class AppModule { }
