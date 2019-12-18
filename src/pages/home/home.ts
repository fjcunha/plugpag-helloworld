import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button, ModalController } from 'ionic-angular';
import { PlugPagService } from '../../providers/plug-pag/plug-pag';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PresentPaymentData, PaymentType, InstallmentType } from '../../providers/plug-pag/PresentPayment.data';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public devices = [];
  private presentPaymentCheckoutData: PresentPaymentData;
  public inputAmount:number = 0;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private plugpag:PlugPagService,
              private bluetoothSerial: BluetoothSerial,
              private alertCtrl:AlertController,
              private modalCtrl:ModalController) {

    this.presentPaymentCheckoutData = {
      PaymentType:PaymentType.CREDITO,
      InstallmentType:InstallmentType.A_VISTA,
      amount:200,//valor inteiro, neste exemplo R$2,00
      SaleRef: "CODVENDA",
      installments: 1,
      deviceIdentification: ''
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
  }

  OpenConfigPagseguro(){
    this.navCtrl.push('ConfigPagseguroPage',{});
  }

  /**Method to filter availables PAGSEGURO devices */
  private filterPagSeguroBluetoothDevices(devices) {
    return this.plugpag.FilterPagSeguroBluetoothDevices(devices);
  }

  ChoseDevice() {
    let modal = this.modalCtrl.create('ChoseDeviceModalPage', {devices: this.devices});
    modal.onDidDismiss(data => {
      console.log(data);
      if (data != null) setTimeout(function (that) {
        that.PresentCheckout(data, that.presentPaymentCheckoutData);
      }, 500, this);
    })

    modal.present();
  }


  GetBoundedList(): any {
    console.log('getting list of bluetooths');
    
    this.bluetoothSerial.list().then(list => {
      this.devices = this.filterPagSeguroBluetoothDevices(list);
      if (this.devices.length == 0) {
        let alert = this.alertCtrl.create({title:'Transação não autorizada', 
                                          message:'Nenhum dispositivo PagSeguro foi encontrado ou autorizado para este celular. Verifique o pareamento do dispositivo ou a associação do dispositivo com este celular pelos Administradores do sistema.',
                                          buttons:['OK']
                                        });
        alert.present();
        return;
      } else {
        if (this.devices.length == 1) {
          let device = this.devices[0];
          this.PresentCheckout(device, this.presentPaymentCheckoutData);
        } else {
          this.ChoseDevice();
        }
      }

    })
    .catch(err => {
      console.log('error');

      console.log(err);
    })
  }

  CheckDevice() {
    this.bluetoothSerial.isEnabled().then(isEnable => {
      if (isEnable == "OK") this.GetBoundedList();
    })
    .catch(err => {
      let alert = this.alertCtrl.create({
        title:'Transação não autorizada', 
        message:'Verifique seu Bluetooth, não foi possível comunicar com dispositivo.',
        buttons:['OK']
      });
      alert.present();
      console.log('erro get bluetooth info');
    })
  }

  PresentCheckout(device, checkoutData: PresentPaymentData) {

    checkoutData.amount = this.inputAmount;

    console.log("Device:");
    console.log(JSON.stringify(device));
    console.log("Checkout Data:");
    console.log(JSON.stringify(checkoutData));
    checkoutData.deviceIdentification = device.address;
    console.log("Device Address: " + device.address);
    console.log("Checkout + Device:");
    console.log(JSON.stringify(checkoutData));
    this.plugpag.StartPayment(checkoutData).then(res => {
      console.log("Transaction Info " + res);
      console.log(JSON.stringify(res));
    })
    .catch(err => {
      console.log(err);
      if (err == null || err == '') {
        let alert = this.alertCtrl.create({
                                  title:'Erro transação', 
                                  message:'Não foi possível comunicar com o dispositivo.',
                                  buttons:['OK']
                                });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
                                title:'Erro transação', 
                                message:err,
                                buttons:['OK']
                              });
        alert.present();
      }

    })

  }

}
