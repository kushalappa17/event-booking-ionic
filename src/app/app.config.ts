import { HttpInterceptorFn, HttpHandlerFn, provideHttpClient, withInterceptors, HttpContextToken, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { inject, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, Router } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { Store, provideStore } from "@ngrx/store";
import { Observable, take, switchMap, catchError, throwError } from "rxjs";
import { routes } from "./app.routes";
import { AuthEffects } from "./lib/auth.effects";
import { authReducer } from "./lib/auth.reducer";
import { selectToken } from "./lib/auth.selectors";
import { UIService } from "./services/ui.service";
import { provideIonicAngular } from '@ionic/angular/standalone';
import { logoutSuccess } from "./lib/auth.actions";

export const SKIP_AUTH = new HttpContextToken<boolean>(()=> false);

export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> =>{
    const store = inject(Store);

    if(req.context.get(SKIP_AUTH)){
      return next(req);
    }
    return store.select(selectToken).pipe(
      take(1),
      switchMap(token =>{
        if(!token){
          return next(req)
        }
        return next(
          req.clone({
            setHeaders: {
              Authorization : `Bearer ${token}`
            }
          })
        )
      })
    )
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const uiService = inject(UIService);
  const store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Something went wrong';

      if (error.status === 0) {
        message = 'Cannot connect to server.';
      } 
      else if (error.status === 400) {
        message = error.error?.message || 'Bad request.';
      } 
      else if (error.status === 401) {
        message = 'Session expired. Please login again.';
        store.dispatch(logoutSuccess()); 
        router.navigate(['/login']);
      } 
      else if (error.status === 403) {
        message = 'Access denied.';
      } 
      else if (error.status === 500) {
        message = 'Server error. Try later.';
      }

      uiService.showError(message);

      return throwError(() => error);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),  
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({auth: authReducer}),
    provideEffects([AuthEffects]),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
  ]
};  