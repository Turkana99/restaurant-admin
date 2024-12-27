import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsSerice {
  async imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        reject(false);
      }
    });
  }
}
