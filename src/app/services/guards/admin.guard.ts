import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  rol:String;
  constructor(public _UsuarioService:UsuariosService,public route:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    this.rol =  this._UsuarioService.rol;
      
      if (this.rol==='ADMIN_ROLE'){

        return true;

      }else{

        this.route.navigate(['/articulos'])

        return false;
      }




  }
  
}
