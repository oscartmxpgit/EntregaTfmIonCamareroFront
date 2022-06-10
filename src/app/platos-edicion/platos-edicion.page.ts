import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Plato } from '../models';
import { PedidoService } from '../services/pedido.service';
import { PlatoService } from '../services/plato.service';

@Component({
  selector: 'app-platos-edicion',
  templateUrl: './platos-edicion.page.html',
  styleUrls: ['./platos-edicion.page.scss'],
})
export class PlatosEdicionPage implements OnInit {

  plato: Plato;
  tipoPlato:any;
  selectedRadioItem: any;
  selectedRadioGroup: any;
  formData: FormGroup;
  headerMsg="";
  editionMode=false;

  constructor(
    private navCtrl: NavController,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private platoService: PlatoService) {
    this.route.params.subscribe((params) => {
      if (params['id'] as number !=-1){
        this.headerMsg="Editar plato";
        this.editionMode=true;
        platoService.getPlatos().subscribe(result=>{
          result.forEach(plato => {
            if (plato.idPlato == params['id'] as number) {
              this.plato = plato;
              this.formData = this.builder.group({
                Nombre: new FormControl(this.plato?.nombre, [Validators.required, Validators.minLength(3),Validators.maxLength(30), ]),
                Precio: new FormControl(this.plato?.precio, [Validators.compose([Validators.required,Validators.pattern('^(([0-9]*)|(([0-9]*)\.([0-9]*)))$'),])]),
                Cantidad: new FormControl(this.plato?.stock, [Validators.required,Validators.pattern('^(0|[0-9]*)$'),]),
                RadioGroup: new FormControl(this.plato?.tipo, [Validators.required])
              })
            }
          })
      })
    }
      else{
        this.headerMsg="Nuevo plato";
          this.plato={
            nombre:"",
            precio:0,
            stock:0,
          };
      }
    });
  }


  get errorControl() {
    return this.formData.controls;
  }

  onSubmit() {
    if (!this.formData.valid) {
      console.log('Faltan valores!' + this.formData.value)
      return false;
    } else {
      this.plato.nombre=this.formData.controls.Nombre.value;
      this.plato.precio=this.formData.controls.Precio.value;
      this.plato.stock=this.formData.controls.Cantidad.value;
      this.plato.tipo=this.formData.controls.RadioGroup.value;

      if (this.editionMode){
        this.platoService.putPlato(this.plato, this.plato.idPlato).subscribe();
      }
      else{
        this.platoService.postPlato(this.plato).subscribe();
      }

      this.navCtrl.back();
    }

  }

  radioGroupChange(event) {
    this.selectedRadioGroup = event.detail;
    this.plato.tipo=this.selectedRadioGroup.value;

  }

  radioSelect(event) {
    this.selectedRadioItem = event.detail;
  }

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 1,
      text: 'comida',
      disabled: false,
      checked: true,
      color: 'primary'
    },
    {
      id: '2',
      name: 'radio_list',
      value: 2,
      text: 'bebida',
      disabled: false,
      checked: false,
      color: 'secondary'
    },
  ];


  ngOnInit() {
    if (this.editionMode){
      this.formData = this.builder.group({
        Nombre: new FormControl(this.plato?.nombre, [Validators.required, Validators.minLength(3),Validators.maxLength(30), ]),
        Precio: new FormControl(this.plato?.precio, [Validators.compose([Validators.required,Validators.pattern('^(([0-9]*)|(([0-9]*)\.([0-9]*)))$'),])]),
        Cantidad: new FormControl(this.plato?.stock, [Validators.required,Validators.pattern('^(0|[0-9]*)$'),]),
        RadioGroup: new FormControl(this.plato?.tipo, [Validators.required])
      })
    }
    else{
      this.formData = this.builder.group({
        Nombre: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30), ]),
        Precio: new FormControl('', [Validators.compose([Validators.required,Validators.pattern('^(([0-9]*)|(([0-9]*)\.([0-9]*)))$'),])]),
        Cantidad: new FormControl('', [Validators.required,Validators.pattern('^(0|[0-9]*)$'),]),
        RadioGroup: new FormControl('', [Validators.required])
      })
    }
  }

  irAtras(){
    this.navCtrl.back();
  }

}
