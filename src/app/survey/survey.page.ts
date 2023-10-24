import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  ToastController,
  LoadingController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { MapsPage } from '../maps/maps.page';

import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

import { IonSelect } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
declare var google: any;

const IMAGE_DIR = '/assets';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  address!: string;

  latitude!: number;
  longitude!: number;

  showCard: boolean = false;

  kecamatanList: any[];
  selectedKecamatan: string;
  kelurahanList: any[];
  selectedKelurahan: string;
  idcamat: any;

  sharedValue: any;
  uploadedNik: string = '';

  photo!: any;
  photokk!: any;
  photorumah!: any;
  photolistrik!: any;
  public jenis: any;
  public jeniskk: any;
  public jenisrumah: any;
  public jenislistrik: any;

  title = 'app';
  elementType = 'url';
  value = '';

  loaded = false;
  username: string;
  user: string;
  passuser: string;
  nama: string;
  nik: string;
  alamat: string;
  kecamatan: any;
  kelurahan: any;
  rt: string;
  rw: string;
  no_hp: string;
  daya_listrik: string;
  jml_penghuni: string;
  usaha: string;
  jaringan: string;
  jarak_jaringan: string;
  lokasi: string;
  luasbangunan: string;
  nometer: string;
  keterangan: string;

  data: any;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private storage: Storage,
    private http: HttpClient,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    public apiService: ApiService,
    platform: Platform,
    private route: ActivatedRoute
  ) {
    this.getLogin();
  }

  async getLogin() {
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val) => {
    });
    this.storage.get('dataUser').then((val) => {
      this.value = val.username;
      this.user = val.username;
      this.passuser = val.password;
      const oURL = this.apiService.apiUrl;
      const apiUrl = oURL + '?action=kecamatanlist&user=' + this.user + '&passuser=' + this.passuser;
      this.http.get(apiUrl).subscribe((response: any) => {
        if (response.status === 0) {
          this.kecamatanList = response.data;
          // this.idcamat = this.kecamatanList.
        } else {
          console.error('Error retrieving Kecamatan list.');
        }
      });
    });
  }

  loadKelurahan() {
    this.storage.get('dataUser').then((val) => {
      this.value = val.username;
      this.user = val.username;
      this.passuser = val.password;
      const oURL = this.apiService.apiUrl;

      const apiUrl1 = oURL + '?action=kelurahanlist&user=' + this.user + '&passuser=' + this.passuser + '&idcamat=' + this.selectedKecamatan;
      this.http.get(apiUrl1).subscribe((response: any) => {
        if (response.status === 0) {
          this.kelurahanList = response.data;
        } else {
          console.error('Error retrieving kelurahan list.');
        }
      });
    });
  }

  onKecamatanChange(event: any) {
    this.loadKelurahan();
  }

  ngOnInit() {
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

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Uri,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }
    this.photo = image.dataUrl;
    this.jenis = 'KTP';
  }

  setPhoto(value: string) {
    this.photo = value;
  }

  async saveImage(photo: Photo) {
    const base64Data = photo.dataUrl;

    if (base64Data) {
      const fileName = 'KTP-' + new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data,
      });
    } else {
      console.log('photo is undefined');
    }
  }

  async selectImageKK() {
    const imagekk = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Uri,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });

    if (imagekk) {
      this.saveImagekk(imagekk);
    }
    this.photokk = imagekk.dataUrl;
    this.jeniskk = 'KK';
  }

  setPhotokk(value: string) {
    this.photokk = value;
  }

  async saveImagekk(photokk: Photo) {
    const base64Datakk = photokk.dataUrl;

    if (base64Datakk) {
      const fileName = 'KK-' + new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Datakk,
        directory: Directory.Data,
      });
    } else {
      console.log('photokk is undefined');
    }
  }

  async selectImageRumah() {
    const imagerumah = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Uri,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });

    if (imagerumah) {
      this.saveImagerumah(imagerumah);
    }
    this.photorumah = imagerumah.dataUrl;
    this.jenisrumah = 'RUMAH';
  }

  setPhotorumah(value: string) {
    this.photorumah = value;
  }

  async saveImagerumah(photorumah: Photo) {
    const base64Datarumah = photorumah.dataUrl;

    if (base64Datarumah) {
      const fileName = 'RUMAH-' + new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Datarumah,
        directory: Directory.Data,
      });
    } else {
      console.log('photorumah is undefined');
    }
  }

  async selectImageListrik() {
    const imagelistrik = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Uri,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });

    if (imagelistrik) {
      this.saveImagelistrik(imagelistrik);
    }
    this.photolistrik = imagelistrik.dataUrl;
    this.jenislistrik = 'LISTRIK';
  }

  setPhotolistrik(value: string) {
    this.photolistrik = value;
  }

  async saveImagelistrik(photolistrik: Photo) {
    const base64Datalistrik = photolistrik.dataUrl;

    if (base64Datalistrik) {
      const fileName = 'LISTRIK-' + new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Datalistrik,
        directory: Directory.Data,
      });
    } else {
      console.log('photolistrik is undefined');
    }
  }

  async submitKTP() {
    this.uploadedNik = this.apiService.nik;
    // let result: Observable<any>;
    const loading = await this.loadCtrl.create({
      message: 'Please Wait',
    });
    const response = await fetch(this.photo);
    const blob = await response.blob();
    let formData = new FormData();
    formData.append('user', this.user);
    formData.append('passuser', this.passuser);
    formData.append('ktp', this.uploadedNik);
    formData.append('jenis', this.jenis);
    formData.append('fileupload', blob, this.photo.name);
    const oURL = this.apiService.apiUrl;
    let url = oURL + '?action=simpanfoto&';
    this.http.post(url, formData).subscribe((response: any) => {
      if (response.status === 0) {
        loading.dismiss();
        // this.presentToast('Data Berhasil Diupload', 'primary');
        this.submitKK();
      } else {
        loading.dismiss();
        this.presentToast('Foto KTP, KK, RUMAH, LISTRIK Gagal Diupload', 'danger');
        // this.presentToast('Respons tak terduga dari API', 'danger');
      }
      this.photo = '';
    });
    this.jenis = '';
    // this.nik = '';
  }

  async submitKK() {
    this.uploadedNik = this.apiService.nik;
    // let result: Observable<any>;
    const loading = await this.loadCtrl.create({
      message: 'Please Wait',
    });
    const response = await fetch(this.photokk);
    const blob = await response.blob();
    let formData = new FormData();
    formData.append('user', this.user);
    formData.append('passuser', this.passuser);
    formData.append('ktp', this.uploadedNik);
    formData.append('jenis', this.jeniskk);
    formData.append('fileupload', blob, this.photokk.name);
    const oURL = this.apiService.apiUrl;
    let url = oURL + '?action=simpanfoto&';
    this.http.post(url, formData).subscribe((response: any) => {
      if (response.status === 0) {
        loading.dismiss();
        // this.presentToast('Data Berhasil Diupload', 'primary');
        this.submitRumah();
      } else {
        loading.dismiss();
        // this.presentToast('Respons tak terduga dari API', 'danger');
        this.presentToast('Foto KK, RUMAH, LISTRIK Gagal Diupload', 'danger');
      }
      this.photokk = '';
    });
    this.jeniskk = '';
    // this.nik = '';
  }

  async submitRumah() {
    this.uploadedNik = this.apiService.nik;
    // let result: Observable<any>;
    const loading = await this.loadCtrl.create({
      message: 'Please Wait',
    });
    const response = await fetch(this.photorumah);
    const blob = await response.blob();
    let formData = new FormData();
    formData.append('user', this.user);
    formData.append('passuser', this.passuser);
    formData.append('ktp', this.uploadedNik);
    formData.append('jenis', this.jenisrumah);
    formData.append('fileupload', blob, this.photorumah.name);
    const oURL = this.apiService.apiUrl;
    let url = oURL + '?action=simpanfoto&';
    this.http.post(url, formData).subscribe((response: any) => {
      if (response.status === 0) {
        loading.dismiss();
        // this.presentToast('Data Berhasil Diupload', 'primary');
        this.submitListrik();
      } else {
        loading.dismiss();
        this.presentToast('Foto RUMAH, LISTRIK Gagal Diupload', 'danger');
        // this.presentToast('Respons tak terduga dari API', 'danger');
      }
      this.photorumah = '';
    });
    this.jenisrumah = '';
    // this.nik = '';
  }

  async submitListrik() {
    this.uploadedNik = this.apiService.nik;
    // let result: Observable<any>;
    const loading = await this.loadCtrl.create({
      message: 'Please Wait',
    });
    const response = await fetch(this.photolistrik);
    const blob = await response.blob();
    let formData = new FormData();
    formData.append('user', this.user);
    formData.append('passuser', this.passuser);
    formData.append('ktp', this.uploadedNik);
    formData.append('jenis', this.jenislistrik);
    formData.append('fileupload', blob, this.photolistrik.name);
    const oURL = this.apiService.apiUrl;
    let url = oURL + '?action=simpanfoto&';
    this.http.post(url, formData).subscribe((response: any) => {
      if (response.status === 0) {
        loading.dismiss();
        this.presentToast('Data Berhasil Diupload', 'primary');
        // this.delNik();
      } else {
        loading.dismiss();
        this.presentToast('Foto LISTRIK Gagal Diupload', 'danger');
        // this.presentToast('Respons tak terduga dari API', 'danger');
      }
      this.photolistrik = '';
    });
    this.jenislistrik = '';
    this.delNik();
    // this.nik = '';
  }

  async uploadData() {
    this.uploadedNik = this.apiService.nik;
    this.kecamatan = this.selectedKecamatan;
    this.kelurahan = this.selectedKelurahan;
    let result: Observable<any>;
    const loading = await this.loadCtrl.create({
      message: 'Please Wait',
      duration: 1800,
    });
    loading.present();
    const formData = new FormData();
    formData.append('user', this.user);
    formData.append('passuser', this.passuser);
    formData.append('nama', this.nama);
    formData.append('ktp', this.uploadedNik);
    formData.append('alamat', this.alamat);
    formData.append('kecamatan', this.kecamatan);
    formData.append('kelurahan', this.kelurahan);
    formData.append('rt', this.rt);
    formData.append('rw', this.rw);
    formData.append('nohp', this.no_hp);
    formData.append('daya', this.daya_listrik);
    formData.append('penghuni', this.jml_penghuni);
    formData.append('luasbangunan', this.luasbangunan);
    formData.append('nometer', this.nometer);
    formData.append('keterangan', this.keterangan);
    formData.append('usaha', this.usaha);
    formData.append('jaringan', this.jaringan);
    formData.append('jarak', this.jarak_jaringan);
    formData.append('lokasi', this.lokasi);

    if (
      this.user === '' ||
      this.user === '' ||
      this.passuser === '' ||
      this.passuser === '' ||
      this.nama === '' ||
      this.nama === '' ||
      this.apiService.nik === '' ||
      this.apiService.nik === '' ||
      this.alamat === '' ||
      this.alamat === '' ||
      this.kecamatan === '' ||
      this.kecamatan === '' ||
      this.kelurahan === '' ||
      this.kelurahan === '' ||
      this.rt === '' ||
      this.rt === '' ||
      this.rw === '' ||
      this.rw === '' ||
      this.no_hp === '' ||
      this.no_hp === '' ||
      this.daya_listrik === '' ||
      this.daya_listrik === '' ||
      this.jml_penghuni === '' ||
      this.jml_penghuni === '' ||
      this.luasbangunan === '' ||
      this.luasbangunan === '' ||
      this.usaha === '' ||
      this.usaha === '' ||
      this.jaringan === '' ||
      this.jaringan === '' ||
      this.jarak_jaringan === '' ||
      this.jarak_jaringan === '' ||
      this.nometer === '' ||
      this.nometer === '' ||
      this.keterangan === '' ||
      this.keterangan === '' ||
      this.lokasi === '' ||
      this.lokasi === ''
    ) {
      this.presentToast('Data Tidak Boleh Kosong!', 'warning');
    } else {
      const oURL = this.apiService.apiUrl;
      const url =
        oURL +
        // 'http://localhost/survei-ci/index.php/api/upload/';
        // 'http://192.168.120.20:5007/?action=surveysimpan&';
        '?action=surveysimpan&';
      result = this.http.post(url, formData);
      result.subscribe((res) => {
        this.data = res;
        if (this.data.error === true) {
          loading.dismiss();
          this.presentToast(this.data.message, 'danger');
        } else {
          if (this.data.status === 0) {
            loading.dismiss();
            // this.presentToast('Data Berhasil Diupload', 'primary');
            this.submitKTP();
            this.delData();
          } else if (this.data.status === 1) {
            loading.dismiss();
            this.presentToast('Data dengan NIK tersebut sudah terdaftar', 'warning');
            this.delNik();
            this.delData();
          } else if (this.data.status === 9) {
            loading.dismiss();
            this.presentToast('Ada kolom yang belum terisi / tidak valid', 'warning');
          } else {
            loading.dismiss();
            this.presentToast('Response tak terduga dari Server', 'danger');
          }
        }
      });
    }
  }

  async delNik() {
    this.apiService.nik = '';
  }

  async delData() {
    this.nama = '';
    this.alamat = '';
    this.kecamatan = '';
    this.kelurahan = '';
    this.rt = '';
    this.rw = '';
    this.no_hp = '';
    this.daya_listrik = '';
    this.jml_penghuni = '';
    this.usaha = '';
    this.jaringan = '';
    this.jarak_jaringan = '';
    this.lokasi = '';
    this.luasbangunan = '';
    this.nometer = '';
    this.keterangan = '';
    this.sharedValue = '';
    this.selectedKecamatan = '';
    this.selectedKelurahan = '';
  }

  // async upimage() {
  //   this.navCtrl.navigateForward('/uploadfoto');
  // }

  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        this.map.addListener('dragend', () => {
          this.latitude = this.map.center.lat();
          this.longitude = this.map.center.lng();

          this.getAddressFromCoords(
            this.map.center.lat(),
            this.map.center.lng()
          );
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  getAddressFromCoords(lattitude: any, longitude: any) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  }

  async setMaps() {
    await this.storage.set(
      'dataMaps',
      JSON.parse(
        '{"latitude":"' +
        this.latitude +
        '","longitude":"' +
        this.longitude +
        '"}'
      )
    );
  }

  async backPage() {
    this.navCtrl.navigateRoot('/dashboard');
    this.nama = '';
    this.apiService.nik = '';
    this.alamat = '';
    this.no_hp = '';
    this.daya_listrik = '';
    this.jml_penghuni = '';
    this.usaha = '';
    this.jaringan = '';
    this.jarak_jaringan = '';
    this.lokasi = '';
    this.sharedValue = '';
  }
}
