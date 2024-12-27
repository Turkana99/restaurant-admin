import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-background-loader',
  templateUrl: './background-loader.component.html',
  styleUrls: ['./background-loader.component.scss'],
})
export class BackgroundLoaderComponent {
  isLoading = true;
  @Input() backgroundImageUrl = ''; // Replace with your image URL
  @Input() fileId = 0;
  @Output() onDeleteImage = new EventEmitter<any>();

  ngOnInit() {
    const img = new Image();
    img.src = encodeURI(this.backgroundImageUrl);

    img.onload = () => {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    };
  }

  deleteAttachment() {
    this.onDeleteImage.emit(this.fileId);
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }
}
