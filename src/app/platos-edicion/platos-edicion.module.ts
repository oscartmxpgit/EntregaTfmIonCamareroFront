import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatosEdicionPageRoutingModule } from './platos-edicion-routing.module';

import { PlatosEdicionPage } from './platos-edicion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlatosEdicionPageRoutingModule
  ],
  declarations: [PlatosEdicionPage]
})
export class PlatosEdicionPageModule {}
