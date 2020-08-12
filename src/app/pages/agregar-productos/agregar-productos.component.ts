import { Component, OnInit } from '@angular/core';
import { ZapatosModel } from 'src/app/models/zapatos.model';
import { ZapatosService } from 'src/app/services/zapatos.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ConsolasService } from 'src/app/services/consolas.service';
import { ConsolaModel } from 'src/app/models/consola.model';
import { RopaModel } from 'src/app/models/ropa.model';
import { RopasService } from 'src/app/services/ropas.service';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';
@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {

  ropa:boolean=false;
  zapatos:boolean=false;
  consolas:boolean=false;
  SegundoFormulario:boolean=false;

  tipo:string="";
  id:string=""

  Imagen:File;

  constructor(public _ZapatoService:ZapatosService,public _ConsolasService:ConsolasService,public  _ropaService:RopasService,
              public _SubirImagenService:SubirImagenService) { }

  ngOnInit(): void {
  }

  Verificar(f:NgForm){
    this.tipo=f.value.producto;
    var codigo = this.GenerarCodigo();
    

    if (f.value.producto==="zapatos"){
       
        codigo = 'ZAP'+codigo;
        
        var zapatos = new ZapatosModel(
       
          f.value.nombre,
          codigo,
          f.value.precio,
          f.value.genero,
          f.value.stock,
          f.value.tallazapato

        );
        
         this._ZapatoService.GuardarZapatos(zapatos).subscribe((resp:any)=>{
          this.SegundoFormulario=true;
          this.id=resp.zapatos._id;
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
           
          f.resetForm();
           console.log(resp);
      

          });


    }

    if (f.value.producto==="consolas"){
      codigo = 'CON'+codigo;

      let consolas = new ConsolaModel(
        f.value.nombre,
        codigo,
        f.value.precio,
        f.value.stock
      );

      this._ConsolasService.GuardarDatos(consolas).subscribe((resp:any)=>{
        this.SegundoFormulario=true;
       // console.log(resp);

       
        this.id=resp.consolas._id;

        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )


        f.resetForm();


      });

    }
   
    if (f.value.producto==="ropas"){
      codigo = 'ROP'+codigo;
      
      let arreglo:Number[]=[];
      
      arreglo.push(f.value.tallass,f.value.tallam,f.value.tallal,f.value.tallax)
    
      console.log(arreglo)

      let ropa = new RopaModel (

        f.value.nombre,
        codigo,
        f.value.precio,
        f.value.genero,
        arreglo

      );

      this._ropaService.GuardarDAtos(ropa).subscribe((resp:any)=>{
        console.log(resp);
        this.SegundoFormulario=true;
        this.id=resp.ropas._id;
       
        Swal.fire(
          'Buen trabajo!',
          'Producto agregado!',
          'success'
        )

        f.resetForm();
        
     
        
      })

    }


  }


  seleccionImage(archivo:File){
 
    if (!archivo){
      this.Imagen = null;
      return;
    }
    this.Imagen=archivo;



  }


  SubirImagen(f2:NgForm){
  
    this._SubirImagenService.SubirArchivo(this.Imagen,this.tipo,this.id)
    .then(resp=>{
      this.SegundoFormulario=false;
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )

    }).catch(resp=>{

      console.log(resp);
    });

  }



  GenerarCodigo(){

            
    let chars = "0123456789abcdefABCDEF";
    let lon = 5;
   
      let code = "";
      for (let x=0; x < lon; x++)
      {
      let rand = Math.floor(Math.random()*chars.length);
      code += chars.substr(rand, 1);
      }
      
      return code


  }
  
 
  //devuelve una cadena aleatoria de 20 caracteres
  

  modelChanged(evento:string){
    this.ropa=false;
    this.zapatos=false;
    this.consolas=false;

    if (evento=="ropas"){
      this.ropa=true
    }

    if (evento=="consolas"){
      this.consolas=true;
    }

    if (evento=="zapatos"){
      this.zapatos=true;

    }

  }

}
