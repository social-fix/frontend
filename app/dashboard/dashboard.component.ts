import { Component, OnInit } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER, User } from '@app/core';
import { Bed, Meal, Washing } from '@app/core/help/help.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  user$: Observable<User>;
  hostedHelps$: Observable<Array<Bed | Meal | Washing>>
  joinedHelps$: Observable<Array<Bed | Meal | Washing>>
  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.user$ = this.store.select('user').pipe(map(data => data.user));
    this.hostedHelps$ = this.store.select('help').pipe(map(data => data.hostedHelps));
    this.joinedHelps$ = this.store.select('help').pipe(map(data => data.joinedHelps));
  }


}
