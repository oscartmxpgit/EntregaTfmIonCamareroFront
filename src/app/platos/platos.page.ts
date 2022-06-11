import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import { Mesa, Pedido, Plato } from '../models';
import { PedidoModalPageModule } from '../pedido-modal/pedido-modal.module';
import { PedidoModalPage } from '../pedido-modal/pedido-modal.page';
import { AuthService } from '../services/auth.service';
import { MesaService } from '../services/mesa.service';
import { PlatoService } from '../services/plato.service';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.page.html',
  styleUrls: ['./platos.page.scss'],
})
export class PlatosPage implements OnInit {
  platos:Plato[] =[];
  mesa: Mesa;

  @ViewChild('botonPedido', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    private pedidoService: PedidoService,
    private platoService: PlatoService,
    private router: Router,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private mesaService: MesaService,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private renderer: Renderer2,
    private auth:AuthService,
    private navCtrl: NavController ) {
      this.route.params.subscribe((params) => {

        mesaService.getMesas().subscribe(result=>{
          result.forEach(mesa => {
            if (mesa.idMesa == params['id'] as number) {
              this.mesa = mesa;
              pedidoService.getStoredMesaPedido(mesa.idMesa).then(
                (data)=>{
                  this.mesa.pedidos=data;
                }
              );
            }
          })
        })
      });
    }

  irAtras(){
    this.navCtrl.back();
  }

  ngOnInit(): void {
    this.platoService.getPlatos().subscribe(result=>{
      this.platos=result;
    });

  }

  ionViewWillLeave(){
    //al irse de esta página, el pedido queda en preparación
    this.mesa.estadoPedido=1;
    this.pedidoService.storeMesaPedido(this.mesa);
  }

  async addToListaPedido(plato) {
    var pedido: Pedido={
      idMesa:this.mesa.idMesa,
      idEmpleado:parseInt(this.auth.getIdEmpleado()),
      precio:plato.precio,
      plato:plato.nombre,
      idPlato:plato.idPlato
    }
    this.pedidoService.addPedido(this.mesa, pedido);

    //animación del botón
    this.renderer.addClass(this.fab.nativeElement, 'bounce');
    setTimeout(() => {
      this.renderer.removeClass(this.fab.nativeElement, 'bounce');
    }, 200);

  }

  async openPedidoModal() {
    this.animateCSS('bounceOutLeft', true);
    const modal = await this.modalCtrl.create({
      component: PedidoModalPage,
      componentProps: {
        mesa: this.mesa,
      },
      cssClass: 'pedido-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, KeepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!KeepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }
}
