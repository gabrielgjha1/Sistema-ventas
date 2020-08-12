import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavarComponent } from './navegacion/nav/navar.component';
import { ComponentsModule } from './components/components.module';
import { ModuleModule } from './pages/module.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { ZapatosService } from './services/zapatos.service';
import { HttpClientModule } from '@angular/common/http';
import { ConsolasService } from './services/consolas.service';
import { SubirImagenService } from './services/subir-imagen.service';


SubirImagenService
@NgModule({
  declarations: [
    AppComponent,
    NavarComponent,
    LoginComponent,
    RegistroComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    ModuleModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ZapatosService,ConsolasService,SubirImagenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
