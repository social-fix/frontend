import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

export interface Location {
    street: string;
    street_number: number;
    postal_code: string;
    city: string;
    country: string;
}
export interface User {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    birthdate: moment.Moment | undefined;
    gender: Gender | undefined;
    location?: Location;
    catchPhrase: string;
    description: string;
}

export enum Gender {
    FEMALE,
    MALE,
    OTHER,
};

@Pipe ({
    name: 'getGender'
})
export class GetGenderPipe implements PipeTransform {
    transform(val: number) {
        return Gender[val];
    }
}

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {

    transform(value: moment.Moment): string {
        const today = moment();
        const birthdate = moment(value);
        const years = today.diff(birthdate, 'years');
        return years.toString();
    }

}