import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: 'shoaibuddin',
    password: 'hotmail1VU'
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {

      console.log("boo", resp);
      let d = new Array(resp["Data"]);

      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        this.user._loggedIn(resp["Data"][0]);
        this.navCtrl.push(MainPage);
      }

      




    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
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
