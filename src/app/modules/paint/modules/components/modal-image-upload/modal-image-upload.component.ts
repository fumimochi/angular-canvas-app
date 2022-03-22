import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaintService } from '../../../paint.service';

@Component({
  selector: 'app-modal-image-upload',
  templateUrl: './modal-image-upload.component.html',
  styleUrls: ['./modal-image-upload.component.scss']
})
export class ModalImageUploadComponent {
  public isModal: boolean = false;
  private modalCtx;
  private modalCnvs;

  constructor(
    public dialogRef: MatDialogRef<ModalImageUploadComponent>,
    private _paintService: PaintService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.isModal = true;
    this.modalCtx = data.ctx;
    this.modalCnvs = data.canvas
  }

  public upload() {
    this._paintService.image(this.modalCtx, this.modalCnvs);
  }

  public close() {
    this.isModal = false;
    this.dialogRef.close();
  }

}
