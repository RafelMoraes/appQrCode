import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HistoricoService } from '../services/historico.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})  
export class Tab1Page {
  qrScan: any;
  public corpoPagina: HTMLElement;
  public img: HTMLElement;
  public scanner: any;
  public resultado: string;
  public link = false
  public texto: string;

  constructor(private qrScanner: QRScanner,
              private dialogs: Dialogs, 
              public platform: Platform, 
              private screenOrientation: ScreenOrientation,
              public historicoSercice: HistoricoService){ 

    this.platform.backButton.subscribeWithPriority(0, ()=>{

      this.corpoPagina.style.opacity = "1  ";
      this.img.style.opacity = "1";

      this.resultado = null;
      this.link = false;

      this.qrScanner.hide();
      this.scanner.unsubscribe();
    });

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  public lerQRCode(){
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qrScanner.show();
        this.corpoPagina = document.getElementsByTagName('ion-content')[0] as HTMLElement;
        this.corpoPagina.style.opacity = "0";
        this.img = document.getElementById("logo") as HTMLElement;
        this.img.style.opacity = "0";
        this.scanner = this.qrScanner.scan().subscribe((text: string) => {
          this.verificaLink(text['result']);
          this.resultado = (text['result']);
          this.corpoPagina.style.opacity = "1  ";
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

  public verificaLink(texto: string) {
    const inicio = texto.substring(0, 4);
    console.log(inicio);
    if (inicio == "www." || inicio == "http"){
      this.link = true;
    } else {
      this.link = false;
    }
  }

  ngOnInit() {
  }

}
