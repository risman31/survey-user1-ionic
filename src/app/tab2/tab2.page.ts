import { Component } from '@angular/core';
// import { Share, ShareOptions } from '@capacitor/share';
// import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  // share(){
  //   Geolocation.getCurrentPosition({}).then((res)=>{
  //     var lat = res.coords.latitude.toString();
  //     var lng = res.coords.longitude.toString();
  //     var locationUrl = "http://maps.google.com/maps?q="+lat+","+lng;
  //     var shareOptions:ShareOptions={
  //       url:locationUrl
  //     }
  //     Share.share(shareOptions);
  //   })
  // }

  ngOninit(){
    {
      // this.share();
    }
  }



}
