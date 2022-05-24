import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CavnasCreateRoutingModule } from './canvas-create-routing.module';
import { CanvasCreateComponent } from './canvas-create.component';

@NgModule({
  declarations: [CanvasCreateComponent],
  imports: [CommonModule, CavnasCreateRoutingModule],
})
export class CanvasCreateModule {}
