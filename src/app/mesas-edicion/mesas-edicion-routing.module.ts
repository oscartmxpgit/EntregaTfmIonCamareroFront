import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesasEdicionPage } from './mesas-edicion.page';

const routes: Routes = [
  {
    path: '',
    component: MesasEdicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesasEdicionPageRoutingModule {}
