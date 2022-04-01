import { General } from "./general";
import { CoreModels } from "src/app/core/models";

export class CircleCanvas extends General implements CoreModels.ICircle {
    public radius: number;

    constructor(id, type, cordLeft, cordTop, draggable, radius) {
        super(id, type, cordLeft, cordTop, draggable);
        this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D, object: Object) {
        context.beginPath();
        context.arc(object['cordLeft'], object['cordTop'], (object['radius'] / 2), 0, Math.PI * 2);
        context.fillStyle = 'rgb(238, 130, 238)';
        context.fill();
        context.stroke();
    }
}