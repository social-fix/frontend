import { Component, OnInit } from '@angular/core';
import { CreateUser, DeleteUser, Gender, UpdateUser, User, UserService, UPDATE_USER_SUCCESS } from '@app/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country, countries } from 'assets/data/countries';
import { Router } from '@angular/router';


@Component({
  selector: 'sf-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss']
})
export class UpdateProfileFormComponent implements OnInit {
  form: FormGroup;
  locationForm: FormGroup;
  componentDestroyed$: Subject<void> = new Subject();
  countryList: Array<Country> = countries;
  constructor(private router: Router, private store: Store<any>, private dispatcher: ActionsSubject) {
    this.locationForm = new FormGroup({
      street: new FormControl('', Validators.maxLength(200)),
      house_number: new FormControl(undefined, Validators.pattern("[0-9]+")),
      postal_code: new FormControl(''),
      city: new FormControl('', Validators.maxLength(100)),
      country: new FormControl('')
    });
    this.form = new FormGroup({
      location: this.locationForm,
      description: new FormControl('', [Validators.maxLength(500)]),
      catchPhrase: new FormControl('', [Validators.maxLength(500)])
    });
    this.dispatcher.pipe(takeUntil(this.componentDestroyed$)).subscribe(
      (data) => {
        if (data.type === UPDATE_USER_SUCCESS) {
          this.router.navigate(['dashboard']);
        }
      }
    );
  }

  ngOnInit() {
  }

  isLocationNull(): boolean {
    const { street, house_number, postal_code, city, country } = this.locationForm.value;
    return street !== '' || house_number !== null || postal_code !== '' || city !== '' || country !== '';
  }


  saveAndProceed() {
    if (!this.isLocationNull()) {
      this.form.value.location = undefined;
    }
    this.store.dispatch(new UpdateUser(this.form.value))
  }

}
