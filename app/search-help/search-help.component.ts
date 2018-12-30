import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelpService } from '@app/core/help/help.service';
import { Subject } from 'rxjs';
import { AnyHelp } from '@app/core/help/help.model';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserState } from '@app/core';


@Component({
    selector: 'sf-search-help',
    templateUrl: './search-help.component.html',
    styleUrls: ['./search-help.component.scss']
})
export class SearchHelpComponent implements OnInit, OnDestroy {

    searchResult: Array<AnyHelp>;
    loading: boolean;
    componentDestroyed$: Subject<void> = new Subject();
    error: String;
    constructor(private helpService: HelpService, private store: Store<any>) { }

    ngOnInit() {
        this.loading = true;
        this.helpService.listServices().pipe(takeUntil(this.componentDestroyed$)).subscribe(
            helps => {
                let userId: number;
                this.store.select('user').pipe(take(1)).subscribe( (elem: UserState) => userId = elem.user.id);
                this.searchResult = helps.filter( elem => elem.sender !== userId);
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
