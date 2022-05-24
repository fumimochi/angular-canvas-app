import { CommonClass, IObjectConfig, IObjectModel } from './common-class';

export class CanvasParallelogram extends CommonClass<IParallelogramModel> {
  constructor(config: IObjectConfig<IParallelogramModel>) {
    super(config);
  }

  draw(context: CanvasRenderingContext2D, object: Object) {
    context.beginPath();
    context.moveTo(object['cordLeft'], object['cordTop']);
    context.lineTo(
      object['cordLeft'] + 20,
      object['cordTop'] - object['height']
    );
    context.lineTo(
      object['cordLeft'] + 20 + object['length'],
      object['cordTop'] - object['height']
    );
    context.lineTo(object['cordLeft'] + object['length'], object['cordTop']);
    context.closePath();
    context.fillStyle = '#CCCCCC';
    context.fill();
    context.lineWidth = 4.0;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  }
}

export interface IParallelogramModel extends IObjectModel {
  length: number;
  height: number;
}
