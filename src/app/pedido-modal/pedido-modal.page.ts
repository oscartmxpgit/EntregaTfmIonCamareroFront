import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Mesa, Pedido, Plato } from '../models';
import { PedidoService } from '../services/pedido.service';
import { MesaService } from '../services/mesa.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pedido-modal',
  templateUrl: './pedido-modal.page.html',
  styleUrls: ['./pedido-modal.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PedidoModalPage implements OnInit {
  mesa: Mesa;
  pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    protected storage: StorageService,
    private mesaService: MesaService) {
      this.route.params.subscribe((params) => {
        mesaService.getMesas().subscribe(result=>{
          result.forEach(mesa => {
            if (mesa.idMesa == params['id'] as number) {
              this.mesa = mesa;
            }
          })
        })
      });
    }

    // ionViewWillLeave(){
    //   this.mesaService.editarMesa(this.mesa);
    // }

  cargarPedido(){
    if (this.mesa!=undefined && this.mesa.pedidos != undefined)
      this.pedidos=this.mesa.pedidos;
  }


  ngOnInit() {
    this.cargarPedido();
  }

  ionViewDidEnter(){
    this.cargarPedido();
  }

  anyadirPlato(id: number) {

    this.router.navigate(['pedido/' + id]);
  }

  decreaseItem(plato) {
    this.pedidoService.decreasePlato(this.mesa, plato);
    this.cargarPedido();
  }

  increaseItem(plato) {
    this.pedidoService.addPedido(this.mesa, plato);
    this.cargarPedido();
  }

   removeItem(plato) {
     this.pedidoService.removePlato(this.mesa, plato);
     this.cargarPedido();
    //window.location.assign('/');
  }

  getTotal() {
    return this.pedidos.reduce((i, j) => i + j.precio * j.cantidad, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  cerrar() {

    this.modalCtrl.dismiss();
  }


  irAtras() {
    this.router.navigate(['comandas']);
  }

  editarMesa() {

  }

  eliminarMesa() {

  }

}
