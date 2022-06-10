import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plato } from '../models';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'platos';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  constructor(private storageService: StorageService, private http : HttpClient,) { }

  data: Plato[] = [];
  baseURL = `${environment.apiUrl}api/platos`;

  postPlato(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getPlatos(){
    return this.http.get<any>(`${this.baseURL}`);
  }


  putPlato(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);

  }

  deletePlato(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}

