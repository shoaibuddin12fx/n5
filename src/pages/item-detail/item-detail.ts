import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, Slides } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  questions: Item[];
  slidIndex: number = 0;
  slidesOptions = { initialSlide: 0 }
  swiper: any;
  @ViewChild('slider') slider: Slides;


  public ionicNamedColor: string = 'light';

  ngAfterViewInit() {
    // child is set
    this.slider.lockSwipes(true);
  }

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public user: User, public toastCtrl: ToastController) {
    var data = navParams.get('item')
    this.item = data[0];    
    this.SetQuestion()
    
  }

  onIonDrag(event){
    this.swiper = event;
    this.swiper.lockSwipes();
  }

  slideNext(){
    this.slider.lockSwipes(false);
    this.slider.slideNext();
    this.slider.lockSwipes(true);
  }

  SetQuestion() {
    // Attempt to login in through our User service
    
    this.questions = this.item["Question"];
  }

  goToSlide() {
    this.slider.slideTo(2, 500);
  }

  rightorwrong(item, data){

    if(data.IsAnswer){
      data.ionicNamedColor = 'right'
    }else{
      data.ionicNamedColor = 'wrong'
    }
    this.slideNext();


    
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
