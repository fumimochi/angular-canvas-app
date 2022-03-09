import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaintService } from './paint.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements AfterViewInit {
  
  @ViewChild('myCanvas') 
  private myCanvas: ElementRef = {} as ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  constructor(
    private readonly _paintService: PaintService
  ) { }

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }
  
  public draw(event) {
    switch(event.target.className) {
      case 'rectangle': 
          this._paintService.rectangle(this.ctx, this.myCanvas);
          break;
      case 'circle': 
          this._paintService.circle(this.ctx, this.myCanvas);
          break;
      case 'line':
          this._paintService.line(this.ctx, this.myCanvas);
          break;
      case 'image':
          this._paintService.image(this.ctx, this.myCanvas);
          break;
    }
  }

}


