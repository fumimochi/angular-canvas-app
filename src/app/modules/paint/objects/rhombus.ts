import { CommonClass, IObjectConfig, IObjectModel } from './common-class';

export class CanvasRhombus extends CommonClass<IRhombusModel> {
  constructor(config: IObjectConfig<IRhombusModel>) {
    super(config);
  }

  draw(context: CanvasRenderingContext2D, object: Object) {
    context.fillStyle = '#fff';
    context.strokeStyle = '#000';
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(
      object['cordLeft'],
      object['cordTop'] + object['height'] / 2
    );
    context.lineTo(object['cordLeft'] + object['width'] / 2, object['cordTop']);
    context.lineTo(
      object['cordLeft'],
      object['cordTop'] - object['height'] / 2
    );
    context.lineTo(object['cordLeft'] - object['width'] / 2, object['cordTop']);
    context.closePath();
    context.fill();
    context.stroke();
  }
}

export interface IRhombusModel extends IObjectModel {
  width: number;
  height: number;
}
