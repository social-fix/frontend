import { Component, OnInit } from '@angular/core';
import { User, UserService } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sf-successful-registration',
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.scss']
})
export class SuccessfulRegistrationComponent implements OnInit {
	user$: Observable<User>
  constructor(private store: Store<any>, private userService : UserService ) { 
  	this.user$ = this.store.select('user').pipe(map(data => data.user)); 
  }

  ngOnInit() {
  }

}
