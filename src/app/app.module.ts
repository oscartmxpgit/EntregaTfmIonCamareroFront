import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {IonicStorageModule} from '@ionic/storage-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmpleadoService } from './services/empleado.service';
import { PedidoModalPage } from './pedido-modal/pedido-modal.page';
import { PedidoModalPageModule } from './pedido-modal/pedido-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [AppComponent, ],
  entryComponents: [],
  imports: [ BrowserModule, FormsModule, IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),
    ],

  providers: [SocialSharing,
    EmailComposer, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
