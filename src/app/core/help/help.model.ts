import { Moment } from "moment";

export enum HELP_TYPE{
    MEAL,
    BED,
    WASHING
}

export interface Help {
    id: number | undefined,
    type: string,
    start: Moment,
    end: Moment,
    guest_limit: number,
    comment: string,
    sender: number,
    guests: Array<number>
}

export interface Meal extends Help {
    can_be_casher: boolean,
    can_be_halal: boolean,
    can_be_vegetarian: boolean,
    can_be_vegan: boolean
}

export interface Bed extends Help {
    number_nights: number
}

export interface Washing extends Help {
    toilet_available: boolean,
    shower_available: boolean,
    bath_available: boolean,
    laundry_available: boolean
}

export type AnyHelp = Bed | Meal | Washing

