import { CommonClass, IObjectConfig, IObjectModel } from './common-class';

export class CanvasSuperellipse extends CommonClass<ISuperellipseModel> {
  constructor(config: IObjectConfig<ISuperellipseModel>) {
    super(config);
  }

  draw(context: CanvasRenderingContext2D, object: Object) {
    context.beginPath();
    context.lineCap = 'round';
    context.strokeStyle = 'purple';
    context.lineWidth = 4;
    context.moveTo(object['cordLeft'], object['cordTop'] - object['height']);
    context.arcTo(
      object['cordLeft'] + object['width'],
      object['cordTop'] - object['height'],
      object['cordLeft'] + object['width'],
      object['cordTop'] + object['height'],
      20
    );
    context.arcTo(
      object['cordLeft'] + object['width'],
      object['cordTop'] + object['height'],
      object['cordLeft'] - object['width'],
      object['cordTop'] + object['height'],
      20
    );
    context.arcTo(
      object['cordLeft'] - object['width'],
      object['cordTop'] + object['height'],
      object['cordLeft'] - object['width'],
      object['cordTop'] - object['height'],
      20
    );
    context.arcTo(
      object['cordLeft'] - object['width'],
      object['cordTop'] - object['height'],
      object['cordLeft'] + object['width'],
      object['cordTop'] - object['height'],
      20
    );
    context.closePath();
    context.strokeStyle = 'black';
    context.stroke();
  }
}

export interface ISuperellipseModel extends IObjectModel {
  height: number;
  width: number;
}
