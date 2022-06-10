import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OperacionCaja } from '../models';
import { CajaService } from '../services/caja.service';
import { StorageService } from '../services/storage.service';

const STORAGE_KEY = 'operacionescaja';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.page.html',
  styleUrls: ['./caja.page.scss'],
})
export class CajaPage implements OnInit {
  operacionesCaja = [];


  constructor(private cajaService: CajaService, private router: Router,
    private storageService: StorageService,
    private alertController: AlertController) {
      this.cajaService.getOperacionesDia().subscribe(result=>{
        this.operacionesCaja=result;
      });
     }

  ngOnInit() {

  }

  getTotal() {
    if (this.operacionesCaja!=undefined)
      return this.operacionesCaja.reduce((i, j) => i + j.importe * j.cantidad, 0);
    else
      return 0;
  }

  ionViewDidEnter(){

  }

  limpiarCaja(){
    this.alertController.create({
      header: 'Confirm Alert',
      message: '¿Está seguro que desea limpiar la caja?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this. storageService.remove(STORAGE_KEY);
            this.cajaService.getCajas().subscribe(result=>{
              this.operacionesCaja=result;

              this.alertController.create({
                header: 'Acción completada',
                subHeader: 'La caja ha sido limpiada',
                buttons: ['OK']
              }).then(res => {
                res.present();
              });
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            this.alertController.create({
              header: 'Acción cancelada',
              subHeader: 'No se realizaron cambios',
              buttons: ['OK']
            }).then(res => {
              res.present();
            });
          }
        },
      ]
    }).then(res => {
      res.present();
    });
  }

}
