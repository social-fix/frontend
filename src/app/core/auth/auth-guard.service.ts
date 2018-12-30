import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';



interface Credentials{
  email: string;
  password: string;
}
@Injectable()
export class AuthGuardService implements CanActivate {
  isAuthenticated = false;

  constructor(private store: Store<any>,private http: HttpClient, private router: Router) {
    this.store
      .select("user")
      .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(state.url)
  	if (this.isAuthenticated){
      if(state.url === '/landing'){
        this.router.navigateByUrl('/dashboard');
        return false;
      }
      else{
        return true;
      }
    }
    else{
      if(state.url === '/landing'){
        return true;
      }
      else{
        this.router.navigateByUrl('/landing');
        return false;
      }

    }
  }
  getToken(data: Credentials) {
    return this.http.post<Credentials>(`get_auth_token/`, data);
  }
}
