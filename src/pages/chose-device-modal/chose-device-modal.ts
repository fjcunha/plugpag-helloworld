import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlugPagService } from '../../providers/plug-pag/plug-pag';

/**
 * Generated class for the ChoseDeviceModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chose-device-modal',
  templateUrl: 'chose-device-modal.html',
})
export class ChoseDeviceModalPage {
  public devices = [];

  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams
              ,private plugpag:PlugPagService) {
  }

  ionViewDidLoad() {
    this.devices = this.navParams.get('devices') || [];
  }

  GetDeviceImage(deviceName){
    return this.plugpag.GetDeviceImage(deviceName);
  }

  Close(data = null){
    this.viewCtrl.dismiss(data);
  }

}
