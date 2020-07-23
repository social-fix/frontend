import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Bed } from '@app/core/help/help.model';
import { BaseHelpContainerComponent } from '@app/offer-help/offer-help.component';
import { MY_FORMATS } from '@app/shared/date.format';
import { Store, ActionsSubject } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sf-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss', '../offer-help.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BedComponent extends BaseHelpContainerComponent implements OnInit, OnDestroy {

  bedForm: FormGroup;
  @Input() type: string;
  constructor(store: Store<any>, public dispatcher$: ActionsSubject, public snackBar: MatSnackBar) {
    super(store, dispatcher$, snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
      this.bedForm = new FormGroup({
      nights_number : new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy()
}

getFormData(): Bed {
  const extraFields = {
      number_nights: this.bedForm.value.nights_number,
  }
  const submitData: Bed = { ...super.getFormData(), ...extraFields }
  return submitData
}


  onSubmit() {
    super.onSubmit()
  }

}
