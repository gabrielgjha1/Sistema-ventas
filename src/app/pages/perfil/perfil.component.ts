import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form:FormGroup;
  constructor(public _UsuarioService:UsuariosService) {   }
  usuario:Usuario;
  datos:Usuario;
  

  emails:String;
  nombres:String
  id:String;


  formulario(){
    return new FormGroup({

      nombre:new FormControl(this.nombres,Validators.required),
      rol:new FormControl(null,Validators.required),
      email:new FormControl(this.emails,Validators.required)

    });
  }

  ngOnInit(): void {
    
    this.form  = this.formulario();
    this.TraerUsuarios();

   

  }

  //trae los datos de la base de datos a la tabla 
  TraerUsuarios(){
    
    this._UsuarioService.TreaerUsuarios().subscribe(resp=>{

      this.usuario= resp;
      
   
    });

  }

  //trae el dato para actualizar
  traerDatos(id:string){
    
    this._UsuarioService.TraeUnUsuario(id).subscribe((resp:any)=>{

      
      this.datos=resp;
      this.emails=this.datos.email
      this.nombres=this.datos.nombre
      this.id=id;
      this.form  = this.formulario();
    });

  }


  //actualiza los datos
  Actualizar(){
    
    
    if (this.form.valid){

      let usuario = new Usuario(this.form.value.email,undefined,this.form.value.nombre,undefined,this.form.value.rol)
     
      this._UsuarioService.ActualizarUsuarios(usuario,this.id).subscribe((resp:any)=>{


        Swal.fire(
          'Buen trabajo!',
          'Datos actualizados!',
          'success'
        )
        
        this.TraerUsuarios();

      });


    }else{ return }

  }


  EliminarUsuarios(id:string){


    Swal.fire({
      title: 'Estas seguro ?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {

      if (result.value) {

        this._UsuarioService.EliminarUsuario(id).subscribe(resp=>{
    
          Swal.fire(

            'Borrado!',
            'Se elimino la cuenta de: '+resp,
            'success'

          )
          this.TraerUsuarios();
        })

      }

    });
 

  }


  get nombre() { return this.form.get('nombre'); }
  get rol() { return this.form.get('rol'); }
  get email() { return this.form.get('email'); }

}
