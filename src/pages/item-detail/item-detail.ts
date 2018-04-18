import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, Slides, Tabs, AlertController  } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, User, Settings } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  isTestFinish: boolean = false;
  noOfCorrectAnswers: number = 0;
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

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public user: User, public toastCtrl: ToastController, private alertCtrl: AlertController, public settings: Settings) {
    var data = navParams.get('item')
    this.item = data[0];    
    this.SetQuestion()
    console.log(this.settings.loadreports());
    
  }

  onIonDrag(event){
    this.swiper = event;
    this.swiper.lockSwipes();
  }

  slideNext(){

    
      setTimeout(() => 
      {
        if(this.slider.isEnd()){ 

          
          this.item["gain"] = this.noOfCorrectAnswers;
          this.item["total"] = this.questions.length;
          this.settings.savereport(this.item);
          this.presentConfirm();
          //this.navCtrl.pop();

        }else{
          this.slider.lockSwipes(false);
          this.slider.slideNext();
          this.slider.lockSwipes(true);
        }
      },
      500);
    
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Finished - ' + this.noOfCorrectAnswers + "/" + this.questions.length ,
      message: 'Nice score! You can see all test reports in test section',
      buttons: [
        {
          text: 'Done',
          handler: () => {
              this.navCtrl.popAll();
          }
        }
      ]
    });
    alert.present();
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
      this.noOfCorrectAnswers = this.noOfCorrectAnswers + 1;
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
