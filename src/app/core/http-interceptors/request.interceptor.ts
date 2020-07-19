import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../auth/auth-guard.service';
import { Store } from '@ngrx/store';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    token: string;
    constructor(public auth: AuthGuardService, private store: Store<any>, ) {
        this.store
            .select('user')
            .subscribe(auth => (this.token = auth.token));
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.token}`
                }
            });
        }
        return next.handle(request);
    }
}