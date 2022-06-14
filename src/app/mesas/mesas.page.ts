import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonRadioGroup, ModalController } from '@ionic/angular';
import { Mesa, Pedido, Plato } from '../models';
import { PedidoService } from '../services/pedido.service';
import { MesaService } from '../services/mesa.service';
import { StorageService } from '../services/storage.service';
import { BehaviorSubject } from 'rxjs';
import { PedidoModalPageModule } from '../pedido-modal/pedido-modal.module';
import { CajaService } from '../services/caja.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {
  mesa: Mesa;
  estadoPedido: number;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  @ViewChild('radioGroup') radioGroup: IonRadioGroup;

  form: FormGroup;
  pedidos: Pedido[]=[];
  constructor(private pedidoService: PedidoService, private alertController: AlertController, private fb: FormBuilder, private cajaService: CajaService, private modalCtrl: ModalController, private router: Router, private route: ActivatedRoute, protected storage: StorageService, private mesaService: MesaService) {
    this.route.params.subscribe((params) => {
      var mesaId=params['id'] as number;
      mesaService.getMesa(mesaId).subscribe(result=>{
            this.mesa=result;
            pedidoService.getStoredMesaPedido(this.mesa.idMesa).then(
              (data)=>{
                this.mesa.pedidos=data;
                this.pedidos=data;
              }
            );
            this.estadoPedido=this.mesa.estadoPedido;
            this.pedidos=this.mesa?.pedidos;
            this.estadoPedido=this.mesa?.estadoPedido;
      })
    });
  }

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 1,
      text: 'Tomando pedido',
      disabled: false,
      color: 'primary'
    },
    {
      id: '2',
      name: 'radio_list',
      value: 2,
      text: 'En preparación',
      disabled: false,
      color: 'danger'
    },
    {
      id: '3',
      name: 'radio_list',
      value: 3,
      text: 'Pendiente de pago',
      disabled: false,
      color: 'secondary'
    }, {
      id: '4',
      name: 'radio_list',
      value: 4,
      text: 'Cobrado',
      disabled: false,
      color: 'primary'
    },
  ];

  defaultSelectedRadio = "radio2_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;

  radioGroupChange(event) {
      this.selectedRadioGroup = event.detail;
      this.mesa.estadoPedido=this.selectedRadioGroup.value;
      this.estadoPedido=this.selectedRadioGroup.value;
      this.mesaService.putMesa(this.mesa, this.mesa.idMesa).subscribe();
  }

  radioSelect(event) {
    this.selectedRadioItem = event.detail;
  }

  async ngOnInit() {
    this.form = this.fb.group({
      EstadoPedido: new FormControl(this.mesa?.estadoPedido,[Validators.required]),
    });
  }

  async ionViewDidEnter(){
    if (this.mesa!=undefined){
      this.pedidos=this.mesa.pedidos;
      this.estadoPedido=this.mesa.estadoPedido;
    }
    if (this.estadoPedido!=undefined){
      //this.radioGroup.value="1";
      this.radioGroup.value=this.estadoPedido.toString();
      //this.form.controls['EstadoPedido'].setValue(this.estadoPedido);
    }
    if (this.radioGroup.value=="0")
      this.radioGroup.value="1";
  }

  editarPedido() {
    this.router.navigate(['platos/' + this.mesa.idMesa]);
  }

  getTotal() {
    if (this.mesa?.pedidos!=undefined)
      return this.mesa?.pedidos.reduce((i, j) => i + j.precio * j.cantidad, 0);
    else
      return 0;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  cerrarPedido() {
    this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro que desea limpiar la caja?',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
              this.guardarListaPedido();
              this.alertController.create({
                header: 'Acción completada',
                subHeader: `El pedido ha sido cerrado. La operación se ha registrado en la caja`,
                buttons: ['OK']
              }).then(res => {
                res.present();
              });
          }
        },
        {
          text: 'Cerrar e ir a la caja',
          handler: () => {
            this.guardarListaPedido();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['caja/']);
            });
          }
        },
        {
          text: 'Cancelar',
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

  guardarListaPedido(){
    if (this.mesa.pedidos==undefined)
    {
      this.mesa.pedidos=[];
    }
    this.mesa.pedidos.forEach(p => {
      //var opCaja={operacion:p.nombre, importe:p.precio, cantidad:p.cantidad};
      var now=new Date().toISOString();
      var opCaja={operacion:"Plato pagado",
        producto:p.plato,
        importe:p.precio,
        cantidad:p.cantidad,
        fechaHora:now,
        tipo:"Incremento",
        estado:"Pendiente", //Pendiente, Validado, Cancelado
        idNegocio:this.mesaService.getStoredNegocioId()};
      this.cajaService.postCaja(opCaja).subscribe(
        (response) => {
          //console.log("response: " +  JSON.stringify(response));
        },
        (errorResponse) => {
          console.log("error: " +  JSON.stringify(errorResponse));
        })
    });

    delete this.mesa.pedidos;
    delete this.mesa.idNegocio;
    delete this.mesa.comentario;
    this.mesa.estadoPedido=0;
    this.pedidos=[];
    this.mesa.pedidos=[];
    this.pedidoService.storeMesaPedido(this.mesa);

    this.radioGroup.value="0";

  }

  irAtras() {
    this.router.navigate(['comandas']);
  }

}
