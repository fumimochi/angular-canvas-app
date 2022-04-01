import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ObjectService } from "./object.service";
import { General } from "src/app/modules/paint/objects/general";

@Injectable({
    providedIn: 'root'
})
export class RenderService { 
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    
    constructor(
        // private readonly _objectService: ObjectService,
        // private readonly _eventsService: EventsService,
    ) { 
        // this.objectsArray = this._objectService.objectsArray 
    }

    public initionCanvas(subject: BehaviorSubject<any>) {
        subject.subscribe(val => {
            this.canvas = val.canvas;
            this.context = val.context;
            this.canvasWidth = val.width;
            this.canvasHeight = val.height;
        })
    } 

    public render(objectsArray) {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for(let obj of objectsArray) {
            obj.draw(this.context, obj);
        }
    } 
}