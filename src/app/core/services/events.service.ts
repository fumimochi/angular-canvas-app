import { Injectable } from "@angular/core";
import { fromEvent, map, Observable, Subscription } from "rxjs";

import { ObjectService } from "./object.service";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private startX: number = 0;
    private startY: number = 0; 
    protected staticValue = 100;
    private isHovered: boolean = false;
    private isDragging: boolean = false;
    protected sub1$: Subscription;
    protected sub2$: Subscription;
    protected sub3$: Subscription;
    protected sub4$: Subscription;
    private mouseMove$: Observable<any>;
    private mouseDown$: Observable<any>;
    private mouseOver$: Observable<any>;
    private previousObject;

    constructor(
        private readonly _objectService: ObjectService,
    ) {  }   

    public eventsCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.context = context;
        this.canvas = canvas;
        this.mouseDown$ = fromEvent(this.canvas, 'mousedown');
        this.mouseOver$ = fromEvent(this.canvas, 'mouseover');
        this.mouseMove$ = fromEvent(this.canvas, 'mousemove');
    }

    public draggingStream() {
        return this.sub4$ = this.mouseMove$
        ?.pipe(
            map((event: MouseEvent) => {
                if(this.isDragging === true) {
                    if(this.previousObject != null) {
                        let x = event.offsetX;
                        let y = event.offsetY;
        
                        this.previousObject.cordLeft = x;
                        this.previousObject.cordTop = y;
        
                        this.render();
                    }
                }
            })
        ).subscribe( () => this.sub4$.unsubscribe() )
    }   

    public creatingStream() {
        return this.mouseDown$
        ?.pipe(
            map((event: MouseEvent) => {
                this.startX = event.offsetX;
                this.startY = event.offsetY;

                for(let object of this._objectService.objectsArray) {
                    let inDistance: boolean;
                    switch(object.type) {
                        case 'line':
                            inDistance = object.cordLeft + object.length >= this.startX;    
                            break;
                        case 'circle':
                            inDistance = object.radius >= Math.sqrt(Math.pow(object.cordLeft - this.startX, 2) + Math.pow(object.cordTop - this.startY, 2));
                            break;
                        case 'rectangle':
                            inDistance = (object.cordLeft + object.width >= this.startX) && (object.cordTop + object.height >= this.startY);
                            break;
                        case 'image':
                            break;
                    }

                    if(inDistance) {
                        this.previousObject = object;
                        this.isDragging = true;

                        return;
                    }
                }
            }),
            // switchMap(() => {
            //     return this.mouseUp$
            //         .pipe(
            //             map((e: MouseEvent) => {
            //                 this.finishX = e.offsetX;
            //                 this.finishY = e.offsetY;
            //             })
            //         )
            // })
        )
    }

    public render() {
        let context = this.context;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(let obj of this._objectService.objectsArray) {
            
            switch(obj['type']) {
                case 'line':
                    this.drawLine(context);
                    break; 
                case 'circle': 
                    this.drawCircle(context);
                    break;
                case 'rectangle':
                    this.drawRectangle(context);
                    break;
                case 'image':
                    this.drawImage();
            }
        }
    }

    public stopAction() {
        this.isDragging = false;
        this.isHovered = false;
    }

    public resizingStream() {

    }

    public hoverStream(event) {
        let x = event.offsetX;
        let y = event.offsetY;

        // for(let object of this._objectService.objectsArray) {
        //     let inDistance: boolean;
        //     switch(object['type']) {
        //         case 'line':
        //             inDistance = object.cordLeft + object.length > this.startX;    
        //             break;
        //         case 'circle':
        //             inDistance = object.radius > Math.sqrt(Math.pow(object.cordLeft - this.startX, 2) + Math.pow(object.cordTop - this.startY, 2));
        //             break;
        //         case 'rectangle':
        //             inDistance = (object.cordLeft + object.width > this.startX) && (object.cordTop + object.height > this.startY);
        //             break;
        //         case 'image':
        //             break;
        //     }

        //     if(inDistance) {
        //        this.isHovered = true;

        //        console.log('element hovered')

        //         return;
        //     }
        // }
    }

    public drawImage() {
        let reader = new FileReader();
        let img = new Image();
        const uploadImage = (e) => {
            reader.onloadend = () => {
                img.onload = () => {
                    this.context.drawImage(img, this.startX, this.startY)
                }
                img.src = `${reader.result}`;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        const imageLoader  = document.getElementById('uploader');
        imageLoader.addEventListener('change', uploadImage);

        this._objectService.image(1, 1, this.staticValue)
    }

    public drawRectangle(ctx: CanvasRenderingContext2D) {
        return this.sub1$ = this.creatingStream().subscribe(() => {
            this._objectService.rectangle(this.startX, this.startY, this.staticValue);

            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.startX, this.startY - this.staticValue / 2);
            ctx.lineTo(this.startX + this.staticValue, this.startY - this.staticValue / 2);
            ctx.lineTo(this.startX + this.staticValue, this.startY);
            ctx.closePath();
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.stroke();
            this.sub1$.unsubscribe();
        })
    }

    public drawCircle(ctx: CanvasRenderingContext2D) {
        return this.sub2$ = this.creatingStream().subscribe(() => {
            this._objectService.circle(this.startX, this.startY, this.staticValue);

            ctx.beginPath();
            ctx.arc(this.startX, this.startY, (this.staticValue / 2), 0, Math.PI * 2);
            ctx.fillStyle = 'rgb(238, 130, 238)';
            ctx.fill();
            ctx.stroke();
            this.sub2$.unsubscribe();
        })
    }

    public drawLine(ctx: CanvasRenderingContext2D) {
        return this.sub3$ = this.creatingStream().subscribe(() => {
            this._objectService.line(this.startX, this.startY, this.staticValue);

            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.startX + this.staticValue, this.startY);
            ctx.stroke();
            this.sub3$.unsubscribe();
        }) 
    }
}