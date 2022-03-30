import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ModalImageUploadComponent } from "./modules/components/modal-image-upload/modal-image-upload.component";
import { PaintRoutingModule } from "./paint-routing.module";
import { PaintComponent } from "./paint.component";

@NgModule({
    declarations: [ 
        PaintComponent,
        ModalImageUploadComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PaintRoutingModule
    ]
})
export class PaintModule { } 