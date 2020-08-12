import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AgregarProductosComponent } from './pages/agregar-productos/agregar-productos.component';
import { ZapatosComponent } from './pages/zapatos/zapatos.component';
import { RopaComponent } from './pages/ropa/ropa.component';
import { ConsolasComponent } from './pages/consolas/consolas.component';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { EditarProductosComponent } from './pages/editar-productos/editar-productos.component';
import { AdminGuard } from './services/guards/admin.guard';


const routes: Routes = [
  {path:'',component:ArticulosComponent},
  {path:'articulos',component:ArticulosComponent},
  {path:'zapatos',component:ZapatosComponent},
  {path:'ropa',component:RopaComponent},
  {path:'consolas',component:ConsolasComponent},
  {path:'perfil',component:PerfilComponent,canActivate:[AdminGuard]},
  {path:'agproductos',component:AgregarProductosComponent,canActivate:[AdminGuard]},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'eproductos',component:EditarProductosComponent,canActivate:[AdminGuard]},
  {path:'**',pathMatch: 'full',redirectTo:'articulos'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
