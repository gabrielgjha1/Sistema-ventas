import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  Logeado:boolean;
  constructor(public _UsuarioService:UsuariosService) { 
    
   

  }




  ngOnInit(): void {

    this.Logeado = this._UsuarioService.EstaLogeado();
    console.log(this.Logeado);
  
    this.form = new FormGroup({

      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)

    });

  }


  login(){
   

    if (this.form.invalid){ return; }

    let usuario = new Usuario(

      this.form.value.email,
      this.form.value.password,

    );

      this._UsuarioService.login(usuario).subscribe(resp=>{

        this.ngOnInit();
        
        location.reload();

      });


  }


  get email() { return this.form.get('email'); }
  get pasword() { return this.form.get('pasword'); }


}
