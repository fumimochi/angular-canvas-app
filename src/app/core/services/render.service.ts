import { Injectable, OnInit } from "@angular/core";

import { CanvasService } from "./canvas.service";
import { EventsService } from "./events.service";
import { ObjectService } from "./object.service";

@Injectable({
    providedIn: 'root'
})
export class RenderService implements OnInit { 
    private renderCanvas: HTMLCanvasElement;
    private objectsArray: Array<Object>;
    
    constructor(
        private readonly _objectService: ObjectService,
        private readonly _eventsService: EventsService,
        private readonly _canvasSerivce: CanvasService
    ) { 
        this.objectsArray = this._objectService.objectsArray;
     }

    ngOnInit(): void {
        this.renderCanvas = this._canvasSerivce.canvas;
    }

    public redner() {
        let context = this._canvasSerivce.context;
        this._canvasSerivce.clearCanvas();

        for(let obj of this.objectsArray) {
            
            switch(obj['type']) {
                case 'line':
                    this._eventsService.drawLine(context);
                    break; 
                case 'circle': 
                    this._eventsService.drawCircle(context);
                    break;
                case 'rectangle':
                    this._eventsService.drawRectangle(context);
                    break;
                case 'image':
                    this._eventsService.drawImage();
            }
        }
    }   
    


}