import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import {LocalUser} from '../../providers/local-user/local-user';
import {PlugPagService} from '../../providers/plugpag/PlugPag';
import { DefaultAlerts } from '../../providers/default-alerts/default-alerts';


/**
 * Generated class for the ConfigPagseguroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config-pagseguro',
  templateUrl: 'config-pagseguro.html',
})
export class ConfigPagseguroPage {
  public user:any = {};
  public libVersion:string = '';
  public isAuthenticated:boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private localUser:LocalUser,
              private plugpag:PlugPagService) {
  }

  CheckAuthentication(){
    this.plugpag.CheckAuthentication().then(res=>{
      this.isAuthenticated = res;
    })
    .catch(err=>{
      console.log(err);
    })
  }

  LoadUser(): any {
    this.localUser.CheckLoggedUser().then(res=>{
      this.user = res;
      console.log(this.user);
    });
  }

  GetLibVersion(){
    this.plugpag.GetLibVersion().then(res=>{
      this.libVersion = res;
    })
    .catch(err=>{
      this.libVersion = 'eRRor';
    })    
  }

  ionViewWillEnter(){
    this.CheckAuthentication();
  }

  ionViewDidLoad() {
    this.LoadUser();
    this.GetLibVersion();
    this.CheckAuthentication();
  }

  LogoutPagseguro(){
    this.plugpag.InvalidateAuthentication().then(res=>{
      this.isAuthenticated = false;
    })
    .catch(err=>{
      console.log('error to logout pagseguro');
    })
  }

  ShowAuthenticationActivity(){
    this.plugpag.ShowAuthenticationActivity().then(res=>{
      this.CheckAuthentication();
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
