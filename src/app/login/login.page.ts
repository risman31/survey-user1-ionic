import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  ToastController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  private lastTimeBackPress: number = 0;
  private timePeriodToExit: number = 2000;

  constructor(
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private apiService: ApiService
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.router.url.includes('/survey') || this.router.url.includes('/report') || this.router.url.includes('/details')) {
        // Jika pengguna berada di halaman survey, arahkan ke halaman dashboard
        this.router.navigate(['/dashboard']);
      } else if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        // Jika pengguna telah klik tombol "Kembali" dua kali dalam waktu yang ditentukan
        App.exitApp();
      } else {
        // Tampilkan pesan toast untuk memberitahu pengguna untuk klik dua kali
        this.presentToast('Klik dua kali untuk keluar');
        this.lastTimeBackPress = new Date().getTime();
      }
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() { }

  async displayToast(messages: any) {
    await this.toastCtrl
      .create({
        color: 'danger',
        duration: 1800,
        message: messages,
        position: 'top',
      })
      .then((toast) => toast.present());
  }

  async login() {
    if (this.username === '') {
      this.displayToast('Login Failed! Please input Username and Password!');
    } else if (this.password === '') {
      this.displayToast('Password cannot be empty');
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present();
      const oURL = this.apiService.apiUrl;
      const url =
        oURL +
        '?action=login&user=' +
        this.username +
        '&password=' +
        this.password;
      try {
        await this.storage.create();
        fetch(url)
          .then((res) => res.json())
          .then(async (results) => {
            const jlevel = results.level;
            if (jlevel === 1) {
              await this.storage.set('isLoggedIn', results);
              await this.storage.set(
                'dataUser',
                JSON.parse(
                  '{"username":"' +
                  this.username +
                  '","password":"' +
                  this.password +
                  '"}'
                )
              );
              this.navCtrl.navigateRoot('/dashboard');
              loader.dismiss();
            } else {
              loader.dismiss();
              this.displayToast('Login Gagal! Username dan Password Salah!');
            }
          });
      } catch (error) {
        loader.dismiss();
        this.displayToast(error);
      }
    }
  }

  // async login() {
  //   try {
  //     const response = await fetch('https://192.168.47.214:5055/?action=login&user=ris&password=man');
  //     if (!response.ok) {
  //       throw new Error('Network response not ok');
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     this.displayToast('Login OK');

  //   } catch (error) {
  //     console.error('Fetch Error:', Error);
  //     this.displayToast(error);

  //   }
  // }
}
