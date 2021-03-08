import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadfireComponent } from './uploadfire.component';

const routes: Routes = [{ path: '', component: UploadfireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadfireRoutingModule { }
