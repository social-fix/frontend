import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { OfferHelpRoutingModule } from './offer-help-routing.module';
import { WashingComponent } from './washing/washing.component';
import { MealComponent } from './meal/meal.component';
import { BedComponent } from './bed/bed.component';
import { OfferHelpAddressDialog } from './offer-help.component';

@NgModule({
  imports: [OfferHelpRoutingModule, SharedModule],
  declarations: [WashingComponent, MealComponent, BedComponent, OfferHelpAddressDialog],
  entryComponents: [OfferHelpAddressDialog],
  exports: [WashingComponent, MealComponent, BedComponent]
})
export class OfferHelpModule {}
