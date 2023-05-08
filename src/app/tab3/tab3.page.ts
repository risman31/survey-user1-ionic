import { Component, Inject } from '@angular/core';
// import { Share, ShareOptions } from '@capacitor/share';
// import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor() {}

  ngOninit(){
    // if(window.confirm("arek moal?"))
    // {
    //   this.share();
    // }
  }

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

  // async location(){
  //   const location = await Geolocation.getCurrentPosition();
  //   console.log('Location : ', location);
  // }
  
  

}

