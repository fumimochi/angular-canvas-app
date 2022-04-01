import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { EventsService } from "./events.service";
import { LineCanvas } from "src/app/modules/paint/objects/line";
import { ImageCanvas } from "src/app/modules/paint/objects/image";
import { CircleCanvas } from "src/app/modules/paint/objects/circle";
import { RectangleCanvas } from "src/app/modules/paint/objects/rectangle";
import { RenderService } from "./render.service";

@Injectable({
    providedIn: 'root'
})
export class ObjectService  {
    public id: number = 0;
    protected staticValue: number = 100;
    public draggable: boolean = false;
    public objectsArray: Array<any> = []; 
    public sub: Subscription;
    public sub2: Subscription;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(
        private readonly _eventsService: EventsService,
        private readonly _renderService: RenderService
    ) {  }

    private addObj(object) {
        this.objectsArray.push(object);
        console.log(this.objectsArray);
    }

    public initionCanvas(subject: BehaviorSubject<any>) {
        subject.subscribe(val => {
            this.canvas = val.canvas;
            this.context = val.context;
        })
    }

    public removeObj(object) {
        return this.objectsArray.filter(obj => obj.id !== object.id);
    }

    public selectObject() {
        this.sub?.unsubscribe();
        return this.sub = this._eventsService.creatingStream().subscribe(value => {
            let startX = value['startX'];
            let startY = value['startY'];
            this.draggable = false;

            for(let object of this.objectsArray) {

                switch(object?.type) {
                    case 'line':
                        if(
                            startX <= object?.cordLeft + this.staticValue 
                            && startX >= object?.cordLeft
                            && startY == object?.cordTop
                        ) {
                            this.draggable = true;
                            console.log('line selected');
                        }
                        break;
                    case 'circle':
                        if(object.radius / 2 > Math.sqrt(Math.pow(object.cordLeft - startX, 2) + Math.pow(object.cordTop - startY, 2))){
                            this.draggable = true;
                            console.log('circle selected');
                        }
                        break;
                    case 'rectangle':
                        if(
                            startX <= object?.cordLeft + this.staticValue
                            && startX >= object?.cordLeft 
                            && startY <= object?.cordTop 
                            && startY >= object?.cordTop - this.staticValue / 2
                        ) {
                            this.draggable = true;
                            console.log('rectangle selected');
                        }
                        break;
                    case 'image':
                        console.log('image selected')
                        break;
                }

                if(this.draggable) {
                    return this.sub2 = this._eventsService.draggingStream()
                        .subscribe(value => {
                            object.cordLeft = value['endX'];
                            object.cordTop = value['endY'];
                            console.log(object);
                            this.removeObj(object);
                            this._renderService.render(this.objectsArray);
                        })
                }
                this.sub2?.unsubscribe();                
            }
            this.draggable = false;
            this.sub?.unsubscribe();
            return true;
        })
    }

    // public hoverObject() {
    //     return this.sub2 =  this._eventsService?.hoverStream().subscribe(value => {
    //         let currX = value['currX'];
    //         let currY = value['currY'];
    //         let isHovered: boolean = false;
    //         for(let object of this.objectsArray) {

    //             switch(object?.type) {
    //                 case 'line':
    //                     if(currX <= object?.cordLeft + this.staticValue && currY == object?.cordTop) {
    //                         isHovered = true;
    //                     }
    //                     break;
    //                 case 'circle':
    //                     if(object.radius > Math.sqrt(Math.pow(object.cordLeft - currX, 2) + Math.pow(object.cordTop - currY, 2))){
    //                         isHovered = true;
    //                     }
    //                     break;
    //                 case 'rectangle':
    //                     if(currX <= object?.cordLeft + this.staticValue && currY <= object?.cordTop) {
    //                         isHovered = true;
    //                     }
    //                     break;
    //             }
    //         }
    //         isHovered ? console.log('item is hovered') : console.log('.');
    //     })
    // }

    public drawImage(context) {
        let image = new ImageCanvas(
            ++this.id,
            'image',
            1,
            1,
            false,
            this.staticValue,
            this.staticValue
        );
        image.draw(context, image);
        this.addObj(image);
    }

    public drawRectangle(context) {
        this.sub?.unsubscribe();
        this.sub = this._eventsService.creatingStream().subscribe(value => {
            let rectangle = new RectangleCanvas(
                ++this.id,
                'rectangle',
                value['startX'],
                value['startY'],
                false,
                value['size'],
                value['size'] / 2
            );
            rectangle.draw(context, rectangle)
            this.addObj(rectangle)
            this.sub.unsubscribe();
        })
        
    }

    public drawCircle(context) {
        this.sub?.unsubscribe();
        this.sub = this._eventsService.creatingStream().subscribe(value => {
            let circle = new CircleCanvas(
                ++this.id,
                'circle',
                value['startX'],
                value['startY'],
                false,
                value['size']
            );
            circle.draw(context, circle);
            this.addObj(circle);
            this.sub.unsubscribe();
        })
    }

    public drawLine(context) {
        this.sub?.unsubscribe();
        this.sub = this._eventsService.creatingStream().subscribe(value => {
            let line =  new LineCanvas(
                ++this.id, 
                'line',
                value['startX'],
                value['startY'],
                false,
                value['size']
            );
            line.draw(context, line);
            this.addObj(line);
            this.sub.unsubscribe();
        })
    }
}