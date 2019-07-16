// Section 1
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from '../model/User';

// Section 2
export const ADD_SESSION       = '[USER] Add';
export const REMOVE_SESSION    = '[USER] Remove';

// Section 3
export class AddSession implements Action {
    readonly type = ADD_SESSION;

    constructor(public payload: User) {}
}

export class RemoveSession implements Action {
    readonly type = REMOVE_SESSION;

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddSession | RemoveSession;