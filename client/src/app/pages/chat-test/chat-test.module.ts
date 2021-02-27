import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatTestRoutingModule } from './chat-test-routing.module';
import { ChatTestComponent } from './chat-test.component';
<<<<<<< HEAD
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


=======
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
>>>>>>> 446db02695cb8166bb8238b17e51dc9fee50ec14

@NgModule({
  declarations: [ChatTestComponent],
  imports: [
    CommonModule,
    ChatTestRoutingModule,
<<<<<<< HEAD
    MatToolbarModule,
=======
    MatButtonModule ,
>>>>>>> 446db02695cb8166bb8238b17e51dc9fee50ec14
    MatIconModule
  ]
})
export class ChatTestModule { }
