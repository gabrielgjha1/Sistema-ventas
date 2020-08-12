import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  Logeado:boolean=false;
  constructor(public router:Router,public _UsuarioService:UsuariosService ) { 
    

  }


  form:FormGroup;



  
  ngOnInit(): void {
   
    this.Logeado = this._UsuarioService.EstaLogeado();
    console.log(this.Logeado);
     this.form = new FormGroup({

    nombre: new FormControl(null,Validators.required),
    direccion: new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,Validators.required),
    password2:new FormControl(null,Validators.required)


  },{validators:this.soniguales('password','password2')})

  }

  // validacion 
  soniguales(campo1:string,campo2:string){

    return(group:FormGroup)=>{

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1==pass2){
          return null;
      }

      //si la validacion no se cumple se retorna un error por eso soniguales:true, es el error
      return {
        soniguales:true
      }

    };

  }

  //registro
  prueba(){


    let usuario = new Usuario(
      this.form.value.email,
      this.form.value.password,
      this.form.value.nombre,
      this.form.value.direccion,
    );

      this._UsuarioService.guardarDatos(usuario).subscribe(resp=>{

      
      
        Swal.fire(
          'Buen trabajo!',
          'Usuario registrado!',
          'success'
        )

        this.router.navigateByUrl('/login')

      });

    console.log(usuario);

  }


  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get password2() { return this.form.get('password2'); }

}
