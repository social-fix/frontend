import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { ActionsSubject, Store } from '@ngrx/store';

@Component({
    selector: 'landing-component',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
    loading: boolean;
    error: string;
    constructor() { }

    ngOnInit() {
    }
}
