import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/url';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario:Usuario;
  token:string="";
  rol:String="";


  constructor(public http:HttpClient,public router:Router) { this.CargarDatos(); }

  //guarda los datos en el localstore cuando se logea
  AlmacenarDatos(token:string,usuarios:Usuario){
    
    localStorage.setItem('token',token);
    localStorage.setItem('usuario', JSON.stringify(usuarios));
    
    this.usuario = usuarios;
    this.token = token;

  }

  //carga los datos del token y el usuario cada vez que se llama el servicio
  CargarDatos(){

    if (localStorage.getItem('token')){

      console.log("s");
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.rol=this.usuario.rol;

    }else{

      this.token=""
      this.rol="USER"
    }
    console.log(this.rol)

  }

  // verifica si el usuario esta logeado
  EstaLogeado(){

    return  (this.token.length>5)? true:false

  }

  //saca a el usuario del login
  Salir(){

    localStorage.removeItem('token');
    location.reload();
  }

  //guarda los datos del usuario cuando se registra
  guardarDatos(usuario:Usuario){

    let url = URL_SERVICIOS+'/usuarios';
    console.log(url)
    return this.http.post(url,usuario).pipe(

      map((resp:any)=>{
        
        let usuario = resp.usuarios;
        return usuario;
        
      }),

      catchError(err=>{

        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.mensaje,
          
        })

        return throwError(err);
      })

    );

  }

  //login
  login(usuario:Usuario){
  
    let url = URL_SERVICIOS+'/login';
    return this.http.post(url,usuario).pipe(
      
      map((resp:any)=>{
        console.log(resp)
        let token= resp.token ;
        let usuario = resp.usuarios;
        
        this.AlmacenarDatos(token,usuario)

        

        return usuario;
        
      }),
      catchError(err=>{

        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message,
          
        })

        return throwError(err);
      })

    );

  }


  //trae todos los usuarios
  TreaerUsuarios(){

    let url = URL_SERVICIOS+'/usuarios';

    return this.http.get(url).pipe(

      map((resp:any)=>{

        return resp.usuario

      })


    )

  }


  TraeUnUsuario(id:string){

    let url = URL_SERVICIOS+'/usuarios/'+id;

    return this.http.get(url).pipe(
      map((resp:any)=>{

        return resp.usuario;
      })
    )

  }


  //actualiza los datos

  ActualizarUsuarios(usuario:Usuario,id:String){
    let url = URL_SERVICIOS+'/usuarios/'+id;

    return this.http.put(url,usuario);
    

  }

  EliminarUsuario(id:string){
    let url = URL_SERVICIOS+'/usuarios/'+id;

    return this.http.delete(url).pipe(
      map((resp:any)=>{
        return resp.usuario.nombre
      })
    )

  }


}
