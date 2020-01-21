import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelpService } from '@app/core/help/help.service';
import { Subject } from 'rxjs';
import { AnyHelp } from '@app/core/help/help.model';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserState } from '@app/core';
import { MIN_SEARCH_DISTANCE, MAX_SEARCH_DISTANCE } from 'assets/data/appConsts'

@Component({
    selector: 'sf-search-help',
    templateUrl: './search-help.component.html',
    styleUrls: ['./search-help.component.scss']
})
export class SearchHelpComponent implements OnInit, OnDestroy {

    groupedHelps: Object;
    helps: Array<AnyHelp>;
    loading: boolean;
    componentDestroyed$: Subject<void> = new Subject();
    error: String;
    bedChecked: boolean = true;
    mealChecked: boolean = true;
    bathChecked: boolean = true;
    distance: number = 10;
    MIN_DISTANCE: number = MIN_SEARCH_DISTANCE;
    MAX_DISTANCE: number = MAX_SEARCH_DISTANCE;

    constructor(private helpService: HelpService, private store: Store<any>) { }

    formatSlider(value: number) {
        return value + 'km';
    }

    ngOnInit() {
        this.loading = true;
        this.helpService.groupedServicesList().pipe(takeUntil(this.componentDestroyed$)).subscribe(
            helps => {
                let userId: number;
                this.store.select('user').pipe(take(1)).subscribe((elem: UserState) => userId = elem.user.id);
                delete helps[userId]
                this.groupedHelps = helps
                this.helps = Object.values<AnyHelp>(helps).reduce((acc, help) => acc.concat(help), []);
                console.log(this.helps)
                this.loading = false;
            },
            error => {
                this.error = error.message;
                this.loading = false;
            });
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
