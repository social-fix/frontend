import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchHelpComponent } from './search-help/search-help.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CompleteInfoComponent } from './complete-info/complete-info.component';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'dashboard'
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'searchHelp',
    component: SearchHelpComponent,
    data: {
      title: 'be strong my friend!'
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'viewProfile',
    component: ViewProfileComponent,
    data: {
      title: 'Looking good?'
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'updateProfile',
    component: UpdateProfileComponent,
    data: {
      title: 'edit your profile'
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'settings'
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'completeInfo',
    component: CompleteInfoComponent,
    data: {
      title: 'a fiew more steps...'
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'successfulRegistration',
    component: SuccessfulRegistrationComponent,
    data: {
      title: 'congratulations!'
    }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
