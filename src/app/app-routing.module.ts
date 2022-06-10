import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  /*{
     path: '',
     loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },*/
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'comandas',
    loadChildren: () => import('./comandas/comandas.module').then( m => m.ComandasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mesas/:id',
    loadChildren: () => import('./mesas/mesas.module').then( m => m.MesasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'platos/:id',
    loadChildren: () => import('./platos/platos.module').then( m => m.PlatosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pedido-modal',
    loadChildren: () => import('./pedido-modal/pedido-modal.module').then( m => m.PedidoModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'platos-config',
    loadChildren: () => import('./platos-config/platos-config.module').then( m => m.PlatosConfigPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'caja',
    loadChildren: () => import('./caja/caja.module').then( m => m.CajaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mesas-config',
    loadChildren: () => import('./mesas-config/mesas-config.module').then( m => m.MesasConfigPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'platos-edicion/:id',
    loadChildren: () => import('./platos-edicion/platos-edicion.module').then( m => m.PlatosEdicionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mesas-edicion/:id',
    loadChildren: () => import('./mesas-edicion/mesas-edicion.module').then( m => m.MesasEdicionPageModule),
    canActivate: [AuthGuard]
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
