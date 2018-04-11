import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "Name": "Entry Test",
        "ID": "2",
        "batchTypeId": "2",
        "viewType": "",
        "profilePic": "https://lh3.googleusercontent.com/8ssOg3Bmtd6HBCSvnNaOtFGmLhiasunYjfxu8WlQRLgjmjIYagZBKrN7fyadYloavA",
        "about": "Here you can prepare MDCAT ECAT or any Entry Test. 100% free full practice test."
      },
      {
        "Name": "Coaching Classes",
        "ID": "1",
        "batchTypeId": "1",
        "viewType": "",
        "profilePic": "http://www.hr-diagnostics.de/fileadmin/user_upload/Testbatterien/ENTRY-tuer-icon.png",
        "about": "Here you can choose cources and tests from one of the best teachers of TABS"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
