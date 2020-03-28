import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { HttpClientModule, HttpClient } from  '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from  '@ngx-translate/core';
import { TranslateHttpLoader } from  '@ngx-translate/http-loader';
import { HeaderModule } from "src/app/header/header.module";
import { IonicStorageModule } from '@ionic/storage';

export  function  HttpLoaderFactory(http:  HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/translate/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    HeaderModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), 
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide:  TranslateLoader,
        useFactory:  HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule],

    
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    TranslateService,
    BackgroundGeolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [TranslateModule],  
  
  bootstrap: [AppComponent]
})
export class AppModule {}
