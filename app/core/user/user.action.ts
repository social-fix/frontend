import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { User } from './user.model';

export const LOGIN = '[User] Login';
export const LOGOUT = '[User] Logout';
export const SET_USER = '[User] SET_USER';
export const CREATE_USER = '[User] CREATE_USER';
export const UPDATE_USER = '[User] UPDATE_USER';
export const DELETE_USER = '[User] DELETE_USER';
/*export const GET_USER_SUCCESS = '[User] GET_USER_SUCCESS';*/
export const CREATE_USER_SUCCESS = '[User] CREATE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = '[User] UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = '[User] DELETE_USER_SUCCESS';
/*export const GET_USER_ERROR = '[User] GET_USER_ERROR';*/
export const CREATE_USER_ERROR = '[User] CREATE_USER_ERROR';
export const UPDATE_USER_ERROR = '[User] UPDATE_USER_ERROR';
export const DELETE_USER_ERROR = '[User] DELETE_USER_ERROR';

export class SetUser implements Action {
    readonly type = SET_USER;
    constructor(public payload: User) { }
}

export class CreateUser implements Action {
    readonly type = CREATE_USER;
    constructor(public payload: any) { }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: any) { }
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;
}

export class AuthLogin implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}

export class AuthLogout implements Action {
    readonly type = LOGOUT;
}

export class CreateUserSuccess implements Action {
    readonly type = CREATE_USER_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteUserSuccess implements Action {
    readonly type = DELETE_USER_SUCCESS;
}

export class CreateUserError implements Action {
    readonly type = CREATE_USER_ERROR;
    constructor(public payload: HttpErrorResponse) { }
}

export class UpdateUserError implements Action {
    readonly type = UPDATE_USER_ERROR;
    constructor(public payload: HttpErrorResponse) { }
}

export class DeleteUserError implements Action {
    readonly type = DELETE_USER_ERROR;
    constructor(public payload: HttpErrorResponse) { }
}

export type All = AuthLogin |
    AuthLogout |
    SetUser |
    UpdateUser |
    CreateUser |
    DeleteUser |
    CreateUserSuccess |
    UpdateUserSuccess |
    DeleteUserSuccess |
    CreateUserError |
    UpdateUserError |
    DeleteUserError;
