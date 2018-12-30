import { HttpErrorResponse } from '@angular/common/http';
import { AnyHelp } from '@app/core/help/help.model';
import { Action } from '@ngrx/store';

// HTTP backend requests
export const CREATE_HELP = '[Help] CREATE_HELP'
export const CREATE_HELP_SUCCESS = '[Help] CREATE_HELP_SUCCESS'
export const CREATE_HELP_ERROR = '[Help] CREATE_HELP_ERROR'
export const UPDATE_HELP = '[Help] UPDATE_HELP'
export const UPDATE_HELP_SUCCESS = '[Help] UPDATE_HELP_SUCCESS'
export const UPDATE_HELP_ERROR = '[Help] UPDATE_HELP_ERROR'
export const SUBSCRIBE_TO_HELP = '[Help] SUBSCRIBE_TO_HELP'
export const SUBSCRIBE_TO_HELP_SUCCESS = '[Help] SUBSCRIBE_TO_HELP_SUCCESS'
export const SUBSCRIBE_TO_HELP_ERROR = '[Help] SUBSCRIBE_TO_HELP_ERROR'

// pure frontend actions linked to the current user
export const SET_HOSTED_HELPS = '[Help] SET_HOSTED_HELPS'
export const SET_JOINED_HELPS = '[Help] SET_JOINED_HELPS'
export const RESET_STATE = '[Help] RESET_STATE'

export class CreateHelp implements Action {
    readonly type = CREATE_HELP;
    constructor(public payload: AnyHelp) { }
}

export class CreateHelpSuccess implements Action {
    readonly type = CREATE_HELP_SUCCESS;
    constructor(public payload: AnyHelp) { }
}

export class CreateHelpError implements Action {
    readonly type = CREATE_HELP_ERROR;
    constructor(public payload: HttpErrorResponse) { }
}

export class UpdateHelp implements Action {
    readonly type = UPDATE_HELP;
    constructor(public payload: any) { }
}

export class UpdateHelpError implements Action {
    readonly type = UPDATE_HELP_ERROR;
    constructor(public payload: HttpErrorResponse) { }
}

export class UpdateHelpSuccess implements Action {
    readonly type = UPDATE_HELP_SUCCESS;
}

export class SubscribeToHelp implements Action {
    readonly type = SUBSCRIBE_TO_HELP;
    constructor(public payload: AnyHelp) { }
}

export class SubscribeToHelpError implements Action {
    readonly type = SUBSCRIBE_TO_HELP_ERROR;
    constructor(public payload: HttpErrorResponse) { }
}

export class SubscribeToHelpSuccess implements Action {
    readonly type = SUBSCRIBE_TO_HELP_SUCCESS;
    constructor(public payload: AnyHelp) { }
}

export class SetHostedHelps implements Action {
    readonly type = SET_HOSTED_HELPS;
    constructor(public payload: Array<AnyHelp>) { }
}

export class SetJoinedHelps implements Action {
    readonly type = SET_JOINED_HELPS;
    constructor(public payload: Array<AnyHelp>) { }
}

export class ResetHelpState implements Action {
    readonly type = RESET_STATE;
}

export type ALL = CreateHelp |
    CreateHelpSuccess |
    CreateHelpError |
    UpdateHelp |
    UpdateHelpSuccess |
    UpdateHelpError |
    SubscribeToHelp |
    SubscribeToHelpSuccess |
    SubscribeToHelpError |
    SetHostedHelps |
    SetJoinedHelps |
    ResetHelpState
