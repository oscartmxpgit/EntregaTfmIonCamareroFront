import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import 'rxjs/Rx';
import { environment } from 'src/environments/environment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}api/Autenticacion`;
  private readonly apiEmpleado = `${environment.apiUrl}api/Empleados/Dni`;

  private decodedToken;

  constructor(private http: HttpClient) {

    this.decodedToken = JSON.parse(localStorage.getItem('ecarta_app_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('ecarta_app_auth', token);
    localStorage.setItem('ecarta_app_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  // public register(userData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register/`, userData);
  // }

  public login(userData: any): Observable<any> {
    let postData = {username : userData.dni ,password :userData.pass};

    return this.http.post(`${this.apiUrl}/EmpleadoLogin`, postData).pipe(map(
      (response: any) => {
        if (response) {
          this.saveToken(response.accessToken);
          this.storeIdEmpleado(userData.dni);
        }
      }));
  }

  public storeIdEmpleado(dniEmpleado:string){
    this.http.get<any>(`${this.apiEmpleado}/${dniEmpleado}`).subscribe(data => {
      localStorage.setItem('ecarta_app_idEmpleado', data.idEmpleado);
      localStorage.setItem('ecarta_app_idNegocio', data.idNegocio);
    });
  }

  public getIdEmpleado(){
    return  localStorage.getItem('ecarta_app_idEmpleado');

  }

  // public logout() {
  //   localStorage.removeItem('ecarta_app_auth');
  //   localStorage.removeItem('ecarta_app_meta');
  //   localStorage.removeItem('ecarta_app_idNegocio');
  //   this.decodedToken = new DecodedToken();
  // }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('ecarta_app_auth');
  }

  public getUsername(): string {
    return this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

}
