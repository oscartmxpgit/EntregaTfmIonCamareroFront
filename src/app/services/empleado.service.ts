import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular'
import { Empleado, Mesa } from '../models';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : 'http://localhost:8100'
    })
  };

  const httpOptionsLogin = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()

export class EmpleadoService {


  private readonly HS_API_URL = 'http://localhost:16209/api';
  private token : string;
  private headers = new HttpHeaders;
  private Empleado: Empleado;

  constructor(private http: HttpClient,
    private storage: Storage) {


  }

  public dameMesas(id:string): Observable<Mesa[]>{

      return this.http.get<Mesa[]>(`${this.HS_API_URL}/Mesa/DameMesas?idEmpleadoCamarero=${id}`);
   }

  public getEmpleadoPorDNI(token:string): Observable<Empleado>{

       this.headers = new HttpHeaders ({'Authorization': token});
       console.log("headers = " + this.headers);
       return this.http.get<Empleado>(`${this.HS_API_URL}/EmpleadoCamarero`, {headers:this.headers});
   }
 }

