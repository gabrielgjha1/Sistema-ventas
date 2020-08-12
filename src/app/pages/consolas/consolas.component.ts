import { Component, OnInit, OnChanges } from '@angular/core';
import { ConsolasService } from 'src/app/services/consolas.service';
import { ConsolaModel } from 'src/app/models/consola.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consolas',
  templateUrl: './consolas.component.html',
  styleUrls: ['./consolas.component.css']
})
export class ConsolasComponent implements OnInit {

  consolas:ConsolaModel[]=[];
  cantidad:number=1;
  form:FormGroup;
  constructor(public _consolasService:ConsolasService) { }

  formulario_compra(){
    return new FormGroup({
      cantidad:new FormControl(1,(Validators.required,Validators.min(1)))
    })
  
  }

  ngOnInit(): void { 
    this.form= this.formulario_compra();
    this.TraerDatos();
 
    }


  public TraerDatos(){

    this._consolasService.TraerConsolas()
    .subscribe((resp:any)=>{

      this.consolas=resp.consolas;

    })

  }

  comprar(id:string){
    
    if (this.form.valid){

      this._consolasService.ComparConsolas(id,this.form.value.cantidad).subscribe((resp)=>{
        this.TraerDatos();
        ///console.log(resp)
  
      });

    }else{return}
   
    
   
  }

}
