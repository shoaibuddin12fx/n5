import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, Settings } from '../../providers/providers';
import { CurrencyPipe } from '@angular/common/src/pipes';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = new Array();
  isHidden: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,  public settings: Settings) {
    // this.settings.loadreports().then(()=>{
    //   console.log(this.settings.reports);
    // })
  }

  ionViewWillEnter(){
    this.settings.loadreports().then(()=>{
      console.log(this.settings.reports);
      this.currentItems = this.settings.reports;
      

    })
    
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
