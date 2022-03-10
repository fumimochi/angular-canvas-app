import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UploadImageComponent } from "./modules/components/upload-image/upload-image.component";

import { PaintRoutingModule } from "./paint-routing.module";
import { PaintComponent } from "./paint.component";

@NgModule({
    declarations: [ 
        PaintComponent,
        UploadImageComponent
    ],
    imports: [
        CommonModule,
        PaintRoutingModule
    ]
})
export class PaintModule { } 