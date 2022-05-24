import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SavedWorkspaceRoutingModule } from './saved-workspace-routing.module';
import { SavedWorkspaceComponent } from './saved-workspace.component';

@NgModule({
  declarations: [SavedWorkspaceComponent],
  imports: [CommonModule, SavedWorkspaceRoutingModule],
})
export class SavedWorkspaceModule {}
