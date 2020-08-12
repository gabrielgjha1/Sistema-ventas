import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RouterLink, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navar',
  templateUrl: './navar.component.html',
  styleUrls: ['./navar.component.css']
})
export class NavarComponent implements OnInit {
  Logeado:boolean=false;
  usuario:Usuario;
  rol:String
  menuAdmin:any[]=[];
  mostrar:boolean=false;
  constructor( public _UsuarioService:UsuariosService,public router:Router,public _MenuService:MenuService ) { 

    }

  ngOnInit(): void {

    this.menu();
    
    this.Verificar();
  }


  menu(){
    

    console.log("this._UsuarioService.usuario.rol")
    this.rol=this._UsuarioService.rol;

    if (this.rol==='ADMIN_ROLE'){

      this.mostrar=true;

      this.menuAdmin=this._MenuService.TraerMenu();

    }else{
      this.mostrar=false;
   }

  }

  salir(){
   
    Swal.fire({
      title: 'Esta seguro que desea salir ?',
      text: "Inicia sesión despues!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir!'
    }).then((result) => {
      if (result.value) {

        this._UsuarioService.Salir();
      }
    })
  }

  Verificar(){

    this.Logeado = this._UsuarioService.EstaLogeado();

    if (this.Logeado){

      this.usuario=this._UsuarioService.usuario;
      console.log(this.usuario)

    }
  }


}
