import { CommonClass, IObjectConfig, IObjectModel } from './common-class';

export class CanvasLine extends CommonClass<ILineModel> {
  constructor(config: IObjectConfig<ILineModel>) {
    super(config);
  }

  draw(context: CanvasRenderingContext2D, object: Object) {
    context.beginPath();
    context.lineWidth = 8;
    context.moveTo(object['cordLeft'], object['cordTop']);
    if (
      Math.abs(object['cordLeft'] - object['endX']) >
      Math.abs(object['cordTop'] - object['endY'])
    ) {
      context.lineTo(object['endX'], object['cordTop']);
    } else {
      context.lineTo(object['cordLeft'], object['endY']);
    }
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.stroke();
  }
}

export interface ILineModel extends IObjectModel {
  endX: number;
  endY: number;
  length: number;
}
