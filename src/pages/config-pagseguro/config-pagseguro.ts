import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { PlugPagService } from '../../providers/plug-pag/plug-pag';

//providers
// import {PlugPagService} from '../../providers/plugpag/PlugPag';


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
  public refreshAuth:boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private plugpag:PlugPagService) {
  }

  CheckAuthentication(){
    this.refreshAuth = false;
    this.plugpag.CheckAuthentication().then(res=>{
      this.isAuthenticated = res;
    })
    .catch(err=>{
      console.log(err);
    })
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
    console.log('ionViewWillEnter');
    this.CheckAuthentication();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');

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
    this.refreshAuth = true;

    this.plugpag.ShowAuthenticationActivity().then(res=>{
      
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
