import { createAction, props } from "@ngrx/store";


export const loadAuthFromStorage = createAction('[Auth] Load from storage]');

export const loadAuthSuccess = createAction('[Auth] Load success', props<{token: string | null}>());

export const loginSuccess = createAction('[Auth] Login success', props<{token: string}>());

export const logoutSuccess = createAction('[Auth] Logout success');

