import { HttpErrorResponse } from "@angular/common/http";
import {
    ALL,
    CREATE_HELP,
    CREATE_HELP_SUCCESS,
    SET_JOINED_HELPS,
    UPDATE_HELP,
    UPDATE_HELP_SUCCESS,
    CREATE_HELP_ERROR,
    UPDATE_HELP_ERROR,
    SET_HOSTED_HELPS,
    RESET_STATE,
    SUBSCRIBE_TO_HELP,
    SUBSCRIBE_TO_HELP_ERROR,
    SUBSCRIBE_TO_HELP_SUCCESS
} from "@app/core/help/help.actions";
import { Bed, Meal, Washing } from "@app/core/help/help.model";

export type Action = ALL;

export const HELP_KEY = 'HELP'

export const initState: HelpState = {
    loading: false,
    hostedHelps: new Array<Meal | Bed | Washing>(),
    joinedHelps: new Array<Meal | Bed | Washing>()
}

export interface HelpState {
    loading: boolean,
    hostedHelps: Array<Meal | Bed | Washing>,
    joinedHelps: Array<Meal | Bed | Washing>,
    error?: HttpErrorResponse;
}

export function helpReducer(state: HelpState = initState, action: Action) {
    switch (action.type) {
        case CREATE_HELP:
        case UPDATE_HELP:
        case SUBSCRIBE_TO_HELP:
            return { ...state, loading: true }
        case CREATE_HELP_SUCCESS:
            return { ...state, hostedHelps: [...state.hostedHelps, action.payload], loading: false }
        case UPDATE_HELP_SUCCESS:
            return { ...state, loading: false }
        case SUBSCRIBE_TO_HELP_SUCCESS:
            return { ...state, joinedHelps: [...state.joinedHelps, action.payload], loading: false }
        case CREATE_HELP_ERROR:
        case UPDATE_HELP_ERROR:
        case SUBSCRIBE_TO_HELP_ERROR:
            return { ...state, loading: false, error: action.payload };
        case SET_HOSTED_HELPS:
            return { ...state, hostedHelps: action.payload }
        case SET_JOINED_HELPS:
            return { ...state, joinedHelps: action.payload }
        case RESET_STATE:
            return initState
        default:
            return state;
    }
}


