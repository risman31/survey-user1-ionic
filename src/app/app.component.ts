import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public router: Router,
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();
    // this.platform.ready().then(() => {
    //   // this.router.navigateByUrl('/splash');
    // });

    this.storage.get('isLoggedIn').then((val) => {
      if (val === null || val === undefined || val === '') {
        this.router.navigateByUrl('/splash');
        // Memodifikasi perilaku tombol "Kembali" pada halaman login
        this.platform.backButton.subscribeWithPriority(-1, () => {
          const currentUrl = this.router.url;
          if (currentUrl === '/login') {
            // this.presentToast('Tombol Kembali dinonaktifkan pada halaman login');
          } else {
            this.navCtrl.pop();
          }
        });
      } else {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
  }

  // async presentToast(message: string) {
  //   const toast = await this.toastCtrl.create({
  //     message: message,
  //     duration: 2000
  //   });
  //   toast.present();
  // }
}
