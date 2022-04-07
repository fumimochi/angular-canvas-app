import { CommonClass, IObjectConfig, IObjectModel } from "./common-class";
import { CoreModels } from "src/app/core/models";

export class CanvasImage extends CommonClass<IImageModel> {

    constructor(config: IObjectConfig<IImageModel>) { 
        super(config);
    }

    draw(context: CanvasRenderingContext2D, object) {
        let reader = new FileReader();
        let img = new Image();
        const uploadImage = (event) => {
            reader.onloadend = () => {
                img.onload = () => {
                    context.drawImage(img, object['cordLeft'], object['cordTop'])
                }
                img.src = `${reader.result}`;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        const imageLoader = document.getElementById('uploader');
        imageLoader.addEventListener('change', uploadImage);
    }
}

export interface IImageModel extends IObjectModel {
    width: number;
    height: number;
}