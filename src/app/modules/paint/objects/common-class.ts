import { Injector } from "@angular/core";

import { CoreModels } from "src/app/core/models";

export abstract class CommonClass<T extends IObjectModel = IObjectModel>
    // implements CoreModels.IShared
{    
    protected readonly injector: Injector;
    protected model: T;

    constructor({ injector, model }: IObjectConfig<T>) {
        this.injector = injector;
        this.model = model;
    }

    abstract draw(context: CanvasRenderingContext2D, object: Object);
}

export interface IObjectConfig<T> {
    model: T;
    injector: Injector;
}

export interface IObjectModel {
    readonly id: number;
    type: string;
    cordLeft: number;
    cordTop: number;
    draggable: boolean;
}