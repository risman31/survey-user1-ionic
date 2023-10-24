import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import {
  ModalController,
  ToastController,
  NavController,
  LoadingController,
} from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  address!: string;

  latitude!: number;
  longitude!: number;

  sharedValue: any;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private storage: Storage,
    private platform: Platform,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadMap();
    this.initializeApp();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude: any, longitude: any) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });
  }

  async initializeApp() {
    const storage = new Storage();
    await storage.create();
    this.storage = storage;
  }

  async setMaps() {
    await this.storage.set('dataMaps',
      JSON.parse(
        '{"latitude":"' +
        this.latitude +
        '","longitude":"' +
        this.longitude +
        '"}'
      ));
    // this.navCtrl.navigateRoot('/survey');
    this.sharedValue = 'lat: ' + this.latitude + ', lng: ' + this.longitude;
    console.log(this.sharedValue);

    // Navigasikan ke halaman tujuan dengan menyertakan nilai di URL
    this.navCtrl.navigateRoot(`/survey/${this.sharedValue}`);
    await this.modalCtrl.dismiss();

  }

  backData() {
    this.navCtrl.navigateRoot('/survey');
  }

}
