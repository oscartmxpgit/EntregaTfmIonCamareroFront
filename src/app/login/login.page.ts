import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from '../models';
import { AuthService } from '../services/auth.service';
import { EmpleadoService } from '../services/empleado.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.sass'],
})
export class LoginPage implements OnInit {
  error: any;
  public loginForm: FormGroup;
  public token: string;
  public empleado: Empleado;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private storage: StorageService,
    private empleadoService: EmpleadoService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'dni': ['', Validators.compose([
        Validators.required
      ])],
      'pass': ['', Validators.compose([
        Validators.required
      ])]
    });

  }
  get f() { return this.loginForm.controls; }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['comandas'])
          .then(() => {

          });
      },
      (errorResponse) => {
        this.error = errorResponse.error;
      })
  }

  ionViewDidEnter(){
    localStorage.clear();
  }

}

