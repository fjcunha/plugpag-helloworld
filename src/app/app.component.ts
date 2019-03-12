import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private androidPermissions:AndroidPermissions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkPermissions();
    });
  }

  checkPermissions(){
    let permissions = [];
    permissions.push(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
    permissions.push(this.androidPermissions.PERMISSION.GET_ACCOUNTS);
    permissions.push(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);
    permissions.push(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION);
    permissions.push(this.androidPermissions.PERMISSION.READ_PHONE_STATE);
    permissions.push(this.androidPermissions.PERMISSION.BLUETOOTH);
    this.androidPermissions.requestPermissions(permissions).then(resP=>{
      console.log('PERMISSIONS REQUEST RESULT: ' + JSON.stringify(resP));      
    })

  
  }
}

