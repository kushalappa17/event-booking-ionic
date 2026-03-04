import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import { map, tap } from "rxjs";

@Injectable()
export class AuthEffects {

    private hydrate$;
    private persist$;
    private clear$;

    constructor(private action$: Actions){
        this.hydrate$ = createEffect(() =>
            this.action$.pipe(
                ofType(AuthActions.loadAuthFromStorage),
                map(()=>{
                    const token = localStorage.getItem('token');
                    return AuthActions.loadAuthSuccess({token});
                })
            )
        );

        this.persist$ = createEffect(() =>
            this.action$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({token}) => localStorage.setItem('token',token))
            ),
            {dispatch: false}
        )

        this.clear$ = createEffect(() =>
            this.action$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => localStorage.removeItem('token'))
            ),
            {dispatch: false}
        )
    }
}