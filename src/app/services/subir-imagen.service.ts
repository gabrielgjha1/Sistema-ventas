import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {

  constructor(public http:HttpClient) { }

  SubirArchivo(archivo:File,tipo:string,id:string){
    console.log(archivo.name)
    return new Promise((resolve,rejects)=>{

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('img',archivo,archivo.name);
      xhr.onreadystatechange= function(){
        
        if (xhr.readyState===4){
          if (xhr.status === 200){
            console.log('imagen subida');
            resolve(JSON.parse( xhr.response));
          }
          else {
            console.log('fallo la subida');
            rejects(xhr.response);
          }
        }
  
      };
      console.log(tipo);  
      let url = URL_SERVICIOS + '/upload/'+tipo+'/'+id;
      console.log(url);
      
      xhr.open('PUT',url,true);
      xhr.send(formData);
  
      });

  }


}
