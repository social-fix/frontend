import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { SecurityComponent } from './security/security.component';
import { SupportComponent } from './support/support.component';
import { FinalizedRegistrationComponent } from './finalized-registration/finalized-registration.component';


@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [LandingComponent, RegisterComponent, LoginComponent, AboutComponent, FaqComponent, SecurityComponent, SupportComponent, FinalizedRegistrationComponent],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class StaticModule {}
