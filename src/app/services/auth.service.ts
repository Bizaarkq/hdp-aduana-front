import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { endpoints } from './endpoints';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  iniciarSesion(user: string, pass: string) {
    const headers = new HttpHeaders({
      'content-Type': 'application/x-www-form-urlencoded',
    });

    const loginForm = new HttpParams({
      fromObject: {
        username: user,
        password: pass
      },
    });

    return this.http
      .post(endpoints.auth.login, loginForm, { headers })
      .pipe(
        map((results: any) => {
          console.log(results);
          return results;
        })
      );
  }

  getUserInfo(){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    
    return this.http
      .get(endpoints.auth.infoUser, {headers})
      .pipe(
        map((results: any) => {
          return results;
        }), catchError((error: HttpErrorResponse)=>{
          throw new Error(error.error.message);
        })
      )
  }

  getArchivos(){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.archivo.getAllArchivos;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getArchivo(registro:string){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.archivo.crudArchivo + registro;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  aprobarArchivo(id: any){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.archivo.aprobarArchivo + id;
    return this.http.post(url, null , {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  eliminarArchivo(id: any){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.archivo.crudArchivo + id;
    return this.http.delete(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  crearArchivo(archivo: any){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.archivo.guardarArchivo;
    return this.http.post(url, archivo, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  updateArchivo(archivo: any){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.archivo.crudArchivo + archivo.numero_registro;
    return this.http.put(url, archivo, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getAduanas(){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.catalogo.getAllAduanas;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getDepartamentos(){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.catalogo.getDepartamentos;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }

  getMunicipios(departamento: string){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });

    let url = endpoints.catalogo.getMunicipios + departamento;
    return this.http.get(url, {headers})
    .pipe(
      map((results: any) => {
        return results;
      })
    );
  }
}
