import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HistoricoService } from './services/historico.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    QRScanner,
    Dialogs,
    ScreenOrientation,
    HistoricoService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
