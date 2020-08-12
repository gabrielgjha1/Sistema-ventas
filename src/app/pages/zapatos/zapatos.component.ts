import { Component, OnInit } from '@angular/core';
import { ZapatosService } from 'src/app/services/zapatos.service';
import { ZapatosModel } from 'src/app/models/zapatos.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-zapatos',
  templateUrl: './zapatos.component.html',
  styleUrls: ['./zapatos.component.css']
})
export class ZapatosComponent implements OnInit {

  form:FormGroup;

  constructor(public _ZapatosService:ZapatosService) { }

  Formulario_Compra(){

    return new FormGroup({

      cantidad:new FormControl(1,(Validators.required,Validators.min(1)))


    });

  }

  ngOnInit(): void {
    this.form=this.Formulario_Compra();
    this.TraerZapatos();
  }

  zapatos:ZapatosModel[]=[];
  
  TraerZapatos(){
    
    this._ZapatosService.TraerZapatos().subscribe((resp:any)=>{

      this.zapatos=resp.zapatos;

      console.log(this.zapatos);

    });

  }


  ComprarZapatos(id:string){

    if (this.form.valid){

      this._ZapatosService.ComprarZapatos(id,this.form.value.cantidad).subscribe(resp=>{
        this.TraerZapatos();

        console.log(resp)
  
      })
  
    }

    else{ return }

    
  }


}
