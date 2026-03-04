import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { selectIsLoading, selectIsAuthenticated } from './lib/auth.selectors';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{

  constructor(private store: Store, private router: Router){}
  
  canActivate(): Observable<boolean>{
    return this.store.select(selectIsLoading).pipe(
      filter(loading => !loading),
      take(1),
      switchMap(() => this.store.select(selectIsAuthenticated)
                        .pipe(
                          tap((isAuth:any) => console.log('isAuth', isAuth)),
                          take(1)
                        )),
      map(isAuth =>{
        if(!isAuth){
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })

    )
  }
  
}
