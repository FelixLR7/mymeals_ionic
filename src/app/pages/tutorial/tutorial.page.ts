import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton, IonSlides, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild(IonSlides, { static : false }) ionSlides: IonSlides;
  @ViewChild("btn1", { static: false}) btn: IonButton;

  disabledBtn1 = true;
  slideOpts = {
    speed: 400,
    lockSwipeToNext: true
  }

  constructor(private router: Router, private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
      }, false);
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.ionSlides.lockSwipeToNext(true);
  }

  nextPage() {
    this.ionSlides.lockSwipeToNext(false);
    this.ionSlides.slideNext();
    this.ionSlides.lockSwipeToNext(true);
  }
  
  finish() {
    this.platform.backButton.observers.pop();
    this.router.navigate(['/home']);
  }

  enableBtn() {
    this.disabledBtn1 = false;
  }
}
