import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatButtonModule,
    FormsModule
   
  ]
})
export class HomePageModule { }
