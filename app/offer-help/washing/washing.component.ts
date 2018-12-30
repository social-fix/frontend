import { Component, OnDestroy, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS, MatSnackBar } from '@angular/material';
import { Washing } from '@app/core/help/help.model';
import { BaseHelpContainerComponent } from '@app/offer-help/offer-help.component';
import { MY_FORMATS } from '@app/shared/date.format';
import { Store, ActionsSubject } from '@ngrx/store';

@Component({
  selector: 'sf-washing',
  templateUrl: './washing.component.html',
  styleUrls: ['./washing.component.scss', '../offer-help.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class WashingComponent extends BaseHelpContainerComponent implements OnInit, OnDestroy {

  @Input() type: string;
  options: string[] = ['wc', 'shower', 'bath', 'laundry'];
  washingForm: FormGroup;

  constructor(store: Store<any>, public dispatcher$: ActionsSubject, public snackBar: MatSnackBar) {
    super(store, dispatcher$, snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
    this.washingForm = new FormGroup({
      facilities: new FormControl(this.options),
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy()
  }

  getFormData(): Washing {
    const extraFields = {
      toilet_available: this.washingForm.value.facilities.includes('wc'),
      shower_available: this.washingForm.value.facilities.includes('shower'),
      bath_available: this.washingForm.value.facilities.includes('bath'),
      laundry_available: this.washingForm.value.facilities.includes('laundry'),
    }
    const submitData: Washing = { ...super.getFormData(), ...extraFields }
    return submitData
  }

  onSubmit() {
    super.onSubmit()
  }

}
