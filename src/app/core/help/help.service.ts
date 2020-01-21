import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bed, Meal, Washing } from '@app/core/help/help.model';
import { User } from '@app/core/user/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Injectable()
export class HelpService {
    user_id: number;
    constructor(private http: HttpClient, private store: Store<any>) {
        this.store.select('user').subscribe(data => (data.user) ? this.user_id = data.user.id : undefined);
    }
    /**
     * @param criteria the criteria of the get. Can be 'getBySender' or 'getIfIsGuest'
     * @param user_id The user id on which the help will be searched
     */
    getByCriteria(criteria: string, user_id: number = this.user_id): Observable<any> {
        return this.http.get(`service/${criteria}/${user_id}/`);
    }
    servicesList(): Observable<any> {
        return this.http.get('service/');
    }
    groupedServicesList(): Observable<any> {
        return this.http.get('service/groupedList');
    }
    subscribeToHelp(help: string, help_id: number) {
        return this.http.post(`service/${help}/subscribeToHelp/${help_id}/`, null);
    }
    updateHelp(data: any, help: string, help_id: number = this.user_id): Observable<any> {
        return this.http.patch<User>(`service/${help}/${help_id}/`, data);
    }
    createHelp(data: Meal|Bed|Washing,  help: string): Observable<any> {
        return this.http.post<User>(`service/${help}/`, { ...data, ...{ start: data.start.format(), end: data.end.format()} });
    }
    deleteHelp(help: string, help_id: number = this.user_id): Observable<any> {
        return this.http.delete(`service/${help}/${help_id}/`);
    }

}

