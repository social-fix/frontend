import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Meal } from '@app/core/help/help.model';
import { BaseHelpContainerComponent } from '@app/offer-help/offer-help.component';
import { MY_FORMATS } from '@app/shared/date.format';
import { Store, ActionsSubject } from '@ngrx/store';

@Component({
    selector: 'sf-meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss', '../offer-help.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class MealComponent extends BaseHelpContainerComponent implements OnInit, OnDestroy {
    @Input() type: string;
    options: string[] = ['vegan', 'vegetarian', 'halal', 'casher'];
    mealForm: FormGroup;

    constructor(store: Store<any>, public dispatcher$: ActionsSubject, public snackBar: MatSnackBar) {
        super(store, dispatcher$, snackBar);
      }

    ngOnInit() {
        super.ngOnInit();
        this.mealForm = new FormGroup({
            diet: new FormControl(this.options),
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy()
    }

    getFormData(): Meal {
        const extraFields = {
            can_be_casher: this.mealForm.value.diet.includes('casher'),
            can_be_halal: this.mealForm.value.diet.includes('halal'),
            can_be_vegan: this.mealForm.value.diet.includes('vegan'),
            can_be_vegetarian: this.mealForm.value.diet.includes('vegetarian'),
        }
        const submitData: Meal = { ...super.getFormData(), ...extraFields }
        return submitData
    }

    onSubmit() {
        super.onSubmit()
    }

}
