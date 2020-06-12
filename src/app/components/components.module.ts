import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroduccionComponent } from './introduccion/introduccion.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [IntroduccionComponent, BannerComponent],
  exports:[IntroduccionComponent,BannerComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
