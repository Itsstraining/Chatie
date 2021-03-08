import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadfireRoutingModule } from './uploadfire-routing.module';
import { UploadfireComponent } from './uploadfire.component';
import { environment } from "../../../environments/environment";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from "@angular/fire/storage";

@NgModule({
  declarations: [UploadfireComponent],
  imports: [
    CommonModule,
    UploadfireRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class UploadfireModule { }
