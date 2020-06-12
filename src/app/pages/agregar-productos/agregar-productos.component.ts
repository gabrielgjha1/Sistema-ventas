import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {

  ropa:boolean=false;
  zapatos:boolean=false;
  consolas:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  Verificar(f:any){

    console.log(f)

  }

  modelChanged(evento:string){
    this.ropa=false;
    this.zapatos=false;
    this.consolas=false;
    if (evento=="ropa"){
      this.ropa=true
    }
    if (evento=="consolas"){
      this.consolas=true;
    }
    if (evento=="Zapatos"){
      this.zapatos=true;

    }
  }

}
