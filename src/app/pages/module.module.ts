import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { RopaComponent } from './ropa/ropa.component';
import { ZapatosComponent } from './zapatos/zapatos.component';
import { ConsolasComponent } from './consolas/consolas.component';

import { FormsModule }   from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ArticulosComponent, PerfilComponent, AgregarProductosComponent, RopaComponent, ZapatosComponent, ConsolasComponent],
  exports:[ArticulosComponent, PerfilComponent, AgregarProductosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule
  ]
})
export class ModuleModule { }
