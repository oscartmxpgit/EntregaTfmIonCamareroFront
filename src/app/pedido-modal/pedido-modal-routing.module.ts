import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoModalPage } from './pedido-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoModalPageRoutingModule {}
