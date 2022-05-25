import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, Subscription, switchMap } from 'rxjs';

import { EventsService } from './events.service';
import { CanvasLine } from 'src/app/modules/paint/objects/line';
import { CanvasImage } from 'src/app/modules/paint/objects/image';
import { CanvasCircle } from 'src/app/modules/paint/objects/circle';
import { CanvasRectangle } from 'src/app/modules/paint/objects/rectangle';
import { PaintElems } from 'src/app/modules/paint/models';
import { CanvasRhombus } from 'src/app/modules/paint/objects/rhombus';
import { CanvasParallelogram } from 'src/app/modules/paint/objects/parallelogram';
import { CanvasSuperellipse } from 'src/app/modules/paint/objects/superellipse';
import { RenderService } from './render.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  protected textContent: string;
  protected id: number = 0;
  protected staticValue: number = 200;
  protected draggable: boolean = false;
  public objectsArray: Array<any> = [];
  public inputsArray: [];
  protected sub: Subscription;
  protected sub2: Subscription;
  protected sizeSub: Subscription;
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  constructor(
    private readonly _eventsService: EventsService,
    private readonly _renderService: RenderService
  ) {}

  private addObj(object) {
    this.objectsArray.push(object);
    console.log(this.objectsArray);
  }

  public returnObjects() {
    return this.objectsArray;
  }

  public stateObjects(arr) {
    return (this.objectsArray = arr);
  }

  public initionCanvas(subject: BehaviorSubject<any>) {
    subject.subscribe((val) => {
      this.canvas = val.canvas;
      this.context = val.context;
    });
  }

  public creature(tool: any, context) {
    let object;
    this.sub?.unsubscribe();
    if (tool == 'line') {
      this.sub = this._eventsService.lineStream().subscribe((value) => {
        object = new CanvasLine({
          injector: null,
          model: {
            id: ++this.id,
            type: 'line',
            cordLeft: value['startX'],
            cordTop: value['startY'],
            draggable: false,
            endX: value['x'],
            endY: value['y'],
            length:
              Math.abs(value['startX'] - value['x']) >
              Math.abs(value['startY'] - value['y'])
                ? Math.abs(value['startX'] - value['x'])
                : Math.abs(value['startY'] - value['y']),
          },
        });
        object.draw(context, object['model']);
        this.addObj(object);
        this.sub.unsubscribe();
      });
    } else {
      this.sub = this._eventsService.creatingStream().subscribe((value) => {
        switch (tool) {
          case PaintElems.ElemEnum.RECTANGLE:
            object = new CanvasRectangle({
              injector: null,
              model: {
                id: ++this.id,
                type: 'rectangle',
                cordLeft: value['startX'],
                cordTop: value['startY'],
                draggable: false,
                width: value['size'],
                height: value['size'] / 2,
              },
            });
            break;
          case PaintElems.ElemEnum.PARALLELOGRAM:
            object = new CanvasParallelogram({
              injector: null,
              model: {
                id: ++this.id,
                type: 'parallelogram',
                cordLeft: value['startX'],
                cordTop: value['startY'],
                draggable: false,
                length: 200,
                height: 120,
              },
            });
            break;
          case PaintElems.ElemEnum.RHOMBUS:
            object = new CanvasRhombus({
              injector: null,
              model: {
                id: ++this.id,
                type: 'rhombus',
                cordLeft: value['startX'],
                cordTop: value['startY'],
                draggable: false,
                width: 300,
                height: 150,
              },
            });
            break;
          case PaintElems.ElemEnum.SUPERELLIPSE:
            object = new CanvasSuperellipse({
              injector: null,
              model: {
                id: ++this.id,
                type: 'superellipse',
                cordLeft: value['startX'],
                cordTop: value['startY'],
                draggable: false,
                height: 30,
                width: 200,
              },
            });
            break;
          case PaintElems.ElemEnum.CIRCLE:
            object = new CanvasCircle({
              injector: null,
              model: {
                id: ++this.id,
                type: 'circle',
                cordLeft: value['startX'],
                cordTop: value['startY'],
                draggable: false,
                radius: value['size'],
              },
            });
            break;
        }
        object.draw(context, object['model']);
        this.addObj(object);
        this.sub.unsubscribe();
      });
    }
  }

  private activeForm(object) {
    this.sizeSub?.unsubscribe();

    switch (object.type) {
      case 'rhombus':
        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['width'] / 2,
          object['cordTop'] - object['height'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['width'] / 2,
          object['cordTop'] + object['height'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] - object['width'] / 2,
          object['cordTop'] + object['height'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] - object['width'] / 2,
          object['cordTop'] - object['height'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        return (this.sizeSub = this._eventsService
          .creatingStream()
          .subscribe((value) => {
            let startX = value['startX'];
            let startY = value['startY'];

            if (
              4 >
              Math.sqrt(
                Math.pow(object['cordLeft'] + object['width'] / 2 - startX, 2) +
                  Math.pow(object['cordTop'] - object['height'] / 2 - startY, 2)
              )
            ) {
              this._eventsService.resizeStream(object, this.objectsArray);
            }
          }));
        break;
      case 'circle':
        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['radius'] / 2,
          object['cordTop'] - object['radius'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['radius'] / 2,
          object['cordTop'] + object['radius'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] - object['radius'] / 2,
          object['cordTop'] + object['radius'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] - object['radius'] / 2,
          object['cordTop'] - object['radius'] / 2,
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        return (this.sizeSub = this._eventsService
          .creatingStream()
          .subscribe((value) => {
            let startX = value['startX'];
            let startY = value['startY'];

            if (
              4 >
              Math.sqrt(
                Math.pow(
                  object['cordLeft'] + object['radius'] / 2 - startX,
                  2
                ) +
                  Math.pow(object['cordTop'] - object['radius'] / 2 - startY, 2)
              )
            ) {
              this._eventsService.resizeStream(object, this.objectsArray);
            }
          }));
        break;
      case 'superellipse':
        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['width'],
          object['cordTop'] - object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['width'],
          object['cordTop'] + object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] - object['width'],
          object['cordTop'] + object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] - object['width'],
          object['cordTop'] - object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        return (this.sizeSub = this._eventsService
          .creatingStream()
          .subscribe((value) => {
            let startX = value['startX'];
            let startY = value['startY'];

            if (
              4 >
              Math.sqrt(
                Math.pow(object['cordLeft'] + object['width'] - startX, 2) +
                  Math.pow(object['cordTop'] - object['height'] - startY, 2)
              )
            ) {
              this._eventsService.resizeStream(object, this.objectsArray);
            }
          }));
        break;
      case 'parallelogram':
        this.context.beginPath();
        this.context.arc(
          object['cordLeft'],
          object['cordTop'] - object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['length'] + 20,
          object['cordTop'] - object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['length'] + 20,
          object['cordTop'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'],
          object['cordTop'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        return (this.sizeSub = this._eventsService
          .creatingStream()
          .subscribe((value) => {
            let startX = value['startX'];
            let startY = value['startY'];

            if (
              4 >
              Math.sqrt(
                Math.pow(
                  object['cordLeft'] + object['length'] + 20 - startX,
                  2
                ) + Math.pow(object['cordTop'] - object['height'] - startY, 2)
              )
            ) {
              this._eventsService.resizeStream(object, this.objectsArray);
            }
          }));
        break;
      case 'rectangle':
        this.context.beginPath();
        this.context.arc(
          object['cordLeft'],
          object['cordTop'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'],
          object['cordTop'] - object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['width'],
          object['cordTop'] - object['height'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        this.context.beginPath();
        this.context.arc(
          object['cordLeft'] + object['width'],
          object['cordTop'],
          4,
          0,
          Math.PI * 2,
          true
        );
        this.context.fillStyle = '#fff';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fill();
        this.context.stroke();

        return (this.sizeSub = this._eventsService
          .creatingStream()
          .subscribe((value) => {
            let startX = value['startX'];
            let startY = value['startY'];

            if (
              4 >
              Math.sqrt(
                Math.pow(object['cordLeft'] + object['width'] - startX, 2) +
                  Math.pow(object['cordTop'] - object['height'] - startY, 2)
              )
            ) {
              this._eventsService.resizeStream(object, this.objectsArray);
            }
          }));
        break;
    }
    return 1;
  }

  public selectObject() {
    this.sub?.unsubscribe();
    return (this.sub = this._eventsService
      .creatingStream()
      .subscribe((value) => {
        let startX = value['startX'];
        let startY = value['startY'];
        this.draggable = false;
        let inputs = document.querySelectorAll('input');

        for (let object of this.objectsArray) {
          object = object['model'];
          switch (object?.type) {
            case 'line':
              if (
                Math.abs(object?.cordLeft - object?.endX) >
                  Math.abs(object?.cordTop - object?.endY) &&
                startX <= object?.cordLeft + object?.length &&
                startX >= object?.cordLeft &&
                startY <= object?.cordTop + 3 &&
                startY >= object?.cordTop - 3
              ) {
                this.draggable = true;
              } else if (
                Math.abs(object?.cordLeft - object?.endX) <
                  Math.abs(object?.cordTop - object?.endY) &&
                startY <= object?.cordTop + object?.length &&
                startY >= object?.cordTop &&
                startX <= object?.cordLeft + 3 &&
                startX >= object?.cordLeft - 3
              ) {
                this.draggable = true;
              }
              break;
            case 'circle':
              if (
                object.radius / 2 >
                Math.sqrt(
                  Math.pow(object.cordLeft - startX, 2) +
                    Math.pow(object.cordTop - startY, 2)
                )
              ) {
                this.draggable = true;
                this.activeForm(object);
              }
              break;
            case 'rhombus':
              if (
                startX <= object?.cordLeft + object?.width / 2 &&
                startX >= object?.cordLeft - object?.width / 2 &&
                startY <= object?.cordTop + object?.height / 2 &&
                startY >= object?.cordTop - object?.height / 2
              ) {
                this.draggable = true;
                this.activeForm(object);
              }
              break;
            case 'parallelogram':
              if (
                startX <= object?.cordLeft + object.length + 20 &&
                startX >= object?.cordLeft &&
                startY <= object?.cordTop &&
                startY >= object?.cordTop - object?.height
              ) {
                this.draggable = true;
                this.activeForm(object);
              }
              break;
            case 'superellipse':
              if (
                startX <= object?.cordLeft + object?.width &&
                startX >= object?.cordLeft - object?.width &&
                startY <= object?.cordTop + object?.height &&
                startY >= object?.cordTop - object?.height
              ) {
                this.draggable = true;
                this.activeForm(object);
              }
              break;
            case 'rectangle':
              if (
                startX <= object?.cordLeft + this.staticValue &&
                startX >= object?.cordLeft &&
                startY <= object?.cordTop &&
                startY >= object?.cordTop - this.staticValue / 2
              ) {
                this.draggable = true;
                this.activeForm(object);
              }
              break;
            case 'image':
              console.log('image selected');
              break;
          }

          if (this.draggable) {
            addEventListener('keydown', (e) => {
              if (e.key == 'Delete') {
                this.objectsArray = this.objectsArray.filter(
                  (e) => e.model.id !== object.id
                );
              }
              console.log(this.objectsArray);
              this._renderService.renderSaved(this.objectsArray);
            });
            inputs.forEach((e) => (e.style.display = 'none'));
            return (this.sub2 = this._eventsService.draggingStream(
              object,
              this.objectsArray
            ));
          }
          this.sub2?.unsubscribe();
        }

        this.draggable = false;
        inputs.forEach((e) => (e.style.display = 'inline-block'));
        this.sub?.unsubscribe();
        return true;
      }));
  }

  public createImage(context) {
    let image = new CanvasImage({
      injector: null,
      model: {
        id: ++this.id,
        type: 'image',
        cordLeft: 1,
        cordTop: 1,
        draggable: false,
        width: this.staticValue,
        height: this.staticValue,
      },
    });
    image.draw(context, image);
    this.addObj(image);
  }
}
