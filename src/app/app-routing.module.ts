import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/routes';


const routes: Routes = [
  { 
    path: '',
    redirectTo: AppRoutes.RouteEnum.PAINT,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.RouteEnum.PAINT,
    loadChildren: () => 
      import('./modules/paint/paint.module').then(child => child.PaintModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


