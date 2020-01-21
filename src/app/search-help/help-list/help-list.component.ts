import { Component, Input, OnInit } from '@angular/core';
import { AnyHelp } from '@app/core/help/help.model';
import { HelpCRUDService } from '@app/core/websocket/help-crud.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { BaseHelpList } from '../base-help-list';

@Component({
    selector: 'sf-help-list',
    templateUrl: './help-list.component.html',
    styleUrls: ['./help-list.component.scss']
})
export class HelpListComponent extends BaseHelpList implements OnInit {
    @Input() helps: Array<AnyHelp>;

    constructor(public store: Store<any>, public wsService: HelpCRUDService, public dispatcher$: ActionsSubject) {
        super(store, wsService, dispatcher$);
    }

    ngOnInit() {
    }



}
