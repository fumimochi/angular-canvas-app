import { CommonClass, IObjectConfig, IObjectModel } from "./common-class";

export class CanvasLine extends CommonClass<ILineModel> { 
    
    constructor(config: IObjectConfig<ILineModel>) {
        super(config);
    }

    draw(context: CanvasRenderingContext2D, object: Object) {
        context.beginPath();
            context.moveTo(object['cordLeft'], object['cordTop']);
            context.lineTo(object['cordLeft'] + object['length'], object['cordTop']);
            context.stroke();
    }
}

export interface ILineModel extends IObjectModel {
    length: number;
}