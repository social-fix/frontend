import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLogin, SetUser } from '@app/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoginComponent } from '../login/login.component';
import { AnyHelp } from '@app/core/help/help.model';
import { SetHostedHelps, SetJoinedHelps } from '@app/core/help/help.actions';
import { HelpService } from '@app/core/help/help.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'sf-finalized-registration',
    templateUrl: './finalized-registration.component.html',
    styleUrls: ['./finalized-registration.component.scss']
})
export class FinalizedRegistrationComponent implements OnInit, OnDestroy {

    componentDestroyed$: Subject<void> = new Subject();
    constructor(private dialog: MatDialog, private store: Store<any>, private router: Router, private helpService: HelpService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    login() {
        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
            if (data) {
                this.store.dispatch(new AuthLogin(data['token']));
                this.store.dispatch(new SetUser(data['user']));
                this.router.navigateByUrl('/completeInfo');
                this.helpService.getByCriteria('getBySender').pipe(takeUntil(this.componentDestroyed$)).subscribe(
                    (helps: Array<AnyHelp>) => this.store.dispatch(new SetHostedHelps(helps)),
                    (error) => console.error(error)
                );
                this.helpService.getByCriteria('getIfIsGuest').pipe(takeUntil(this.componentDestroyed$)).subscribe(
                    (helps: Array<AnyHelp>) => this.store.dispatch(new SetJoinedHelps(helps)),
                    (error) => console.error(error)
                );
            }

        });
    }
}
