import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    public router: Router,    
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
    ) {
      setTimeout(()=>{
        this.router.navigateByUrl('/login');
      }, 4000); 
      
      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (!this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      });
    }

  ngOnInit() {
  }

}
