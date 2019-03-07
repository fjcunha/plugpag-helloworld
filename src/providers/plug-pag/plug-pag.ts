
import { Injectable } from '@angular/core';
import { General, PresentPaymentData } from './PresentPayment.data';


declare var window;
@Injectable()
export class PlugPagService {

  constructor() {
    console.log('Hello PlugPagProvider Provider');
  }

   /** Method to check if has a pagseguro account authenticated on the phone */
   CheckAuthentication(): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (window.cordova) {
        window.cordova.plugins.PlugPag.checkAuthentication(function (success) {
          resolve(success.isAuthenticated);
        },
        function (error) {
          reject(error);
        })
      } else {
        reject('Cordova not founded');
      }
    })
  }

  /** Returns the Plugpag lib version used on the project */
  GetLibVersion(): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (window.cordova) {
        window.cordova.plugins.PlugPag.getLibVersion(function (success) {
          resolve(success);
        },
        function (error) {
          reject(error);
        })
      } else {
        resolve('NaN');
      }
    })
  }

  /** Method to remove authenticated pagseguro account for the phone */
  InvalidateAuthentication():Promise<any>{
    return new Promise(function(resolve,reject){
      if(window.cordova){
        window.cordova.plugins.PlugPag.invalidateAuthentication(function(success){
          resolve('success');
        },
        function(error){
          reject(error);
        })
      }else {
        reject('Cordova not founded');
      }
    })
  }

  /** Calls pagseguro activity to log in a pagseguro account */
  ShowAuthenticationActivity():Promise<any>{
    return new Promise(function(resolve,reject){
      if(window.cordova){
        window.cordova.plugins.PlugPag.showAuthenticationActivity(function(success){
          resolve(success);
        },
        function(error){
          reject(error);
        })
      }else {
        reject('Cordova not founded');
      }
    })
  }

  /**Method to filter availables PAGSEGURO devices */
  FilterPagSeguroBluetoothDevices(paymentSerialDevice, devices) {
    let filtered = [];
    if (devices == null) return;

    devices.forEach(element => {
        if (element.name == paymentSerialDevice){
          filtered.push(element);
        }       
      });

    //WITH MORE THAN ONE DEVICE
    // devices.forEach(element => {
    //   if (element.name.startsWith("PRO-") ||
    //       element.name.startsWith("W-") ||
    //       element.name.startsWith("W+-") ||
    //       element.name.startsWith("MOBI-") ||
    //       element.name.startsWith("PAX-") ||
    //       element.name.startsWith("PLUS-") ||
    //       element.name.startsWith("MCHIP-"))   filtered.push(element);
      
    //});
    return filtered;
  }

  /** Get image by type of device  */
  GetDeviceImage(name:string):string{
    if(name.startsWith('PRO-')) return 'assets/imgs/moderninha_pro.png';
    else if(name.startsWith('PAX-') || name.startsWith("MCHIP-")) return 'assets/imgs/minizinha_chip.png';

    return null;
  }


  /** Do Payment
   * @argument paymentData informations of payment @type PresentPaymentData
   */
  StartPayment(paymentData:PresentPaymentData):Promise<any>{
    return new Promise(function(resolve,reject){
      setTimeout(function(){reject("Timeout");},
      40000);

      if(window.cordova){
        window.cordova.plugins.PlugPag.startPayment(paymentData,function(success){
          if(success.TransactionCode){
            resolve(success);
          }
          else{
            reject(success.Message);
          }
          
        },
        function(error){
          reject(error);
        })
      }else {
        reject('Cordova not founded');
      }
    })
  }

  initBTConnection(deviceId:string):Promise<any>{
    return new Promise(function(resolve,reject){
      setTimeout(function(){reject("Timeout");},
      40000);

      if(window.cordova){
        window.cordova.plugins.PlugPag.initBTConnection(deviceId,function(success){
          if(success.Result == General.RET_OK){
            resolve({status:true,message:success.Message})
          }else{
            reject({status:false,message:success.Message})
          }
        },
        function(error){
          reject(error);
        })
      }else {
        reject('Cordova not founded');
      }
    })
  }

}
