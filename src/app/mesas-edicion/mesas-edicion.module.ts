import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesasEdicionPageRoutingModule } from './mesas-edicion-routing.module';

import { MesasEdicionPage } from './mesas-edicion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MesasEdicionPageRoutingModule
  ],
  declarations: [MesasEdicionPage]
})
export class MesasEdicionPageModule {}
