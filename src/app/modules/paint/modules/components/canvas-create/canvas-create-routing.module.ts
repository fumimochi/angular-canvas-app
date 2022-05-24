import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasCreateComponent } from './canvas-create.component';

const routes: Routes = [{ path: '', component: CanvasCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CavnasCreateRoutingModule {}
