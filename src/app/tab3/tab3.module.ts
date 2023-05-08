import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule
  ],
  providers: [
    {
        provide: POSITION_OPTIONS,
        useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
    },
],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
