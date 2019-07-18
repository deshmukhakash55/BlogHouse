import { Timestamp } from 'rxjs';

export class User {
    id: string;
    username: string;
    email: string;
    profile_pic: string;
    base_pic: string;
    country: string;
    state: string;
    pin_code: string;
    address: string;
    mobile: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: string;
    followers: number;
    creation_time: Timestamp<Date>;
    latest_modified_date: Timestamp<Date>;
}
