import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  base64String: any;
  capturedPhoto: any;

  constructor(private http: HttpClient) {}

  takePicture = async () => {
    const capturedPhoto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    capturedPhoto.format = 'PNG';
    this.capturedPhoto = capturedPhoto;
    this.base64String = `data:image/jpeg;base64,${capturedPhoto.base64String}`;
  };

  print() {
    console.log('this.capturedPhoto', this.capturedPhoto);
    const url = 'http://localhost:5001/snap';
    this.http.post(url, { encodedImageString: this.base64String });
  }
}
