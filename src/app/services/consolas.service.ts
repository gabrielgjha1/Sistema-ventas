import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url';
import { ConsolaModel } from '../models/consola.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConsolasService {

  constructor(private http:HttpClient) { }

  TraerConsolas(){

    let url = URL_SERVICIOS+'/consolas';

    return this.http.get(url)

  }
  
  ComparConsolas(id:string,stock:number){

    let url = URL_SERVICIOS+'/consolas/'+id+'/'+stock;
    
    return this.http.put(url,{stock:stock}).pipe(

      map ((resp:any)=>{

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

  GuardarDatos( consolas:ConsolaModel ){

    let url = URL_SERVICIOS+'/consolas';

      return this.http.post(url,consolas);

  }

  EliminarDatos(id:string){
    let url = URL_SERVICIOS+'/consolas/'+id;

    return this.http.delete(url)
    
  }
  
  EditarDatos(id:string,consolas:ConsolaModel){

    let url = URL_SERVICIOS+'/consolas/'+id;
    
    return this.http.put(url,consolas);

  }



}
