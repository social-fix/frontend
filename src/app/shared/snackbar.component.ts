import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'snack-bar',
    template: `<div [innerHTML]="data">
              </div>`,
    styles: [`
    span {
    }
    `  ],
  })
  export class SnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  }