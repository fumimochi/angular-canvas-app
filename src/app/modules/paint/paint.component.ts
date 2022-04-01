import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CanvasService } from 'src/app/core/services/canvas.service';
import { EventsService } from 'src/app/core/services/events.service';
import { ObjectService } from 'src/app/core/services/object.service';
import { PaintElems } from './models';
import { ModalImageUploadComponent } from './modules/components/modal-image-upload/modal-image-upload.component';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements AfterViewInit {
  public tools: Array<string> = [PaintElems.ElemEnum.RECTANGLE, PaintElems.ElemEnum.CIRCLE, PaintElems.ElemEnum.LINE];
 
  @ViewChild('myCanvas') 
  private myCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _objectService: ObjectService,
    private readonly _canvasService: CanvasService,
    private readonly _dialogRef: MatDialog   
  ) {  }

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
    this.myCanvas.nativeElement.width = this._canvasService.canvasWidth;
    this.myCanvas.nativeElement.height = this._canvasService.canvasHeight;
    this._canvasService.initialization(this.myCanvas.nativeElement, this.ctx);
  }

  public openDialog() {
    this._dialogRef.open(ModalImageUploadComponent, {
      data: {
        ctx: this._canvasService.context,
        canvas: this._canvasService.canvas 
      }
    }); 
  }
  
  public draw(tool: any) {
    switch(tool) {
      case PaintElems.ElemEnum.RECTANGLE: 
          this._objectService.drawRectangle(this.ctx);
          break;
      case PaintElems.ElemEnum.CIRCLE:
          this._objectService.drawCircle(this.ctx);
          break;
      case PaintElems.ElemEnum.LINE:
          this._objectService.drawLine(this.ctx);
          break;    
    }
  }

  public clear() {
    this._objectService.objectsArray = [];
    this._canvasService.clearCanvas();
  }

  public selectObject() {
    this._objectService.selectObject();
  }

}