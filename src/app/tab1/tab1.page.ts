import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public scanner: any;

  public body: HTMLElement;
  public img: HTMLElement;

  constructor(private qrScanner: QRScanner, public alertController: AlertController, public platform: Platform) {
    this.platform.backButton.subscribeWithPriority(0, () => {

      this.body.style.opacity = "1";
      this.img.style.opacity = "1";

      this.qrScanner.hide();
      this.scanner.unsubscribe();
    });
  }

  public lerQRCode() {

    this.body = document.getElementsByTagName("ion-content")[0] as HTMLElement;

    this.img = document.getElementById('logo') as HTMLElement;

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.body.style.opacity = "0";
          this.img.style.opacity = "0";
          this.qrScanner.show();
          this.scanner = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.presentAlert(text);

            this.body.style.opacity = "1";
            this.img.style.opacity = "1";

            this.qrScanner.hide();
            this.scanner.unsubscribe();
          });

        } else if (status.denied) {
        } else {
        }
      })
      .catch((e: any) => console.log('Error is', e));

  }

  async presentAlert(text) {
    const alert = await this.alertController.create({
      header: 'Leitor de QRCode',
      subHeader: 'Resultado:',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

}
