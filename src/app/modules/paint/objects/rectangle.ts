import { CommonClass, IObjectConfig, IObjectModel } from './common-class';

export class CanvasRectangle extends CommonClass<IRectangleModel> {
  constructor(config: IObjectConfig<IRectangleModel>) {
    super(config);
  }

  draw(context: CanvasRenderingContext2D, object: Object) {
    context.beginPath();
    context.moveTo(object['cordLeft'], object['cordTop']);
    context.lineTo(object['cordLeft'], object['cordTop'] - object['height']);
    context.lineTo(
      object['cordLeft'] + object['width'],
      object['cordTop'] - object['height']
    );
    context.lineTo(object['cordLeft'] + object['width'], object['cordTop']);
    context.closePath();
    context.lineWidth = 4;
    context.fillStyle = '#FDB64B';
    context.fill();
    context.stroke();
  }
}

export interface IRectangleModel extends IObjectModel {
  width: number;
  height: number;
}
