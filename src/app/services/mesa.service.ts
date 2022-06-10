import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mesa } from '../models';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'mesas';

@Injectable({
  providedIn: 'root'
})

export class MesaService {
  constructor(private http : HttpClient, private storageService: StorageService) { }

  private readonly baseURL = `${environment.apiUrl}api/mesas`;

  postMesa(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getStoredNegocioId(){
    return localStorage.getItem('ecarta_app_idNegocio');
  }

  getMesas(){
    var negocioId= this.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  getMesa(mesaId: number){
    return this.http.get<any>(`${this.baseURL}/${mesaId}`);
  }

  putMesa(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteMesa(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
