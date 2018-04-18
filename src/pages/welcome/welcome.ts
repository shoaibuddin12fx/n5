import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User, Settings } from '../../providers/providers';
import { MainPage } from '../pages';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public user: User, public settings: Settings) {
    this.settings.loaduser().then((usr)=>{
      console.log(usr);
      if(usr != null){
        this.user._loggedIn(usr); 
        this.navCtrl.push(MainPage);
      }
    })
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
