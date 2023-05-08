import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  // imgUrl = `https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?&q=80`;
  imgUrlktp = `/assets/images/ktp.png`;
  imgUrlkk = `/assets/images/kk.jpg`;
  imgUrlrumah = `/assets/images/rumah.png`;
  imgUrllistrik = `/assets/images/listrik.jpg`;

  constructor(public modalController: ModalController) { }

    ngOnInit() {
      // this.openViewer()
    }

    // async openViewer() {
    //   const modal = await this.modalController.create({
    //     component: ViewerModalComponent,
    //     componentProps: {
    //       src: this.imgUrl,
    //     },
    //     cssClass: 'img',
    //     keyboardClose: true,
    //     showBackdrop: true
    //   });
  
      //  return await modal.present();
      // }
}
