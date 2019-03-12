import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoseDeviceModalPage } from './chose-device-modal';

@NgModule({
  declarations: [
    ChoseDeviceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoseDeviceModalPage),
  ],
})
export class ChoseDeviceModalPageModule {}
