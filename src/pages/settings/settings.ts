import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { User, Settings } from '../../providers/providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  
  account: { password: string } = {
    password: ''
  };

  profile: any;

  constructor(public navCtrl: NavController,
    public user: User,
    private alertCtrl: AlertController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService) {

      this.profile = {};
      this.settings.loaduser().then((prp) =>{
        console.log(prp);
        this.profile = prp;
      });

  }


  ionViewDidLoad() {
    // Build an empty form for the template to render

  }

  ionViewWillEnter() {

    

    
  }

  plogout(){
    this.user.logout();
    this.settings.deleteuser();
    window.location.reload();
  }

  changePassword(){
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Password Changed' ,
      message: 'Thank you',
      buttons: [
        {
          text: 'Done',
          handler: () => {
              // do something
          }
        }
      ]
    });
    alert.present();
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
