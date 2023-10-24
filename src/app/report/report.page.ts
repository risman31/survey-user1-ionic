import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { NavController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { ApiService } from '../api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  filterTerm: '';
  surveiData: any = [];

  selectedMonth: number;
  selectedYear: number;

  months: any[] = [
    { value: 1, name: 'Januari' },
    { value: 2, name: 'Februari' },
    { value: 3, name: 'Maret' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Mei' },
    { value: 6, name: 'Juni' },
    { value: 7, name: 'Juli' },
    { value: 8, name: 'Agustus' },
    { value: 9, name: 'September' },
    { value: 10, name: 'Oktober' },
    { value: 11, name: 'November' },
    { value: 12, name: 'Desember' }
  ];
  currentYear: number = new Date().getFullYear();
  startYear: number = this.currentYear - 2;
  endYear: number = this.currentYear + 5;
  years: number[] = [];


  public user: any = "";
  public passuser: any = "";
  constructor(
    public modalCtrl: ModalController,
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private apiService: ApiService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router

  ) {
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years.push(i);
    }
  }

  ngOnInit() {
    // this.presentToast('Pilih Bulan Dan Tahun. Klik Buka Untuk Menampilkan Data.');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11) and add 1
    const currentYear = currentDate.getFullYear(); // Get the current year

    this.getDetail(currentMonth, currentYear);

    this.selectedMonth = currentDate.getMonth() + 1; // Get the current month (0-11) and add 1
    this.selectedYear = currentDate.getFullYear(); // Get the current year

    this.applyFilter();
  }

  async getDetail(month: number, year: number) {
    this.storage.get('dataUser').then((val) => {
      const oURL = this.apiService.apiUrl;
      const url = oURL + '?action=surveylist&user=' + val.username + '&passuser=' + val.password + '&bulan=' + month + '&tahun=' + year;
      this.http.get(url).pipe(
        catchError(error => {
          console.error(error);
          this.presentToast('Terjadi kesalahan saat mengambil data.');
          return of(null); // Mengembalikan nilai null dalam Observable
        })
      ).subscribe((result: any) => {
        if (result.status === 0) {
          this.surveiData = result.data;
        } else if (result.status === 1) {
          this.presentAlert('Data Survey Tidak Ditemukan.');
        }
      });
    });
  }


  applyFilter() {
    if (this.selectedMonth && this.selectedYear) {
      this.surveiData = [];
      this.getDetail(this.selectedMonth, this.selectedYear);
    } else {
      this.presentToast('Pilih bulan dan tahun terlebih dahulu.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      // color: 'danger'
    });
    toast.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Peringatan',
      message: message,
      buttons: ['OK'],
    });
    alert.present();
  }

  async getDataSurvei(ktp: any) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: {
        "ktp": ktp
      }
    });
    return await modal.present();
  }

  // async getDataSurvei(ktp: any) {
  //   // Navigasi menggunakan NavController
  //   this.navCtrl.navigateForward(`/details/${ktp}`);
  // }

}