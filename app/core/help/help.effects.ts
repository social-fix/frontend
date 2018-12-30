import { Injectable } from '@angular/core';
import { CreateHelp, CreateHelpError, CreateHelpSuccess, CREATE_HELP, SetHostedHelps, SetJoinedHelps, SET_HOSTED_HELPS, SET_JOINED_HELPS, UpdateHelp, UpdateHelpError, UpdateHelpSuccess, UPDATE_HELP, ResetHelpState, RESET_STATE, SUBSCRIBE_TO_HELP, SubscribeToHelp, SubscribeToHelpSuccess, SubscribeToHelpError, CREATE_HELP_SUCCESS, SUBSCRIBE_TO_HELP_SUCCESS } from '@app/core/help/help.actions';
import { HELP_KEY } from '@app/core/help/help.reducer';
import { HelpService } from '@app/core/help/help.service';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class HelpEffects {
    constructor(private actions$: Actions<Action>,
        private helpService: HelpService,
        private localStorage: LocalStorageService) {
    }
    @Effect({ dispatch: false })
    setHostedHelps() {
        return this.actions$
            .pipe(
                ofType<SetHostedHelps>(SET_HOSTED_HELPS),
                tap(action =>
                    this.localStorage.setItem(HELP_KEY,
                        { ...this.localStorage.getItem(HELP_KEY), hostedHelps: action.payload }
                    )
                )
            )
    }
    @Effect({ dispatch: false })
    createHelpSuccess() {
        return this.actions$
            .pipe(
                ofType<CreateHelpSuccess>(CREATE_HELP_SUCCESS),
                tap(action =>
                    this.localStorage.setItem(HELP_KEY,
                        { ...this.localStorage.getItem(HELP_KEY), hostedHelps: [...this.localStorage.getItem(HELP_KEY).hostedHelps, action.payload] }
                    )
                )
            )
    }
    @Effect({ dispatch: false })
    persistJoinedState() {
        return this.actions$
            .pipe(
                ofType<SetJoinedHelps>(SET_JOINED_HELPS),
                tap(action =>
                    this.localStorage.setItem(HELP_KEY,
                        { ...this.localStorage.getItem(HELP_KEY), joinedHelps: action.payload }
                    )
                )
            )
    }
    @Effect({ dispatch: false })
    resetHelpState() {
        return this.actions$
            .pipe(
                ofType<ResetHelpState>(RESET_STATE),
                tap(action =>
                    this.localStorage.setItem(HELP_KEY,
                        { loading: false, hostedHelps: [], joinedHelps: [] }
                    )
                )
            )
    }
    @Effect()
    createHelp(): Observable<Action> {
        return this.actions$
            .pipe(
                ofType(CREATE_HELP),
                switchMap((action: CreateHelp) =>
                    this.helpService.createHelp(action.payload, action.payload.type).pipe(
                        map(data => new CreateHelpSuccess({...action.payload, id: data.id})),
                        catchError(error => of(new CreateHelpError(error)))
                    )
                )
            );
    }
    @Effect()
    updateHelp(): Observable<Action> {
        return this.actions$
            .pipe(
                ofType(UPDATE_HELP),
                switchMap((action: UpdateHelp) =>
                    this.helpService.updateHelp(action.payload, action.payload.type).pipe(
                        map(data => new UpdateHelpSuccess()),
                        catchError(error => of(new UpdateHelpError(error)))
                    )
                )
            );
    }
    @Effect()
    subscribeToHelp(): Observable<Action> {
        return this.actions$
            .pipe(
                ofType(SUBSCRIBE_TO_HELP),
                switchMap((action: SubscribeToHelp) =>
                    this.helpService.subscribeToHelp(action.payload.type, action.payload.id).pipe(
                        map(data => new SubscribeToHelpSuccess(action.payload)),
                        catchError(error => of(new SubscribeToHelpError(error)))
                    )
                )
            );
    }
    @Effect({ dispatch: false })
    SubscribeToHelpSuccess() {
        return this.actions$
            .pipe(
                ofType<SubscribeToHelpSuccess>(SUBSCRIBE_TO_HELP_SUCCESS),
                tap(action =>
                    this.localStorage.setItem(HELP_KEY,
                        { ...this.localStorage.getItem(HELP_KEY), joinedHelps: [...this.localStorage.getItem(HELP_KEY).joinedHelps, action.payload] }
                    )
                )
            )
    }
}