import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompleteInfoComponent } from './complete-info/complete-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferHelpComponent } from './offer-help/offer-help.component';
import { OfferHelpModule } from './offer-help/offer-help.module';
import { SearchHelpComponent } from './search-help/search-help.component';
import { SettingsComponent } from './settings/settings.component';
import { StaticModule } from './static';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ServiceCardComponent } from './dashboard/service-card/service-card.component';
import { HelpListComponent } from './search-help/help-list/help-list.component';
import { HelpMapComponent } from './search-help/help-map/help-map.component';






@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    AngularOpenlayersModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    OfferHelpModule,

    // app
    AppRoutingModule
  ],
  declarations: [
                  AppComponent,
                  DashboardComponent,
                  SearchHelpComponent,
                  ViewProfileComponent,
                  UpdateProfileComponent,
                  SettingsComponent,
                  CompleteInfoComponent,
                  SuccessfulRegistrationComponent,
                  OfferHelpComponent,
                  ServiceCardComponent,
                  HelpListComponent,
                  HelpMapComponent,
                ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
