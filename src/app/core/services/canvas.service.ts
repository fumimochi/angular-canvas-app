import { Injectable } from "@angular/core";

import { EventsService } from "./events.service";

@Injectable({
    providedIn: 'root'
})
export class CanvasService {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public canvasWidth: number = 900;
    public canvasHeight: number = 900;

    constructor(       
        private readonly _eventsService: EventsService
    ) {  }

    public clearCanvas() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public getData(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this._eventsService.eventsCanvas(this.canvas, this.context);
    }

    // public returnCanvas() {
    //     return this.canvas
    // }
}