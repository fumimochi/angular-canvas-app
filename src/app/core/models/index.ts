export namespace CoreModels {
  export interface IRectangle extends IShared {
    width: number;
    height: number;
  }
  export interface IRhombus extends IShared {
    width: number;
    height: number;
  }
  export interface IParallelogram extends IShared {
    height: number;
    side_length: number;
  }
  export interface ISuperellipse extends IShared {
    height: number;
    width: number;
  }
  export interface ILine extends IShared {
    endX: number;
    endY: number;
    length: number;
  }
  export interface ICircle extends IShared {
    radius: number;
    borderWidth?: number;
  }
  export interface IImage extends IShared {
    width: number;
    height: number;
    url?: any;
  }
  export interface IShared {
    id: number;
    type: string;
    cordLeft: number;
    cordTop: number;
    draggable: boolean;
  }
}
