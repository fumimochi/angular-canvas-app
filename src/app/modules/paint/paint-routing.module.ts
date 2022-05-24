import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/core/routes';

import { PaintComponent } from './paint.component';

const routes: Routes = [
  {
    path: '',
    component: PaintComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.RouteEnum.CANVAS_CREATE,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.RouteEnum.CANVAS_CREATE,
        loadChildren: () =>
          import(
            './modules/components/canvas-create/canvas-create.module'
          ).then((i) => i.CanvasCreateModule),
      },
      {
        path: AppRoutes.RouteEnum.SAVED,
        loadChildren: () =>
          import(
            './modules/components/saved-workspace/saved-workspace.module'
          ).then((i) => i.SavedWorkspaceModule),
      },
      {
        path: AppRoutes.RouteEnum.PROFILE,
        loadChildren: () =>
          import('./modules/components/profile/profile.module').then(
            (i) => i.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaintRoutingModule {}
