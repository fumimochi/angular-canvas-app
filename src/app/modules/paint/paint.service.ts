import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PaintService {
    private x: number;
    private y: number;
    
    public rectangle(ctx, canvas) {
        let startX = 0;
        let startY = 0;
        let oppositeX = 0;
        let oppositeY = 0;

        canvas.nativeElement.onmousedown = (e) => {
            startX = e.offsetX;
            startY = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
        canvas.nativeElement.onmouseup = (e) => {
            oppositeX = e.offsetX;
            oppositeY = e.offsetY;
            ctx.lineTo(startX, oppositeY);
            ctx.lineTo(oppositeX, oppositeY);
            ctx.lineTo(oppositeX, startY);
            ctx.closePath();
            ctx.stroke();
        }
    }

    public circle(ctx, canvas) {
        let startX = 0;
        let startY = 0;
        canvas.nativeElement.onmousedown = (e) => {
            startX = e.offsetX;
            startY = e.offsetY;
            ctx.beginPath();
        }
        canvas.nativeElement.onmouseup = (e) => {
            this.x = e.offsetX;
            this.y = e.offsetY;
            ctx.arc(startX, startY, Math.sqrt(Math.pow(Math.abs(startX - this.x), 2) + Math.pow(Math.abs(startY - this.y), 2)), 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    public line(ctx, canvas) {
        canvas.nativeElement.onmousedown = (e) => {
            this.x = e.offsetX;
            this.y = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
        }
        canvas.nativeElement.onmouseup = (e) => {
            this.x = e.offsetX;
            this.y = e.offsetY;
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }
    }

    public image(ctx, canvas) {
        let reader = new FileReader();
        let image = new Image();

        const uploadImage = (e) => {
            reader.onload = () => {
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0)
                }
                image.src = `${reader.result}`;
            }
            reader.readAsDataURL(e.target.files[0]);
        }

        const imageLoader  = document.getElementById('uploader');
        imageLoader.addEventListener('change', uploadImage);

        // canvas.nativeElement.onmouseup = (e) => {
        //     this.x = e.offsetX;
        //     this.y = e.offsetY;
        //     ctx.drawImage(image, this.x, this.y);
        // }
    }
}