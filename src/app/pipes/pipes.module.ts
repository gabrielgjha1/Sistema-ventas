import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenTraerPipe } from './imagen-traer.pipe';



@NgModule({
  declarations: [ImagenTraerPipe],
  imports: [
    CommonModule
  ],
  exports:[ImagenTraerPipe]
})
export class PipesModule { }
