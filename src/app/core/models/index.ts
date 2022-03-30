export namespace CoreModels {
    export interface IRectangle extends IShared {
        width: number;
        height: number;
    }
    export interface ILine extends IShared {
        length: number;
    }
    export interface ICircle extends IShared {
        radius: number;
    }
    export interface IImage extends IShared {
        width: number;
        height: number;
    }
    export interface IShared {
        id: number;
        type: string;
        cordLeft: number;
        cordTop: number;
        draggable: boolean;
    }
}