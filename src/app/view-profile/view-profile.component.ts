import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER, User } from '@app/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sf-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  subscription: Subscription;
  user: User;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params =>  (this.user = {...params} as User))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
