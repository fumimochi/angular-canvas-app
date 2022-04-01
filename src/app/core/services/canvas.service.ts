import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { EventsService } from "./events.service";
import { ObjectService } from "./object.service";
import { RenderService } from "./render.service";

@Injectable({
    providedIn: 'root'
})
export class CanvasService {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public canvasWidth: number = 900;
    public canvasHeight: number = 900;
    public behavSubjectCanvas: BehaviorSubject<any>;

    constructor(
        private readonly _eventsService: EventsService,
        private readonly _renderService: RenderService,
        private readonly _objectService: ObjectService
    ) {  }

    public clearCanvas() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public initialization(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;

        this.behavSubjectCanvas = new BehaviorSubject({ 
            canvas: this.canvas, 
            context: this.context,
            width: this.canvasWidth,
            height: this.canvasHeight
        });
        this._eventsService.initionCanvas(this.behavSubjectCanvas);
        this._renderService.initionCanvas(this.behavSubjectCanvas);
        this._objectService.initionCanvas(this.behavSubjectCanvas);
    }
}