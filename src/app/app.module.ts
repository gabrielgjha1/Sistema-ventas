import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavarComponent } from './navegacion/nav/navar.component';
import { ComponentsModule } from './components/components.module';
import { ModuleModule } from './pages/module.module';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavarComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    ModuleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
