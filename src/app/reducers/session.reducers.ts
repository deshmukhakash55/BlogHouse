import { Action } from '@ngrx/store';
import { User } from '../model/User';
import * as SessionActions from '../actions/session.actions';

// Section 1
const initialState: User = {
    username: '',
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
    tokenType: ''
};

// Section 2
export function reducer(state: User[] = [initialState], action: SessionActions.Actions) {

    // Section 3
    switch (action.type) {
        case SessionActions.ADD_SESSION:
            initialState.accessToken = action.payload.accessToken;
            initialState.username = action.payload.username;
            initialState.refreshToken = action.payload.refreshToken;
            initialState.expiresIn = action.payload.expiresIn;
            initialState.tokenType = action.payload.tokenType;
            return [initialState];
        case SessionActions.REMOVE_SESSION:
            initialState.accessToken = '';
            initialState.username = '';
            initialState.refreshToken = '';
            initialState.expiresIn = 0;
            initialState.tokenType = '';
            return [initialState];
        default:
            return state;
    }
}