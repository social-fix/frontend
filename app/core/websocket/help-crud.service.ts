import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnyHelp } from '../help/help.model';
import { HelpState } from '../help/help.reducer';
import { WebsocketService } from './websocket.service';

export interface UpdateHelpConnexion {
    help_id: number,
    connexion: Subject<AnyHelp>
}

@Injectable()
export class HelpCRUDService {
    public helpMessages$: Array<UpdateHelpConnexion> = Array();
    constructor(wsService: WebsocketService, private store: Store<any>) {
        this.store.select('help').subscribe(
            (helpState: HelpState) => {
                const followedHelps = helpState.joinedHelps.concat(helpState.hostedHelps);
                followedHelps.forEach(help => {
                    if (this.helpMessages$.filter( elem => help.id === elem.help_id).length === 0) {
                        this.helpMessages$.push(
                            {
                                help_id: help.id,
                                connexion: <Subject<AnyHelp>>wsService.connect('ws://localhost:8000/wss/updateService/' + help.id + '/')
                                    .pipe(map(
                                        (response: MessageEvent): AnyHelp => {
                                            return JSON.parse(response.data);
                                        }
                                    )
                                    )
                            }
                        );
                    }
                });
            }
        );
    }
}
