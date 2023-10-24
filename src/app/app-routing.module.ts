import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapsPage } from './maps/maps.page';
import { SurveyPage } from './survey/survey.page';

import { DetailsPage } from './details/details.page';

const routes: Routes = [
  { path: 'source', component: MapsPage },
  { path: 'survey/:sharedValue', component: SurveyPage },

  { path: 'details/:ktp', component: DetailsPage },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then(m => m.SurveyPageModule)
  },
  {
    path: 'cpassword',
    loadChildren: () => import('./cpassword/cpassword.module').then(m => m.CpasswordPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
