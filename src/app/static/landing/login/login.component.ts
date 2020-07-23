import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from '@app/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup;
    authFail: boolean;
    loading: boolean;
    errorText: string;
    componentDestroyed$: Subject<void> = new Subject();
    constructor(public dialogRef: MatDialogRef<LoginComponent>, private authGuard: AuthGuardService) { }

    ngOnInit() {
        this.authFail = false;
        this.loading = false;
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.minLength(3)),
        });
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

    save() {
        this.loading = true;
        this.authFail = false;
        this.authGuard.getToken(this.form.value).pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (value) => {
                this.loading = false;
                this.dialogRef.close({
                    ...value, user: {
                        id: value['user'].id,
                        name: value['user'].name,
                        email: value['user'].email,
                        birthdate: value['user'].birthdate,
                        gender: value['user'].gender,
                        catchPhrase: value['user'].catchPhrase,
                        description: value['user'].description,
                        location: value['user'].location
                    }
                });
            },
            (error) => {
                this.authFail = true;
                this.loading = false;
                if (error.status === 400) {
                    this.errorText = "Failed to log in with the provided credentials"
                } else{
                    this.errorText = `An error occured while trying to log in. Status: ${error.status}, ${error.statusText}`
                }
            },
        );

    }

}
