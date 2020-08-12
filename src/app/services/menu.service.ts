import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  menu:any[]=[];

  


  constructor() { }


  TraerMenu(){

    this.menu=[
      
    { 
      titulo:"Agregar productos",
      icono:"fas fa-plus",
      ruta:"/agproductos"
    },
    { 
      titulo:"Editar Productos",
      icono:"fas fa-edit",
      ruta:"/eproductos"
    },
    { 
      titulo:"Perfil",
      icono:"fas fa-user-tie",
      ruta:"/perfil"
    },
  
  ]


  return this.menu;

  }

}
