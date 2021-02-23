import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
<<<<<<< HEAD
=======
import { MatButtonModule } from '@angular/material/button';
>>>>>>> d8d5073cf0ea1580963558342c2bc91efed5647d


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
<<<<<<< HEAD
    HomePageRoutingModule
=======
    HomePageRoutingModule,
    MatButtonModule
>>>>>>> d8d5073cf0ea1580963558342c2bc91efed5647d
  ]
})
export class HomePageModule { }
