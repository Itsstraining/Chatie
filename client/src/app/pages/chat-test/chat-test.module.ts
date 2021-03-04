import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatTestRoutingModule } from './chat-test-routing.module';
import { ChatTestComponent } from './chat-test.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';




@NgModule({
  declarations: [ChatTestComponent],
  imports: [
    CommonModule,
    ChatTestRoutingModule,
    MatToolbarModule,
    MatIconModule,
    PickerModule,
    FormsModule,
    MatAutocompleteModule
    
  ],
  providers: [],
  bootstrap: [ChatTestComponent]
})
export class ChatTestModule { 
  
}

