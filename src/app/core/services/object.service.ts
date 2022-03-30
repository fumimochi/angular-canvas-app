import { Injectable } from "@angular/core";

import { CoreModels } from "../models";

@Injectable({
    providedIn: 'root'
})
export class ObjectService  {
    public id: number = 0;
    public draggable: boolean;
    public objectsArray: Array<any> = [];

    constructor() {  }

    private addObj(object) {
        this.objectsArray.push(object);
        console.log(this.objectsArray);
    }

    public removeObj(object) {
        this.objectsArray.filter(obj => JSON.stringify(obj)!==JSON.stringify(object));
    }

    public image(cordLeft: number, cordTop: number, staticValue: number) {
        let image = {
            id: ++this.id,
            type: 'image',
            cordLeft,
            cordTop,
            draggable: false,
            width: staticValue,
            height: staticValue
        }
        this.addObj(image);
    }

    public rectangle(cordLeft: number, cordTop: number, staticValue: number) {
        // let rectangle = new Rectangle(++this.id, this.startX, this.startY, false, this.staticValue, this.staticValue / 2);
        let rectangle = {
            id: ++this.id,
            type: 'rectangle',
            cordLeft,
            cordTop,
            draggable: false,
            width: staticValue,
            height: staticValue / 2
        }
        this.addObj(rectangle);
    }

    public circle(cordLeft: number, cordTop: number, staticValue: number) {
            let circle = {
            id: ++this.id,
            type: 'circle',
            cordLeft,
            cordTop,
            draggable: false,
            radius: staticValue
        }
        this.addObj(circle);
    }

    public line(cordLeft: number, cordTop: number, staticValue: number) {
        let line = {
            id: ++this.id,
            type: 'line',
            cordLeft,
            cordTop,
            draggable: false,
            length: staticValue
        }
        this.addObj(line);
    }
}

// class ImageLoad extends ObjectService implements CoreModels.IImage {
//     public width: number;
//     public height: number;

//     constructor(id, cordLeft, cordTop, draggable, width, height) { 
//         super();
//         this.id = id;
//         this.cordLeft = cordLeft;
//         this.cordTop = cordTop;
//         this.draggable = draggable;
//         this.width = width;
//         this.height = height;
//     }

//     drawImage(context, canvas) {
//         let reader = new FileReader();
//         let image = new Image();
//         const uploadImage = (e) => {
//             reader.onloadend = () => {
//                 image.onload = () => {
//                     canvas.width = image.width;
//                     canvas.height = image.height;
//                     context.drawImage(image, 0, 0)
//                 }
//                 image.src = `${reader.result}`;
//             }
//             reader.readAsDataURL(e.target.files[0]);
//         }
//         const imageLoader  = document.getElementById('uploader');
//         imageLoader.addEventListener('change', uploadImage);
//     }
// }

// class Rectangle extends ObjectService implements CoreModels.IRectangle {
//     public width: number;
//     public height: number;

//     constructor(id, cordLeft, cordTop, draggable, width, height) { 
//         super();
//         this.id = id;
//         this.cordLeft = cordLeft;
//         this.cordTop = cordTop;
//         this.draggable = draggable;
//         this.width = width;
//         this.height = height;
//     }

//     drawRectangle(context) {
//         return this.sub1$ = this.stream$.subscribe(() => {
//             context.beginPath();
//             context.moveTo(this.startX, this.startY);
//             context.lineTo(this.startX, this.startY - this.staticValue / 2);
//             context.lineTo(this.startX + this.staticValue, this.startY - this.staticValue / 2);
//             context.lineTo(this.startX + this.staticValue, this.startY);
//             context.closePath();
//             context.stroke();
//             this.sub1$.unsubscribe();
//         })
//     }
// }

// class Line extends ObjectService implements CoreModels.ILine { 
//     public length: number; 

//     constructor(id, cordLeft, cordTop, draggable, length) { 
//         super();
//         this.id = id;
//         this.cordLeft = cordLeft;
//         this.cordTop = cordTop;
//         this.draggable = draggable;
//         this.length = length;
//     }

//     drawLine(context) {
        // return this.sub3$ = this.stream$.subscribe(() => {
        //     context.beginPath();
        //     context.moveTo(this.startX, this.startY);
        //     context.lineTo(this.startX + this.length, this.y);
        //     context.stroke();
        //     this.sub3$.unsubscribe();
        // })
//     }
// }

// class Circle extends ObjectService implements CoreModels.ICircle {
//     public radius: number;

//     constructor(id, cordLeft, cordtTop, draggable, radius) {
//         super();
//         this.id = id;
//         this.cordLeft = cordLeft;
//         this.cordTop = cordtTop;
//         this.draggable = draggable;
//         this.radius = radius;
//     }

//     drawCircle(context) {
        // return this.sub2$ = this.stream$.subscribe(() => {
        //     context.beginPath();
        //     context.arc(this.startX, this.startY, (this.radius / 2), 0, Math.PI * 2);
        //     context.stroke();
        //     this.sub2$.unsubscribe();
        // })
//     }
// }

// abstract class Tool implements CoreModels.IShared {
//     constructor(public id, public cordLeft, public cordTop, public draggable) { 
//         this.id = id;
//         this.cordLeft = cordLeft;
//         this.cordTop = cordTop;
//         this.draggable = draggable;
//     }
// }