import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',  
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router:Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }
  initializeApp(){
    this.router.navigateByUrl('splash');
  }
}
