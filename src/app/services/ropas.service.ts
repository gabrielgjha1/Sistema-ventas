import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RopaModel } from '../models/ropa.model';
import { URL_SERVICIOS } from '../config/url';

@Injectable({
  providedIn: 'root'
})
export class RopasService {

  constructor(public http:HttpClient) { }

  TreaeRopa(){
    let url = URL_SERVICIOS+'/ropa';
    return this.http.get(url);
  }

  GuardarDAtos(ropa:RopaModel ){
    let url = URL_SERVICIOS+'/ropa';

    return this.http.post(url,ropa);

  }

  EliminarDatos(id:string){
    let url = URL_SERVICIOS+'/ropa/'+id;

    return this.http.delete(url)

    
  }

}
