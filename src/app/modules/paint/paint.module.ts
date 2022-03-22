import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

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
        PaintRoutingModule
    ]
})
export class PaintModule { } 