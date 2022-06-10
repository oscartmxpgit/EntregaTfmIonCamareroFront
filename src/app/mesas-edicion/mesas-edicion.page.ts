import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mesa } from '../models';
import { MesaService } from '../services/mesa.service';

@Component({
  selector: 'app-mesas-edicion',
  templateUrl: './mesas-edicion.page.html',
  styleUrls: ['./mesas-edicion.page.scss'],
})
export class MesasEdicionPage implements OnInit {

  mesa: Mesa;
  mesas: Mesa[];
  selectedRadioItem: any;
  selectedRadioGroup: any;
  formData: FormGroup;
  editionMode=false;
  headerMsg="";
  nuevoNumMesa=0;

  constructor(private navCtrl: NavController,private builder: FormBuilder, private route: ActivatedRoute, private mesaService: MesaService) {
    this.mesaService.getMesas().subscribe(result=>{
      this.nuevoNumMesa=this.maxNumMesa(result)+1;
      this.mesas=result;
      this.route.params.subscribe((params) => {
        if (params['id'] as number !=-1){
          this.headerMsg="Editar Mesa";
          this.editionMode=true;

          this.mesas.forEach(mesa => {
            if (mesa.idMesa == params['id'] as number) {
              this.mesa = mesa;
              this.formData = this.builder.group({
                Personas: new FormControl(this.mesa?.personas, [Validators.required, Validators.pattern('^(0|[1-6])$'),]),
                Comentario: new FormControl(this.mesa?.comentario, []),
                })
            }
          })
        }
        else{
          this.headerMsg="Nueva Mesa";
          let dateTime = new Date()
            this.mesa={
              personas:4,
              comentario:"",
              noMesa:this.nuevoNumMesa,
              idNegocio:this.mesaService.getStoredNegocioId(),
              fecha:dateTime,
            };
        }
      });
      }
    )
  }

  maxNumMesa(mesas:Mesa[]):number{
    var maxNumMesa=0;
    mesas.forEach(element => {
        if (element.noMesa>maxNumMesa)
          maxNumMesa=element.noMesa;
      });
    return maxNumMesa;
  }

  get errorControl() {
    return this.formData.controls;
  }

  onSubmit() {
    if (!this.formData.valid) {
      console.log('Faltan valores!' + this.formData.value)
      return false;
    } else {
      this.mesa.personas=this.formData.controls.Personas.value;
      this.mesa.comentario=this.formData.controls.Comentario.value;

      if (this.editionMode){
        this.mesaService.putMesa(this.mesa, this.mesa.idMesa).subscribe();
      }
      else{
        this.mesaService.postMesa(this.mesa).subscribe();
      }

      this.navCtrl.back();
    }
  }

  ngOnInit() {

    if (this.editionMode){
        this.formData = this.builder.group({
        Personas: new FormControl(this.mesa?.personas, [Validators.required, Validators.pattern('^(0|[1-9])$'),]),
        Comentario: new FormControl(this.mesa?.comentario, []),
        })
    }
    else{
      this.formData = this.builder.group({
        Personas: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9])$'),]),
        Comentario: new FormControl('', []),
      })
    }
  }

  irAtras(){
    this.navCtrl.back();
  }

}
