import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController,  NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, User } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  viewType: string;
  viewHeader: string;

  constructor(public navCtrl: NavController, 
    navParams: NavParams, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public user: User,
    public toastCtrl: ToastController) {

    this.currentItems = navParams.get('items') || this.items.query();
    
    switch (this.currentItems[0]["viewType"]) {
      case "":
        this.viewHeader = "Welcome ! Pick One"    
        this.viewType = "TABS Entities"
        break;
      case "classes":
      this.viewHeader = "Pick One"    
      this.viewType = "Teaching Classes"
        break;
      case "subjects":
      this.viewHeader = "Pick One"    
      this.viewType = "Relative Subjects"
        break;
      case "teachers":
      this.viewHeader = "Pick One"    
      this.viewType = "Available Teachers"
        break;  
      case "categories":
      this.viewHeader = "Pick One"    
      this.viewType = "Test Categories"
        break;  
      case "tests":
      this.viewHeader = "Pick One"    
      this.viewType = "Choose From List"
        break;  


        
        
      default:
        break;
    }
    
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  ionViewWillAppear(){
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {

    console.log(item);
    switch (item["viewType"]) {
      case "":
        this.callGetClasses(item);
        break;
      case "classes":
        this.callGetSubjects(item);
        break;
      case "subjects":
        this.callGetTeachers(item);
        break;
      case "teachers":
        this.callGetCategories(item);
        break;  
      case "categories":
        this.callGetTests(item);
        break;  
      case "tests":
        this.callATest(item);
        break;  


        
        
      default:
        break;
    }

    



    
  }

  callGetClasses(item: Item){
    console.log(item);
    this.user.getClasses(item).subscribe((resp) => {

      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        var viewType = "classes";
        for(let data of resp["Data"]) {
          data.viewType = viewType;
          data.classId = data["ID"];
        }

        this.navCtrl.push('ListMasterPage', {
          items: resp["Data"]
        });
        
      }

    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      this.showError(err);
      
    });

    

  }

  callGetSubjects(item: Item){
    console.log(item);
    this.user.getSubjects(item).subscribe((resp) => {

      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        var viewType = "subjects";
        for(let data of resp["Data"]) {
          data.viewType = viewType;
          data.classId = item["ID"];
          data.subjectId = data["ID"];
        }

        this.navCtrl.push('ListMasterPage', {
          items: resp["Data"]
        });
        
      }
      
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      this.showError(err);
      
    });

    

  }

  callGetTeachers(item: Item){
    console.log(item);
    this.user.getTeachers(item).subscribe((resp) => {

      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        var viewType = "teachers";
        for(let data of resp["Data"]) {
          data.viewType = viewType;
          data.classId = item["classId"];
          data.subjectId = item["subjectId"];
          data.teacherId = data["ID"];
        }

        this.navCtrl.push('ListMasterPage', {
          items: resp["Data"]
        });
        
      }
      
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      this.showError(err);
      
    });

    

  }

  callGetCategories(item: Item){
    console.log(item);
    this.user.getCategories(item).subscribe((resp) => {

      if(resp["Data"].length == 0){
        this.showError(resp["Message"]);
      }else{
        console.log(resp["Data"]);
        var viewType = "categories";
        for(let data of resp["Data"]) {
          data.viewType = viewType;
          data.classId = item["classId"];
          data.subjectId = item["subjectId"];
          data.teacherId = item["teacherId"];
          data.categoryId = data["ID"];
        }

        this.navCtrl.push('ListMasterPage', {
          items: resp["Data"]
        });
        
      }
      
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      this.showError(err);
      
    });

    

  }

  callGetTests(item: Item){
    console.log(item);
    this.user.getTests(item).subscribe((resp) => {

      if(resp["Data"].length == 0){
        this.showError("No Test Found ... Call your teacher for assistance");
      }else{
        console.log(resp["Data"]);
        var viewType = "tests";
        for(let data of resp["Data"]) {
          data.viewType = viewType;
          data.classId = item["classId"];
          data.subjectId = item["subjectId"];
          data.teacherId = item["teacherId"];
          data.categoryId = item["categoryId"];
          data.testId = data["ID"];
        }

        this.navCtrl.push('ListMasterPage', {
          items: resp["Data"]
        });
        
      }
      
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      this.showError(err);
      
    });

    

  }

  callATest(item: Item){
    console.log(item);
    this.user.getATest(item).subscribe((resp) => {

      if(resp["Data"].length == 0){
        this.showError("No Test Found ... Call your teacher for assistance");
      }else{
        console.log(resp["Data"]);

        this.navCtrl.push('ItemDetailPage', {
          item: resp["Data"]
        });
        
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
