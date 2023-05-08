import { Component } from '@angular/core';
import { Share, ShareOptions } from '@capacitor/share';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage {

  constructor() {}

  share()
  {
    Geolocation.getCurrentPosition({}).then((res)=>{
      const lat = res.coords.latitude.toString();
      const lng = res.coords.longitude.toString();
      const locationUrl = "http://maps.google.com/maps?q="+lat+","+lng;
      const shareOptions:ShareOptions = {
        url:locationUrl
      }
      Share.share(shareOptions);
    })
  }
}
