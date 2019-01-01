import { AnyHelp } from '@app/core/help/help.model';
import { Store, ActionsSubject } from '@ngrx/store';
import { HelpCRUDService, UpdateHelpConnexion } from '@app/core/websocket/help-crud.service';
import { SubscribeToHelp, SUBSCRIBE_TO_HELP_SUCCESS, SubscribeToHelpSuccess } from '@app/core/help/help.actions';
import { take, takeUntil } from 'rxjs/operators';
import { HelpState } from '@app/core/help/help.reducer';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseHelpList implements OnDestroy {
    store: Store<any>;
    wsService: HelpCRUDService
    helps: Array<AnyHelp>;
    dispatcher$: ActionsSubject;
    componentDestroyed$: Subject<void> = new Subject<void>();
    constructor(store: Store<any>, wsService: HelpCRUDService, dispatcher$) {
        this.store = store;
        this.wsService = wsService;
        this.dispatcher$ = dispatcher$;

        this.dispatcher$.pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (data) => {
                if (data.type === SUBSCRIBE_TO_HELP_SUCCESS) {
                    const payload: AnyHelp = (<SubscribeToHelpSuccess>data).payload;
                    this.wsService.helpMessages.forEach((helpConnexion: UpdateHelpConnexion) => {
                        if (payload.id === helpConnexion.help_id) {
                            helpConnexion.connexion$.next(payload);
                        }
                    });
                }
            }
        );
    }
    alreadyRegistered(help_id: number): boolean {
        let joinedHelps: Array<AnyHelp>;
        this.store.select('help').pipe(take(1)).subscribe((state: HelpState) => joinedHelps = state.joinedHelps);
        return joinedHelps.filter( elem => elem.id === help_id).length !== 0;
    }
    register(help: AnyHelp) {
        this.store.dispatch(new SubscribeToHelp(help));
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
