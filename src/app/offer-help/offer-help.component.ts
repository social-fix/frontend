import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UserState } from '@app/core';
import { CreateHelp, CREATE_HELP_ERROR, CREATE_HELP_SUCCESS } from '@app/core/help/help.actions';
import { HelpState } from '@app/core/help/help.reducer';
import { MY_FORMATS } from '@app/shared/date.format';
import { SnackbarComponent } from '@app/shared/snackbar.component';
import { ActionsSubject, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, skip, takeUntil, take } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'offer-help-address-dialog',
    templateUrl: 'offer-help-address-dialog.component.html',
    styleUrls: ['offer-help-address-dialog.component.scss']
})
export class OfferHelpAddressDialog {

    constructor(
        public dialogRef: MatDialogRef<OfferHelpAddressDialog>) { }

    onClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export abstract class BaseHelpContainerComponent implements OnInit, OnDestroy {
    type: string;
    @Output() close: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup;
    user_id: number;
    componentDestroyed$: Subject<void> = new Subject();
    store: Store<any>;
    dispatcher$: ActionsSubject;
    snackBar: MatSnackBar;
    constructor(store, dispatcher$, snackBar) {
        this.store = store
        this.dispatcher$ = dispatcher$
        this.snackBar = snackBar;
        this.form = new FormGroup({
            guest_limit: new FormControl('', [Validators.required, Validators.min(0)]),
            start_date: new FormControl('', [Validators.required]),
            start_time: new FormControl('', [Validators.required, Validators.pattern("([0-1][0-9]|2[0-3]):([0-5][0-9])")]),
            end_date: new FormControl('', [Validators.required]),
            end_time: new FormControl('', [Validators.required, Validators.pattern("([0-1][0-9]|2[0-3]):([0-5][0-9])")]),
            comment: new FormControl('')
        });
    }
    static mergeDateWithTime(date: moment.Moment, time: string): moment.Moment {
        return moment(date.format('LL') + ' ' + time, 'LL HH:mm')
    }
    ngOnInit() {
        this.store.select('user').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => this.user_id = data.user.id)
        this.dispatcher$.pipe(skip(1), takeUntil(this.componentDestroyed$), distinctUntilChanged()).subscribe(
            (data) => {
                if (data.type === CREATE_HELP_SUCCESS) {
                    this.close.emit(this.type);
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        duration: 2000,
                        panelClass: ['snackbar-success'],
                        data: '<span><i class="fa fa-check fa-2x"></i> Help successfully subscribed!</span>'
                    });
                } else if (data.type === CREATE_HELP_ERROR) {
                    this.snackBar.openFromComponent(SnackbarComponent, {
                        duration: 2500,
                        panelClass: ['snackbar-error'],
                        data: `<span><i class="fa fa-times fa-2x"></i> Error! The help could not be subscribed.</span>`
                    });
                }
            }
        );
    }

    ngOnDestroy() {
        this.componentDestroyed$.next()
        this.componentDestroyed$.unsubscribe()
    }

    getFormData(): any {
        const submitData = {
            type: this.type,
            start: BaseHelpContainerComponent.mergeDateWithTime(this.form.value.start_date, this.form.value.start_time),
            end: BaseHelpContainerComponent.mergeDateWithTime(this.form.value.end_date, this.form.value.end_time),
            guest_limit: this.form.value.guest_limit,
            comment: this.form.value.comment,
            sender: this.user_id,
            guests: new Array()
        }
        return submitData;
    }
    onCancel(message: string) {
        this.close.emit(message);
    }

    onSubmit() {
        this.store.dispatch(new CreateHelp(this.getFormData()))
    }

}


@Component({
    selector: 'sf-offer-help',
    templateUrl: './offer-help.component.html',
    styleUrls: ['./offer-help.component.scss']
})
export class OfferHelpComponent implements OnInit {
    help$: Observable<HelpState>;
    washing: Boolean;
    meal: Boolean;
    bed: Boolean;
    constructor(private store: Store<any>, public dialog: MatDialog) {
        this.washing = false;
        this.meal = false;
        this.bed = false;
        this.store.select('user').pipe(take(1)).subscribe(
            (user: UserState) => {
                if (!user.user.location) {
                    this.dialog.open(OfferHelpAddressDialog, {
                        disableClose: true
                    });
                }
            }
        );
    }
    ngOnInit() {
        this.help$ = this.store.select('help');
    }

    clickWashing() {
        this.washing = !this.washing;
        this.meal = false;
        this.bed = false;
    }
    clickMeal() {
        this.meal = !this.meal;
        this.washing = false;
        this.bed = false
    }
    clickBed() {
        this.bed = !this.bed;
        this.meal = false;
        this.washing = false;
    }

    onClose(child: string): void {
        switch (child) {
            case "washing":
                this.clickWashing();
                break;
            case "meal":
                this.clickMeal();
                break;
            case "bed":
                this.clickBed();
                break;
            default:
                break;
        }
    }
}
