import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable()
export class UserService {
  user_id : number;
  constructor(private http: HttpClient, private store: Store<any>) {
    this.store.select('user').subscribe(data => (data.user) ? this.user_id = data.user.id : undefined);
  }

  getUser(id: number = this.user_id): Observable<User> {
    return this.http.get(`users/${id}/`).pipe(
      map((user: any) =>({
        id: user['id'],
        name: user['name'],
        email: user['email'],
        birthdate: user['birthdate'],
        gender: user['gender'],
        location: user['location'],
        catchPhrase: user['catchPhrase'],
        description: user['description']
      }))
      );
  }
  updateUser(data: any, id: number = this.user_id): Observable<any> {
    return this.http.patch<User>(`users/${id}/`, data);
  }
  createUser(user: User): Observable<any> {
    return this.http.post<User>('users/', {...user, ...{birthdate: user.birthdate.format()}});
  }
  deleteUser(id: number = this.user_id): Observable<any> {
    return this.http.delete(`users/${id}/`);
  }

} 