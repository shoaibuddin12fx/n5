import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  currentItems: Item[];

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public user: User, public toastCtrl: ToastController) {
    this.item = navParams.get('item') || items.defaultItem;
    this.fetchClasses()
  }

  fetchClasses() {
    // Attempt to login in through our User service
    this.user.getClasses(this.item).subscribe((resp) => {

      console.log(resp);
      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        this.currentItems = resp["Data"];
        
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
