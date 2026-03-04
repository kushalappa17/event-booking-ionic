import { createReducer, on } from "@ngrx/store"
import * as AuthActions from "./auth.actions"

export interface AuthState {
    token: string,
    isAuthenticated: boolean,
    loading: boolean
}

export const initialState = {
    token : null,
    isAuthenticated : false,
    loading: false
}

export const authReducer = createReducer(
    initialState,
    
    on(AuthActions.loadAuthFromStorage, state => ({
        ...state,
        loading : true
    })),

    on(AuthActions.loadAuthSuccess, (state: any, {token}: any) =>({
        ...state,
        token,
        isAuthenticated: !! token,
        loading: false
    })),

    on(AuthActions.loginSuccess, (state:any, {token}: any) => ({
        ...state,
        token,
        isAuthenticated: true,
        loading: false
    })),

    on(AuthActions.logoutSuccess, state => ({
        ...state,
        token : null,
        isAuthenticated: false,
        loading: false
    }))
)