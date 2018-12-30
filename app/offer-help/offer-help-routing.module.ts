import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { OfferHelpComponent } from './offer-help.component';

const routes: Routes = [
{ path: 'offer-help', 
component: OfferHelpComponent, 
canActivate: [AuthGuardService],
data: { title: 'share what you can :-)' } 
},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OfferHelpRoutingModule {}
