import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { MesasPageRoutingModule } from './mesas-routing.module';

import { MesasPage } from './mesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MesasPageRoutingModule
  ],
  declarations: [MesasPage]
})
export class MesasPageModule {}
