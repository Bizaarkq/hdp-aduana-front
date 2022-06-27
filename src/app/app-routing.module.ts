import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ArchivoComponent } from './components/archivo/archivo.component';
const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    children:
    [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },  
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'archivo/:id',
        component: ArchivoComponent
      },
      {
        path: 'archivo',
        component: ArchivoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
