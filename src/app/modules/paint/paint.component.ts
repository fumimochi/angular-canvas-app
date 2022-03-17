import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription, take, tap } from 'rxjs';
import { PaintElems } from './models';
import { PaintService } from './paint.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements AfterViewInit {
  public tools: Array<string> = [PaintElems.ElemEnum.RECTANGLE, PaintElems.ElemEnum.CIRCLE, PaintElems.ElemEnum.LINE];
  private drawing: boolean = false;
  
  @ViewChild('myCanvas') 
  private myCanvas: ElementRef = {} as ElementRef<HTMLCanvasElement>;
  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  private sub4: Subscription;

  private ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _paintService: PaintService
  ) { }

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }
  
  public draw(tool: any) {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    switch(tool) {
      case PaintElems.ElemEnum.RECTANGLE: 
          this.sub3 = this._paintService.rectangle(this.ctx);
          break;
      case PaintElems.ElemEnum.CIRCLE: 
          this.sub2 = this._paintService.circle(this.ctx);
          break;
      case PaintElems.ElemEnum.LINE:
          this.sub3 = this._paintService.line(this.ctx);
          // this.sub1.unsubscribe()
          break;
      case PaintElems.ElemEnum.IMAGE:
          this.sub4 = this._paintService.image(this.ctx, this.myCanvas);
          break;        
    }
  }

}


