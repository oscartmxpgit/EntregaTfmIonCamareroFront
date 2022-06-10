import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pedidos', url: '/comandas', icon: 'fast-food' },
    { title: 'Mesas', url: '/mesas-config', icon: 'pizza' },
    { title: 'Carta', url: 'platos-config', icon: 'book' },
    { title: 'Caja', url: 'caja', icon: 'cash' },
    { title: 'Acerca de', url: 'contact', icon: 'share-social' },
    { title: 'Salir', url: 'login', icon: 'log-out' },
    //{ title: 'Salir', url: '', icon: 'person' },
  ];
  constructor() {}
}
