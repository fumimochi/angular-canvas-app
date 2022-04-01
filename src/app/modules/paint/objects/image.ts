import { General } from "./general";
import { CoreModels } from "src/app/core/models";

export class ImageCanvas extends General implements CoreModels.IImage {
    public width: number;
    public height: number;

    constructor(id, type, cordLeft, cordTop, draggable, width, height) { 
        super(id, type, cordLeft, cordTop, draggable);
        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D, object) {
        let reader = new FileReader();
        let img = new Image();
        const uploadImage = (e) => {
            reader.onloadend = () => {
                img.onload = () => {
                    context.drawImage(img, object['cordLeft'], object['cordTop'])
                }
                img.src = `${reader.result}`;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        const imageLoader = document.getElementById('uploader');
        imageLoader.addEventListener('change', uploadImage);
    }
}