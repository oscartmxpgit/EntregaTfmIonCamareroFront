import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesasConfigPage } from './mesas-config.page';

const routes: Routes = [
  {
    path: '',
    component: MesasConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesasConfigPageRoutingModule {}
