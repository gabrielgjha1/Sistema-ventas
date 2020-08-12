import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZapatosModel } from '../models/zapatos.model';
import { URL_SERVICIOS } from '../config/url';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ZapatosService {
  
  
  constructor( private http:HttpClient) { }

  TraerZapatos(){
    let url = URL_SERVICIOS+'/zapatos';
    return this.http.get(url);
  }

  GuardarZapatos( zapatos:ZapatosModel ){
    
    let url = URL_SERVICIOS+'/zapatos';
   
    return this.http.post(url,zapatos);


  }

  ComprarZapatos(id:string,stock:number){

    let url = URL_SERVICIOS+'/zapatos/'+id+'/'+stock;

    return this.http.put(url,{stock:stock}).pipe(

      map((resp:any)=>{

        return resp

      }),
      
      catchError(err=>{

        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.mensaje,
          
        })

        return throwError(err);
      })

    )

  }

  EliminarDatos(id:string){
    let url = URL_SERVICIOS+'/zapatos/'+id;

    return this.http.delete(url)
    
  }

  EditarDatos(id:string,zapatos:ZapatosModel){

    let url = URL_SERVICIOS+'/zapatos/'+id;

    return this.http.put(url,zapatos);

  }



}
