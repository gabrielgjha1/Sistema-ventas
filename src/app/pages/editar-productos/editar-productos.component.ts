import { Component, OnInit } from '@angular/core';
import { ConsolasService } from 'src/app/services/consolas.service';
import { RopasService } from 'src/app/services/ropas.service';
import { ZapatosService } from 'src/app/services/zapatos.service';
import { RopaModel } from 'src/app/models/ropa.model';
import { ConsolaModel } from 'src/app/models/consola.model';
import { ZapatosModel } from 'src/app/models/zapatos.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  ropa:RopaModel[]=[];
  consolas:ConsolaModel[]=[];
  zapatos:ZapatosModel[]=[];

  titulo:String="producto";

  //validar que tabla mostrar
  Bropal:boolean;
  Bconsolal:boolean;
  Bzapatol:boolean;


  //variables que van en el modal
  NombreP:string="";
  TallasP:string="";
  PrecioP:number=0;
  StockP:number=0;
  ImagenP:string="";
  id:string="";
  tipo:string="";
  Genero:string=""



  constructor(public _consolasService:ConsolasService,
              public _ropaService:RopasService,
              public _zapatosService:ZapatosService) { }

  ngOnInit(): void {
    
  }

  //traer productos
  TraerConsolas(){
    this._consolasService.TraerConsolas().subscribe((resp:any)=>{
      this.consolas=resp.consolas;
      console.log(this.consolas);
    });
  }


  TraerZapatos(){
    this._zapatosService.TraerZapatos().subscribe((resp:any)=>{
      this.zapatos=resp.zapatos
      console.log(this.zapatos);
    });
  }

  TraerRopa(){
    this._ropaService.TreaeRopa().subscribe((resp:any)=>{
      this.ropa=resp.ropas;
      console.log(this.ropa);
    });
  }

  //eleminar productos
  EliminarProducto(id:string,tipo:string){
    console.log(tipo);
    Swal.fire({
      title: 'EStas seguro?',
      text: "Esto no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {

      if (result.value) {

        Swal.fire(
          'Borrado!',
          'Tu archivo a sido borrado.',
          'success'
        )
      
      if (tipo==="consolas"){
        this._consolasService.EliminarDatos(id).subscribe(resp=>{

          this.TraerConsolas();

           
          })
      }

      if (tipo==="zapatos"){

        this._zapatosService.EliminarDatos(id).subscribe(resp=>{

          

          this.TraerZapatos();

           console.log(resp)

        });

      }


      if (tipo==="ropas"){

        this._ropaService.EliminarDatos(id).subscribe(resp=>{

         

          this.TraerRopa();

           console.log(resp)

        });

      }
    }

    })

  }

  //Editar Productos 
  EditarConsolas(nombre:string,precio:number,stock:number,imagen:string,
                id:string,tipo:string,tallas?:string,codigo?:string,genero?:string){

    this.PrecioP=precio
    this.NombreP=nombre;
    this.StockP=stock;
    this.ImagenP=imagen;
    this.id=id;
    this.tipo=tipo;
    this.TallasP=tallas;
    
  }
  
  
  
  CambiarDatos(f){
    
    let consolas =  new ConsolaModel(this.NombreP,undefined,this.PrecioP,this.StockP)
    let zapatos = new ZapatosModel(this.NombreP,undefined,this.PrecioP,undefined,this.StockP,this.TallasP);
    
    if (this.Bconsolal){

      this._consolasService.EditarDatos(this.id,consolas).subscribe(resp=>{
        this.TraerConsolas();
        Swal.fire(
          'Cambios hechos en las consolas!',
          'COntinuar!',
          'success'
        )
        console.log(resp);
  
      });
      
      return;

    }

    this._zapatosService.EditarDatos(this.id,zapatos).subscribe(resp=>{
        this.TraerZapatos();

        Swal.fire(
          'Cambios hechos en los zapatos!',
          'COntinuar!',
          'success'
        )



    });



  }



  CambioProducto(event){
    console.log('asd')
    console.log(event.target.value);
    
    this.Bropal = false;
    this.Bzapatol = false;
    this.Bconsolal = false;
    if (event.target.value === 'Consolas'){
      this.TraerConsolas();
      this.Bconsolal=true
      this.titulo="consola";
    }

    if (event.target.value === 'Zapatos'){
      this.TraerZapatos();
      this.Bzapatol=true
      this.titulo="zapatos";
    }

    if (event.target.value === 'Ropas'){
      
      this.TraerRopa();
      this.Bropal=true
      this.titulo="ropas";

    }

  }

}
