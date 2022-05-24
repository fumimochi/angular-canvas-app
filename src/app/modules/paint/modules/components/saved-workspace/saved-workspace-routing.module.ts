import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasCreateComponent } from '../canvas-create/canvas-create.component';
import { SavedWorkspaceComponent } from './saved-workspace.component';

const routes: Routes = [
  {
    path: '',
    component: SavedWorkspaceComponent,
  },
  {
    path: `:id`,
    component: CanvasCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedWorkspaceRoutingModule {}
