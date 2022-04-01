import { General } from "./general";
import { CoreModels } from "src/app/core/models";

export class RectangleCanvas extends General implements CoreModels.IRectangle {
    public width: number;
    public height: number;

    constructor(id, type, cordLeft, cordTop, draggable, width, height) { 
        super(id, type, cordLeft, cordTop, draggable);
        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D, object: Object) {
        context.beginPath();
            context.moveTo(object['cordLeft'], object['cordTop']);
            context.lineTo(object['cordLeft'], object['cordTop'] - object['height']);
            context.lineTo(object['cordLeft'] + object['width'], object['cordTop'] - object['height']);
            context.lineTo(object['cordLeft'] + object['width'], object['cordTop']);
            context.closePath();
            context.fillStyle = "blue";
            context.fill();
            context.stroke();
    }
}