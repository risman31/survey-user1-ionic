import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  ktp: any;
  public surveiData: any = [];
  surveiktp: any;
  public user: any = "";
  public passuser: any = "";
  public nama: any = "";
  public nik: any = "";
  public rt: any = "";
  public rw: any = "";
  public kelurahan: any = "";
  public kecamatan: any = "";
  public alamat: any = "";
  public handphone: any = "";
  public tgl: any = "";
  public daya: any = "";
  public penghuni: any = "";
  public luasbangunan: any = "";
  public nometer: any = "";
  public keterangan: any = "";
  public usaha: any = "";
  public jaringan: any = "";
  public jarak: any = "";
  public lokasi: any = "";
  public imgKtp: any = "";
  picKtp: any = "";
  lbKtp: any = "";
  public imgKk: any = "";
  picKk: any = "";
  lbKk: any = "";
  public imgRumah: any = "";
  picRumah: any = "";
  lbRumah: any = "";
  public imgListrik: any = "";
  picListrik: any = "";
  lbListrik: any = "";


  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public http: HttpClient,
    private storage: Storage,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.surveiktp = this.navParams.get('ktp');
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.getDetail();
  }

  async presentToast(m: any, c: any) {
    const toast = await this.toastCtrl.create({
      message: m,
      duration: 2000,
      position: 'top',
      color: c,
    });
    toast.present();
  }

  async getDetail() {
    this.storage.get('dataUser').then((val) => {
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=surveydetail&user=' + val.username + '&passuser=' + val.password + '&ktp=' + this.surveiktp;
      this.http.get(url)
        .subscribe((data) => {
          this.surveiData = data;
          this.nama = this.surveiData.nama;
          this.nik = this.surveiktp;
          this.alamat = this.surveiData.alamat;
          this.rt = this.surveiData.rt;
          this.rw = this.surveiData.rw;
          this.kelurahan = this.surveiData.kelurahan;
          this.kecamatan = this.surveiData.kecamatan;
          this.handphone = this.surveiData.handphone;
          this.penghuni = this.surveiData.penghuni;
          this.luasbangunan = this.surveiData.luasbangunan;
          this.nometer = this.surveiData.nometer;
          this.keterangan = this.surveiData.keterangan;
          this.daya = this.surveiData.daya;
          this.usaha = this.surveiData.usaha;
          this.jaringan = this.surveiData.jaringan;
          this.jarak = this.surveiData.jarak;
          this.lokasi = this.surveiData.lokasi;
          this.tgl = this.surveiData.tanggal;
        });
    });
  }

  async getPhotoKtp() {
    this.storage.get('dataUser').then((val) => {
      const image = new Image();
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=tampilfoto&user=' + val.username + '&passuser=' + val.password + '&ktp=' + this.surveiktp + '&jenis=KTP';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.imgKtp = data;
          if (this.imgKtp.status === 0) {
            image.src = this.imgKtp.data;
            this.picKtp = image.src;
            this.lbKtp = "Photo KTP";
          } else {
            this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
          }
        }, (error) => {
          this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
        });
      this.lbKtp = "Photo KTP";
    });
  }

  async getPhotoKk() {
    this.storage.get('dataUser').then((val) => {
      const image = new Image();
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=tampilfoto&user=' + val.username + '&passuser=' + val.password + '&ktp=' + this.surveiktp + '&jenis=KK';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.imgKk = data;
          if (this.imgKk.status === 0) {
            image.src = this.imgKk.data;
            this.picKk = image.src;
            this.lbKk = "Photo Kartu Keluarga";
          } else {
            this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
          }
        }, (error) => {
          this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
        });

    });
  }

  async getPhotoRumah() {
    this.storage.get('dataUser').then((val) => {
      const image = new Image();
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=tampilfoto&user=' + val.username + '&passuser=' + val.password + '&ktp=' + this.surveiktp + '&jenis=RUMAH';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.imgRumah = data;
          if (this.imgRumah.status === 0) {
            image.src = this.imgRumah.data;
            this.picRumah = image.src;
            this.lbRumah = "Photo Rumah";
          } else {
            this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
          }
        }, (error) => {
          this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
        });
    });
  }

  async getPhotoListrik() {
    this.storage.get('dataUser').then((val) => {
      const image = new Image();
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=tampilfoto&user=' + val.username + '&passuser=' + val.password + '&ktp=' + this.surveiktp + '&jenis=LISTRIK';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.imgListrik = data;
          if (this.imgListrik.status === 0) {
            image.src = this.imgListrik.data;
            this.picListrik = image.src;
            this.lbListrik = "Photo Meteran/No. Rek. Listrik";
          } else {
            this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
          }
        }, (error) => {
          this.presentToast('Terjadi kesalahan dalam memuat data', 'danger');
        });
    });
  }

  backData() {
    this.dismiss();
    this.navCtrl.navigateRoot('/report');
  }

  // async openViewer(imageUrl: string) {
  //   const modal = await this.modalCtrl.create({
  //     component: ViewerModalComponent,
  //     componentProps: {
  //       src: imageUrl
  //     },
  //     cssClass: 'ion-img-viewer',
  //     keyboardClose: true,
  //     showBackdrop: true,
  //     backdropDismiss: false
  //   });
  //   return await modal.present();
  // }

}
