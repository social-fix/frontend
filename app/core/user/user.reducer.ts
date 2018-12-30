import { HttpErrorResponse } from '@angular/common/http';

import * as UserActions from './user.action';
import { User } from './user.model';

export type Action = UserActions.All;
export const USER_KEY = 'USER';
const newState = (state, newData) => {
    return Object.assign({}, state, newData)
}

export const initState: UserState = {
    isAuthenticated: false,
    token: undefined,
    loading: false,
    user: {
        id: undefined,
        name: undefined,
        email: undefined,
        birthdate: undefined,
        gender: undefined,
        catchPhrase: '',
        description: ''
    }
}
export function userReducer(state: UserState = initState, action: Action) {
    switch (action.type) {
        case UserActions.LOGIN:
            return { ...state, isAuthenticated: true, token: action.payload };
        case UserActions.LOGOUT:
            return { ...state, isAuthenticated: false, token: undefined };
        case UserActions.SET_USER:
            return {...state, user: newState(state.user, action.payload) };
        case UserActions.UPDATE_USER:
            return newState(state, { loading: true });
        case UserActions.CREATE_USER:
        case UserActions.DELETE_USER:
            return newState(state, { loading: true });
        case UserActions.CREATE_USER_SUCCESS:
            return {...state, loading: false, user: action.payload};
        case UserActions.UPDATE_USER_SUCCESS:
        return newState(state, { loading: false, user: newState(state.user, action.payload)});
        case UserActions.DELETE_USER_SUCCESS:
            return newState(state, { loading: false });
        case UserActions.CREATE_USER_ERROR:
        case UserActions.UPDATE_USER_ERROR:
        case UserActions.DELETE_USER_ERROR:
            return newState(state, { loading: false, error: action.payload });
        default:
            return state;
    }
}

export interface UserState {
    isAuthenticated: boolean;
    token: string | undefined;
    loading: boolean;
    user?: User;
    error?: HttpErrorResponse;
}