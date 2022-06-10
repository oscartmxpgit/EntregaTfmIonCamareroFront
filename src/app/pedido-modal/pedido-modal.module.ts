import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoModalPageRoutingModule } from './pedido-modal-routing.module';

import { PedidoModalPage } from './pedido-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoModalPageRoutingModule
  ],
  declarations: [PedidoModalPage]
})
export class PedidoModalPageModule {}
