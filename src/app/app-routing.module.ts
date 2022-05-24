import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';
import { AppRoutes } from './core/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.RouteEnum.PAINT,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.RouteEnum.PAINT,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/paint/paint.module').then((load) => load.PaintModule),
  },
  {
    path: AppRoutes.RouteEnum.AUTH,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((load) => load.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
