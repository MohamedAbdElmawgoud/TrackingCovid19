import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundGeolocation,
   BackgroundGeolocationConfig,
    BackgroundGeolocationEvents, 
    BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { ToastController } from "@ionic/angular";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  textDir: string;
  location: any = [];
  constructor( public toastCtrl: ToastController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundGeolocation: BackgroundGeolocation,
    public translate:  TranslateService
  )
  
  {
    
    this.initializeApp();
    const  currentLanguage  =  localStorage.getItem('lng') || 'en'
    this.Translate(currentLanguage);
    
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'ar')
      {
        this.textDir = 'rtl';
      }
      else
      {
        this.textDir = 'ltr';
      }
    });
  
  }

  
  Translate(type: string){
    
    
      this.translate.use(type);// ar or en
      
    
    }
    
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backGround();
    });
  }
  backGround(){
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};

this.backgroundGeolocation.configure(config)
.then(() => {

this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
console.log('location is : ' + location);
this.location.push(location);
this.showToast(this.location);
// IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
// and the background-task may be completed.  You must do this regardless if your operations are successful or not.
// IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
this.backgroundGeolocation.finish(); // FOR IOS ONLY
});

});

// start recording location
this.backgroundGeolocation.start();

  }
  async showToast(message) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
