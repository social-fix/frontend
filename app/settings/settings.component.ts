import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLogout, DeleteUser, DELETE_USER_SUCCESS, User } from '@app/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ResetHelpState } from '@app/core/help/help.actions';

@Component({
    selector: 'sf-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
    componentDestroyed$: Subject<void> = new Subject();
    user$: Observable<User>
    constructor(private store: Store<any>,
        private router: Router,
        private dispatcher: ActionsSubject) {
    }

    ngOnInit() {
        this.user$ = this.store.select('user').pipe(map(data => data.user));
        this.dispatcher.pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (data) => {
                if (data.type === DELETE_USER_SUCCESS) {
                    this.store.dispatch(new AuthLogout());
                    this.store.dispatch(new ResetHelpState())
                }
            }
        );
    }
    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    delete() {
        this.store.dispatch(new DeleteUser());
    }

}
