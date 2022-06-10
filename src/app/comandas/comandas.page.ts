import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plato } from '../models';
import { MesaService } from '../services/mesa.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage implements OnInit {
  mesas = [];


  constructor(private pedidoService: PedidoService, private router: Router, private mesaService: MesaService) {

  }
  ngOnInit() {

  }

  ionViewDidEnter() {
    this.mesaService.getMesas().subscribe(result=>{
      this.mesas=result;
    });
  }

  abrirMesa(idMesa: number) {
    this.router.navigate(['mesas/' + idMesa]);
  }

  estadoPedido(estadoPedido){
    var estado="No definido";
    switch(estadoPedido) {
      case "1":
         estado="Tomando pedido";
         break;
      case "2":
        estado= "En preparación"
        break;
      case "3":
        estado= "Pendiente de pago"
        break;
      case "4":
        estado= "Cobrado"
        break;
    }
    return estado;
  }


}
