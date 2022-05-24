import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  map,
  Observable,
  switchMap,
  takeUntil,
} from 'rxjs';

import { RenderService } from './render.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private canvas: HTMLCanvasElement;
  protected staticValue: number = 200;
  private mouseMove$: Observable<any>;
  private mouseDown$: Observable<any>;
  private mouseOver$: Observable<any>;
  private mouseUp$: Observable<any>;
  private mouseOut$: Observable<any>;

  constructor(private readonly _renderService: RenderService) {}

  public initionCanvas(subject: BehaviorSubject<any>) {
    subject.subscribe((val) => {
      this.canvas = val.canvas;
      this.mouseDown$ = fromEvent(this.canvas, 'mousedown');
      this.mouseOver$ = fromEvent(this.canvas, 'mouseover');
      this.mouseMove$ = fromEvent(this.canvas, 'mousemove');
      this.mouseUp$ = fromEvent(this.canvas, 'mouseup');
      this.mouseOut$ = fromEvent(this.canvas, 'mouseout');
    });
  }

  public draggingStream(obj, objArray) {
    return this.mouseMove$
      ?.pipe(
        map((event: MouseEvent) => ({
          endX: event.offsetX,
          endY: event.offsetY,
        })),
        takeUntil(this.mouseUp$)
      )
      .subscribe((value) => {
        obj.cordLeft = value['endX'];
        obj.cordTop = value['endY'];
        this._renderService.renderSaved(objArray);
      });
  }

  public creatingStream() {
    return this.mouseDown$?.pipe(
      map((event: MouseEvent) => ({
        startX: event.offsetX,
        startY: event.offsetY,
        size: this.staticValue,
      }))
    );
  }

  public lineStream() {
    return this.mouseDown$?.pipe(
      map((e: MouseEvent) => ({
        startX: e.offsetX,
        startY: e.offsetY,
      })),
      switchMap((val) => {
        return this.mouseUp$.pipe(
          map((e: MouseEvent) => ({
            startX: val.startX,
            startY: val.startY,
            x: e.offsetX,
            y: e.offsetY,
          }))
        );
      })
    );
  }

  public resizingStream() {}

  public hoverStream() {
    return this.mouseOver$.pipe(
      map((event: MouseEvent) => ({
        currX: event.offsetX,
        currY: event.offsetY,
      })),
      takeUntil(this.mouseOut$)
    );
  }
}
