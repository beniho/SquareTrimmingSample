import { Component } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
const { Filesystem } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //画像データ
  image

  constructor(private actionSheetController: ActionSheetController, private crop: Crop) {}

  /* -------------------------------
  画像取得
  ------------------------------- */
  async getPhoto() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: '写真を撮る',
        handler: () => {
          this.takeCamera();
        }
      }, {
        text: 'アルバムから選択',
        handler: () => {
          this.takePhotoLibrary();
        }
      }, {
        text: 'キャンセル',
        role: 'cancel',
        handler: () => {
          //キャンセル処理
        }
      }]
    });
    await actionSheet.present();
  }

  /* -------------------------------------------
  カメラ
  ------------------------------------------- */
  async takeCamera() {
    await Plugins.Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    }).then((image) => {
      this.crop.crop(image.path, { quality: 100}).then((imageData) => {
        Filesystem.readFile({
          path: imageData
        }).then((cropImage) => {
          //画像を取得
          this.image = "data:image/jpeg;base64," + cropImage.data;
        });
      });
    });
  }

  /* -------------------------------------------
  フォトライブラリ
  ------------------------------------------- */
  async takePhotoLibrary() {
    await Plugins.Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    }).then((image) => {
      this.crop.crop(image.path, { quality: 100}).then((imageData) => {
        Filesystem.readFile({
          path: imageData
        }).then((cropImage) => {
          //画像を取得
          this.image = "data:image/jpeg;base64," + cropImage.data;
        });
      });
    });
  }
}