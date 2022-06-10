import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatosConfigPageRoutingModule } from './platos-config-routing.module';

import { PlatosConfigPage } from './platos-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatosConfigPageRoutingModule
  ],
  declarations: [PlatosConfigPage]
})
export class PlatosConfigPageModule {}
