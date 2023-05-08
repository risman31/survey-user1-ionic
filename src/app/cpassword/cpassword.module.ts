import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpasswordPageRoutingModule } from './cpassword-routing.module';

import { CpasswordPage } from './cpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpasswordPageRoutingModule
  ],
  declarations: [CpasswordPage]
})
export class CpasswordPageModule {}
