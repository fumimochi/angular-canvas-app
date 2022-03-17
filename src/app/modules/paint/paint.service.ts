import { Injectable } from "@angular/core";
import { fromEvent, map, Subscription, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaintService {
    private x: number;
    private y: number;
    private startX = 0;
    private startY = 0;
    private cnvs = document.getElementsByTagName('canvas');
    private mouseDown$ = fromEvent(this.cnvs, 'mousedown');
    private mouseUp$ = fromEvent(this.cnvs, 'mouseup');
    private sub1$: Subscription;
    private sub2$: Subscription;
    private sub3$: Subscription;
    private sub4$: Subscription;

    private stream$ = this.mouseDown$
        .pipe(
            map((e: MouseEvent) => {
                this.startX = e.offsetX;
                this.startY = e.offsetY;
            }),
            switchMap(() => {
                return this.mouseUp$
                    .pipe(
                        map((e: MouseEvent) => {
                            this.x = e.offsetX;
                            this.y = e.offsetY;
                        })
                    )
            })
        )

    private unsubscribe() {
        this.sub1$?.unsubscribe();
        this.sub2$?.unsubscribe();
        this.sub3$?.unsubscribe();
        this.sub4$?.unsubscribe();
    }
    
    public rectangle(ctx) {
        this.unsubscribe();
        return this.sub1$ = this.forRectangle(ctx);
    }

    private forRectangle(ctx) {
        return this.stream$.subscribe(() => {
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.startX, this.y);
            ctx.lineTo(this.x, this.y);
            ctx.lineTo(this.x, this.startY);
            ctx.closePath();
            ctx.stroke();
        })
    }

    public circle(ctx) {
        this.unsubscribe();
        return this.sub2$ = this.forCircle(ctx);
    }

    private forCircle(ctx) {
        return this.stream$.subscribe(() => {
            ctx.beginPath();
            ctx.arc(this.startX, this.startY, Math.sqrt(Math.pow(Math.abs(this.startX - this.x), 2) + Math.pow(Math.abs(this.startY - this.y), 2)), 0, Math.PI * 2);
            ctx.stroke();
        })
    }

    public line(ctx) { 
        this.unsubscribe();
        return this.sub3$ = this.forLine(ctx);
    }

    private forLine(ctx) {
        return this.stream$.subscribe(() => {
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        })
    }

    public image(ctx, canvas) {
        this.unsubscribe();
        return this.sub4$ = this.forImage(ctx, canvas);
    }

    private forImage(ctx, canvas) {
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

        return fromEvent(this.cnvs, 'onchange')
            .subscribe(e => {
                uploadImage(e)
            })
    }
}