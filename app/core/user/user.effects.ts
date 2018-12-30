import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AuthLogin, CreateUser, CreateUserError, CreateUserSuccess, CREATE_USER, CREATE_USER_SUCCESS, DeleteUserError, DeleteUserSuccess, DELETE_USER, LOGIN, LOGOUT, SetUser, SET_USER, UpdateUser, UpdateUserError, UpdateUserSuccess, UPDATE_USER, UPDATE_USER_SUCCESS } from './user.action';
import { USER_KEY } from './user.reducer';
import { UserService } from './user.service';
import { HELP_KEY } from '@app/core/help/help.reducer';



@Injectable()
export class UserEffects {
    constructor(private actions$: Actions<Action>,
        private userService: UserService,
        private localStorage: LocalStorageService) {
    }

    @Effect({ dispatch: false })
    login(): Observable<Action> {
        return this.actions$
            .ofType(LOGIN)
            .pipe(
                tap((action: AuthLogin) =>
                    this.localStorage.setItem(USER_KEY,
                        { ...this.localStorage.getItem(USER_KEY), ...{ isAuthenticated: true, token: action.payload } }
                    )
                )
            );
    }

    @Effect({ dispatch: false })
    logout(): Observable<Action> {
        return this.actions$.ofType(LOGOUT).pipe(
            tap(action => {
                this.localStorage.setItem(USER_KEY, { isAuthenticated: false, token: undefined, loading: false, user: undefined });
            })
        );
    }

    @Effect({ dispatch: false })
    setUser(): Observable<Action> {
        return this.actions$
            .pipe(
                ofType<SetUser | CreateUserSuccess | UpdateUserSuccess>(SET_USER, CREATE_USER_SUCCESS, UPDATE_USER_SUCCESS),
                tap((action: SetUser | CreateUserSuccess | UpdateUserSuccess) => {
                    const user = this.localStorage.getItem(USER_KEY);
                    this.localStorage.setItem(USER_KEY, { ...user, ...{ loading: false, user: { ...user.user, ...action.payload } } });
                }
                )
            );
    }
    @Effect()
    updateUser(): Observable<Action> {
        return this.actions$.ofType(UPDATE_USER).pipe(
            distinctUntilChanged(),
            switchMap((action: UpdateUser) =>
                this.userService.updateUser(action.payload)
                    .pipe(
                        map(user => new UpdateUserSuccess(action.payload)),
                        catchError(error =>
                            of(new UpdateUserError(error))
                        )
                    ))
        );
    }
    @Effect()
    createUser(): Observable<Action> {
        return this.actions$.ofType(CREATE_USER).pipe(
            distinctUntilChanged(),
            switchMap((action: CreateUser) =>
                this.userService.createUser(action.payload)
                    .pipe(
                        map(user => new CreateUserSuccess(action.payload)),
                        catchError(error =>
                            of(new CreateUserError(error))
                        )
                    ))
        );
    }
    @Effect()
    deleteUser(): Observable<Action> {
        return this.actions$.ofType(DELETE_USER).pipe(
            distinctUntilChanged(),
            switchMap(action =>
                this.userService.deleteUser()
                    .pipe(
                        map(user => new DeleteUserSuccess()),
                        catchError(error =>
                            of(new DeleteUserError(error))
                        )
                    ))
        );
    }
}