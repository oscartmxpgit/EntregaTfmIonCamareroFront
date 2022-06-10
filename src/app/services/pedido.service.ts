import { Injectable, NgZone } from '@angular/core';
import { element } from 'protractor';
// import { pedidoService, Plato } from './pedido.service';
import { BehaviorSubject } from 'rxjs';
import { Mesa, Pedido, Plato } from '../models';
import { MesaService } from './mesa.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  constructor(private mesaService: MesaService,
    private storageService: StorageService) { }

  addPedido(mesa:Mesa, pedido: Pedido) {
    let added = false;
    // tslint:disable-next-line:prefer-const
    if (mesa.pedidos==null){
      mesa.pedidos=[];
    }
    for (let p of mesa.pedidos) {
      if (p.idPlato === pedido.idPlato) {
        p.cantidad = +p.cantidad + 1;
        added = true;
        break;
      }
    }
    if (!added) {
      pedido.cantidad=1;
      mesa.pedidos.push(pedido);

    }
    //this.mesaService.editarMesa(mesa);
  }

  storeMesaPedido(mesa:Mesa){
    this.storageService.set(`ecarta_app_pedido_mesa${mesa.idMesa}`, mesa.pedidos);
  }

  async getStoredMesaPedido(idMesa:number):Promise<Pedido[]>  {
    return await this.storageService.get(`ecarta_app_pedido_mesa${idMesa}`) as Pedido[];
  }

  decreasePlato(mesa:Mesa, plato: Plato){
    for (const [index, p] of mesa.pedidos.entries()) {
      if (p.idPlato === plato.idPlato) {
        p.cantidad -= 1;
        if (p.cantidad === 0) {
          mesa.pedidos.splice(index, 1);
        }
      }
    }
  }

  removePlato(mesa:Mesa, Plato: Plato) {
    for (const [index, p] of mesa.pedidos.entries()) {
      if (p.idPlato === Plato.idPlato) {
        mesa.pedidos.splice(index, 1);
      }
    }
  }

  editarPlato(mesa:Mesa, Plato: Plato) {
    for (const [index, p] of mesa.pedidos.entries()) {
      if (p.idPlato === Plato.idPlato) {
        mesa.pedidos.splice(index, 1);
        mesa.pedidos.push(Plato);
      }
    }
  }

}




