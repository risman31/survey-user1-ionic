import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  AlertController,
  ToastController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  title = 'app';
  elementType = 'url';
  value = '';

  public nama: string;
  public user: string;
  public passuser: string;
  // public foto: string;

  constructor(
    public router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private apiService: ApiService) {

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });

    this.getLogin();
    this.nama = '';
    this.user = '';
    this.passuser = '';
  }

  async getLogin() {
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val) => {
      this.nama = val.nama;
    });
    this.storage.get('dataUser').then((val) => {
      this.value = val.username;
      this.user = val.username;
      this.passuser = val.password;
      // this.foto = `http://localhost/elearning_native/uploads/${val.photo}`;
    });
  }

  async displayToast(messages: any) {
    await this.toastCtrl
      .create({
        color: 'danger',
        duration: 1500,
        message: messages,
        position: 'top',
      })
      .then((toast) => toast.present());
  }


  surveyList() {
    this.navCtrl.navigateForward('/report');
  }

  surveyForm() {
    this.navCtrl.navigateForward('/survey');
  }

  changePW() {
    this.navCtrl.navigateForward('/cpassword');
  }


  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            // Tidak melakukan apa-apa jika tombol "Batal" ditekan
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.clear();
            localStorage.clear();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
