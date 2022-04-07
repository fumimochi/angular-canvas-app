// import { Injector } from "@angular/core";
// import { config } from "process";

// export class ObjectFabric {

//     constructor(private readonly _injector: Injector) {  }

//     public produce<T extends IItemBase>({ model, xml }: IProduceConfig): LibCanvasObject<T> {
//         const config: ICanvasObjConfig = {
//             model,
//             injector: this._injector,
//         };
//     }

//     return this._factory[config.model.objectType](config) as LibCanvasObject<T>;
// }