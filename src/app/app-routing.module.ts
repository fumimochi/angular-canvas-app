import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { 
    path: '',
    redirectTo: 'paint',
    pathMatch: 'full'
  },
  {
    path: 'paint',
    loadChildren: () => 
      import('./modules/paint/paint.module').then(child => child.PaintModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


