import { Component, OnInit } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER, User } from '@app/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'sf-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  user$: Observable<User>;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.user$ = this.store.select("user").pipe(map(data => data.user));
  }

}
