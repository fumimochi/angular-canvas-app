import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EventsService } from 'src/app/core/services/events.service';

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
    private _eventsService: EventsService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.isModal = true;
    this.modalCtx = data.ctx;
    this.modalCnvs = data.canvas;
  }

  public upload() {
    this._eventsService.drawImage();
  }

  public close() {  
    this.isModal = false;
    this.dialogRef.close();
  }

}
