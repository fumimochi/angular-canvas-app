import { CommonClass, IObjectConfig, IObjectModel } from './common-class';

export class CanvasCircle extends CommonClass<ICircleModel> {
  constructor(config: IObjectConfig<ICircleModel>) {
    super(config);
  }

  draw(context: CanvasRenderingContext2D, object: Object) {
    context.beginPath();
    context.lineWidth = 4;
    context.arc(
      object['cordLeft'],
      object['cordTop'],
      object['radius'] / 2,
      0,
      Math.PI * 2
    );
    context.fillStyle = 'rgb(238, 130, 238)';
    context.fill();
    context.stroke();
  }
}

export interface ICircleModel extends IObjectModel {
  radius: number;
}
