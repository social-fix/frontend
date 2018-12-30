import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@app/core';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { FinalizedRegistrationComponent } from './finalized-registration/finalized-registration.component';
import { LandingComponent } from './landing/landing.component';
import { SecurityComponent } from './security/security.component';
import { SupportComponent } from './support/support.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent, data: { title: 'landing page' }, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: 'faq', component: FaqComponent, data: { title: 'F.A.Q.' } },
  { path: 'security', component: SecurityComponent, data: { title: 'Security' } },
  { path: 'support', component: SupportComponent, data: { title: 'Support' } },
  { path: 'finalizedRegistration', component: FinalizedRegistrationComponent, data: { title: 'welcome among us!' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
