import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { EventsService } from "./events.service";
import { CanvasLine } from "src/app/modules/paint/objects/line";
import { CanvasImage } from "src/app/modules/paint/objects/image";
import { CanvasCircle } from "src/app/modules/paint/objects/circle";
import { CanvasRectangle } from "src/app/modules/paint/objects/rectangle";
import { PaintElems } from "src/app/modules/paint/models";

@Injectable({
    providedIn: 'root'
})
export class ObjectService  {
    protected id: number = 0;
    protected staticValue: number = 100;
    protected draggable: boolean = false;
    public objectsArray: Array<any> = []; 
    protected sub: Subscription;
    protected sub2: Subscription;
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;

    constructor(
        private readonly _eventsService: EventsService,
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

    public creature(tool: any, context) {
        let object;
        this.sub?.unsubscribe();
        this.sub = this._eventsService.creatingStream().subscribe(value => {
            switch(tool) {
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
                            height: value['size'] / 2
                        }
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
                            radius: value['size']
                        }
                    });
                    break;
                case PaintElems.ElemEnum.LINE:
                    object = new CanvasLine({
                        injector: null,
                        model: {
                            id: ++this.id,
                            type: 'line',
                            cordLeft: value['startX'],
                            cordTop: value['startY'],
                            draggable: false,
                            length: value['size']
                        }
                    });
                    break;
            }
            object.draw(context, object['model']);
            this.addObj(object);
            this.sub.unsubscribe();
        })
    }

    public selectObject() {
        this.sub?.unsubscribe();
        return this.sub = this._eventsService.creatingStream().subscribe(value => {
            let startX = value['startX'];
            let startY = value['startY'];
            this.draggable = false;

            for(let object of this.objectsArray) {
                object = object['model'];
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
                    return this.sub2 = this._eventsService.draggingStream(object, this.objectsArray);                        
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
                height: this.staticValue
            }
        }
        );
        image.draw(context, image);
        this.addObj(image);
    }

}