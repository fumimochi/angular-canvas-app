import { CoreModels } from "src/app/core/models";

export abstract class General implements CoreModels.IShared {

    constructor(public id, public type, public cordLeft, public cordTop, public draggable) { 
        this.id = id;
        this.type = type;
        this.cordLeft = cordLeft;
        this.cordTop = cordTop;
        this.draggable = draggable;
    }

    abstract draw(context: CanvasRenderingContext2D, object: Object);
}