import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-cpassword',
  templateUrl: './cpassword.page.html',
  styleUrls: ['./cpassword.page.scss'],
})
export class CpasswordPage implements OnInit {
  value = '';

  user: string;
  password: string;
  passuser: string;



  constructor(private storage: Storage, private navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private apiService: ApiService) {
    this.getLogin();
    this.user = '';
    this.password = '';
    this.passuser = '';
  }

  async getLogin() {
    this.storage.get('dataUser').then((val) => {
      this.user = val.username;
      // this.passuser = val.password;
    });
  }

  async presentToast(m: any, c: any) {
    const toast = await this.toastCtrl.create({
      message: m,
      duration: 1500,
      position: 'top',
      color: c,
    });
    toast.present();
  }

  async submitForm() {
    const loading = await this.loadCtrl.create({
      message: 'Please Wait',
      duration: 1500,
    });
    loading.present();

    let formData = new FormData();
    formData.append("user", this.user);
    formData.append("passuser", this.passuser);
    formData.append("password", this.password);

    if (
      this.user === '' ||
      this.user === '' ||
      this.passuser === '' ||
      this.passuser === '' ||
      this.password === '' ||
      this.password === ''

    ) {
      this.presentToast('Input tidak boleh kosong!', 'warning');
    } else {
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=logingantipass&';
      this.http.post(url, formData).subscribe((response: any) => {
        if (response.status === 0) {
          // loading.dismiss();
          this.presentToast('Password berhasil diupdate', 'primary');
          this.logout();
        } else if (response.status === 9) {
          loading.dismiss();
          this.presentToast('Current Password Salah!', 'warning');
        } else {
          loading.dismiss();
          this.presentToast(response.message, 'danger');
        }
      });
    }
    this.passuser = "";
    this.password = "";

  }

  logout() {
    this.storage.clear();
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }

  backData() {
    this.password = '';
    this.passuser = '';
    this.navCtrl.navigateRoot('/dashboard');
  }

  ngOnInit() {
  }
}
