import { Component, OnInit } from '@angular/core';
import { RopasService } from 'src/app/services/ropas.service';
import { RopaModel } from 'src/app/models/ropa.model';

@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styleUrls: ['./ropa.component.css']
})
export class RopaComponent implements OnInit {

  ropas:RopaModel[]=[];
  stock:number[]=[];
  cantidad:number=0;
  
  constructor(public _RopaService:RopasService) { }

  ngOnInit(): void {
    this.TraerRopa();

  }

  TraerRopa(){

    this._RopaService.TreaeRopa().subscribe((resp:any)=>{
      this.ropas=resp.ropas;
      console.log(this.ropas);

    });


  }
  AsignarStock(evento,stock:number[]){
    let tallas=['S','M','L','XS']
    //console.log(evento.target.value)

    tallas.forEach((valor,index)=>{

        if (valor===evento.target.value){
          this.cantidad=index;
          console.log( this.cantidad)
        }

    })
  
  }


}
