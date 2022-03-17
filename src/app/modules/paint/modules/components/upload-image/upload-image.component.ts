import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {

  @Output() buttonClick = new EventEmitter();

  public upload() {
    this.buttonClick.emit();
  }
}
