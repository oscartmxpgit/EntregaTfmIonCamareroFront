import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from '../models';
import { MesaService } from '../services/mesa.service';

@Component({
  selector: 'app-mesas-config',
  templateUrl: './mesas-config.page.html',
  styleUrls: ['./mesas-config.page.scss'],
})
export class MesasConfigPage implements OnInit {
  mesas: Mesa[] = [];
  constructor(private mesaService: MesaService, private router: Router,) { }

  ngOnInit() {
    this.mesaService.getMesas().subscribe(result=>{
      this.mesas=result;
    });
  }

  ionViewDidEnter(){
    this.mesaService.getMesas().subscribe(result=>{
      this.mesas=result;
    });
  }

  crearMesa() {
    this.router.navigate(['mesas-edicion/', -1]);
  }

  editarMesa(id: number) {
     this.router.navigate(['mesas-edicion/', id]);
  }

  eliminarMesa(Mesa: Mesa) {
    this.mesaService.deleteMesa(Mesa.idMesa).subscribe(result=>{
      this.mesaService.getMesas().subscribe(result=>{
        this.mesas=result;
      });
    }
    );

  }

  EstadoComanda(num) {
    switch (num) {
      case 1:
        return "Tomando pedido";
      case 2:
        return "En preparación";
      case 3:
        return "Pendiente de pago";
      case 4:
        return "Cobrado";
    }
  }

}
