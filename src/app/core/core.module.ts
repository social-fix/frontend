import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AgePipe, GetGenderPipe } from '@app/core/user/user.model';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';

import { AuthGuardService } from './auth/auth-guard.service';
import { RequestInterceptor } from './http-interceptors/request.interceptor';
import { LocalStorageService } from './local-storage/local-storage.service';
import { debug } from './meta-reducers/debug.reducer';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';
import { UserService } from './user/user.service';
import { helpReducer } from '@app/core/help/help.reducer';
import { HelpEffects } from '@app/core/help/help.effects';
import { HelpService } from '@app/core/help/help.service';
import { HelpCRUDService } from './websocket/help-crud.service';
import { WebsocketService } from './websocket/websocket.service';


export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

// if (!environment.production) {
//   metaReducers.unshift(debug, storeFreeze);
// }

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(
      {
        user: userReducer,
        help: helpReducer
      },
      { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }
    ),
    EffectsModule.forRoot([UserEffects, HelpEffects])
  ],
  declarations: [GetGenderPipe, AgePipe],
  exports: [GetGenderPipe, AgePipe],
  providers: [LocalStorageService,
    AuthGuardService,
    UserService,
    HelpService,
    HelpCRUDService,
    WebsocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
