import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanvasCircle } from 'src/app/modules/paint/objects/circle';
import { CanvasLine } from 'src/app/modules/paint/objects/line';
import { CanvasParallelogram } from 'src/app/modules/paint/objects/parallelogram';
import { CanvasRectangle } from 'src/app/modules/paint/objects/rectangle';
import { CanvasRhombus } from 'src/app/modules/paint/objects/rhombus';
import { CanvasSuperellipse } from 'src/app/modules/paint/objects/superellipse';

@Injectable({
  providedIn: 'root',
})
export class RenderService {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private savedObj;
  constructor() {
    // private readonly _eventsService: EventsService, // private readonly _objectService: ObjectService,
    // this.objectsArray = this._objectService.objectsArray
  }

  public initionCanvas(subject: BehaviorSubject<any>) {
    subject.subscribe((val) => {
      this.canvas = val.canvas;
      this.context = val.context;
      this.canvasWidth = val.width;
      this.canvasHeight = val.height;
    });
  }

  public renderInputs(array) {
    for (let elem of array) {
      let input = document.createElement('input');
      input.style.position = 'absolute';
      input.style.top = `${elem.cordTop}px`;
      input.style.left = `${elem.cordLeft}px`;
      input.style.border = 'none';
      input.style.fontSize = '24px';
      input.style.textAlign = 'center';
      input.value = elem.text;
      input.style.backgroundColor = 'rgba(255, 255, 255, 0)';
      document.body.appendChild(input);

      input.addEventListener('change', (e) => {
        array
          .filter((inpt) => inpt.id === elem.id)
          .map((i) => (i.text = e.target['value']));
        console.log(array);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key == 'Delete') {
          array.filter((inpt) => inpt.id !== elem.id);
          document.body.removeChild(input);
        }
      });
    }
  }

  public renderSaved(objectsArray) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let obj of objectsArray) {
      switch (obj['model']['type']) {
        case 'line':
          this.savedObj = new CanvasLine({ ...obj });
          break;
        case 'parallelogram':
          this.savedObj = new CanvasParallelogram({ ...obj });
          break;
        case 'rectangle':
          this.savedObj = new CanvasRectangle({ ...obj });
          break;
        case 'rhombus':
          this.savedObj = new CanvasRhombus({ ...obj });
          break;
        case 'circle':
          this.savedObj = new CanvasCircle({ ...obj });
          break;
        case 'superellipse':
          this.savedObj = new CanvasSuperellipse({ ...obj });
          break;
      }
      this.savedObj.draw(this.context, obj['model']);
    }
  }
}
