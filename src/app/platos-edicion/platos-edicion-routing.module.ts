import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatosEdicionPage } from './platos-edicion.page';

const routes: Routes = [
  {
    path: '',
    component: PlatosEdicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatosEdicionPageRoutingModule {}
