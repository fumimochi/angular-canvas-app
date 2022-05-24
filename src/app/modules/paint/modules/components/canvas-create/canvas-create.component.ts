import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModels } from 'src/app/core/routes';

import { CanvasService } from 'src/app/core/services/canvas.service';
import { ObjectService } from 'src/app/core/services/object.service';
import { RenderService } from 'src/app/core/services/render.service';
import { PaintElems } from '../../../models';

@Component({
  selector: 'app-canvas-create',
  templateUrl: './canvas-create.component.html',
  styleUrls: ['./canvas-create.component.scss'],
})
export class CanvasCreateComponent implements AfterViewInit, OnInit {
  private canvasId: number = 0;
  private inputId: number = 0;
  private current: number;
  public changingMode: boolean = false;
  private _baseRoute = 'http://localhost:3000/users/';

  public tools: Array<string> = [
    PaintElems.ElemEnum.RECTANGLE,
    PaintElems.ElemEnum.PARALLELOGRAM,
    PaintElems.ElemEnum.RHOMBUS,
    PaintElems.ElemEnum.SUPERELLIPSE,
    PaintElems.ElemEnum.CIRCLE,
    PaintElems.ElemEnum.LINE,
  ];

  @ViewChild('myCanvas')
  private myCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private txtChosen: boolean = false;

  public inputArr: Array<UserModels.Input.IInput> = [];

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
    this.myCanvas.nativeElement.width = this._canvasService.canvasWidth;
    this.myCanvas.nativeElement.height = this._canvasService.canvasHeight;
    this._canvasService.initialization(this.myCanvas.nativeElement, this.ctx);
  }

  ngOnInit() {
    this.current = +this.activateRoute.snapshot.paramMap.get('id');
    let user = JSON.parse(window.localStorage.getItem('token'));
    if (this.current > 0) {
      this.changingMode = true;
      this._http.get(`${this._baseRoute}/${user.id}`).subscribe((e) => {
        this._renderService.renderSaved(
          this._objectService.stateObjects(
            e['canvas'][this.current - 1]['objects']
          )
        );
        this.inputArr = e['canvas'][this.current - 1]['inputs'];
        if (this.inputArr) {
          this._renderService.renderInputs(this.inputArr);
        } else {
          this.inputArr = [];
        }
      });
    } else {
      this.changingMode = false;
    }
  }

  constructor(
    private readonly _objectService: ObjectService,
    private readonly _canvasService: CanvasService,
    private readonly _renderService: RenderService,
    private readonly activateRoute: ActivatedRoute,
    private readonly _http: HttpClient
  ) {}

  public clear() {
    this._objectService.objectsArray = [];
    this.inputArr = [];
    this._canvasService.clearCanvas();
  }

  public selectObject() {
    this._objectService.selectObject();
  }

  public draw(tool: any) {
    this._objectService.creature(tool, this.ctx);
  }

  public addText() {
    this.txtChosen = false;
    addEventListener('mousedown', (e) => {
      if (!this.txtChosen) {
        this.txtChosen = true;

        let input = document.createElement('input');
        input.style.position = 'absolute';
        input.style.top = `${e.offsetY + 140}px `;
        input.style.left = `${e.offsetX + 295}px`;
        input.style.border = 'none';
        input.style.fontSize = '24px';
        input.style.textAlign = 'center';
        input.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        document.body.appendChild(input);

        let item = {
          id: ++this.inputId,
          text: input.textContent,
          cordTop: +input.style.top.replace('px', ''),
          cordLeft: +input.style.left.replace('px', ''),
        };
        this.inputArr.push(item);

        input.addEventListener('change', (e) => {
          this.inputArr
            .filter((inpt) => inpt.id === item.id)
            .map((i) => (i.text = e.target['value']));
          console.log(this.inputArr);
        });

        input.addEventListener('keydown', (e) => {
          if (e.key == 'Delete') {
            this.inputArr.filter((inpt) => inpt.id !== item.id);
            document.body.removeChild(input);
          }
        });
      }
    });
  }

  public saveCanvas() {
    let date = new Date();
    let user = JSON.parse(window.localStorage.getItem('token'));
    let canvasObject: UserModels.Canvas.ICanvas = {
      id: ++this.canvasId,
      title: `Canvas ${this.canvasId}`,
      timeCreation: date,
      objects: this._objectService.returnObjects(),
      inputs: this.inputArr,
    };
    this._http.get(`${this._baseRoute}/${user.id}`).subscribe((e) => {
      e['canvas'].push(canvasObject);
      this._http.put(`${this._baseRoute}/${user.id}`, e).subscribe();
    });
  }

  public saveChanges() {
    let user = JSON.parse(window.localStorage.getItem('token'));
    this._http.get(`${this._baseRoute}/${user.id}`).subscribe((e) => {
      e['canvas'][this.current - 1]['inputs'] = this.inputArr;
      e['canvas'][this.current - 1]['objects'] =
        this._objectService.returnObjects();
      this._http.put(`${this._baseRoute}/${user.id}`, e).subscribe();
    });
  }
}
