import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from '@app/shared/date.format';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { UserState, CreateUser, CreateUserSuccess, CreateUserError, CREATE_USER_SUCCESS, CREATE_USER_ERROR } from '@app/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
    selector: 'sf-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class RegisterComponent implements OnInit, OnDestroy {
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    genders = [
        { value: 0, viewValue: 'FEMALE' },
        { value: 1, viewValue: 'MALE' },
        { value: 2, viewValue: 'NON BINARY' }
    ];
    componentDestroyed$: Subject<void> = new Subject();
    registerForm: FormGroup;
    userState$: Observable<UserState>;

    getMailErrorMessage() {
        return this.registerForm.get('email').hasError('required') ? 'You must enter a value!' : this.registerForm.get('email').hasError('email') ? 'email not valid' : '';
    }
    constructor(private store: Store<any>, private dispatcher: ActionsSubject, private router: Router) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            birthdate: new FormControl('', [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.minLength(3)),
            passwordConfirm: new FormControl(''),
        }, this.passwordMatchValidator);
    }

    ngOnInit() {
        this.userState$ = this.store.select('user');
        this.dispatcher.pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (data: CreateUserSuccess | CreateUserError) => {
                if (data.type === CREATE_USER_SUCCESS) {
                    this.router.navigateByUrl('/successfulRegistration');
                    this.submit.emit();
                }
            }
        );
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('passwordConfirm').value
            ? null : { 'mismatch': true };
    }

    printError(error: HttpErrorResponse): string {
        if (error.status === 400) {
            let message = '';
            for(let key in error.error) {
                message += error.error[key] + '\n';
            }
            return message;
        } else {
            return error.message;
        }
    }
    onSubmit() {
        this.store.dispatch(new CreateUser({
            name: this.registerForm.value.name,
            birthdate: this.registerForm.value.birthdate,
            email: this.registerForm.value.email,
            gender: this.registerForm.value.gender,
            password: this.registerForm.value.password
        }));
    }
}
