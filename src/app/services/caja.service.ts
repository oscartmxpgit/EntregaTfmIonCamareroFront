import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OperacionCaja } from '../models';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'operacionescaja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  constructor(private storageService: StorageService, private http : HttpClient,) { }

  data: OperacionCaja[] = [];

  baseURL = `${environment.apiUrl}api/OperacionesCajas`;

  postCaja(data : any){
    console.log ("data")
    console.log (data)
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getCajas(){
    return this.http.get<any>(`${this.baseURL}`);
  }

  getOperacionesDia(){
    return this.http.get<any>(`${this.baseURL}/operacionesDia`);
  }

  putCaja(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteCaja(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}

