import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User, Settings } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, username: string, email: string, password: string, gender: string } = {
    name: '',
    username : '',
    email: '',
    password: '',
    gender: '1'
  };


  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public settings: Settings) {

  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {

      console.log(resp);
      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        this.user._loggedIn(resp["Data"][0]);
        this.settings.saveuser(resp["Data"][0]);
        // this.navCtrl.push(MainPage);
        this.navCtrl.setRoot(MainPage);
        this.navCtrl.popToRoot();
      }

    }, (err) => {
      this.showError(err);
    });
  }

  showError(err: string){
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
