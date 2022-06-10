import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mesa, Plato } from '../models';
import { PedidoService } from '../services/pedido.service';
import { PlatoService } from '../services/plato.service';

@Component({
  selector: 'app-platos-config',
  templateUrl: './platos-config.page.html',
  styleUrls: ['./platos-config.page.scss'],
})
export class PlatosConfigPage implements OnInit {
  platos:Plato[] =[];

  constructor(
    private pedidoService: PedidoService,
    private platoService: PlatoService,
    private navCtrl: NavController,
    private router: Router,) { }

  crearPlato(){
    this.router.navigate(['platos-edicion/', -1]);
  }

  editarPlato(idPlato){
    this.router.navigate(['platos-edicion/', idPlato]);
  }

  eliminarPlato(Plato: Plato) {
    this.platoService.deletePlato(Plato.idPlato).subscribe();
    this.platoService.getPlatos().subscribe(result=>{
      this.platos=result;
    });
  }

  ngOnInit() {
    this.platoService.getPlatos().subscribe(result=>{
      this.platos=result;
    });
  }

  ionViewDidEnter(){
    this.platoService.getPlatos().subscribe(result=>{
      this.platos=result;
    });
  }

}
