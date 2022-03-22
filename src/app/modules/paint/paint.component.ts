import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PaintElems } from './models';
import { ModalImageUploadComponent } from './modules/components/modal-image-upload/modal-image-upload.component';
import { PaintService } from './paint.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements AfterViewInit {
  public tools: Array<string> = [PaintElems.ElemEnum.RECTANGLE, PaintElems.ElemEnum.CIRCLE, PaintElems.ElemEnum.LINE];
  
  @ViewChild('myCanvas') 
  private myCanvas: ElementRef = {} as ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _paintService: PaintService,
    private readonly _dialogRef: MatDialog   
  ) {  }

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }

  public openDialog() {
    this._dialogRef.open(ModalImageUploadComponent, {
      data: {
        ctx: this.ctx,
        canvas: this.myCanvas 
      }
    });
    // this._paintService.image(this.ctx, this.myCanvas);
  }
  
  public draw(tool: any) {
    switch(tool) {
      case PaintElems.ElemEnum.RECTANGLE: 
          this._paintService.rectangle(this.ctx);
          break;
      case PaintElems.ElemEnum.CIRCLE: 
          this._paintService.circle(this.ctx);
          break;
      case PaintElems.ElemEnum.LINE:
          this._paintService.line(this.ctx);
          break;     
    }
  }

}


