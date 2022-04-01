import { General } from "./general";
import { CoreModels } from "src/app/core/models";

export class LineCanvas extends General implements CoreModels.ILine { 
    public length: number; 

    constructor(id, type, cordLeft, cordTop, draggable, length) { 
        super(id, type, cordLeft, cordTop, draggable);
        this.length = length;
    }

    draw(context: CanvasRenderingContext2D, object: Object) {
        context.beginPath();
            context.moveTo(object['cordLeft'], object['cordTop']);
            context.lineTo(object['cordLeft'] + object['length'], object['cordTop']);
            context.stroke();
    }
}