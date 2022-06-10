import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesasConfigPageRoutingModule } from './mesas-config-routing.module';

import { MesasConfigPage } from './mesas-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesasConfigPageRoutingModule
  ],
  declarations: [MesasConfigPage]
})
export class MesasConfigPageModule {}
