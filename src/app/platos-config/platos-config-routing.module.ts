import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatosConfigPage } from './platos-config.page';

const routes: Routes = [
  {
    path: '',
    component: PlatosConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatosConfigPageRoutingModule {}
